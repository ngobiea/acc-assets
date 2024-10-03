
import { CardHeader } from '@/components/materialTailwind';
import { validateRequest } from '@/lib/verify-auth';
import UserService from '@/services/user-service';
import { IoMdLogIn } from 'react-icons/io';
import { getEmailSession } from '@/lib/email';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import React from 'react';
import VerifyForm from '@/components/auth/verification-form';
export default async function VerifyPage() {
  const email = getEmailSession();
  if (!email) {
    redirect(routes.login)
  }
    
  return (
    <>
      <CardHeader
        variant='gradient'
        color='green'
        className='mb-4 grid h-28 place-items-center'
      >
        <IoMdLogIn className='text-white text-6xl mx-auto' />
        <h2 className='text-white  text-2xl font-bold text-center'>
          Email Verification
        </h2>
        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'></hr>
      </CardHeader>
      <VerifyForm email={email.value} />
    </>
  );
}
