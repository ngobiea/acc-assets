'use server';

import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';
import DeclarationService from '@/services/declaration-service';
import PersonalService from '@/services/personal-service';
import DPersonalService from '@/services/d-personal-service';
import {
  declarationSchema,
  previewSchema,
} from '@/utils/validators/declaration';
import ContactService from '@/services/contact-service';
import DContactService from '@/services/d-contact-service';
import { revalidatePath } from 'next/cache';
import type { Declaration } from '@prisma/client';

export const postDeclaration = async (
  _useFormState: DeclarationFormState,
  formData: FormData
): Promise<DeclarationFormState> => {
  let declaration: DeclarationData | null = null;

  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const reason = formData.get('reason') as string;
    const place = formData.get('place') as string;
    const otherReason = formData.get('otherReason') as string;
    const result = declarationSchema.safeParse({
      reason,
      place,
      otherReason: reason === 'Other' ? otherReason : '',
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    declaration = await DeclarationService.createDeclaration({
      place,
      reason: reason === 'Other' ? otherReason : reason,
      userId: user.id,
    });
    const personal = await PersonalService.getPersonal(user.id);
    const contact = await ContactService.getContact(user.id);
    if (!personal) {
      throw new Error('Can not find personal Info');
    }
    const dPersonal = await DPersonalService.createPersonal({
      acquireBy: personal.acquireBy,
      aliases: personal.aliases as string,
      country: personal.country,
      dateOfBirth: personal.dateOfBirth,
      declarationId: declaration.id,
      firstName: personal.firstName,
      gender: personal.gender,
      idType: personal.idType,
      maritalStatus: personal.maritalStatus,
      middleName: personal?.middleName as string,
      pid: personal.pid,
      surname: personal.surname,
      title: personal.title,
    });
    const dContact = await DContactService.createContact({
      declarationId: declaration.id,
      permanentAddress: contact?.permanentAddress as string,
      permanentDistrict: contact?.permanentDistrict as string,
      presentAddress: contact?.presentAddress as string,
      presentDistrict: contact?.presentDistrict as string,
      mobile: contact?.mobile as string,
      telephone: contact?.telephone as string,
    });

    revalidatePath(routes.home);
    return {
      errors: {},
      data: {
        declaration,
      },
    };
  } catch (error) {
    console.log('Error creating declaration', error);
    return {
      errors: {
        _form: ['Error creating declaration'],
      },
    };
  }
};

export const deleteDeclaration = async (
  {
    id,
  }: {
    id: string;
  },
  _useFormState: DeleteFormState,
  _formData: FormData
): Promise<DeleteFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    await DeclarationService.deleteDeclaration(id);
    revalidatePath(routes.home);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: [
          'An error occurred while deleting declaration. Please try again later.',
        ],
      },
    };
  }
  return {
    errors: {},
  };
};

export const postPreview = async (
  _useFormState: PreviewFormState,
  formData: FormData
): Promise<PreviewFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }

    const declarationId = formData.get('declarationId') as string;
    const isAccepted = formData.get('isAccepted') as string;
    const result = previewSchema.safeParse({
      isAccepted: isAccepted === 'true',
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    await DeclarationService.declare(declarationId);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: [
          'An error occurred while accepting declaration. Please try again later.',
        ],
      },
    };
  }
  redirect(routes.home);
  return {
    errors: {},
  };
};

export const postCopyDeclaration = async (
  {
    id,
  }: {
    id: string;
  },
  _useFormState: DeleteFormState,
  _formData: FormData
): Promise<DeleteFormState> => {
  let newDeclaration: Declaration | null = null;
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    newDeclaration = await DeclarationService.copyDeclaration(id);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: [
          'An error occurred while copying declaration. Please try again later.',
        ],
      },
    };
  }
  revalidatePath(routes.home);
  redirect(routes.declarationId(newDeclaration.id));
};
