interface UserForm {
  email: string;
  password: string | null;
}
interface PersonalForm {
  title: string;
  idType: string;
  pid: string;
  surname: string;
  firstName: string;
  middleName: string;
  aliases: string;
  dateOfBirth: Date;
  maritalStatus: string;
  gender: string;
  userId: string;
  acquireBy: string;
  country: string;
}
interface DPersonalForm {
  title: string;
  idType: string;
  pid: string;
  surname: string;
  firstName: string;
  middleName: string ;
  aliases: string;
  dateOfBirth: Date;
  maritalStatus: string;
  gender: string;
  declarationId: string;
  acquireBy: string;
  country: string;
}

interface PersonalClientForm {
  title: string;
  idType: string;
  pid: string;
  surname: string;
  firstName: string;
  middleName: string;
  aliases: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  userId: string;
  country: string;
  acquireBy: string;
  image: string;
}
interface CitizenshipForm {
  country: string;
  acquireBy: string;
  userId: string;
}
interface UserEmploymentClientForm {
  mdaId: string;
  employeeCategory: string;
  currentPosting: string;
  designation: string;
  rankOrGrade: string;
  employeePin: string;
  establishmentRegNo: string;
  sourceOfIncome: string;
  isAdministrative: string;
  isFinancial: string;
  isPolitical: string;
  isProfessional: string;
  otherSourceOfIncome: string;
  userId: string;
}
interface UserEmploymentForm {
  mdaId: string;
  employeeCategory: string;
  currentPosting: string;
  designation: string;
  rankOrGrade: string;
  employeePin: string;
  establishmentRegNo: string;
  sourceOfIncome: string;
  isAdministrative: boolean;
  isFinancial: boolean;
  isPolitical: boolean;
  isProfessional: boolean;
  otherSourceOfIncome: string;
  userId: string;
}

interface DContactForm {
  telephone: string;
  mobile: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  declarationId: string;
}

interface ContactForm {
  telephone?: string;
  mobile?: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  userId: string;
}
interface ContactFormClient {
  telephone: string;
  mobile: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  isSameAsPermanent: boolean;
  termsAndConditions: string;
}
interface ContactClientSetupForm {
  telephone: string;
  mobile: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  isSameAsPermanent: string;
  termsAndConditions: string;
  passportNumber: string;
  isPassportExist: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportCountry: string;
  nationalId: string;
  isNationalIdExist: string;
  nationalIdIssueDate: string;
  nationalIdExpiryDate: string;
  nationalIdCountry: string;
}
interface ContactServerSetupForm {
  telephone: string;
  mobile: string;
  permanentAddress: string;
  permanentDistrict: string;
  presentAddress: string;
  presentDistrict: string;
  isSameAsPermanent: string;
  termsAndConditions: string;
  isPassportExist: string;
  isNationalIdExist: string;
}
interface PassportForm {
  passportNumber: string;
  issueDate: Date;
  expiryDate: Date;
  country: string;
  userId: string;
}
interface PassportFormClient {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  country: string;
  userId: string;
}
interface NationalCardForm {
  nationalId: string;
  issueDate: Date;
  expiryDate: Date;
  country: string;
  userId: string;
}
interface NationalCardFormClient {
  nationalId: string;
  issueDate: string;
  expiryDate: string;
  country: string;
  userId: string;
}
interface SessionForm {
  id: string;
  expires_at: number;
  user_id: string;
}
