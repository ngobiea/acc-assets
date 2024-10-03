'use server';
import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { personalSchema } from '@/utils/validators/setup';
import { redirect } from 'next/navigation';
import DPersonalService from '@/services/d-personal-service';
import type { DPersonal } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const postDPersonal = async (
  _useFormState: PersonalFormState,
  formData: FormData
): Promise<PersonalFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const title = formData.get('title') as string;
    const idType = formData.get('idType') as string;
    const pid = formData.get('pid') as string;
    const surname = formData.get('surname') as string;
    const firstName = formData.get('firstName') as string;
    const middleName = formData.get('middleName') as string;
    const aliases = formData.get('aliases') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const maritalStatus = formData.get('maritalStatus') as string;
    const gender = formData.get('gender') as string;
    const country = formData.get('country') as string;
    const acquireBy = formData.get('acquireBy') as string;
    const image = formData.get('image') as string;
    const id = formData.get('id') as string;
    const declarationId = formData.get('declarationId') as string;

    const result = personalSchema.safeParse({
      firstName,
      middleName,
      title,
      pid,
      dateOfBirth,
      aliases,
      surname,
      idType,
      acquireBy,
      gender,
      country,
      maritalStatus,
      id,
      image,
    });
    console.log(image);

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    let personal: DPersonal | null = null;
    if (id) {
      console.log('Updating personal');
      personal = await DPersonalService.updatePersonal({
        currentPersonal: {
          aliases,
          dateOfBirth: new Date(dateOfBirth),
          firstName,
          gender,
          idType,
          maritalStatus,
          middleName,
          pid,
          surname,
          title,
          acquireBy,
          country,
          declarationId,
        },
        declarationId,
      });
    } else {
      personal = await DPersonalService.createPersonal({
        aliases,
        dateOfBirth: new Date(dateOfBirth),
        firstName,
        gender,
        idType,
        maritalStatus,
        middleName,
        pid,
        surname,
        title,
        declarationId,
        acquireBy,
        country,
      });
    }

    revalidatePath(routes.setup);

    return {
      errors: {},
      data: {
        personalId: personal.id,
      },
    };
  } catch (error) {
    console.log('Error creating personal:', error);
    return {
      errors: {
        _form: ['An error occurred while creating personal'],
      },
    };
  }
};
