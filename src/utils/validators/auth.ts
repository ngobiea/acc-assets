import { z } from 'zod';
const numberRegex = /\d/;
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
const uppercaseRegex = /[A-Z]/;
export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address'),
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
    passwordRepeat: z.string({ message: 'Password confirmation is required' }),
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

export const verifyEmailSchema = z.object({
  code: z
    .string({ message: 'Verification code is required' })
    .min(6, { message: 'Verification code must be 6 digits' })
    .max(6, { message: 'Verification code must be 6 digits' }),
});
