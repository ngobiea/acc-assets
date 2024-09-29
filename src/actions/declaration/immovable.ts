'use server';
import { validateRequest } from '@/lib/verify-auth';
import ImmovableService from '@/services/immovable-service';
import { immovableAssetsSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

const getFormData = async (
  formData: FormData
): Promise<ImmovableAssetClientForm> => {
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
    plotNo: formData.get('plotNo') as string,
    registerOwner: formData.get('registerOwner') as string,
    relation: formData.get('relation') as string,
    size: formData.get('size') as string,
  };
};

export const postImmovableAsset = async (
  _useFormState: ImmovableAssetFormState,
  formData: FormData
): Promise<ImmovableAssetFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const immovableAssetData = await getFormData(formData);
    const result = immovableAssetsSchema.safeParse(immovableAssetData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      immovableAssetData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdImmovableAsset = await ImmovableService.createImmovableAsset(
      immovableAssetData
    );
    revalidatePath(routes.declarationId(immovableAssetData.declarationId));
    return {
      data: {
        immovableAsset: createdImmovableAsset.id,
      },
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ['An error occurred while saving immovable asset'],
      },
    };
  }
};
