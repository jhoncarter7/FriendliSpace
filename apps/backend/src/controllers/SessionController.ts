import {
  CommunicationType,
  Prisma,
  prismaClient,
  SessionStatus,
  UserRole,
} from "@repo/db/client";
import { NextFunction, Request, Response } from "express";

const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seekerId = (req as any).user?.id;
    const seekerRole = (req as any).user?.role;
    if (!seekerId || seekerRole !== UserRole.SEEKER) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    // 1. VALIDATE input - Use validation library!
    // const validatedBody = CreateSessionSchema.parse(req.body); // Example with Zod
    const body = req.body;
    const { friendId, communicationType } = body;

    if (!friendId || !communicationType) {
      res
        .status(400)
        .json({ message: "Friend ID and communication type required." });
      return;
    }
    const normalize = communicationType.toUpperCase()
    if (!Object.values(CommunicationType).includes(normalize)) {
      res.status(400).json({ message: "Invalid communication type." });
      return;
    }
    if (seekerId === friendId) {
      res.status(400).json({ message: "Cannot start session with yourself" });
      return;
    }

    const friendUser = await prismaClient.user.findUnique({
      where: { id: friendId },
    });
    if (!friendUser || friendUser.role !== UserRole.FRIEND) {
      res.status(404).json({ message: "Friend user not found." });
      return;
    }

    const friendAvailbility = await prismaClient.friend.findFirst({
      where: { id: friendId },
    });
    if (friendAvailbility?.availabilityJson === "unavailable") {
      res.status(400).json({ message: "Friend is unavailable for a session." });
      return;
    }

    const newSession = await prismaClient.session.create({
      data: { seekerId, friendId, status: "PENDING", communicationType: normalize },
      include: {
        seeker: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
        friend: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
      },
    });

    // TODO: Notify Friend that a new session is requested

    res.status(201).json(newSession);
  } catch (error) {
    console.error("Create Session Error:", error);
    next(error);
  }
};

const updateSessionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { sessionId } = req.params;

    // 1. VALIDATE input - Use validation library!
    // const validatedBody = UpdateSessionStatusSchema.parse(req.body); // Example with Zod
    const body = req.body; // Using type assertion
    const { status } = body;

    if (!status) {
      res.status(400).json({ message: "New status is required." });
      return;
    }
    const newStatus = status.toUpperCase() as SessionStatus;
    if (!["ACTIVE", "COMPLETED", "CANCELLED"].includes(newStatus)) {
      res.status(400).json({ message: "Invalid status value." });
      return;
      
    }
     // Cast after validation

    const session = await prismaClient.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      res.status(404).json({ message: "Session not found" });
      return;
    }
    if (userId !== session.seekerId && userId !== session.friendId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    let canUpdate = false;
    const currentStatus = session.status;
    const allowedTransitions: { [key in SessionStatus]?: SessionStatus[] } = {
      PENDING: ["ACTIVE", "CANCELLED"],
      ACTIVE: ["COMPLETED", "CANCELLED"],
    };
    if (allowedTransitions[currentStatus]?.includes(newStatus)) {
      if (
        currentStatus === "PENDING" &&
        newStatus === "ACTIVE" &&
        userId === session.friendId
      )
        canUpdate = true;
      if (currentStatus === "PENDING" && newStatus === "CANCELLED")
        canUpdate = true;
      if (
        currentStatus === "ACTIVE" &&
        (newStatus === "COMPLETED" || newStatus === "CANCELLED")
      )
        canUpdate = true;
    }
    if (!canUpdate)
       {res.status(400).json({
        message: `Invalid transition from ${currentStatus} to ${newStatus}`,
        
      });
      return;
    }

    const updateData: Prisma.SessionUpdateInput = { status: newStatus };
    let endTime: Date | undefined = undefined;
    if (newStatus === "COMPLETED" || newStatus === "CANCELLED")
      endTime = new Date();
    updateData.endTime = endTime;
    if (
      newStatus === "COMPLETED" &&
      currentStatus === "ACTIVE" &&
      session.startTime
    ) {
      const durationMs = endTime!.getTime() - session.startTime.getTime();
      updateData.durationMinutes = Math.ceil(durationMs / (1000 * 60));
    }
    const updatedSession = await prismaClient.session.update({
      where: { id: sessionId },
      data: updateData,
      include: {
        seeker: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
        friend: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
      },
    });
    // TODO: Notify other participant
    res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Update Session Status Error:", error);
    next(error);
  }
};

const getUserSessions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { status, role, page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.max(1, parseInt(limit as string, 10));
    const skip = (pageNum - 1) * limitNum;

    const whereClause: Prisma.SessionWhereInput = {};
    if (
      status &&
      Object.values(SessionStatus).includes(status as SessionStatus)
    )
      whereClause.status = status as SessionStatus;
    if (role === "seeker") whereClause.seekerId = userId;
    else if (role === "friend") whereClause.friendId = userId;
    else whereClause.OR = [{ seekerId: userId }, { friendId: userId }];

    const sessions = await prismaClient.session.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        seeker: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
        friend: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
      },
      skip: skip,
      take: limitNum,
    });
    const totalSessions = await prismaClient.session.count({
      where: whereClause,
    });

    res.status(200).json({
      data: sessions,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalSessions / limitNum),
        totalItems: totalSessions,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Get User Sessions Error:", error);
    next(error);
  }
};

export { createSession, updateSessionStatus, getUserSessions };
