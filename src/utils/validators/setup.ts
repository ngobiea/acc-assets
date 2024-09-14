import { z } from 'zod';

export const personalSchema = z.object({
  id: z.optional(z.string().trim()),
  title: z.string().trim().min(1, 'Title is required'),
  idType: z.string().trim().min(1, 'ID type is required'),
  pid: z
    .string()
    .trim()
    .min(8, 'number must be 8 characters')
    .max(8, 'number must be 8 characters'),
  surname: z.string().trim().min(1, 'Surname is required'),
  firstName: z.string().trim().min(1, 'First name is required'),
  middleName: z.optional(z.string().trim()),
  aliases: z.optional(z.string().trim()),
  dateOfBirth: z.string().date('Date of birth is required'),
  maritalStatus: z
    .string({ message: 'Marital status is required' })
    .trim()
    .refine(
      (value) =>
        ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'].includes(
          value
        ),
      {
        message: 'Marital status is required',
      }
    ),
  gender: z
    .string({ message: 'Gender is required' })
    .trim()
    .refine((value) => ['Male', 'Female'].includes(value), {
      message: 'Gender is invalid',
    }),
  country: z.string().trim().min(1, 'Country is required'),
  acquireBy: z.string().trim().min(1, 'Acquire by is required'),
  image: z.instanceof(File, { message: 'Image is required' }),
});
export const personalSchemaClient = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  idType: z.string().trim().min(1, 'ID type is required'),
  pid: z
    .string()
    .trim()
    .min(8, 'number must be 8 characters')
    .max(8, 'number must be 8 characters'),
  surname: z.string().trim().min(1, 'Surname is required'),
  firstName: z.string().trim().min(1, 'First name is required'),
  middleName: z.optional(z.string().trim()),
  aliases: z.optional(z.string().trim()),
  dateOfBirth: z.string().date('Date of birth is required'),
  maritalStatus: z
    .string({ message: 'Marital status is required' })
    .trim()
    .refine(
      (value) =>
        ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'].includes(
          value
        ),
      {
        message: 'Marital status is required',
      }
    ),
  country: z.string().trim().min(1, 'Country is required'),
  acquireBy: z.string().trim().min(1, 'Acquire by is required'),
  gender: z
    .string({ message: 'Gender is required' })
    .trim()
    .refine((value) => ['Male', 'Female'].includes(value), {
      message: 'Gender is invalid',
    }),
});

export const nationalitySchema = z.object({
  country: z.string().trim().min(1, 'Country is required'),
  acquireBy: z
    .string({ message: 'Acquire by is required' })
    .trim()
    .min(1, 'Acquire by is required'),
});

export const passportSchema = z.object({
  passportNumber: z.string().trim().min(1, 'Passport number is required'),
  country: z.string().trim().min(1, 'Country is required'),
  issueDate: z.string().date('Passport issue date is required'),
  expiryDate: z.string().date('Passport expiry date is required'),
});

export const nationalCardSchemaClient = z.object({
  nationalId: z.string().trim().min(1, 'National ID is required'),
  country: z.string().trim().min(1, 'Country is required'),
  issueDate: z.string().date('Passport issue date is required'),
  expiryDate: z.string().date('Passport expiry date is required'),
});
export const nationalCardSchema = z.object({
  nationalId: z.string().trim().min(1, 'National ID is required'),
  country: z.string().trim().min(1, 'Country is required'),
  issueDate: z.string().date('Passport issue date is required'),
  expiryDate: z.string().date('Passport expiry date is required'),
});

export const userEmploymentSchema = z.object({
  mdaId: z.string().trim().min(1, 'Please select an MDA'),
  employeeCategory: z.string().trim().min(1, 'Employee category is required'),
  currentPosting: z.optional(z.string().trim()),
  designation: z.string().trim().min(1, 'Designation is required'),
  rankOrGrade: z.optional(z.string().trim()),
  employeePin: z.optional(z.string().trim()),
  establishmentRegNo: z.optional(z.string().trim()),
  sourceOfIncome: z.optional(z.string().trim()),
  otherSourceOfIncome: z.optional(z.string().trim()),
  isAdministrative: z
    .string({ message: 'Administrative responsibility is required' })
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Administrative responsibility is required',
    }),
  isFinancial: z
    .string({ message: 'Financial responsibility is required' })
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Financial responsibility is required',
    }),
  isPolitical: z
    .string({ message: 'Political responsibility is required' })
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Political responsibility is required',
    }),
  isProfessional: z
    .string({ message: 'Professional responsibility is required' })
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Professional responsibility is required',
    }),
});

export const contactClientSetupSchema = z.object({
  telephone: z.optional(z.string().trim()),
  mobile: z.optional(z.string().trim()),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  permanentDistrict: z.string().trim().min(1, 'Permanent district is required'),
  presentAddress: z.optional(z.string().trim()),
  presentDistrict: z.optional(z.string().trim()),
  isSameAsPermanent: z.boolean({ message: 'Please select an option' }),
  termsAndConditions: z
    .boolean({ message: 'Please accept the terms and conditions' })
    .refine((value) => value === true, {
      message: 'Please accept the terms and conditions',
    }),
  isPassportExist: z
    .string()
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Please select an option',
    }),
  isNationalIdExist: z
    .string()
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Please select an option',
    }),
  passportNumber: z.optional(z.string().trim()),
  nationalId: z.optional(z.string().trim()),
  passportIssueDate: z.optional(z.string()),
  passportExpiryDate: z.optional(z.string()),
  passportCountry: z.optional(z.string().trim()),
  nationalIdIssueDate: z.optional(z.string()),
  nationalIdExpiryDate: z.optional(z.string()),
  nationalIdCountry: z.optional(z.string().trim()),
});
export const contactSetupSchema = z.object({
  telephone: z.optional(z.string().trim()),
  mobile: z.optional(z.string().trim()),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  permanentDistrict: z.string().trim().min(1, 'Permanent district is required'),
  presentAddress: z.optional(z.string().trim()),
  presentDistrict: z.optional(z.string().trim()),
  isSameAsPermanent: z.boolean({ message: 'Please select an option' }),
  termsAndConditions: z
    .boolean({ message: 'Please accept the terms and conditions' })
    .refine((value) => value === true, {
      message: 'Please accept the terms and conditions',
    }),
  isPassportExist: z
    .string()
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Please select an option',
    }),
  isNationalIdExist: z
    .string()
    .trim()
    .refine((value) => value === 'Yes' || value === 'No', {
      message: 'Please select an option',
    }),
});

export const nationalIdSetupSchema = z.object({
  nationalId: z.string().trim().min(1, 'National ID is required'),
  nationalIdCountry: z.string().trim().min(1, 'Country is required'),
  nationalIdIssueDate: z.string().date('Passport issue date is required'),
  nationalIdExpiryDate: z.string().date('Passport expiry date is required'),
});
export const passportSetupSchema = z.object({
  passportNumber: z.string().trim().min(1, 'Passport number is required'),
  passportCountry: z.string().trim().min(1, 'Country is required'),
  passportIssueDate: z.string().date('Passport issue date is required'),
  passportExpiryDate: z.string().date('Passport expiry date is required'),
});


export const contactUpdateSchema = z.object({
  telephone: z.optional(z.string().trim()),
  mobile: z.optional(z.string().trim()),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  permanentDistrict: z.string().trim().min(1, 'Permanent district is required'),
  presentAddress: z.optional(z.string().trim()),
  presentDistrict: z.optional(z.string().trim()),
  isSameAsPermanent: z.boolean({ message: 'Please select an option' }),
});
