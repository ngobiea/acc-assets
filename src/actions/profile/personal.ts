'use server';
import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { personalSchema } from '@/utils/validators/setup';
import { redirect } from 'next/navigation';
import PersonalService from '@/services/personal-service';
import type { Personal } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const getFormData = (formData: FormData): PersonalClientForm => {
  return {
    title: formData.get('title') as string,
    idType: formData.get('idType') as string,
    pid: formData.get('pid') as string,
    surname: formData.get('surname') as string,
    firstName: formData.get('firstName') as string,
    middleName: formData.get('middleName') as string,
    aliases: formData.get('aliases') as string,
    dateOfBirth: formData.get('dateOfBirth') as string,
    maritalStatus: formData.get('maritalStatus') as string,
    acquireBy: formData.get('acquireBy') as string,
    country: formData.get('country') as string,
    gender: formData.get('gender') as string,
    userId: formData.get('userId') as string,
    image: formData.get('image') as string,
    id: formData.get('id') as string,
  };
};

export const postPPersonal = async (
  _useFormState: PersonalFormState,
  formData: FormData
): Promise<PersonalFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const personalFormData = getFormData(formData);

    const result = personalSchema.safeParse({
      firstName: personalFormData.firstName,
      middleName: personalFormData.middleName,
      title: personalFormData.title,
      pid: personalFormData.pid,
      dateOfBirth: personalFormData.dateOfBirth,
      aliases: personalFormData.aliases,
      surname: personalFormData.surname,
      idType: personalFormData.idType,
      acquireBy: personalFormData.acquireBy,
      gender: personalFormData?.gender,
      country: personalFormData.country,
      maritalStatus: personalFormData.maritalStatus,
      id: personalFormData.id,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    // check if pid already exist for a user
    const existingPersonalWithPid = await PersonalService.isPidExist({
      pid: personalFormData.pid,
      idType: personalFormData.idType,
    });
    let personal: Personal | null = null;
    if (personalFormData.id) {
      if (existingPersonalWithPid && existingPersonalWithPid.id !== personalFormData.id) {
        return {
          errors: {
            pid: ['already exist'],
          },
        };
      }
      personal = await PersonalService.updatePersonal({
        currentPersonal: {
          aliases: personalFormData.aliases,
          dateOfBirth: new Date(personalFormData.dateOfBirth),
          firstName: personalFormData.firstName,
          gender: personalFormData.gender,
          idType: personalFormData.idType,
          maritalStatus: personalFormData.maritalStatus,
          middleName: personalFormData.middleName,
          pid: personalFormData.pid,
          surname: personalFormData.surname,
          title: personalFormData.title,
          userId: user.id,
          acquireBy: personalFormData.acquireBy,
          country: personalFormData.country,
        },
        userId: user.id,
      });
    } else {
      if (existingPersonalWithPid) {
        return {
          errors: {
            pid: ['already exist'],
          },
        };
      }
      personal = await PersonalService.createPersonal({
        aliases: personalFormData.aliases,
        dateOfBirth: new Date(personalFormData.dateOfBirth),
        firstName: personalFormData.firstName,
        gender: personalFormData.gender,
        idType: personalFormData.idType,
        maritalStatus: personalFormData.maritalStatus,
        middleName: personalFormData.middleName,
        pid: personalFormData.pid,
        surname: personalFormData.surname,
        title: personalFormData.title,
        userId: user.id,
        acquireBy: personalFormData.acquireBy,
        country: personalFormData.country,
      });
    }
    revalidatePath(routes.profile);
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
