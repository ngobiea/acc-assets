import { cookies } from 'next/headers';

export const createEmailSession = (email: string) => {
  cookies().set('accsl_user_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 31,
    sameSite: 'strict',
    path: '/',
  });
};
export const deleteEmailSession = () => {
  cookies().delete('accsl_user_email');
};

export const getEmailSession = () => {
  return cookies().get('accsl_user_email');
};
