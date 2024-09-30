'use server';
import { validateRequest } from '@/lib/verify-auth';
import PastEmploymentService from '@/services/past-employment-service';
import DeclarationService from '@/services/declaration-service';
import routes from '@/utils/routes';
import { pastEmploymentSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import type { PastEmploymentFormState } from '@/utils/declaration';
import { revalidatePath } from 'next/cache';

const getFormData = (formData: FormData): PastEmploymentClientForm => {
  return {
    employerName: formData.get('employerName') as string,
    designation: formData.get('designation') as string,
    rank: formData.get('rank') as string,
    allowances: formData.get('allowances') as string,
    allowancesCurrency: formData.get('allowancesCurrency') as string,
    allowancesDescription: formData.get('allowancesDescription') as string,
    annualSalary: formData.get('annualSalary') as string,
    contractEndDate: formData.get('contractEndDate') as string,
    contractStartDate: formData.get('contractStartDate') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    otherSourceOfIncome: formData.get('otherSourceOfIncome') as string,
    sourceOfIncome: formData.get('sourceOfIncome') as string,
  };
};

export const postPastEmployment = async (
  _useFormState: PastEmploymentFormState,
  formData: FormData
): Promise<PastEmploymentFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }

    const employmentData = getFormData(formData);
    const result = pastEmploymentSchema.safeParse(employmentData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const isDeclarationExist = await DeclarationService.isDeclarationExist(
      employmentData.declarationId
    );
    if (!isDeclarationExist) {
      return {
        errors: {
          _form: ['Declaration does not exist please create a new declaration'],
        },
      };
    }
    const createdEmployment = await PastEmploymentService.createEmployment(
      employmentData
    );
    revalidatePath(routes.declarationId(employmentData.declarationId));
    return {
      data: {
        employment: createdEmployment,
      },
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: [
          'An error occurred while submitting your form. Please try again later.',
        ],
      },
    };
  }
};

export const deletePastEmployment = async (
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
    await PastEmploymentService.deleteEmployment(id);
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
