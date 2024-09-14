'use server';
import { redirect } from 'next/navigation';
import UserService from '@/services/user-service';
import { registerSchema } from '@/utils/validators/auth';
import jsonwebtoken from 'jsonwebtoken';

export const signup = async (
  _useFormState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

    // Validate form data
    const result = registerSchema.safeParse({
      email,
      password,
      passwordRepeat,
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    // Check for Existing Users
    const existingUser = await UserService.isUserExist({
      email,
    });
    if (existingUser) {
      return {
        errors: {
          _form: ['A user with this email already exists'],
          email: ['A user with this email already exists'],
        },
      };
    }
    // password hashing
    const hashedPassword = await UserService.encryptUserPassword(password);
    // Create User
    const newUser = await UserService.createUser({
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    // Generate Confirmation Token and Send Email
    // const token = jsonwebtoken.sign(
    //   {
    //     email: newUser.email,
    //     id: newUser.id,
    //   },
    //   process.env.JWT_SECRET as string,
    //   {
    //     expiresIn: '1h',
    //   }
    // );
    // const confirmationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-email?token=${token}`;
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      return {
        errors: {
          _form: ['An error occur while registering, please try again'],
        },
      };
    }
  }
  redirect('/login');
  return {
    errors: {},
  };
};
