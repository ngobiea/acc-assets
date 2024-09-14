/*
  Warnings:

  - You are about to drop the column `allowance` on the `Employment` table. All the data in the column will be lost.
  - You are about to drop the column `rankOrGrade` on the `PastEmployment` table. All the data in the column will be lost.
  - You are about to drop the column `salaryCurrency` on the `PastEmployment` table. All the data in the column will be lost.
  - You are about to drop the column `titleOrDesignation` on the `PastEmployment` table. All the data in the column will be lost.
  - Added the required column `currency` to the `PastEmployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `PastEmployment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `PastEmployment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employment" DROP COLUMN "allowance",
ADD COLUMN     "allowances" DECIMAL(15,2);

-- AlterTable
ALTER TABLE "PastEmployment" DROP COLUMN "rankOrGrade",
DROP COLUMN "salaryCurrency",
DROP COLUMN "titleOrDesignation",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "rank" TEXT NOT NULL;
