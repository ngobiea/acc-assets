interface EmploymentFormState {
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

interface FamilyFormState {
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

interface CashAtHandFormState {
  errors: {
    currency?: string[];
    amount?: string[];
    details?: string[];
    jointIncome?: string[];
    _form?: string[];
  };
  data?: {
    cashAtHand: string;
  };
}
interface CashDepositFormState {
  errors: {
    ownerName?: string[];
    relation?: string[];
    registerOwner?: string[];
    accountNo?: string[];
    type?: string[];
    institutionOrBank?: string[];
    location?: string[];
    accountBalance?: string[];
    currency?: string[];
    source?: string[];
    otherSource?: string[];
    otherRelation?: string[];
    _form?: string[];
  };
  data?: {
    cashDeposit: string;
  };
}

interface ImmovableAssetFormState {
  errors: {
    ownerName?: string[];
    relation?: string[];
    otherRelation?: string[];
    registerOwner?: string[];
    assetType?: string[];
    location?: string[];
    plotNo?: string[];
    size?: string[];
    estimatedValue?: string[];
    currency?: string[];
    financeSource?: string[];
    otherFinanceSource?: string[];
    acquisitionMode?: string[];
    acquisitionCost?: string[];
    acquisitionCurrency?: string[];
    acquisitionYear?: string[];
    _form?: string[];
  };
  data?: {
    immovableAsset: string;
  };
}

interface MovableAssetFormState {
  errors: {
    ownerName?: string[];
    relation?: string[];
    otherRelation?: string[];
    registerOwner?: string[];
    assetType?: string[];
    description?: string[];
    registrationNo?: string[];
    location?: string[];
    purpose?: string[];
    estimatedValue?: string[];
    currency?: string[];
    financeSource?: string[];
    otherFinanceSource?: string[];
    acquisitionMode?: string[];
    acquisitionCost?: string[];
    acquisitionCurrency?: string[];
    acquisitionYear?: string[];
    _form?: string[];
  };
  data?: {
    movableAsset: string;
  };
}

interface OtherAssetFormState {
  errors: {
    ownerName?: string[];
    relation?: string[];
    otherRelation?: string[];
    registerOwner?: string[];
    assetType?: string[];
    location?: string[];
    estimatedValue?: string[];
    currency?: string[];
    financeSource?: string[];
    otherFinanceSource?: string[];
    remarks?: string[];
    acquisitionMode?: string[];
    acquisitionCost?: string[];
    acquisitionCurrency?: string[];
    acquisitionYear?: string[];
    _form?: string[];
  };
  data?: {
    otherAsset: string;
  };
}

interface SecurityFormState {
  errors: {
    ownerName?: string[];
    relation?: string[];
    otherRelation?: string[];
    registerOwner?: string[];
    name?: string[];
    type?: string[];
    certificateNo?: string[];
    numberOfShares?: string[];
    company?: string[];
    yearlyInterest?: string[];
    natureOfShares?: string[];
    currentMarketValue?: string[];
    currency?: string[];
    financeSource?: string[];
    otherFinanceSource?: string[];
    acquisitionMode?: string[];
    acquisitionCost?: string[];
    acquisitionCurrency?: string[];
    acquisitionYear?: string[];

    _form?: string[];
  };
  data?: {
    security: string;
  };
}

interface LiabilityFormState {
  errors: {
    currency?: string[];
    creditor?: string[];
    creditorAddress?: string[];
    currencyOutstanding?: string[];
    debtorName?: string[];
    loanAmount?: string[];
    loanOutstanding?: string[];
    loanPurpose?: string[];
    loanRepayment?: string[];
    maturityDate?: string[];
    otherRelation?: string[];
    paymentPeriod?: string[];
    relation?: string[];
    remarks?: string[];
    yearContracted?: string[];
    _form?: string[];
  };
  data?: {
    liability: string;
  };
}

interface DeleteFormState {
  errors: {
    code?: string[];
    _form?: string[];
  };
}
interface VerifyEmailFormState {
  errors: {
    code?: string[];
    _form?: string[];
  };
}

interface ResendFormState {
  errors: {
    message?: string[];
    _form?: string[];
  };
}
interface PreviewFormState {
  errors: {
    isAccepted?: string[];
    _form?: string[];
  };
}
