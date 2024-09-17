-- CreateTable
CREATE TABLE "DPersonal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "idType" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "aliases" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "acquireBy" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DContact" (
    "id" TEXT NOT NULL,
    "telephone" TEXT,
    "mobile" TEXT,
    "permanentAddress" TEXT NOT NULL,
    "permanentDistrict" TEXT NOT NULL,
    "presentAddress" TEXT,
    "presentDistrict" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DPersonal_id_key" ON "DPersonal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DPersonal_declarationId_key" ON "DPersonal"("declarationId");

-- CreateIndex
CREATE UNIQUE INDEX "DContact_id_key" ON "DContact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DContact_declarationId_key" ON "DContact"("declarationId");

-- AddForeignKey
ALTER TABLE "DPersonal" ADD CONSTRAINT "DPersonal_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DContact" ADD CONSTRAINT "DContact_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
