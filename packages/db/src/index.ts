import {PrismaClient, Gender}  from "../generated/prisma/client.js";

 const prismaClient = new PrismaClient();
export {prismaClient, Gender}