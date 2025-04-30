import express from "express";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(express.json())
app.use("/auth", authRoutes)
app.listen(3001, ()=> {
    console.log("server started")
})