interface DeclarationAttributes {
  id: string;
  reasons: string;
  year: string;
  date: Date;
  affidavitPlace: string;
  userId: string;
  user?: UserAttributes;
  Employment?: EmploymentAttributes[];
  PastEmployment?: PastEmploymentAttributes[];
  Family?: FamilyAttributes[];
  CashDeposit?: CashDeposit[];
  CashAtHand?: CashAtHand;
  ImmovableAsset?: ImmovableAssetAttributes[];
  MovableAsset?: MovableAssetAttributes[];
  OtherAsset?: OtherAssetAttributes[];
  Security?: SecurityAttributes[];
  Liabilities?: LiabilitiesAttributes[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmploymentAttributes {
  id: string;
  status: 'current' | 'last';
  mda: string;
  employeeCategory: string;
  posting: string;
  title: string;
  rank: string;
  annualSalary: number;
  currency: string;
  allowance?: number;
  allowancesCurrency?: string;
  allowancesDescription?: string;
  SSNo?: string;
  employeeId: string;
  employeePin?: string;
  establishmentRegNo?: string;
  contractType: string;
  contractStartDate: Date;
  contractEndDate: Date;
  sourceOfIncome?: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PastEmploymentAttributes {
  id: string;
  isPrivate: boolean;
  employerName: string;
  titleOrDesignation: string;
  rankOrGrade?: string;
  contractStartDate: Date;
  contractEndDate: Date;
  annualSalary: number;
  salaryCurrency: string;
  allowances?: number;
  allowancesCurrency?: string;
  allowancesDescription?: string;
  sourceOfIncome?: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FamilyAttributes {
  id: string;
  surname: string;
  firstName: string;
  middleName?: string;
  relation: string;
  address: string;
  dateOfBirth: Date;
  gender: string;
  nationality?: string;
  phoneNumber?: string;
  email?: string;
  mobile?: string;
  businessName?: string;
  employment: FamilyEmploymentAttributes;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FamilyEmploymentAttributes {
  id: string;
  employeeNo?: string;
  category?: string;
  institution: string;
  SSNo?: string;
  pinCode?: string;
  designation: string;
  familyId: string;
  family?: FamilyAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CashDepositAttributes {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  AccountNo: string;
  type: string;
  institutionOrBank: string;
  location: string;
  accountBalance: number;
  currency: string;
  source: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CashAtHandAttributes {
  id: string;
  currency: string;
  amount: number;
  details: string;
  jointIncome?: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ImmovableAssetAttributes {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  location: string;
  PlotNo?: string;
  size?: string;
  estimatedValue: number;
  currency: string;
  financeSource: string;
  acquisition?: AcquisitionAttributes;
  acquisitionId: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface MovableAssetAttributes {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  description?: string;
  registrationNo: string;
  location?: string;
  purpose: string;
  estimatedValue: number;
  currency: string;
  financeSource: string;
  acquisition?: AcquisitionAttributes;
  acquisitionId: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface OtherAssetAttributes {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  assetType: string;
  location?: string;
  estimatedValue: number;
  currency: string;
  financeSource: string;
  remarks?: string;
  acquisition?: AcquisitionAttributes;
  acquisitionId: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface SecurityAttributes {
  id: string;
  ownerName: string;
  relation: string;
  registerOwner: string;
  name?: string;
  type: string;
  certificateNo: string;
  numberOfShares?: number;
  company: string;
  yearlyInterest?: number;
  natureOfShares?: string;
  currentMarketValue: number;
  currency: string;
  financeSource: string;
  acquisition?: AcquisitionAttributes;
  acquisitionId: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface LiabilitiesAttributes {
  id: string;
  debtorName: string;
  relation: string;
  creditor: string;
  creditorAddress?: string;
  loanAmount: number;
  currency: string;
  yearContracted?: number;
  loanPurpose: string;
  loanRepayment: string;
  paymentPeriod: number;
  loanOutstanding: number;
  currencyOutstanding: string;
  maturityDate?: Date;
  remarks: string;
  declarationId: string;
  declaration?: DeclarationAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}
interface AcquisitionAttributes {
  id: string;
  modeOfAcquisition: string;
  cost: number;
  currency: string;
  yearOfAcquisition: number;
}
