/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `DPersonal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `DPersonal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DPersonal" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DPersonal_imageId_key" ON "DPersonal"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_imageId_key" ON "Personal"("imageId");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DPersonal" ADD CONSTRAINT "DPersonal_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
