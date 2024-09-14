'use server';
import NationalCardService from '@/services/nationalCard-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { nationalCardSchema } from '@/utils/validators/setup';
import type { NationalCard } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const postNationalCard = async (
  _useFormState: NationalCardFormState,
  formData: FormData
): Promise<NationalCardFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const nationalId = formData.get('nationalId') as string;
    const country = formData.get('country') as string;
    const issueDate = formData.get('issueDate') as string;
    const expiryDate = formData.get('expiryDate') as string;

    const result = nationalCardSchema.safeParse({
      nationalId,
      country,
      issueDate,
      expiryDate,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isNationalIdExist = await NationalCardService.isNationalCardIdExist(
      nationalId,
      user.id
    );
    if (isNationalIdExist) {
      return {
        errors: {
          nationalId: ['National ID already exists'],
        },
      };
    }
    const isNationalCardCountryExist =
      await NationalCardService.isNationalCardCountryExist(country, user.id);
    if (isNationalCardCountryExist) {

      return {
        errors: {
          country: ['National card for this country already exists'],
        },
      };
    }

    const nationalCard = await NationalCardService.createNationalCard({
      nationalId,
      country,
      issueDate: new Date(issueDate),
      expiryDate: new Date(expiryDate),
      userId: user.id,
    });

    revalidatePath('/profile');

    return {
      errors: {},
      data: {
        nationalCard,
      },
    };
  } catch (error) {}
  return {
    errors: {},
  };
};

export const getNationalCards = async (): Promise<NationalCard[]> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const nationalCards = await NationalCardService.getNationalCards(user.id);
    return nationalCards;
  } catch (error) {
    console.log('Error fetching national cards:', error);
    throw error;
  }
};

export const deleteNationalCard = async (
  id: string
): Promise<string | null> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    await NationalCardService.deleteNationalCard(id);
    revalidatePath('/profile');
    return id;
  } catch (error) {
    console.log('Error deleting national card:', error);
    throw error;
  }
};
