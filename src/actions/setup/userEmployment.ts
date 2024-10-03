'use server';
import UserEmploymentService from '@/services/userEmployment-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import type { UserEmployment } from '@prisma/client';
import { userEmploymentSchema } from '@/utils/validators/setup';
import { revalidatePath } from 'next/cache';
export const postUserEmployment = async (
  _useFormState: UserEmploymentFormState,
  formData: FormData
): Promise<UserEmploymentFormState> => {
  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const mdaId = formData.get('mdaId') as string;
    const employeeCategory = formData.get('employeeCategory') as string;
    const currentPosting = formData.get('currentPosting') as string;
    const designation = formData.get('designation') as string;
    const rankOrGrade = formData.get('rankOrGrade') as string;
    const employeePin = formData.get('employeePin') as string;
    const establishmentRegNo = formData.get('establishmentRegNo') as string;
    const sourceOfIncome = formData.get('sourceOfIncome') as string;
    const isAdministrative = formData.get('isAdministrative') as string;
    const isPolitical = formData.get('isPolitical') as string;
    const isProfessional = formData.get('isProfessional') as string;
    const isFinancial = formData.get('isFinancial') as string;
    const otherSourceOfIncome = formData.get('otherSourceOfIncome') as string;
    const id = formData.get('id') as string;
    const result = userEmploymentSchema.safeParse({
      mdaId,
      designation,
      employeeCategory,
      currentPosting,
      rankOrGrade,
      employeePin,
      establishmentRegNo,
      sourceOfIncome,
      isAdministrative,
      isPolitical,
      isProfessional,
      isFinancial,
      otherSourceOfIncome,
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    let userEmployment: UserEmployment | null = null;
    if (id) {
      console.log('Updating user employment');
      userEmployment = await UserEmploymentService.updateUserEmployment({
        currentUserEmployment: {
          mdaId,
          employeeCategory,
          currentPosting,
          designation,
          rankOrGrade,
          employeePin,
          establishmentRegNo,
          sourceOfIncome:
            sourceOfIncome === 'Other' ? otherSourceOfIncome : sourceOfIncome,
          isAdministrative: isAdministrative === 'Yes',
          isPolitical: isPolitical === 'Yes',
          isProfessional: isProfessional === 'Yes',
          isFinancial: isFinancial === 'Yes',
          otherSourceOfIncome,
          userId: user.id,
        },
        userId: user.id,
      });
    } else {
      console.log('Creating user employment');
      userEmployment = await UserEmploymentService.createUserEmployment({
        mdaId,
        designation,
        employeeCategory,
        currentPosting,
        rankOrGrade,
        employeePin,
        establishmentRegNo,
        sourceOfIncome:
          sourceOfIncome === 'Other' ? otherSourceOfIncome : sourceOfIncome,
        isAdministrative: isAdministrative === 'true',
        isPolitical: isPolitical === 'true',
        isProfessional: isProfessional === 'true',
        isFinancial: isFinancial === 'true',
        otherSourceOfIncome,
        userId: user.id,
      });
    }
    revalidatePath(routes.setup);
    return {
      errors: {},
      data: {
        userEmployment,
      },
    };
  } catch (error) {
    console.log('Error creating user employment:', error);
    return {
      errors: {
        _form: ['Error creating user employment'],
      },
    };
  }
};

