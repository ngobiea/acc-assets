/*
  Warnings:

  - You are about to alter the column `paymentPeriod` on the `Liability` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Liability" ALTER COLUMN "paymentPeriod" SET DATA TYPE INTEGER;
