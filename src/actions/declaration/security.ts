'use server';
import { validateRequest } from '@/lib/verify-auth';
import SecurityService from '@/services/security-service';
import { securitySchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

export const getFormData = async (
  formData: FormData
): Promise<SecurityClientForm> => {
  return {
    acquisitionCost: formData.get('acquisitionCost') as string,
    acquisitionCurrency: formData.get('acquisitionCurrency') as string,
    acquisitionMode: formData.get('acquisitionMode') as string,
    acquisitionYear: formData.get('acquisitionYear') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    financeSource: formData.get('financeSource') as string,
    otherFinanceSource: formData.get('otherFinanceSource') as string,
    otherRelation: formData.get('otherRelation') as string,
    ownerName: formData.get('ownerName') as string,
    registerOwner: formData.get('registerOwner') as string,
    relation: formData.get('relation') as string,
    certificateNo: formData.get('certificateNo') as string,
    company: formData.get('company') as string,
    currentMarketValue: formData.get('currentMarketValue') as string,
    name: formData.get('name') as string,
    natureOfShares: formData.get('natureOfShares') as string,
    numberOfShares: formData.get('numberOfShares') as string,
    type: formData.get('type') as string,
    yearlyInterest: formData.get('yearlyInterest') as string,
  };
};

export const postSecurity = async (
  _useFormState: SecurityFormState,
  formData: FormData
): Promise<SecurityFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const securityData = await getFormData(formData);
    const result = securitySchema.safeParse(securityData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      securityData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdSecurity = await SecurityService.createSecurity(securityData);
    revalidatePath(routes.declarationId(securityData.declarationId));
    return {
      data: {
        security: createdSecurity.id,
      },
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ['An error occurred while saving security'],
      },
    };
  }
};
