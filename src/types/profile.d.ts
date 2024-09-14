interface UserEmploymentWithMDS {
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
  mda: {
    id: string;
    abbreviation: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface UserPersonalCitizenship {
  id: string;
  email: string;
  personal: PersonalSetupAttributes | null;
  citizenships: CitizenshipSetupAttributes[];
}

interface UserContactPassportNationalCard {
  id: string;
  email: string;
  contact: ContactSetupAttributes | null;
  passports: PassportSetupAttributes[];
  nationalCards: NationalCardSetupAttributes[];
}
