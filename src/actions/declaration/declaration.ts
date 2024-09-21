'use server';

import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';
import DeclarationService from '@/services/declaration-service';
import PersonalService from '@/services/personal-service';
import DPersonalService from '@/services/d-personal-service';
import { declarationSchema } from '@/utils/validators/declaration';
import ContactService from '@/services/contact-service';
import DContactService from '@/services/d-contact-service';
import { revalidatePath } from 'next/cache';

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
    const isUseLastDeclaration = formData.get('isUseLastDeclaration') as string;
    const result = declarationSchema.safeParse({
      reason,
      place,
      otherReason: reason === 'Other' ? otherReason : '',
      isUseLastDeclaration,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    if (isUseLastDeclaration === 'Yes') {
      declaration = await DeclarationService.createFromLastDeclaration(user.id);
    } else {
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
    }
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
