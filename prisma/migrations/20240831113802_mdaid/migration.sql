/*
  Warnings:

  - You are about to drop the column `mda` on the `Employment` table. All the data in the column will be lost.
  - Added the required column `mdaId` to the `Employment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employment" DROP COLUMN "mda",
ADD COLUMN     "mdaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_mdaId_fkey" FOREIGN KEY ("mdaId") REFERENCES "MDA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
