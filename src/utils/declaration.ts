import type { MDA, DContact, DPersonal } from '@prisma/client';
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
  amount: string;
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
  accountBalance: string;
  currency: string;
  source: string;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface EmploymentData {
  id: string;
  mdaId: string;
  mda: MDA;
  employeeCategory: string;
  posting: string | null;
  designation: string;
  rank: string;
  annualSalary: string;
  currency: string;
  allowances: string | null;
  allowancesCurrency: string | null;
  allowancesDescription: string | null;
  SSNo: string | null;
  employeeId: string;
  employeeNo: string | null;
  establishmentRegNo: string | null;
  contractType: string;
  contractStartDate: Date;
  contractEndDate: Date | null;
  sourceOfIncome: string | null;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface EmploymentFormState {
  errors: {
    mdaId?: string[];
    employeeCategory?: string[];
    posting?: string[];
    designation?: string[];
    rank?: string[];
    annualSalary?: string[];
    currency?: string[];
    allowances?: string[];
    allowancesCurrency?: string[];
    allowancesDescription?: string[];
    SSNo?: string[];
    employeeId?: string[];
    employeeNo?: string[];
    establishmentRegNo?: string[];
    contractType?: string[];
    contractStartDate?: string[];
    contractEndDate?: string[];
    sourceOfIncome?: string[];
    otherSourceOfIncome?: string[];
    _form?: string[];
  };
  data?: {
    employment: string;
  };
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
  institution: string | null;
  SSNo: string | null;
  pinCode: string | null;
  designation: string | null;
  declarationId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FamilyFormState {
  errors: {
    surname?: string[];
    firstName?: string[];
    middleName?: string[];
    relation?: string[];
    address?: string[];
    dateOfBirth?: string[];
    gender?: string[];
    nationality?: string[];
    phoneNumber?: string[];
    email?: string[];
    mobile?: string[];
    businessName?: string[];
    employeeNo?: string[];
    category?: string[];
    institution?: string[];
    SSNo?: string[];
    pinCode?: string[];
    designation?: string[];
    otherRelation?: string[];
    _form?: string[];
  };
  data?: {
    family: string;
  };
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
  estimatedValue: string;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
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
  estimatedValue: string;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
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
  loanAmount: string;
  currency: string;
  yearContracted: number | null;
  loanPurpose: string;
  loanRepayment: string;
  paymentPeriod: number;
  loanOutstanding: string;
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
  annualSalary: string;
  currency: string;
  allowances: string | null;
  allowancesCurrency: string | null;
  allowancesDescription: string | null;
  sourceOfIncome: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface PastEmploymentFormState {
  errors: {
    employerName?: string[];
    designation?: string[];
    rank?: string[];
    contractStartDate?: string[];
    contractEndDate?: string[];
    annualSalary?: string[];
    currency?: string[];
    allowances?: string[];
    allowancesCurrency?: string[];
    allowancesDescription?: string[];
    sourceOfIncome?: string[];
    otherSourceOfIncome?: string[];
    _form?: string[];
  };
  data?: {
    employment: string;
  };
}
export interface OtherAssetData {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  location: string | null;
  estimatedValue: string;
  currency: string;
  financeSource: string;
  remarks: string | null;
  acquisitionMode: string;
  acquisitionCost: string;
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
  yearlyInterest: string | null;
  natureOfShares: string | null;
  currentMarketValue: string;
  currency: string;
  financeSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
  acquisitionCurrency: string;
  acquisitionYear: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactDFormState {
  errors: {
    telephone?: string[];
    mobile?: string[];
    permanentAddress?: string[];
    permanentDistrict?: string[];
    presentAddress?: string[];
    presentDistrict?: string[];
    passport?: string[];
    isSameAsPermanent?: string[];

    _form?: string[];
  };
  data?: {
    contact: string;
  };
}
