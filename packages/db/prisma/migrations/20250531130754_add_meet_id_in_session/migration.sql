/*
  Warnings:

  - The required column `meetingId` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "meetingId" TEXT NOT NULL;
