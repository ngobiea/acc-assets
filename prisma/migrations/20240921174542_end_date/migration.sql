/*
  Warnings:

  - Made the column `contractEndDate` on table `PastEmployment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PastEmployment" ALTER COLUMN "contractEndDate" SET NOT NULL;
