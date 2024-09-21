interface DeclarationClientForm {
  reason: string;
  place: string;
  otherReason: string;
  isUseLastDeclaration: string;
}
interface DeclarationForm {
  reason: string;
  place: string;
  userId: string;
}

interface EmploymentClientForm {
  mdaId: string;
  employeeCategory: string;
  posting: string;
  designation: string;
  rank: string;
  annualSalary: string;
  currency: string;
  allowances: string;
  allowancesCurrency: string;
  allowancesDescription: string;
  SSNo: string;
  employeeId: string;
  employeeNo: string;
  establishmentRegNo: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  sourceOfIncome: string;
  declarationId: string;
  otherSourceOfIncome: string;
}
interface EmploymentForm {
  mdaId: string;
  employeeCategory: string;
  posting: string;
  designation: string;
  rank: string;
  annualSalary: string;
  currency: string;
  allowance: string;
  allowancesCurrency: string;
  allowancesDescription: string;
  SSNo: string;
  employeeId: string;
  employeeNo: string;
  establishmentRegNo: string;
  contractType: string;
  contractStartDate: Date;
  contractEndDate: Date;
  sourceOfIncome: string;
  declarationId: string;
  otherSourceOfIncome: string;
  id: string;
}

interface PastEmploymentClientForm {
  employerName: string;
  designation: string;
  rank: string;
  contractStartDate: string;
  contractEndDate: string;
  annualSalary: string;
  currency: string;
  allowances: string;
  allowancesCurrency: string;
  allowancesDescription: string;
  sourceOfIncome: string;
  otherSourceOfIncome: string;
}

interface FamilyClientForm {
  surname: string;
  firstName: string;
  middleName: string;
  relation: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  mobile: string;
  businessName: string;
  employeeNo: string;
  category: string;
  institution: string;
  SSNo: string;
  pinCode: string;
  designation: string;
  otherRelation: string;
  isFamilyEmployment: string;
}

interface cashDepositClientForm {
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
  otherRelation: string;
  otherSource: string;
}

interface CashAtHandClientForm {
  currency: string;
  amount: number;
  details: string;
  jointIncome: string;
  isCashAtHand: string;
  
}

interface ImmovableAssetClientForm {
  ownerName: string;
  relation: string;
  otherRelation: string;
  registerOwner: string;
  assetType: string;
  location: string;
  plotNo: string;
  size: string;
  estimatedValue: string;
  currency: string;
  financeSource: string;
  otherFinanceSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
  acquisitionCurrency: string;
  acquisitionYear: string;
}
interface MovableAssetClientForm {
  ownerName: string;
  relation: string;
  otherRelation: string;
  registerOwner: string;
  assetType: string;
  description: string;
  registrationNo: string;
  location: string;
  purpose: string;
  estimatedValue: number;
  currency: string;
  financeSource: string;
  otherFinanceSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
  acquisitionCurrency: string;
  acquisitionYear: string;
}

interface OtherAssetClientForm {
  ownerName: string;
  relation: string;
  otherRelation: string;
  registerOwner: string;
  assetType: string;
  location: string;
  estimatedValue: string;
  currency: string;
  financeSource: string;
  otherFinanceSource: string;
  remarks: string;
  acquisitionMode: string;
  acquisitionCost: string;
  acquisitionCurrency: string;
  acquisitionYear: string;
}

interface SecurityClientForm {
  ownerName: string;
  relation: string;
  otherRelation: string;
  registerOwner: string;
  name: string;
  type: string;
  certificateNo: string;
  numberOfShares: string;
  company: string;
  yearlyInterest: string;
  natureOfShares: string;
  currentMarketValue: string;
  currency: string;
  financeSource: string;
  otherFinanceSource: string;
  acquisitionMode: string;
  acquisitionCost: string;
  acquisitionCurrency: string;
  acquisitionYear: string;
}

interface LiabilityClientForm {
  debtorName: string;
  relation: string;
  otherRelation: string;
  creditor: string;
  creditorAddress: string;
  loanAmount: string;
  currency: string;
  yearContracted: string;
  loanPurpose: string;
  loanRepayment: string;
  paymentPeriod: string;
  loanOutstanding: string;
  currencyOutstanding: string;
  maturityDate: string;
  remarks: string;
}

