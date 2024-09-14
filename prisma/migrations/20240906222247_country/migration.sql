/*
  Warnings:

  - You are about to drop the column `Citizenship` on the `UserEmployment` table. All the data in the column will be lost.
  - Added the required column `country` to the `UserEmployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEmployment" DROP COLUMN "Citizenship",
ADD COLUMN     "country" TEXT NOT NULL;
