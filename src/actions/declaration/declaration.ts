'use server';

import { validateRequest } from '@/lib/verify-auth';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';
import DeclarationService from '@/services/declaration-service';

import { declarationSchema } from '@/utils/validators/declaration';
import type { Declaration } from '@prisma/client';
import { revalidatePath } from 'next/cache';


export const postDeclaration = async (
  _useFormState: DeclarationFormState,
  formData: FormData
): Promise<DeclarationFormState> => {
    let declaration: DeclarationData | null = null;

  try {
    const { user } = await validateRequest();
    if (!user) {
      redirect(routes.login);
    }
    const reason = formData.get('reason') as string;
    const place = formData.get('place') as string;
    const otherReason = formData.get('otherReason') as string;
    const isUseLastDeclaration = formData.get('isUseLastDeclaration') as string;
    const result = declarationSchema.safeParse({
      reason,
      place,
      otherReason: reason === 'Other' ? otherReason : '',
      isUseLastDeclaration,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    if (isUseLastDeclaration === 'Yes') {
      declaration = await DeclarationService.createFromLastDeclaration(user.id);
    } else {
      declaration = await DeclarationService.createDeclaration({
        place,
        reason: reason === 'Other' ? otherReason : reason,
        userId: user.id,
      });
    }

    return {
      errors: {},
      data: {
        declaration,
      },
    };
  } catch (error) {
    console.log('Error creating declaration', error);
    return {
      errors: {
        _form: ['Error creating declaration'],
      },
    };
    }

};
