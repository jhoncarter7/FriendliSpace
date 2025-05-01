import express from "express";
import authRoutes from "./routes/auth.routes.js"
import  dotenv from "dotenv"
const app = express();
dotenv.config()
app.use(express.json())

console.log(process.env.JWT_KEY)
app.use("/auth", authRoutes)
app.listen(3001, ()=> {
    console.log("server started")
})