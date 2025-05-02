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
      return res.status(403).json({ message: "Forbidden" });
    }

    // 1. VALIDATE input - Use validation library!
    // const validatedBody = CreateSessionSchema.parse(req.body); // Example with Zod
    const body = req.body;
    const { friendId, communicationType } = body;

    if (!friendId || !communicationType) {
      return res
        .status(400)
        .json({ message: "Friend ID and communication type required." });
    }
    if (!Object.values(CommunicationType).includes(communicationType)) {
      return res.status(400).json({ message: "Invalid communication type." });
    }
    if (seekerId === friendId) {
      return res
        .status(400)
        .json({ message: "Cannot start session with yourself" });
    }

    const friendUser = await prismaClient.user.findUnique({
      where: { id: friendId },
    });
    if (!friendUser || friendUser.role !== UserRole.FRIEND) {
      return res.status(404).json({ message: "Friend user not found." });
    }
    // TODO: Check Friend availability
    const friendAvailbility = await prismaClient.friend.findFirst({
      where: { id: friendId },
    });
    if (friendAvailbility?.availabilityJson === "unavailable") {
      res.status(400).json({ message: "Friend is unavailable for a session." });
      return;
    }

    const newSession = await prismaClient.session.create({
      data: { seekerId, friendId, status: "PENDING", communicationType },
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
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { sessionId } = req.params;

    // 1. VALIDATE input - Use validation library!
    // const validatedBody = UpdateSessionStatusSchema.parse(req.body); // Example with Zod
    const body = req.body; // Using type assertion
    const { status } = body;

    if (!status)
      return res.status(400).json({ message: "New status is required." });

    if (!["ACTIVE", "COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const newStatus = status as SessionStatus; // Cast after validation

    // 2. Fetch session & authorize
    const session = await prismaClient.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (userId !== session.seekerId && userId !== session.friendId)
      return res.status(403).json({ message: "Forbidden" });

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
      return res
        .status(400)
        .json({
          message: `Invalid transition from ${currentStatus} to ${newStatus}`,
        });

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



const getUserSessions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id; 
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });


        const { status, role, page = 1, limit = 20 } = req.query;
        const pageNum = Math.max(1, parseInt(page as string, 10));
        const limitNum = Math.max(1, parseInt(limit as string, 10));
        const skip = (pageNum - 1) * limitNum;

        const whereClause: Prisma.SessionWhereInput = {};
        if (status && Object.values(SessionStatus).includes(status as SessionStatus)) whereClause.status = status as SessionStatus;
        if (role === 'seeker') whereClause.seekerId = userId;
        else if (role === 'friend') whereClause.friendId = userId;
        else whereClause.OR = [ { seekerId: userId }, { friendId: userId } ];

      
        const sessions = await prismaClient.session.findMany({ where: whereClause, orderBy: { createdAt: 'desc' }, include: { seeker: { select: { id: true, profile: { select: { displayName: true, avatarUrl: true }} } }, friend: { select: { id: true, profile: { select: { displayName: true, avatarUrl: true }} } }, }, skip: skip, take: limitNum });
        const totalSessions = await prismaClient.session.count({ where: whereClause });


        res.status(200).json({ data: sessions, pagination: { currentPage: pageNum, totalPages: Math.ceil(totalSessions / limitNum), totalItems: totalSessions, limit: limitNum } });
    } catch (error) { 
        console.error("Get User Sessions Error:", error);
         next(error); 
        }
}

export { createSession, updateSessionStatus, getUserSessions };