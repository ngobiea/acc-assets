'use server';
import PassportService from '@/services/passport-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { passportSchema } from '@/utils/validators/setup';
import type { Passport } from '@prisma/client';

export const postPassport = async (
  _useFormState: PassportFormState,
  formData: FormData
): Promise<PassportFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const passportNumber = formData.get('passportNumber') as string;
    const country = formData.get('country') as string;
    const issueDate = formData.get('issueDate') as string;
    const expiryDate = formData.get('expiryDate') as string;

    const result = passportSchema.safeParse({
      passportNumber,
      country,
      issueDate,
      expiryDate,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isPassportNumberExist = await PassportService.isPassportNumberExist(
      passportNumber,
      user.id
    );
    if (isPassportNumberExist) {
      return {
        errors: {
          passportNumber: ['Passport with this number already exists'],
        },
      };
    }
    const isPassportCountryExist = await PassportService.isPassportCountryExist(
      country,
      user.id
    );
    if (isPassportCountryExist) {
      return {
        errors: {
          country: ['Passport for this country already exists'],
        },
      };
    }

    const passport = await PassportService.createPassport({
      passportNumber,
      country,
      issueDate: new Date(issueDate),
      expiryDate: new Date(expiryDate),
      userId: user.id,
    });

    return {
      errors: {},
      data: {
        passport,
      },
    };
  } catch (error) {
    console.log('Error fetching passports:', error);
    throw error;
  }
  return {
    errors: {},
  };
};

export const getPassports = async (): Promise<Passport[]> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const passports = await PassportService.getPassports(user.id);
    return passports;
  } catch (error) {
    console.log('Error fetching passports:', error);
    throw error;
  }
};

export const deletePassport = async (id: string): Promise<string | null> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    await PassportService.deletePassport(id);
    return id;
  } catch (error) {
    console.log('Error deleting passport:', error);
    throw error;
  }
};
