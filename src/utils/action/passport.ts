import { passportSetupSchema } from '../validators/setup';

export const validatePassportSetup = ({
  passportNumber,
  passportIssueDate,
  passportExpiryDate,
  passportCountry,
}: {
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportCountry: string;
}) => {
  return passportSetupSchema.safeParse({
    passportNumber,
    passportIssueDate,
    passportExpiryDate,
    passportCountry,
  });
};
