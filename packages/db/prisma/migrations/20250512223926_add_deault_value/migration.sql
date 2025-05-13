/*
  Warnings:

  - Made the column `hourlyRate` on table `friends` required. This step will fail if there are existing NULL values in that column.
  - Made the column `perMinuteRate` on table `friends` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "friends" ALTER COLUMN "hourlyRate" SET NOT NULL,
ALTER COLUMN "hourlyRate" SET DEFAULT 0,
ALTER COLUMN "perMinuteRate" SET NOT NULL,
ALTER COLUMN "perMinuteRate" SET DEFAULT 0;
