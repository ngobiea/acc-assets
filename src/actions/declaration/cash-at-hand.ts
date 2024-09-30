'use server';

import { validateRequest } from '@/lib/verify-auth';
import CashAtHandService from '@/services/cash-at-hand-service';
import { cashAtHandSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

export const getFormData = async (
  formData: FormData
): Promise<CashAtHandClientForm> => {
  return {
    amount: formData.get('amount') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    details: formData.get('details') as string,
    jointIncome: formData.get('jointIncome') as string,
  };
};

export const postCashAtHand = async (
  _useFormState: CashAtHandFormState,
  formData: FormData
): Promise<CashAtHandFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const cashAtHandData = await getFormData(formData);
    const result = cashAtHandSchema.safeParse(cashAtHandData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      cashAtHandData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const isCashAtHandExist = await CashAtHandService.isCashAtHandExist(
      cashAtHandData.declarationId
    );
    if (isCashAtHandExist) {
      return {
        errors: {
          _form: [
            'Cash at hand exist delete the previous one before adding new one.',
          ],
        },
      };
    }
    const createdCashAtHand = await CashAtHandService.createCashAtHand(
      cashAtHandData
    );
    revalidatePath(routes.declarationId(cashAtHandData.declarationId));
    return {
      data: {
        cashAtHand: createdCashAtHand.id,
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

export const deleteCashAtHand = async (
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
    await CashAtHandService.deleteCashAtHand(id);
  } catch (error) {
    console.error(error);
    return {
      errors: {
        _form: ['An error occurred while deleting cash at hand'],
      },
    };
  }
  revalidatePath(routes.declarationId(declarationId));
  return {
    errors: {},
  };
};
