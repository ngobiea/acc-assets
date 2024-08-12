'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth/login';
import { useState } from 'react';
import { Button, CardBody, CardFooter, Input, Typography } from '../materialTailwind';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [formState, action] = useFormState(login, { errors: {} });
  const [showPassword, setShowPassword] = useState(false);


   console.log(formState);

  return (
    <form className='space-y-7' noValidate action={action}>
      <CardBody className='flex flex-col gap-4'>
        <div className='w-full group '>
          <Input
            type='email'
            name='email'
            label='Email*'
            placeholder='Email'
            color='blue'
          />
          {formState.errors.email ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.email?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your email`
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password*'
            placeholder='Password'
            color='blue'
            icon={
              showPassword ? (
                <FaEyeSlash
                  className='w-4 h-4'
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className='w-4 h-4'
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
          {formState.errors.password ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`Password must include ${formState.errors.password?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              Use at least 8 characters, one uppercase, one lowercase and one
              number.
            </Typography>
          )}
        </div>
      </CardBody>
      <CardFooter className='pt-0'>
        <div className='flex w-full justify-between mb-5'>
          <Link className=' text-blue-500' href={'/register'}>
            Register a new accounts
          </Link>
          <Link className=' text-blue-500' href={'/forget-password'}>
            Forget Password?
          </Link>
        </div>
        <Button type='submit' variant='gradient' color='blue' fullWidth>
          Sign In
        </Button>
        {/* <FormButton disabled={!email || !password}>Login</FormButton> */}
      </CardFooter>
    </form>
  );
};

export default LoginForm;
