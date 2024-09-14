/*
  Warnings:

  - You are about to drop the column `title` on the `Employment` table. All the data in the column will be lost.
  - Added the required column `designation` to the `Employment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employment" DROP COLUMN "title",
ADD COLUMN     "designation" TEXT NOT NULL;
