/*
  Warnings:

  - A unique constraint covering the columns `[declarationId]` on the table `CashAtHand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CashAtHand_declarationId_key" ON "CashAtHand"("declarationId");
