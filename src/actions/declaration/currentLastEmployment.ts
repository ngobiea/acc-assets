'use server';
import { validateRequest } from '@/lib/verify-auth';
import EmploymentService from '@/services/current-employment';
import DeclarationService from '@/services/declaration-service';
import routes from '@/utils/routes';
import { employmentSchema } from '@/utils/validators/declaration';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const getFormData = (formData: FormData): EmploymentClientForm => {
  return {
    mdaId: formData.get('mdaId') as string,
    employeeCategory: formData.get('employeeCategory') as string,
    posting: formData.get('posting') as string,
    designation: formData.get('designation') as string,
    rank: formData.get('rank') as string,
    allowances: formData.get('allowances') as string,
    allowancesCurrency: formData.get('allowancesCurrency') as string,
    allowancesDescription: formData.get('allowancesDescription') as string,
    annualSalary: formData.get('annualSalary') as string,
    contractEndDate: formData.get('contractEndDate') as string,
    contractStartDate: formData.get('contractStartDate') as string,
    contractType: formData.get('contractType') as string,
    currency: formData.get('currency') as string,
    declarationId: formData.get('declarationId') as string,
    employeeId: formData.get('employeeId') as string,
    employeeNo: formData.get('employeeNo') as string,
    establishmentRegNo: formData.get('establishmentRegNo') as string,
    otherSourceOfIncome: formData.get('otherSourceOfIncome') as string,
    sourceOfIncome: formData.get('sourceOfIncome') as string,
    SSNo: formData.get('SSNo') as string,
  };
};
export const postCurrentLastEmployment = async (
  _useFormState: EmploymentFormState,
  formData: FormData
): Promise<EmploymentFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const employmentData = getFormData(formData);
    const result = employmentSchema.safeParse(employmentData);
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
    const createdEmployment = await EmploymentService.createEmployment(
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

export const deleteCurrentLastEmployment = async (
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

    await EmploymentService.deleteEmployment(id);
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
