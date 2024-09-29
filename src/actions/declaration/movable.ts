'use server';
import { validateRequest } from '@/lib/verify-auth';
import MovableAssetService from '@/services/movable-service';
import { movableAssetsSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

const getFormData = async (
  formData: FormData
): Promise<MovableAssetClientForm> => {
  return {
    acquisitionCost: formData.get('acquisitionCost') as string,
    acquisitionCurrency: formData.get('acquisitionCurrency') as string,
    acquisitionMode: formData.get('acquisitionMode') as string,
    acquisitionYear: formData.get('acquisitionYear') as string,
    assetType: formData.get('assetType') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    description: formData.get('description') as string,
    estimatedValue: formData.get('estimatedValue') as string,
    financeSource: formData.get('financeSource') as string,
    location: formData.get('location') as string,
    otherFinanceSource: formData.get('otherFinanceSource') as string,
    otherRelation: formData.get('otherRelation') as string,
    ownerName: formData.get('ownerName') as string,
    purpose: formData.get('purpose') as string,
    registerOwner: formData.get('registerOwner') as string,
    registrationNo: formData.get('registrationNo') as string,
    relation: formData.get('relation') as string,
  };
};

export const postMovableAsset = async (
  _useFormState: MovableAssetFormState,
  formData: FormData
): Promise<MovableAssetFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const movableAssetData = await getFormData(formData);
    const result = movableAssetsSchema.safeParse(movableAssetData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      movableAssetData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdMovableAsset = await MovableAssetService.createMovableAsset(
      movableAssetData
    );
    revalidatePath(routes.declarationId(movableAssetData.declarationId));
    return {
      data: {
        movableAsset: createdMovableAsset.id,
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
