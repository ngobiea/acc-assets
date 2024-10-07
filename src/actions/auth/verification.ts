'use server';

import { redirect } from 'next/navigation';
import UserService from '@/services/user-service';
import routes from '@/utils/routes';
import { sixDigit } from '@/utils/declarations/id-generator';
import { sendVerificationEmail } from '@/utils/email/node-mailer';
import { verifyEmailSchema } from '@/utils/validators/auth';
import { getEmailSession } from '@/lib/email';

export const postVerifyEmail = async (
  _useFormState: VerifyEmailFormState,
  formData: FormData
): Promise<VerifyEmailFormState> => {
  try {
    const code = formData.get('code') as string;
    const result = verifyEmailSchema.safeParse({ code });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const email = getEmailSession();
    if (!email) {
      return {
        errors: {
          _form: [
            'An error occur while verifying code, please login with your valid email',
          ],
        },
      };
    }
    const user = await UserService.isUserExist({ email: email.value });
    if (!user) {
      return {
        errors: {
          _form: ['User does not exist, please register'],
        },
      };
    }
    if (user.data?.code !== code) {
      return {
        errors: {
          _form: ['Invalid code'],
        },
      };
    }
    const verify = await UserService.verifyEmail({ email: email.value });
  } catch (error) {
    return {
      errors: {
        _form: ['An error occur while verifying email, please try again'],
      },
    };
  }
  redirect(routes.login);
};

export const resendVerificationEmail = async (
  _useFormState: ResendFormState,
  _formData: FormData
): Promise<ResendFormState> => {
  try {
    const email = getEmailSession();
    if (!email) {
      return {
        errors: {
          _form: [
            'An error occur while resending verification email, please login with your valid email',
          ],
        },
      };
    }
    const user = await UserService.isUserExist({ email: email.value });
    if (!user) {
      return {
        errors: {
          _form: ['Email does not exist, please register with a valid email'],
        },
      };
    }
    const code = sixDigit();
    await UserService.updateCode({ email: email.value, code });

    const mail = await sendVerificationEmail({
      email: email.value,
      token: code,
      name: email.value,
    });
    if (!mail) {
      return {
        errors: {
          _form: [
            'An error occur while resending verification email, please try again',
          ],
        },
      };
    }
    return {
      errors: {
        message: ['Verification email has been sent, please check your email'],
      },
    };
  } catch (error) {
    return {
      errors: {
        _form: [
          'An error occur while resending verification email, please try again',
        ],
      },
    };
  }
};

export const sendEmail = async (
  _useFormState: ResendFormState,
  _formData: FormData
): Promise<ResendFormState> => {
  try {
    const email = getEmailSession();
    if (!email) {
      return {
        errors: {
          _form: ['invalid email, please login with a valid email'],
        },
      };
    }
    const user = await UserService.isUserExist({ email: email.value });
    if (!user) {
      return {
        errors: {
          _form: ['User does not exist, please register'],
        },
      };
    }
    const code = sixDigit();
    await UserService.updateCode({ email: email.value, code });
    const mail = await sendVerificationEmail({
      email: email.value,
      token: code,
      name: email.value,
    });
  } catch (error) {
    return {
      errors: {
        _form: [
          'An error occur while resending verification email, please try again',
        ],
      },
    };
  }
  redirect(routes.verify);
};
