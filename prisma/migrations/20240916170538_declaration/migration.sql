-- DropForeignKey
ALTER TABLE "DContact" DROP CONSTRAINT "DContact_declarationId_fkey";

-- DropForeignKey
ALTER TABLE "DPersonal" DROP CONSTRAINT "DPersonal_declarationId_fkey";

-- AddForeignKey
ALTER TABLE "DPersonal" ADD CONSTRAINT "DPersonal_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DContact" ADD CONSTRAINT "DContact_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
