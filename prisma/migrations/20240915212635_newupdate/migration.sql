/*
  Warnings:

  - You are about to drop the column `acquisitionId` on the `ImmovableAsset` table. All the data in the column will be lost.
  - You are about to drop the column `acquisitionId` on the `MovableAsset` table. All the data in the column will be lost.
  - You are about to drop the column `acquisitionId` on the `OtherAsset` table. All the data in the column will be lost.
  - You are about to drop the column `acquisitionId` on the `Security` table. All the data in the column will be lost.
  - You are about to drop the `Acquisition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FamilyEmployment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `designation` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCost` to the `ImmovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCurrency` to the `ImmovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionMode` to the `ImmovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionYear` to the `ImmovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCost` to the `MovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCurrency` to the `MovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionMode` to the `MovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionYear` to the `MovableAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCost` to the `OtherAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCurrency` to the `OtherAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionMode` to the `OtherAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionYear` to the `OtherAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCost` to the `Security` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionCurrency` to the `Security` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionMode` to the `Security` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acquisitionYear` to the `Security` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FamilyEmployment" DROP CONSTRAINT "FamilyEmployment_familyId_fkey";

-- DropForeignKey
ALTER TABLE "ImmovableAsset" DROP CONSTRAINT "ImmovableAsset_acquisitionId_fkey";

-- DropForeignKey
ALTER TABLE "MovableAsset" DROP CONSTRAINT "MovableAsset_acquisitionId_fkey";

-- DropForeignKey
ALTER TABLE "OtherAsset" DROP CONSTRAINT "OtherAsset_acquisitionId_fkey";

-- DropForeignKey
ALTER TABLE "Security" DROP CONSTRAINT "Security_acquisitionId_fkey";

-- DropIndex
DROP INDEX "ImmovableAsset_acquisitionId_key";

-- DropIndex
DROP INDEX "MovableAsset_acquisitionId_key";

-- DropIndex
DROP INDEX "OtherAsset_acquisitionId_key";

-- DropIndex
DROP INDEX "Security_acquisitionId_key";

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "SSNo" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "employeeNo" TEXT,
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "pinCode" TEXT;

-- AlterTable
ALTER TABLE "ImmovableAsset" DROP COLUMN "acquisitionId",
ADD COLUMN     "acquisitionCost" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "acquisitionCurrency" TEXT NOT NULL,
ADD COLUMN     "acquisitionMode" TEXT NOT NULL,
ADD COLUMN     "acquisitionYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MovableAsset" DROP COLUMN "acquisitionId",
ADD COLUMN     "acquisitionCost" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "acquisitionCurrency" TEXT NOT NULL,
ADD COLUMN     "acquisitionMode" TEXT NOT NULL,
ADD COLUMN     "acquisitionYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OtherAsset" DROP COLUMN "acquisitionId",
ADD COLUMN     "acquisitionCost" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "acquisitionCurrency" TEXT NOT NULL,
ADD COLUMN     "acquisitionMode" TEXT NOT NULL,
ADD COLUMN     "acquisitionYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Security" DROP COLUMN "acquisitionId",
ADD COLUMN     "acquisitionCost" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "acquisitionCurrency" TEXT NOT NULL,
ADD COLUMN     "acquisitionMode" TEXT NOT NULL,
ADD COLUMN     "acquisitionYear" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Acquisition";

-- DropTable
DROP TABLE "FamilyEmployment";
