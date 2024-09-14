import { nationalIdSetupSchema } from '../validators/setup';

export const validateNationalIdSetup = ({
  nationalId,
  nationalIdIssueDate,
  nationalIdExpiryDate,
  nationalIdCountry,
}: {
  nationalId: string;
  nationalIdIssueDate: string;
  nationalIdExpiryDate: string;
  nationalIdCountry: string;
}) => {
  return nationalIdSetupSchema.safeParse({
    nationalId,
    nationalIdIssueDate,
    nationalIdExpiryDate,
    nationalIdCountry,
  });
};
