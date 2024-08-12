'use server';

import { loginSchema } from '@/utils/validators/auth';
import { redirect } from 'next/navigation';
import UserService from '@/services/user-service';

export const login = async (
  _useFormState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  console.log(email, password);
  try {
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
    if (!user) {
      return {
        errors: {
          _form: ['User does not exist'],
          email: ['User does not exist'],
        },
      };
    }
    //
    const isValidPassword = await UserService.isValidUserPassword(password, user.password as string);

    if (!isValidPassword) {
      return {
        errors: {
          _form: ['Invalid password'],
          password: ['Invalid password'],
        },
      };
    }
    //
    await UserService.crateUserSession(user.id as string);





  } catch (error) {
    console.error('Error logging in:', error);
    return {
      errors: {
        _form: ['An error occurred while logging in. Please try again'],
      },
    };
   }
   redirect('/');
  return {
    errors: {},
  };
};
