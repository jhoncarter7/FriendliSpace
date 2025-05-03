import { Router } from "express";
import { createReview, getFriendReviews } from "../controllers/ReviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const reviewRoute: Router = Router();

reviewRoute.post("/", authMiddleware,  createReview)
reviewRoute.get("/:userId/reviews", getFriendReviews)

export default reviewRoute