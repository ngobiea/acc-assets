'use server';
import { redirect } from 'next/navigation';
import UserService from '@/services/user-service';
import { registerSchema } from '@/utils/validators/auth';
import jsonwebtoken from 'jsonwebtoken';

export const register = async (
  _useFormState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  try {
    const title = formData.get('title') as string;
    const idType = formData.get('idType') as string;
    const pid = formData.get('pid') as string;
    const surname = formData.get('surname') as string;
    const firstName = formData.get('firstName') as string;
    const middleName = formData.get('middleName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('passwordRepeat') as string;

   
    // Validate form data
    const result = registerSchema.safeParse({
      idType,
      pid,
      title,
      surname,
      firstName,
      middleName,
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
      pid,
    });
    if (existingUser) {
      return {
        errors: {
          _form: ['A user with this email or ' + idType + ' already exists'],
          email: ['A user with this email already exists'],
          pid: ['A user with this ' + idType + ' already exists'],
        },
      };
    }
    // password hashing
    const hashedPassword = await UserService.encryptUserPassword(password);
    // Create User
    // const newUser = await UserService.createUser({
    //   title,
    //   email,
    //   password: hashedPassword,
    //   pid,
    //   surname,
    //   firstName,
    //   middleName,
    //   idType,
    // });
    // console.log(newUser);
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
          _form: [err.message],
        },
      };
    }
  }
  redirect('/login');
  return {
    errors: {},
  };
};
