import {PrismaClient, Gender, UserRole, Prisma, CommunicationType, SessionStatus}  from "../generated/prisma/client.js";

 const prismaClient = new PrismaClient();
export {prismaClient, Gender, UserRole, Prisma, CommunicationType, SessionStatus}