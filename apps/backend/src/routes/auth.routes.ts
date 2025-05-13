import  { Router } from "express"
import { login, registerFriend, registerSeeker } from "../controllers/AuthControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const route: Router = Router();
route.get("/me", authMiddleware, (req, res) => {
    const user = (req as any).user
    res.status(200).json({
        message: "User authenticated",
        user
    });
})
route.post("/register/seeker", registerSeeker)
route.post("/register/friend", registerFriend)
route.post("/login", login)


export default route