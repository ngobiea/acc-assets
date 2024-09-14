import { contactClientSetupSchema } from '../validators/setup';
export const getContactClientSetupData = (
  formData: FormData
): ContactClientSetupForm => {
  return {
    isNationalIdExist: formData.get('isNationalIdExist') as string,
    isPassportExist: formData.get('isPassportExist') as string,
    isSameAsPermanent: formData.get('isSameAsPermanent') as string,
    mobile: formData.get('mobile') as string,
    nationalId: formData.get('nationalId') as string,
    nationalIdCountry: formData.get('nationalIdCountry') as string,
    nationalIdExpiryDate: formData.get('nationalIdExpiryDate') as string,
    nationalIdIssueDate: formData.get('nationalIdIssueDate') as string,
    passportCountry: formData.get('passportCountry') as string,
    passportExpiryDate: formData.get('passportExpiryDate') as string,
    passportIssueDate: formData.get('passportIssueDate') as string,
    passportNumber: formData.get('passportNumber') as string,
    permanentAddress: formData.get('permanentAddress') as string,
    permanentDistrict: formData.get('permanentDistrict') as string,
    presentAddress: formData.get('presentAddress') as string,
    presentDistrict: formData.get('presentDistrict') as string,
    telephone: formData.get('telephone') as string,
    termsAndConditions: formData.get('termsAndConditions') as string,
  };
};

export const validateContactSetup = ({
  isNationalIdExist,
  isPassportExist,
  isSameAsPermanent,
  mobile,
  permanentAddress,
  permanentDistrict,
  presentAddress,
  presentDistrict,
  telephone,
  termsAndConditions,
}: ContactServerSetupForm) => {
  return contactClientSetupSchema.safeParse({
    telephone,
    mobile,
    permanentAddress: permanentAddress,
    permanentDistrict: permanentDistrict,
    presentAddress: presentAddress,
    presentDistrict: presentDistrict,
    isSameAsPermanent: isSameAsPermanent === 'true',
    termsAndConditions: termsAndConditions === 'true',
    isPassportExist,
    isNationalIdExist,
  });
};
