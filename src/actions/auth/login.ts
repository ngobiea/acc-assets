'use server';

import { loginSchema } from '@/utils/validators/auth';
import UserService from '@/services/user-service';
import { createEmailSession, deleteEmailSession } from '@/lib/email';
import { destroySession } from '@/lib/auth';
// import { sendVerificationEmail } from '@/utils/email/node-mailer';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';

export const login = async (
  _useFormState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // await new Promise((resolve) => setTimeout(resolve, 5000));

    const result = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    //
    const user = await UserService.isUserExist({ email });
    if (!user.data) {
      return {
        errors: {
          email: ['User does not exist. Please sign up'],
        },
      };
    }
    createEmailSession(email);
    if (!user.data.isVerified) {
      return {
        errors: {
          emailVerified: ['Email not verified yet. Please verify your email'],
        },
      };
    }
    //
    const isValidPassword = await UserService.isValidUserPassword(
      password,
      user.data.password || ''
    );

    if (!isValidPassword) {
      return {
        errors: {
          password: ['Invalid password'],
        },
      };
    }
    //
   await UserService.crateUserSession(user.data.id as string);
    return {
      errors: {},
      data: {
        email: user.data.email,
      },
    };
    console.error('Error logging in:', error);
    return {
      errors: {
        _form: ['An error occurred while logging in. Please try again'],
      },
    };
};

export const logout = async (
  _useFormState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> => {
  const sessionStatus = await destroySession();
  redirect(routes.login);
};
