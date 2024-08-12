'use client';
import Link from 'next/link';
import { MdOutlineLockReset } from 'react-icons/md';
import { forgetPassword } from '@/actions/auth/forgetPassword';
import { useFormState } from 'react-dom';

export default function ForgotPassword() {
  const [formState, action] = useFormState(forgetPassword, {});
  return (
    <>
      <MdOutlineLockReset className='text-blue-700 text-6xl mx-auto' />
      <h2 className='text-gray-800  text-2xl font-bold text-center'>
        Forget Password
      </h2>
      <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700'></hr>
      <p className='text-center'>
        Enter your registered email address below. You will be sent an email
        with details of how to reset your password
      </p>

      <form className='max-w-xl mx-auto mt-3' action={action}>
        <div className='relative z-0 w-full my-5 group'>
          <input
            type='email'
            name='email'
            id='email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Email address<span className='text-red-500'>*</span>
          </label>
        </div>

        <div className='flex justify-center w-full my-10'>
          <Link
            href={'/login'}
            className='flex justify-center mr-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6 transition-transform transform hover:scale-105'
          >
            Back to Login
          </Link>
          <button
            type='submit'
            className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6 transition-transform transform hover:scale-105'
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  );
}
