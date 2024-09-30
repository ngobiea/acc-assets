'use server';
import { validateRequest } from '@/lib/verify-auth';
import OtherService from '@/services/other-service';
import { otherAssetsSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

const getFormData = (formData: FormData): OtherAssetClientForm => {
  return {
    acquisitionCost: formData.get('acquisitionCost') as string,
    acquisitionCurrency: formData.get('acquisitionCurrency') as string,
    acquisitionMode: formData.get('acquisitionMode') as string,
    acquisitionYear: formData.get('acquisitionYear') as string,
    assetType: formData.get('assetType') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    estimatedValue: formData.get('estimatedValue') as string,
    financeSource: formData.get('financeSource') as string,
    location: formData.get('location') as string,
    otherFinanceSource: formData.get('otherFinanceSource') as string,
    otherRelation: formData.get('otherRelation') as string,
    ownerName: formData.get('ownerName') as string,
    registerOwner: formData.get('registerOwner') as string,
    relation: formData.get('relation') as string,
    remarks: formData.get('remarks') as string,
  };
};

export const postOtherAsset = async (
  _useFormState: OtherAssetFormState,
  formData: FormData
): Promise<OtherAssetFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const otherAssetData = getFormData(formData);
    const result = otherAssetsSchema.safeParse(otherAssetData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      otherAssetData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdOtherAsset = await OtherService.createOtherAsset(
      otherAssetData
    );
    revalidatePath(routes.declarationId(otherAssetData.declarationId));
    return {
      data: {
        otherAsset: createdOtherAsset.id,
      },
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: [
          'An error occurred while processing your request. Please try again later.',
        ],
      },
    };
  }
};


export const deleteOtherAsset = async (
  {
    declarationId,
    id,
  }: {
    declarationId: string;
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

    await OtherService.deleteOtherAsset(id);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: [
          'An error occurred while deleting employment. Please try again later.',
        ],
      },
    };
  }
  revalidatePath(routes.declarationId(declarationId));
  return {
    errors: {},
  };
};