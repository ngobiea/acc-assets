'use server';
import CitizenshipService from '@/services/citizenship-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { nationalitySchema } from '@/utils/validators/setup';
import type { Citizenship } from '@prisma/client';

export const postNationality = async (
  _useFormState: NationalityFormState,
  formData: FormData
): Promise<NationalityFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const country = formData.get('country') as string;
    const acquireBy = formData.get('acquireBy') as string;
    const result = nationalitySchema.safeParse({
      country,
      acquireBy,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isCitizenshipExist = await CitizenshipService.isCitizenshipExist(
      country,
      user.id
    );
    if (isCitizenshipExist) {
      return {
        errors: {
          country: ['Citizenship for this country already exists'],
        },
      };
    }
    const citizenship = await CitizenshipService.createCitizenship({
      country,
      acquireBy,
      userId: user.id,
    });

    return {
      errors: {},
      data: {
        citizenship,
      },
    };
  } catch (error) {
    console.log('Error creating citizenship:', error);
    return {
      errors: {
        _form: ['An error occurred while creating citizenship'],
      },
    };
  }
};

export const getCitizenships = async (): Promise<Citizenship[]> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
      return [];
    }
    const citizenships = await CitizenshipService.getCitizenships(user.id);
    console.log(citizenships);
    return citizenships;
  } catch (error) {
    console.error('Error fetching citizenships:', error);
    throw error;
  }
};

export const deleteCitizenship = async (id: string): Promise<string | null> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
      // return null;
    }
    await CitizenshipService.deleteCitizenship(id);
    return id;
  } catch (error) {
    console.error('Error deleting citizenship:', error);
    throw new Error('Error occurs while deleting citizenship');
  }
};
