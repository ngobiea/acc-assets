import { z } from 'zod';
 const numberRegex = /\d/;
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
const uppercaseRegex = /[A-Z]/;
export const registerSchema = z
  .object({
    title: z
      .string()
      .trim()
      .refine(
        (value) =>
          [
            'Amb.',
            'Adv.',
            'CA.',
            'Capt.',
            'Cmdr.',
            'Dr.',
            'Gen.',
            'H/Comm.',
            'Hon.',
            'Lady.',
            'Major.',
            'Minister.',
            'Ms.',
            'Mr',
            'Mrs.',
            'Miss.',
            'Prof.',
            'Rev.',
            'Sqd.Ldr.',
          ].includes(value),
        {
          message: 'Title is invalid',
        }
      ),
    // idType: z
    //   .string({ message: 'ID type is required' })
    //   .min(1, 'ID type is required'),
    pid: z.string().trim().min(1, 'ID number is required'),
    surname: z.string().min(1, 'Surname is required'),
    firstName: z.string().min(1, 'First name is required'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    middleName: z.optional(z.string().trim()),
    password: z
      .string()
      .trim()
      .min(8, 'at least 8 characters')
      .refine((value) => numberRegex.test(value), {
        message: 'one number',
      })
      .refine((value) => specialCharRegex.test(value), {
        message: 'one special character',
      })
      .refine((value) => uppercaseRegex.test(value), {
        message: 'one uppercase letter',
      }),
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords do not match',
    path: ['passwordRepeat'],
  });


 export const loginSchema = z.object({
    email: z
      .string({ message: 'Email address is required' })
      .trim()
      .email('Invalid email address'),
    password: z
      .string({ message: 'Password is required' })
      .trim()
      .min(8, 'at least 8 characters')
      .refine((value) => numberRegex.test(value), {
        message: 'one number',
      })
      .refine((value) => specialCharRegex.test(value), {
        message: 'one special character',
      })
      .refine((value) => uppercaseRegex.test(value), {
        message: 'one uppercase letter',
      }),
  });