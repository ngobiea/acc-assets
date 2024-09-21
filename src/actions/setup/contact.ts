'use server';

import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';
import ContactService from '@/services/contact-service';
import PassportService from '@/services/passport-service';
import NationalCardService from '@/services/nationalCard-service';
import { Contact } from '@prisma/client';
import {
  getContactClientSetupData,
  validateContactSetup,
} from '@/utils/action/contact';
import { validateNationalIdSetup } from '@/utils/action/nationalId';
import { validatePassportSetup } from '@/utils/action/passport';
import { revalidatePath } from 'next/cache';

export const postUserContact = async (
  _useFormState: ContactSetupFormState,
  formData: FormData
): Promise<ContactSetupFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const id = formData.get('id') as string;
    const {
      isNationalIdExist,
      isPassportExist,
      isSameAsPermanent,
      mobile,
      nationalId,
      nationalIdCountry,
      nationalIdExpiryDate,
      nationalIdIssueDate,
      passportCountry,
      passportExpiryDate,
      passportIssueDate,
      passportNumber,
      permanentAddress,
      permanentDistrict,
      presentAddress,
      presentDistrict,
      telephone,
      termsAndConditions,
    } = getContactClientSetupData(formData);


    const contactResult = validateContactSetup({
      isNationalIdExist,
      isPassportExist,
      isSameAsPermanent,
      mobile,
      permanentAddress,
      permanentDistrict,
      presentAddress,
      presentDistrict,
      telephone,
      termsAndConditions,
    });

    if (!contactResult.success) {
      return {
        errors: contactResult.error.flatten().fieldErrors,
      };
    }

    if (isPassportExist === 'Yes') {
      const passportResult = validatePassportSetup({
        passportExpiryDate,
        passportCountry,
        passportIssueDate,
        passportNumber,
      });
      if (!passportResult.success) {
        return {
          errors: passportResult.error.flatten().fieldErrors,
        };
      }
    }
    if (isNationalIdExist === 'Yes') {
      const nationalIdResult = validateNationalIdSetup({
        nationalId,
        nationalIdCountry,
        nationalIdExpiryDate,
        nationalIdIssueDate,
      });
      if (!nationalIdResult.success) {
        return {
          errors: nationalIdResult.error.flatten().fieldErrors,
        };
      }
    }

    let contact: Contact | null = null;
    if (id) {
      contact = await ContactService.updateContact({
        newContact: {
          telephone,
          mobile,
          permanentAddress,
          permanentDistrict,
          presentAddress:
            isSameAsPermanent === 'true' ? permanentAddress : presentAddress,
          presentDistrict:
            isSameAsPermanent === 'true' ? permanentDistrict : presentDistrict,
          userId: user.id,
        },
        userId: user.id,
      });
    } else {
      contact = await ContactService.createContact({
        telephone,
        mobile,
        permanentAddress,
        permanentDistrict,
        presentAddress:
          isSameAsPermanent === 'true' ? permanentAddress : presentAddress,
        presentDistrict:
          isSameAsPermanent === 'true' ? permanentDistrict : presentDistrict,
        userId: user.id,
      });
    }
    if (isPassportExist === 'Yes') {
      const passport = await PassportService.createPassport({
        passportNumber,
        issueDate: new Date(passportIssueDate),
        expiryDate: new Date(passportExpiryDate),
        country: passportCountry,
        userId: user.id,
      });
    }
    if (isNationalIdExist === 'Yes') {
      const nationalCard = await NationalCardService.createNationalCard({
        nationalId,
        issueDate: new Date(nationalIdIssueDate),
        expiryDate: new Date(nationalIdExpiryDate),
        country: nationalIdCountry,
        userId: user.id,
      });
    }
  } catch (error) {
    console.error('Error creating contact:', error);
    return {
      errors: {
        _form: ['An error occurred while creating Contact.'],
      },
    };
  }
  revalidatePath(routes.profile);
  redirect(routes.profile);
};
