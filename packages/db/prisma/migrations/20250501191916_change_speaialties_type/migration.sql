/*
  Warnings:

  - The `specialties` column on the `friends` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "friends" DROP COLUMN "specialties",
ADD COLUMN     "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropEnum
DROP TYPE "Specialty";
