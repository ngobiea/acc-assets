/*
  Warnings:

  - You are about to drop the column `imageId` on the `DPersonal` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Personal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DPersonal" DROP CONSTRAINT "DPersonal_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_imageId_fkey";

-- DropIndex
DROP INDEX "DPersonal_imageId_key";

-- DropIndex
DROP INDEX "Personal_imageId_key";

-- AlterTable
ALTER TABLE "DPersonal" DROP COLUMN "imageId";

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "imageId";
