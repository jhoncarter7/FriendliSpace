import { prismaClient } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewerId = (req as any).user?.id;
    if (!reviewerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // 1. VALIDATE input - Use validation library!
    // const validatedBody = CreateReviewSchema.parse(req.body); // Example with Zod
    const body = req.body;
    const { sessionId, rating, comment } = body;

    if (!sessionId || rating === undefined) {
      res.status(400).json({ message: "Session ID and rating required." });
      return;
    }
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      res.status(400).json({ message: "Rating must be 1-5." });
      return;
    }

    const session = await prismaClient.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      res.status(404).json({ message: "Session not found." });
      return;
    }
    if (session.status !== "COMPLETED") {
      res.status(403).json({ message: "Session not completed." });
      return;
    }
    if (session.seekerId !== reviewerId) {
      res.status(403).json({ message: "Only seeker can review." });
      return;
    }
    const friendId = session.friendId;

    const newReview = await prismaClient.$transaction(async (tx) => {
      const createdReview = await tx.review.create({
        data: { sessionId, reviewerId, friendId, rating: ratingNum, comment },
      });
      const aggregateResult = await tx.review.aggregate({
        where: { friendId },
        _avg: { rating: true },
        _count: { id: true },
      });
      const totalReviews = aggregateResult._count.id;
      const averageRating = aggregateResult._avg.rating ?? 0;
      await tx.friend.update({
        where: { userId: friendId },
        data: {
          totalReviews,
          averageRating: parseFloat(averageRating.toFixed(2)),
        },
      });
      return createdReview;
    });

    res.status(201).json(newReview);
  } catch (error) {
    if ((error as any).code === "P2002") {
      res.status(409).json({ message: "Review already submitted." });
      return;
    }
    console.error("Create Review Error:", error);
    next(error);
  }
};

const getFriendReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.max(1, parseInt(limit as string, 10));
    const skip = (pageNum - 1) * limitNum;

    const reviews = await prismaClient.review.findMany({
      where: { friendId: userId },
      orderBy: { createdAt: "desc" },
      include: {
        reviewer: {
          select: {
            id: true,
            profile: { select: { displayName: true, avatarUrl: true } },
          },
        },
      },
      skip: skip,
      take: limitNum,
    });
    const totalReviews = await prismaClient.review.count({
      where: { friendId: userId },
    });

    res.status(200).json({
      data: reviews,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalReviews / limitNum),
        totalItems: totalReviews,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Get Friend Reviews Error:", error);
    next(error);
  }
};

export { createReview, getFriendReviews };
