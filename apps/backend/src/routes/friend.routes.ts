import { Router } from "express";
import { searchFriends, updateMyFriendDetails } from "../controllers/FriendController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const friendRoute: Router = Router();

friendRoute.get("/", searchFriends)
friendRoute.put("/me/details", authMiddleware, updateMyFriendDetails)

export default friendRoute; 