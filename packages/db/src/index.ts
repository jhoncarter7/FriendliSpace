import {PrismaClient, Gender, UserRole, Prisma}  from "../generated/prisma/client.js";

 const prismaClient = new PrismaClient();
export {prismaClient, Gender, UserRole, Prisma}