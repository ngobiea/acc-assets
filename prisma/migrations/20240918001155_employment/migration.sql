/*
  Warnings:

  - You are about to drop the column `employeePin` on the `Employment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employment" DROP COLUMN "employeePin",
ADD COLUMN     "employeeNo" TEXT,
ALTER COLUMN "contractEndDate" DROP NOT NULL;
