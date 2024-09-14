/*
  Warnings:

  - You are about to drop the column `acquireBy` on the `UserEmployment` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `UserEmployment` table. All the data in the column will be lost.
  - Added the required column `acquireBy` to the `Personal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "acquireBy" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserEmployment" DROP COLUMN "acquireBy",
DROP COLUMN "country";
