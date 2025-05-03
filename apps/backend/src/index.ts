import express from "express";
import authRoutes from "./routes/auth.routes.js"
import  dotenv from "dotenv"
import reviewRoute from "./routes/review.routes.js";
import userRoute from "./routes/user.routes.js";
import sessionRoute from "./routes/session.routes.js";
import friendRoute from "./routes/friend.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/users",  userRoute)
app.use("/api/reviews", reviewRoute)
app.use('/api/friends', friendRoute);
app.use('/api/sessions', sessionRoute);



app.listen(3001, ()=> {
    console.log("server started")
})