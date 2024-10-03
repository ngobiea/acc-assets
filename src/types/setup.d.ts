interface PersonalFormState {
  errors: {
    idType?: string[];
    pid?: string[];
    title?: string[];
    surname?: string[];
    firstName?: string[];
    middleName?: string[];
    aliases?: string[];
    dateOfBirth?: string[];
    maritalStatus?: string[];
    gender?: string[];
    country?: string[];
    acquireBy?: string[];
    image?: string[];
    _form?: string[];
  };
  data?: {
    personalId: string;
  };
}

interface NationalityFormState {
  errors: {
    country?: string[];
    acquireBy?: string[];
    _form?: string[];
  };
  data?: {
    citizenship: CitizenshipAttributes;
  };
}

interface UserEmploymentFormState {
  errors: {
    mdaId?: string[];
    employeeCategory?: string[];
    currentPosting?: string[];
    designation?: string[];
    rankOrGrade?: string[];
    employeePin?: string[];
    establishmentRegNo?: string[];
    sourceOfIncome?: string[];
    isAdministrative?: string[];
    isFinancial?: string[];
    isPolitical?: string[];
    isProfessional?: string[];
    _form?: string[];
  };
  data?: {
    userEmployment: UserEmploymentAttributes;
  };
}

interface ContactSetupFormState {
  errors: {
    telephone?: string[];
    mobile?: string[];
    permanentAddress?: string[];
    permanentDistrict?: string[];
    presentAddress?: string[];
    presentDistrict?: string[];
    passport?: string[];
    nationalId?: string[];
    isSameAsPermanent?: string[];
    termsAndConditions?: string[];
    isPassportExist?: string[];
    passportNumber?: string[];
    passportIssueDate?: string[];
    passportExpiryDate?: string[];
    passportCountry?: string[];
    isNationalIdExist?: string[];
    nationalId?: string[];
    nationalIdIssueDate?: string[];
    nationalIdExpiryDate?: string[];
    nationalIdCountry?: string[];
    _form?: string[];
  };
  data?: {
    contact: ContactAttribute;
  };
}

interface PassportFormState {
  errors: {
    passportNumber?: string[];
    issueDate?: string[];
    expiryDate?: string[];
    country?: string[];
    _form?: string[];
  };
  data?: {
    passport: PassportAttributes;
  };
}

interface NationalCardFormState {
  errors: {
    nationalId?: string[];
    issueDate?: string[];
    expiryDate?: string[];
    country?: string[];
    _form?: string[];
  };
  data?: {
    nationalCard: NationalCardAttributes;
  };
}

interface UserSetupAttributes {
  id: string;
  email: string;
  personal: PersonalSetupAttributes | null;
  userEmployment: UserEmploymentSetupAttributes | null;
  contact: ContactSetupAttributes | null;
  citizenships: CitizenshipSetupAttributes[];
  passports: PassportSetupAttributes[];
  nationalCards: NationalCardSetupAttributes[];
}

interface PersonalSetupAttributes {
  id: string;
  title: string;
  idType: string;
  pid: string;
  surname: string;
  firstName: string;
  middleName: string | null;
  aliases: string | null;
  dateOfBirth: Date;
  maritalStatus: string;
  gender: string;
  userId: string;
  acquireBy: string;
  country: string;
}
interface CitizenshipSetupAttributes {
  id: string;
  country: string;
  acquireBy: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserEmploymentSetupAttributes {
  id: string;
  mdaId: string;
  mda: MDASetupAttributes;
  employeeCategory: string;
  currentPosting: string | null;
  designation: string;
  rankOrGrade: string | null;
  employeePin: string | null;
  establishmentRegNo: string | null;
  sourceOfIncome: string | null;
  isAdministrative: boolean;
  isFinancial: boolean;
  isPolitical: boolean;
  isProfessional: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactSetupAttributes {
  id: string;
  telephone: string | null;
  mobile: string | null;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string | null;
  presentDistrict: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface ContactSetupForm{
  
}

interface PassportSetupAttributes {
  id: string;
  passportNumber: string;
  issueDate: Date;
  expiryDate: Date;
  country: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NationalCardSetupAttributes {
  id: string;
  nationalId: string;
  issueDate: Date;
  expiryDate: Date;
  country: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MDASetupAttributes {
  id: string;
  abbreviation: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
