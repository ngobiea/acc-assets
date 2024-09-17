import type { MDA,DContact,DPersonal } from '@prisma/client';
import { Prisma } from '@prisma/client';
export interface DeclarationData {
  id: string;
  reason: string;
  status: string;
  place: string | null;
  userId: string;
  cashAtHand: CashAtHandData | null;
  cashDeposits: CashDepositData[];
  employments: EmploymentData[];
  families: FamilyData[];
  immovableAssets: ImmovableAssetData[];
  movableAssets: MovableAssetData[];
  pastEmployments: PastEmploymentData[];
  otherAssets: OtherAssetData[];
  securities: SecurityData[];
  liabilities: LiabilitiesData[];
  personal: DPersonal | null;
  contact: DContact | null;
  // createdAt?: Date;
  // updatedAt?: Date;
}
export interface CashAtHandData {
  id: string;
  currency: string;
  amount: Prisma.Decimal;
  details: string;
  jointIncome: string | null;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CashDepositData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  accountNo: string;
  type: string;
  institutionOrBank: string;
  location: string;
  accountBalance: Prisma.Decimal;
  currency: string;
  source: string;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface EmploymentData {
  id: string;
  status: string;
  mdaId: string;
  mda: MDA;
  employeeCategory: string;
  posting: string | null;
  designation: string;
  rank: string;
  annualSalary: Prisma.Decimal;
  currency: string;
  allowances: Prisma.Decimal | null;
  allowancesCurrency: string | null;
  allowancesDescription: string | null;
  SSNo: string | null;
  employeeId: string;
  employeePin: string | null;
  establishmentRegNo: string | null;
  contractType: string;
  contractStartDate: Date;
  contractEndDate: Date;
  sourceOfIncome: string | null;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FamilyData {
  id: string;
  surname: string;
  firstName: string;
  middleName: string | null;
  relation: string;
  address: string;
  dateOfBirth: Date;
  gender: string;
  nationality: string | null;
  phoneNumber: string | null;
  email: string | null;
  mobile: string | null;
  businessName: string | null;
  employeeNo: string | null;
  category: string | null;
  institution: string;
  SSNo: string | null;
  pinCode: string | null;
  designation: string;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ImmovableAssetData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  location: string;
  plotNo: string | null;
  size: string | null;
  estimatedValue: Prisma.Decimal;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: Prisma.Decimal;
  acquisitionCurrency: string;
  acquisitionYear: number;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface MovableAssetData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  description: string | null;
  registrationNo: string;
  location: string | null;
  purpose: string;
  estimatedValue: Prisma.Decimal;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: Prisma.Decimal;
  acquisitionCurrency: string;
  acquisitionYear: number;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface LiabilitiesData {
  id: string;
  debtorName: string;
  relation: string;
  creditor: string;
  creditorAddress: string | null;
  loanAmount: Prisma.Decimal;
  currency: string;
  yearContracted: number | null;
  loanPurpose: string;
  loanRepayment: string;
  paymentPeriod: number;
  loanOutstanding: Prisma.Decimal;
  currencyOutstanding: string;
  maturityDate: Date | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface PastEmploymentData {
  id: string;
  employerName: string | null;
  designation: string;
  rank: string;
  contractStartDate: Date;
  contractEndDate: Date;
  annualSalary: Prisma.Decimal;
  currency: string;
  allowances: Prisma.Decimal | null;
  allowancesCurrency: string | null;
  allowancesDescription: string | null;
  sourceOfIncome: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface OtherAssetData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  location: string | null;
  estimatedValue: Prisma.Decimal;
  currency: string;
  financeSource: string;
  remarks: string | null;
  acquisitionMode: string;
  acquisitionCost: Prisma.Decimal;
  acquisitionCurrency: string;
  acquisitionYear: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface SecurityData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  name: string | null;
  type: string;
  certificateNo: string;
  numberOfShares: string | null;
  company: string;
  yearlyInterest: Prisma.Decimal | null;
  natureOfShares: string | null;
  currentMarketValue: Prisma.Decimal;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: Prisma.Decimal;
  acquisitionCurrency: string;
  acquisitionYear: number;
  createdAt: Date;
  updatedAt: Date;
}

