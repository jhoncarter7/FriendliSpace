
import {Router} from 'express';
import { getCurrentUserProfile, getUserProfileById, updateCurrentUserProfile } from '../controllers/ProfileController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoute:Router= Router();

userRoute.get("/me", authMiddleware, getCurrentUserProfile)
userRoute.put("/me/profile", authMiddleware, updateCurrentUserProfile)
userRoute.get("/:userId/profile", authMiddleware, getUserProfileById)

export default userRoute;