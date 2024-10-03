'use client';
import Link from 'next/link';
import { IoMdLogIn } from 'react-icons/io';
import { changePassword } from '@/actions/auth/changePassword';
import { useFormState } from 'react-dom';
import React from 'react';
const ChangePasswordPage = () => {
  const [formState, action] = useFormState(changePassword, {});
  return (
    <>
      <IoMdLogIn className='text-blue-700 text-6xl mx-auto' />
      <h2 className='text-gray-800  text-2xl font-bold text-center'>Login</h2>
      <hr className='h-px my-8 bg-gray-600 border-0 dark:bg-gray-700'></hr>

      <form className='max-w-xl mx-auto'>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='password'
            id='password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password<span className='text-red-500'>*</span>
          </label>
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='confirmPassword'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Re-Type Your Password<span className='text-red-500'>*</span>
          </label>
        </div>
        <div className='flex w-full justify-between mb-5'>
          <Link className=' text-blue-500' href={'/register'}>
            Register a new account
          </Link>
          <Link className=' text-blue-500' href={'/forget-password'}>
            Forget Password?
          </Link>
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sw-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ChangePasswordPage;
