-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personal" (
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
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MDA" (
    "id" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MDA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmployment" (
    "id" TEXT NOT NULL,
    "mdaId" TEXT NOT NULL,
    "employeeCategory" TEXT NOT NULL,
    "currentPosting" TEXT,
    "designation" TEXT NOT NULL,
    "rankOrGrade" TEXT,
    "employeePin" TEXT,
    "establishmentRegNo" TEXT,
    "sourceOfIncome" TEXT,
    "isAdministrative" BOOLEAN NOT NULL,
    "isFinancial" BOOLEAN NOT NULL,
    "isPolitical" BOOLEAN NOT NULL,
    "isProfessional" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEmployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passport" (
    "id" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NationalCard" (
    "id" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NationalCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "telephone" TEXT,
    "mobile" TEXT,
    "permanentAddress" TEXT NOT NULL,
    "permanentDistrict" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "presentDistrict" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Citizenship" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "acquireBy" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Citizenship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Declaration" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Declaration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mda" TEXT NOT NULL,
    "employeeCategory" TEXT NOT NULL,
    "posting" TEXT,
    "title" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "annualSalary" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "allowance" DECIMAL(15,2),
    "allowancesCurrency" TEXT,
    "allowancesDescription" TEXT,
    "SSNo" TEXT,
    "employeeId" TEXT NOT NULL,
    "employeePin" TEXT,
    "establishmentRegNo" TEXT,
    "contractType" TEXT NOT NULL,
    "contractStartDate" TIMESTAMP(3) NOT NULL,
    "contractEndDate" TIMESTAMP(3) NOT NULL,
    "sourceOfIncome" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "relation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "businessName" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyEmployment" (
    "id" TEXT NOT NULL,
    "employeeNo" TEXT,
    "employeeCategory" TEXT,
    "category" TEXT,
    "institution" TEXT NOT NULL,
    "SSNo" TEXT,
    "pinCode" TEXT,
    "designation" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FamilyEmployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashAtHand" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "details" TEXT NOT NULL,
    "jointIncome" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashAtHand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashDeposit" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "registerOwner" TEXT NOT NULL,
    "AccountNo" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "institutionOrBank" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "accountBalance" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acquisition" (
    "id" TEXT NOT NULL,
    "modeOfAcquisition" TEXT NOT NULL,
    "cost" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "yearOfAcquisition" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acquisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImmovableAsset" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "registerOwner" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "PlotNo" TEXT,
    "size" TEXT,
    "estimatedValue" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "financeSource" TEXT NOT NULL,
    "acquisitionId" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImmovableAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovableAsset" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "registerOwner" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "description" TEXT,
    "registrationNo" TEXT NOT NULL,
    "location" TEXT,
    "purpose" TEXT NOT NULL,
    "estimatedValue" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "financeSource" TEXT NOT NULL,
    "acquisitionId" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovableAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liability" (
    "id" TEXT NOT NULL,
    "debtorName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "creditor" TEXT NOT NULL,
    "creditorAddress" TEXT,
    "loanAmount" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "yearContracted" INTEGER,
    "loanPurpose" TEXT NOT NULL,
    "loanRepayment" TEXT NOT NULL,
    "paymentPeriod" DECIMAL(15,2) NOT NULL,
    "loanOutstanding" DECIMAL(15,2) NOT NULL,
    "currencyOutstanding" TEXT NOT NULL,
    "maturityDate" TIMESTAMP(3),
    "remarks" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherAsset" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "registerOwner" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "location" TEXT,
    "estimatedValue" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "financeSource" TEXT NOT NULL,
    "remarks" TEXT,
    "acquisitionId" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtherAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastEmployment" (
    "id" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "employerName" TEXT NOT NULL,
    "titleOrDesignation" TEXT NOT NULL,
    "rankOrGrade" TEXT,
    "contractStartDate" TIMESTAMP(3) NOT NULL,
    "contractEndDate" TIMESTAMP(3) NOT NULL,
    "annualSalary" DECIMAL(15,2) NOT NULL,
    "salaryCurrency" TEXT NOT NULL,
    "allowances" DECIMAL(15,2),
    "allowancesCurrency" TEXT,
    "allowancesDescription" TEXT,
    "sourceOfIncome" TEXT,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastEmployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Security" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "registerOwner" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT NOT NULL,
    "certificateNo" TEXT NOT NULL,
    "numberOfShares" TEXT,
    "company" TEXT NOT NULL,
    "yearlyInterest" DECIMAL(15,2),
    "natureOfShares" TEXT,
    "currentMarketValue" DECIMAL(15,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "financeSource" TEXT NOT NULL,
    "acquisitionId" TEXT NOT NULL,
    "declarationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Security_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_id_key" ON "Personal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userId_key" ON "Personal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MDA_id_key" ON "MDA"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MDA_abbreviation_name_key" ON "MDA"("abbreviation", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmployment_id_key" ON "UserEmployment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmployment_userId_key" ON "UserEmployment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Passport_id_key" ON "Passport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Passport_country_key" ON "Passport"("country");

-- CreateIndex
CREATE UNIQUE INDEX "NationalCard_id_key" ON "NationalCard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NationalCard_country_key" ON "NationalCard"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Citizenship_id_key" ON "Citizenship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Citizenship_country_key" ON "Citizenship"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Declaration_id_key" ON "Declaration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employment_id_key" ON "Employment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Family_id_key" ON "Family"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyEmployment_id_key" ON "FamilyEmployment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyEmployment_familyId_key" ON "FamilyEmployment"("familyId");

-- CreateIndex
CREATE UNIQUE INDEX "CashAtHand_id_key" ON "CashAtHand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CashDeposit_id_key" ON "CashDeposit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Acquisition_id_key" ON "Acquisition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImmovableAsset_id_key" ON "ImmovableAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImmovableAsset_acquisitionId_key" ON "ImmovableAsset"("acquisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "MovableAsset_id_key" ON "MovableAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MovableAsset_acquisitionId_key" ON "MovableAsset"("acquisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "Liability_id_key" ON "Liability"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OtherAsset_id_key" ON "OtherAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OtherAsset_acquisitionId_key" ON "OtherAsset"("acquisitionId");

-- CreateIndex
CREATE UNIQUE INDEX "PastEmployment_id_key" ON "PastEmployment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Security_id_key" ON "Security"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Security_acquisitionId_key" ON "Security"("acquisitionId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmployment" ADD CONSTRAINT "UserEmployment_mdaId_fkey" FOREIGN KEY ("mdaId") REFERENCES "MDA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmployment" ADD CONSTRAINT "UserEmployment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passport" ADD CONSTRAINT "Passport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NationalCard" ADD CONSTRAINT "NationalCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citizenship" ADD CONSTRAINT "Citizenship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Declaration" ADD CONSTRAINT "Declaration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyEmployment" ADD CONSTRAINT "FamilyEmployment_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAtHand" ADD CONSTRAINT "CashAtHand_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashDeposit" ADD CONSTRAINT "CashDeposit_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImmovableAsset" ADD CONSTRAINT "ImmovableAsset_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Acquisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImmovableAsset" ADD CONSTRAINT "ImmovableAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovableAsset" ADD CONSTRAINT "MovableAsset_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Acquisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovableAsset" ADD CONSTRAINT "MovableAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherAsset" ADD CONSTRAINT "OtherAsset_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Acquisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherAsset" ADD CONSTRAINT "OtherAsset_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEmployment" ADD CONSTRAINT "PastEmployment_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_acquisitionId_fkey" FOREIGN KEY ("acquisitionId") REFERENCES "Acquisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_declarationId_fkey" FOREIGN KEY ("declarationId") REFERENCES "Declaration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
