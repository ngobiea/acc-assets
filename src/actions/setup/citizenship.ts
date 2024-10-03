'use server';
import CitizenshipService from '@/services/citizenship-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { nationalitySchema } from '@/utils/validators/setup';
import { revalidatePath } from 'next/cache';

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
    revalidatePath(routes.profile);

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

export const deleteCitizenship = async (
  { id }: { id: string },
  _useFormState: DeleteFormState,
  _formData: FormData
): Promise<DeleteFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
      // return null;
    }
    await CitizenshipService.deleteCitizenship(id);
  } catch (error) {
    console.log('Error deleting national card:', error);
    return {
      errors: {
        _form: ['An error occurs while deleting national card'],
      },
    };
  }
  revalidatePath(routes.profile);
  return {
    errors: {},
  };
};
