/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `PastEmployment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PastEmployment" DROP COLUMN "isPrivate",
ALTER COLUMN "employerName" DROP NOT NULL;
