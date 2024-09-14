import { z } from 'zod';

export const declarationSchema = z
  .object({
    reason: z.string().trim().min(1, 'Reason is required'),
    place: z.optional(z.string()),
    otherReason: z.optional(z.string().trim()),
  })
  .refine(
    (data) => {
      if (data.reason === 'Other') {
        return !!data.otherReason;
      }
      return true;
    },
    {
      message: 'Please provide a reason',
      path: ['otherReason'],
    }
  );

export const currentLastEmploymentSchema = z
  .object({
    mdaId: z.string().trim().min(1, 'MDA is required'),
    employeeCategory: z.string().trim().min(1, 'Employee category is required'),
    posting: z.string().trim().min(1, 'Posting is required'),
    designation: z.string().trim().min(1, 'Designation is required'),
    rank: z.string().trim().min(1, 'Rank is required'),
    annualSalary: z
      .string()
      .trim()
      .min(1, 'Annual salary is required')
      .refine(
        (value) => {
          const num = Number(value);
          return !isNaN(num) && num >= 0;
        },
        { message: 'Annual salary must be a positive number' }
      ),
    currency: z.string().trim().min(1, 'Currency is required'),
    allowance: z.optional(
      z
        .string()
        .trim()
        .refine(
          (value) => {
            const num = Number(value);
            return !isNaN(num) && num >= 0;
          },
          { message: 'Allowance must be a positive number' }
        )
    ),

    allowanceCurrency: z.optional(z.string().trim()),
    allowanceDescription: z.optional(z.string().trim()),
    SSNo: z.optional(z.string().trim()),
    employeeId: z.string().trim().min(1, 'Employee ID is required'),
    employeePin: z.optional(z.string().trim()),
    establishmentRegNo: z.optional(z.string().trim()),
    contractType: z.string().trim().min(1, 'Contract type is required'),
    otherContractType: z.optional(z.string().trim()),
    contractStartDate: z.string().date('Contract start date is required'),
    contractEndDate: z.optional(z.string()),
    sourceOfIncome: z.optional(z.string().trim()),
    otherSourceOfIncome: z.optional(z.string().trim()),
  })
  .refine(
    (data) => {
      if (data.sourceOfIncome === 'Other') {
        return !!data.sourceOfIncome;
      }
      return true;
    },
    {
      message: 'Please provide a source of income',
      path: ['otherSourceOfIncome'],
    }
  );

export const pastEmploymentSchema = z
  .object({
    employerName: z.string().trim().min(1, 'Employer name is required'),
    designation: z.string().trim().min(1, 'Designation is required'),
    rank: z.string().trim().min(1, 'Rank is required'),
    contractStartDate: z.string().date('Contract start date is required'),
    contractEndDate: z.string().date('Contract end date is required'),
    annualSalary: z
      .string()
      .trim()
      .min(1, 'Annual salary is required')
      .refine(
        (value) => {
          const num = Number(value);
          return !isNaN(num) && num >= 0;
        },
        { message: 'Annual salary must be a positive number' }
      ),
    currency: z.string().trim().min(1, 'Currency is required'),
    allowances: z.optional(
      z
        .string()
        .trim()
        .refine(
          (value) => {
            const num = Number(value);
            return !isNaN(num) && num >= 0;
          },
          { message: 'Allowance must be a positive number' }
        )
    ),
    allowancesCurrency: z.optional(z.string().trim()),
    allowancesDescription: z.optional(z.string().trim()),
    sourceOfIncome: z.optional(z.string().trim()),
    otherSourceOfIncome: z.optional(z.string().trim()),
  })
  .refine(
    (data) => {
      if (data.sourceOfIncome === 'Other') {
        return !!data.sourceOfIncome;
      }
      return true;
    },
    {
      message: 'Please provide a source of income',
      path: ['otherSourceOfIncome'],
    }
  );

export const contactSchema = z.object({
  telephone: z.optional(z.string().trim()),
  mobile: z.optional(z.string().trim()),
  // permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  // permanentDistrict: z.string().trim().min(1, 'Permanent district is required'),
  presentAddress: z.optional(z.string().trim()),
  presentDistrict: z.optional(z.string().trim()),
  isSameAsPermanent: z.optional(z.boolean()),
  // isSameAsPermanent: z
  //   .string({ message: 'Please select an option' })
  //   .trim()
  //   .refine((value) => value === 'true' || value === 'false', {
  //     message: 'Please select an option',
  //   }),
});
export const familySchema = z
  .object({
    surname: z.string().trim().min(1, 'Surname is required'),
    firstName: z.string().trim().min(1, 'First name is required'),
    middleName: z.optional(z.string().trim()),
    relation: z.string().trim().min(1, 'Relation is required'),
    dateOfBirth: z.string().date('Date of birth is required'),
    address: z.string().trim().min(1, 'Address is required'),
    gender: z.string().trim().min(1, 'Gender is required'),
    nationality: z.optional(z.string().trim()),
    phoneNumber: z.optional(z.string().trim()),
    email: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          // Check if the field is provided, and if so, validate it as an email
          if (value !== undefined && value.length > 0) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          }
          return true; // If no value is provided, it's valid since the field is optional
        },
        { message: 'Invalid email address' }
      ),
    businessName: z.optional(z.string().trim()),
    isFamilyEmployment: z
      .string()
      .trim()
      .min(1, 'Employment status is required'),
    employeeNo: z.optional(z.string().trim()),
    employeeCategory: z.optional(z.string().trim()),
    institution: z.optional(z.string().trim()),
    SSNo: z.optional(z.string().trim()),
    pinCode: z.optional(z.string().trim()),
    designation: z.optional(z.string().trim()),
    otherRelation: z.optional(z.string().trim()),
  })
  .refine(
    (data) => {
      if (data.relation === 'Other') {
        return !!data.otherRelation;
      }
      return true;
    },
    {
      message: 'Please provide a reason',
      path: ['otherRelation'],
    }
  )
  .refine(
    (data) => {
      if (data.isFamilyEmployment === 'Yes') {
        return !!data.institution;
      }
      return true;
    },
    {
      message: 'Please provide an institution',
      path: ['institution'],
    }
  )
  .refine(
    (data) => {
      if (data.isFamilyEmployment === 'Yes') {
        return !!data.designation;
      }
      return true;
    },
    {
      message: 'Please provide a designation',
      path: ['designation'],
    }
  );

export const cashDepositSchema = z.object({
  ownerName: z.string().trim().min(1, 'Owner name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  registerOwner: z.string().trim().min(1, 'Register owner is required'),
  accountNo: z.string().trim().min(1, 'Account number is required'),
  type: z.string().trim().min(1, 'Type is required'),
  institutionOrBank: z
    .string()
    .trim()
    .min(1, 'Institution or bank is required'),
  location: z.string().trim().min(1, 'Location is required'),
  accountBalance: z
    .string()
    .trim()
    .min(1, 'Account balance is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Account balance must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  source: z.string().trim().min(1, 'Source is required'),
});
export const cashAtHandSchema = z.object({
  currency: z.string().trim().min(1, 'Currency is required'),
  amount: z
    .string()
    .trim()
    .min(1, 'Amount is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  details: z.string().trim().min(1, 'Details is required'),
  jointIncome: z.optional(z.string().trim()),
});

export const immovableAssetsSchema = z.object({
  ownerName: z.string().trim().min(1, 'Owner Name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  registerOwner: z.string().trim().min(1, 'Register owner is required'),
  assetType: z.string().trim().min(1, 'Asset type is required'),
  location: z.string().trim().min(1, 'Location is required'),
  plotNo: z.optional(z.string().trim()),
  size: z.optional(z.string().trim()),
  estimatedValue: z
    .string()
    .trim()
    .min(1, 'Amount is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  financeSource: z.string().trim().min(1, 'Finance source is required'),
  acquisitionMode: z.string().trim().min(1, 'Acquisition mode is required'),
  acquisitionCost: z
    .string()
    .trim()
    .min(1, 'Acquisition cost is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  acquisitionCurrency: z.string().trim().min(1, 'Currency is required'),
  acquisitionYear: z
    .string()
    .trim()
    .min(1, 'Acquisition year is required')
    .refine(
      (value) => {
        // Check if the value is a valid year (four digits and in a reasonable range)
        const currentYear = new Date().getFullYear();
        const year = parseInt(value, 10);
        return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear;
      },
      {
        message:
          'Invalid year, please enter a valid year between 1900 and the current year',
      }
    ),
});

export const movableAssetsSchema = z.object({
  ownerName: z.string().trim().min(1, 'Owner Name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  registerOwner: z.string().trim().min(1, 'Register owner is required'),
  assetType: z.string().trim().min(1, 'Asset type is required'),
  description: z.optional(z.string().trim()),
  registrationNo: z.string().trim().min(1, 'Registration number is required'),
  location: z.optional(z.string().trim()),
  purpose: z.string().trim().min(1, 'Purpose is required'),
  estimatedValue: z
    .string()
    .trim()
    .min(1, 'Amount is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  financeSource: z.string().trim().min(1, 'Finance source is required'),
  acquisitionMode: z.string().trim().min(1, 'Acquisition mode is required'),
  acquisitionCost: z
    .string()
    .trim()
    .min(1, 'Acquisition cost is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  acquisitionCurrency: z.string().trim().min(1, 'Currency is required'),
  acquisitionYear: z
    .string()
    .trim()
    .min(1, 'Acquisition year is required')
    .refine(
      (value) => {
        // Check if the value is a valid year (four digits and in a reasonable range)
        const currentYear = new Date().getFullYear();
        const year = parseInt(value, 10);
        return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear;
      },
      {
        message:
          'Invalid year, please enter a valid year between 1900 and the current year',
      }
    ),
});

export const otherAssetsSchema = z.object({
  ownerName: z.string().trim().min(1, 'Owner Name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  registerOwner: z.string().trim().min(1, 'Register owner is required'),
  assetType: z.string().trim().min(1, 'Asset type is required'),
  location: z.optional(z.string().trim()),
  estimatedValue: z
    .string()
    .trim()
    .min(1, 'Amount is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  financeSource: z.string().trim().min(1, 'Finance source is required'),
  remarks: z.optional(z.string().trim()),
  acquisitionMode: z.string().trim().min(1, 'Acquisition mode is required'),
  acquisitionCost: z
    .string()
    .trim()
    .min(1, 'Acquisition cost is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  acquisitionCurrency: z.string().trim().min(1, 'Currency is required'),

  acquisitionYear: z
    .string()
    .trim()
    .min(1, 'Acquisition year is required')
    .refine(
      (value) => {
        // Check if the value is a valid year (four digits and in a reasonable range)
        const currentYear = new Date().getFullYear();
        const year = parseInt(value, 10);
        return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear;
      },
      {
        message:
          'Invalid year, please enter a valid year between 1900 and the current year',
      }
    ),
});

export const securitySchema = z.object({
  ownerName: z.string().trim().min(1, 'Owner Name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  registerOwner: z.string().trim().min(1, 'Register owner is required'),
  name: z.optional(z.string().trim()),
  type: z.string().trim().min(1, 'Type is required'),
  certificateNo: z.string().trim().min(1, 'Certificate number is required'),
  numberOfShares: z.optional(z.string().trim()),
  company: z.string().trim().min(1, 'Company is required'),
  yearlyInterest: z.optional(z.string().trim()),
  natureOfShares: z.optional(z.string().trim()),
  currentMarketValue: z
    .string()
    .trim()
    .min(1, 'Current market value is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  financeSource: z.string().trim().min(1, 'Finance source is required'),
  acquisitionMode: z.string().trim().min(1, 'Acquisition mode is required'),
  acquisitionCost: z
    .string()
    .trim()
    .min(1, 'Acquisition cost is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  acquisitionCurrency: z.string().trim().min(1, 'Currency is required'),
  acquisitionYear: z
    .string()
    .trim()
    .min(1, 'Acquisition year is required')
    .refine(
      (value) => {
        // Check if the value is a valid year (four digits and in a reasonable range)
        const currentYear = new Date().getFullYear();
        const year = parseInt(value, 10);
        return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear;
      },
      {
        message:
          'Invalid year, please enter a valid year between 1900 and the current year',
      }
    ),
});

export const liabilitySchema = z.object({
  debtorName: z.string().trim().min(1, 'Debtor name is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
  creditor: z.string().trim().min(1, 'Creditor is required'),
  creditorAddress: z.optional(z.string().trim()),
  loanAmount: z
    .string()
    .trim()
    .min(1, 'Loan amount is required')
    .refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Amount must be a positive number' }
    ),
  currency: z.string().trim().min(1, 'Currency is required'),
  yearContracted: z.optional(
    z
      .string()
      .trim()
      .min(1, 'Year contracted is required')
      .refine(
        (value) => {
          // Check if the value is a valid year (four digits and in a reasonable range)
          const currentYear = new Date().getFullYear();
          const year = parseInt(value, 10);
          return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear;
        },
        {
          message:
            'Invalid year, please enter a valid year between 1900 and the current year',
        }
      )
  ),
  loanPurpose: z.string().trim().min(1, 'Loan purpose is required'),
  loanRepayment: z.string().trim().min(1, 'Loan repayment is required'),
  paymentPeriod: z.string().trim().min(1, 'Payment period is required'),
  loanOutstanding: z.string().trim().min(1, 'Loan outstanding is required'),
  currencyOutstanding: z.string().trim().min(1, 'Currency is required'),
  maturityDate: z.optional(z.string().date('Maturity date is required')),
  remarks: z.optional(z.string().trim()),
});

