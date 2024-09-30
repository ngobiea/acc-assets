'use server';
import { validateRequest } from '@/lib/verify-auth';
import LiabilityService from '@/services/liability-service';
import { liabilitySchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { revalidatePath } from 'next/cache';
import DeclarationService from '@/services/declaration-service';

const getFormData = async (
  formData: FormData
): Promise<LiabilityClientForm> => {
  return {
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    creditor: formData.get('creditor') as string,
    creditorAddress: formData.get('creditorAddress') as string,
    currencyOutstanding: formData.get('currencyOutstanding') as string,
    debtorName: formData.get('debtorName') as string,
    loanAmount: formData.get('loanAmount') as string,
    loanOutstanding: formData.get('loanOutstanding') as string,
    loanPurpose: formData.get('loanPurpose') as string,
    loanRepayment: formData.get('loanRepayment') as string,
    maturityDate: formData.get('maturityDate') as string,
    otherRelation: formData.get('otherRelation') as string,
    paymentPeriod: formData.get('paymentPeriod') as string,
    relation: formData.get('relation') as string,
    remarks: formData.get('remarks') as string,
    yearContracted: formData.get('yearContracted') as string,
  };
};

export const postLiability = async (
  _useFormState: LiabilityFormState,
  formData: FormData
): Promise<LiabilityFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const liabilityData = await getFormData(formData);
    const result = liabilitySchema.safeParse(liabilityData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      liabilityData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdLiability = await LiabilityService.createLiability(
      liabilityData
    );
    revalidatePath(routes.declarationId(liabilityData.declarationId));
    return {
      errors: {},
      data: {
        liability: createdLiability.id,
      },
    };
  } catch (error) {
    return {
      errors: {
        _form: ['Something went wrong'],
      },
    };
  }
};


export const deleteLiability = async (
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
    await LiabilityService.deleteLiability(id);
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