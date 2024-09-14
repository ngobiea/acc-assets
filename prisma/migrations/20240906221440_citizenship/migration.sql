/*
  Warnings:

  - You are about to drop the column `AccountNo` on the `CashDeposit` table. All the data in the column will be lost.
  - You are about to drop the column `employeeCategory` on the `FamilyEmployment` table. All the data in the column will be lost.
  - You are about to drop the column `PlotNo` on the `ImmovableAsset` table. All the data in the column will be lost.
  - Added the required column `accountNo` to the `CashDeposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Citizenship` to the `UserEmployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquireBy` to the `UserEmployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashDeposit" DROP COLUMN "AccountNo",
ADD COLUMN     "accountNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FamilyEmployment" DROP COLUMN "employeeCategory";

-- AlterTable
ALTER TABLE "ImmovableAsset" DROP COLUMN "PlotNo",
ADD COLUMN     "plotNo" TEXT;

-- AlterTable
ALTER TABLE "UserEmployment" ADD COLUMN     "Citizenship" TEXT NOT NULL,
ADD COLUMN     "acquireBy" TEXT NOT NULL;
