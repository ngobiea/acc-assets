'use server';
import { validateRequest } from '@/lib/verify-auth';
import CashDepositService from '@/services/cash-deposit-service';
import { cashDepositSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

const getFormData = async (
  formData: FormData
): Promise<cashDepositClientForm> => {
  return {
    accountBalance: formData.get('accountBalance') as string,
    accountNo: formData.get('accountNo') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    institutionOrBank: formData.get('institutionOrBank') as string,
    location: formData.get('location') as string,
    otherRelation: formData.get('otherRelation') as string,
    otherSource: formData.get('otherSource') as string,
    ownerName: formData.get('ownerName') as string,
    registerOwner: formData.get('registerOwner') as string,
    relation: formData.get('relation') as string,
    source: formData.get('source') as string,
    type: formData.get('type') as string,
  };
};

export const postCashDeposit = async (
  _useFormState: CashDepositFormState,
  formData: FormData
): Promise<CashDepositFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const cashDepositData = await getFormData(formData);
    const result = cashDepositSchema.safeParse(cashDepositData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      cashDepositData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdCashDeposit = await CashDepositService.createCashDeposit(
      cashDepositData
    );
    revalidatePath(routes.declarationId(cashDepositData.declarationId));
    return {
      data: {
        cashDeposit: createdCashDeposit.id,
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

export const deleteCashDeposit = async (
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
    await CashDepositService.deleteCashDeposit(id);
  } catch (error) {
    return {
      errors: {
        _form: [
          'An error occurred while deleting your form. Please try again later.',
        ],
      },
    };
  }
  revalidatePath(routes.declarationId(declarationId));
  return {
    errors: {},
  };
};
