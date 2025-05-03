import { Router } from "express";
import { createSession, getUserSessions, updateSessionStatus } from "../controllers/SessionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const sessionRoute: Router = Router();  

sessionRoute.post("/", authMiddleware, createSession);;
sessionRoute.put('/:sessionId/status', authMiddleware, updateSessionStatus)
sessionRoute.get("/", authMiddleware, getUserSessions)

export default sessionRoute;