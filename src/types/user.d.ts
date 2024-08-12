interface UserAttributes {
  id: string;
  title: string;
  idType: string;
  pid: string;
  surname: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  passwordRepeat: string;
  isVerified: boolean;
  dateOfBirth?: Date;
  maritalStatus?: string;
  gender?: string;
  citizenships?: Citizenship[];
  createdAt?: Date;
  updatedAt?: Date;
}


interface CitizenshipAttributes {
  id: string;
  country: string;
  issueDate: Date;
  acquireBy: string;
  userId: string;
  user?: UserAttributes;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserEmploymentAttributes {
  id: string;
  mda: string;
  employeeCategory: string;
  currentPosting?: string;
  designation: string;
  rankOrGrade?: string;
  employeePin?: string;
  establishmentRegNo?: string;
  sourceOfIncome?: string;
  isAdministrative: boolean;
  isFinancial: boolean;
  isPolitical: boolean;
  isProfessional: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactAttributes {
  id: string;
  telephone?: string;
  mobile?: string;
  email: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  passports?: Passport[];
  nationalId?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PassportAttributes {
  id: string;
  passportNumber: string;
  issueDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
}


interface SessionAttributes {
  id: string;
  expires_at: number;
  user_id: string;
}

interface UserProfileStep {
  title: string;
  content: ReactNode;
  icon: ReactNode;
}

interface UserProfileState {
  steps: UserProfileStep[];
  isLastProfileStep: boolean;
  isFirstProfileStep: boolean;
  activeProfileStep: number;
}

type UserProfileAction =
  | {
      type: 'setIsLastProfileStep';
      payload: boolean;
    }
  | {
      type: 'setIsFirstProfileStep';
      payload: boolean;
    }
  | {
      type: 'setActiveProfileStep';
      payload: number;
    };
