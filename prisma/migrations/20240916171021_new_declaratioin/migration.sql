-- DropForeignKey
ALTER TABLE "CashAtHand" DROP CONSTRAINT "CashAtHand_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "CashDeposit" DROP CONSTRAINT "CashDeposit_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "Employment" DROP CONSTRAINT "Employment_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "ImmovableAsset" DROP CONSTRAINT "ImmovableAsset_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "Liability" DROP CONSTRAINT "Liability_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "MovableAsset" DROP CONSTRAINT "MovableAsset_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "OtherAsset" DROP CONSTRAINT "OtherAsset_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "PastEmployment" DROP CONSTRAINT "PastEmployment_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "Security" DROP CONSTRAINT "Security_declarationId_fkey";

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAtHand" ADD CONSTRAINT "CashAtHand_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashDeposit" ADD CONSTRAINT "CashDeposit_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImmovableAsset" ADD CONSTRAINT "ImmovableAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovableAsset" ADD CONSTRAINT "MovableAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherAsset" ADD CONSTRAINT "OtherAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEmployment" ADD CONSTRAINT "PastEmployment_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
