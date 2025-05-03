import  { Router } from "express"
import { login, registerFriend, registerSeeker } from "../controllers/AuthControllers.js";

const route: Router = Router();

route.post("/register/seeker", registerSeeker)
route.post("/register/friend", registerFriend)
route.post("/login", login)


export default route