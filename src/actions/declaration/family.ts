'use server';
import { validateRequest } from '@/lib/verify-auth';
import FamilyService from '@/services/family-service';
import DeclarationService from '@/services/declaration-service';
import routes from '@/utils/routes';
import { familySchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import type { FamilyFormState } from '@/utils/declaration';
import { revalidatePath } from 'next/cache';

const getFormData = (formData: FormData): FamilyClientForm => {
  return {
    address: formData.get('address') as string,
    businessName: formData.get('businessName') as string,
    category: formData.get('category') as string,
    dateOfBirth: formData.get('dateOfBirth') as string,
    declarationId: formData.get('declarationId') as string,
    designation: formData.get('designation') as string,
    email: formData.get('email') as string,
    employeeNo: formData.get('employeeNo') as string,
    firstName: formData.get('firstName') as string,
    gender: formData.get('gender') as string,
    institution: formData.get('institution') as string,
    middleName: formData.get('middleName') as string,
    mobile: formData.get('mobile') as string,
    isFamilyEmployment: formData.get('isFamilyEmployment') as string,
    nationality: formData.get('nationality') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    pinCode: formData.get('pinCode') as string,
    relation: formData.get('relation') as string,
    SSNo: formData.get('SSNo') as string,
    surname: formData.get('surname') as string,
    otherRelation: formData.get('otherRelation') as string,
  };
};

export const postFamily = async (
  _useFormState: FamilyFormState,
  formData: FormData
): Promise<FamilyFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const familyData = getFormData(formData);
    const result = familySchema.safeParse(familyData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      familyData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const family = await FamilyService.crateFamily(familyData);
    if (!family) {
      return {
        errors: {
          _form: ['Family data could not be saved'],
        },
      };
    }
    revalidatePath(routes.declarationId(familyData.declarationId));
    return {
      data: {
        family: 'Family data saved successfully',
      },
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ['An error occurred while saving family data'],
      },
    };
  }
};
