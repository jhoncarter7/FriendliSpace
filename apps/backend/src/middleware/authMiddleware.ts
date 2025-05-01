import { prismaClient } from "@repo/db/client";
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = async (req:Request, res:Response, next:NextFunction)=> {
    const token = req.cookies.accesToken || req.headers["authorization"]?.split(" ")[1];    
    if(!token || !process.env.JWT_KEY){
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY) as jwt.JwtPayload;

        if(!decode){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        const user = await prismaClient.user.findUnique({
            where: { id: decode?.userId },
            select: { id: true, email: true, passwordHash: false}, 
        });

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if(!user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }   

        req.user = user;
        next()
    } catch (error) {
       res.status(401).json({message: "Unauthorized"});
       return;
    }
}