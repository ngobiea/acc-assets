'use client';

// import { Button } from 'flowbite-react';
import { useFormStatus } from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { Button } from '../materialTailwind';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function FormButton({ children,disabled }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled}
      type='submit'
      loading={pending}
      color={'blue'}
      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6 transition-transform transform hover:scale-105'
      // processingSpinner={<AiOutlineLoading className='h-6 w-6 animate-spin' />}
      size={'md'}
    >
      {children}
    </Button>
  );
}
