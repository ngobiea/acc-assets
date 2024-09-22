'use server';

import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';
import DContactService from '@/services/d-contact-service';
import { DContact } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { contactClientDSchema } from '@/utils/validators/declaration';
import type { ContactDFormState } from '@/utils/declaration';

const getFormData = (formData: FormData): ContactClientDForm => {
  return {
    isSameAsPermanent: formData.get('isSameAsPermanent') as string,
    mobile: formData.get('mobile') as string,
    telephone: formData.get('telephone') as string,
    permanentAddress: formData.get('permanentAddress') as string,
    permanentDistrict: formData.get('permanentDistrict') as string,
    presentAddress: formData.get('presentAddress') as string,
    presentDistrict: formData.get('presentDistrict') as string,
    declarationId: formData.get('declarationId') as string,
    id: formData.get('id') as string,
  };
};

export const postDUserContact = async (
  _useFormState: ContactDFormState,
  formData: FormData
): Promise<ContactDFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const data = getFormData(formData);

    const contactResult = contactClientDSchema.safeParse({
      telephone: data.telephone,
      mobile: data.mobile,
      permanentAddress: data.permanentAddress,
      permanentDistrict: data.permanentDistrict,
      presentAddress: data.presentAddress,
      presentDistrict: data.permanentDistrict,
      isSameAsPermanent: data.isSameAsPermanent,
      id: data.id,
      declarationId: data.declarationId,
    });

    if (!contactResult.success) {
      return {
        errors: contactResult.error.flatten().fieldErrors,
      };
    }

    let contact: DContact | null = null;
    if (data.id) {
      contact = await DContactService.updateContact({
        declarationId: data.declarationId,
        mobile: data.mobile,
        permanentAddress: data.permanentAddress,
        permanentDistrict: data.permanentDistrict,
        presentAddress:
          data.isSameAsPermanent === 'true'
            ? data.permanentAddress
            : data.presentAddress,
        presentDistrict:
          data.isSameAsPermanent === 'true'
            ? data.permanentDistrict
            : data.presentDistrict,
        telephone: data.telephone,
      });
    } else {
      contact = await DContactService.createContact({
        declarationId: data.declarationId,
        telephone: data.telephone,
        mobile: data.mobile,
        permanentAddress: data.permanentAddress,
        permanentDistrict: data.permanentDistrict,
        presentAddress:
          data.isSameAsPermanent === 'true'
            ? data.permanentAddress
            : data.presentAddress,
        presentDistrict:
          data.isSameAsPermanent === 'true'
            ? data.permanentDistrict
            : data.presentDistrict,
      });
    }
    revalidatePath(routes.profile);
    return {
      data: {
        contact: contact.id,
      },
      errors: {},
    };
  } catch (error) {
    console.error('Error creating contact:', error);
    return {
      errors: {
        _form: ['An error occurred while creating Contact.'],
      },
    };
  }
  redirect(routes.profile);
};
