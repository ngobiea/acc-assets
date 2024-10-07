'use server';
import UserService from '@/services/user-service';
import { registerSchema } from '@/utils/validators/auth';
import { sixDigit } from '@/utils/declarations/id-generator';
import { sendVerificationEmail } from '@/utils/email/node-mailer';
import { createEmailSession } from '@/lib/email';
export const signup = async (
  _useFormState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
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
  if (existingUser.data) {
    return {
      errors: {
        email: [existingUser.message],
      },
    };
  }
  // password hashing
  const hashedPassword = await UserService.encryptUserPassword(password);
  if (!hashedPassword) {
    return {
      errors: {
        _form: ['An error occur while registering user, please try again'],
      },
    };
  }
  const getCode = sixDigit();

  // Create User
  const newUser = await UserService.createUser({
    email,
    password: hashedPassword,
    code: getCode,
  });
  if (!newUser.data) {
    return {
      errors: {
        _form: ['An error occur while registering user, please try again'],
      },
    };
  }
  createEmailSession(email);

  // Send Email
  const mail = await sendVerificationEmail({
    email,
    token: getCode,
    name: email,
  });
  if (!mail) {
    return {
      errors: {
        _form: [
          'An error occur while sending verification email, please verify your email and try again',
        ],
      },
    };
  }
  return {
    errors: {},
    data: {
      email,
    },
  };
};
