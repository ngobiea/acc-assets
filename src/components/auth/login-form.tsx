'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth/login';
import { useEffect, useState } from 'react';
import { Button, CardBody, CardFooter } from '../materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchema } from '@/utils/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from './button/submitButton';
import TextInput from '../common/form/text-input';
import PasswordInput from '../common/form/password-input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import routes from '@/utils/routes';
import { setSubmittingLogin } from '@/store/slices/authSlice/authSlice';
import React from 'react';
import SendButton from './send-verification';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSubmittingLogin } = useAppSelector((state) => state.auth);
  const [formState, action] = useFormState(login, { errors: {} });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (formState.data) {
      dispatch(setSubmittingLogin(false));
      router.push(routes.home);
    }
    if (formState.errors._form || formState.errors.emailVerified) {
      dispatch(setSubmittingLogin(false));
    }
    if (formState.errors.email) {
      dispatch(setSubmittingLogin(false));

      setError('email', {
        message: formState.errors.email.join(', '),
      });
    }
    if (formState.errors.password) {
      dispatch(setSubmittingLogin(false));
      setError('password', {
        message: formState.errors.password.join(', '),
      });
    }
  }, [dispatch, formState, router, setError]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setSubmittingLogin(true));
    const submitted = data as LoginClientForm;
    const formData = new FormData();
    formData.append('email', submitted.email);
    formData.append('password', submitted.password);
    action(formData);
  };

  return (
    <>
      <form className='space-y-7' onSubmit={handleSubmit(onSubmit)}>
        <CardBody className='flex flex-col gap-4'>
          {/* <div className='flex w-full justify-center'>
          <Link href={routes.googleLogin}>
            <Button
              size='lg'
              variant='outlined'
              color='blue'
              className='flex items-center gap-3 hover:animate-bounce'
            >
              <FcGoogle className='h-6 w-6' />
              Continue with Google (Gmail)
            </Button>
          </Link>
        </div>
        <Divider /> */}
          <TextInput
            register={register}
            errors={errors}
            label='Email Address*'
            placeholder='Enter your email address'
            type='email'
            value='email'
          />
          <PasswordInput
            register={register}
            errors={errors}
            label='Password*'
            placeholder='Use at least 8 characters, one uppercase, one lowercase and one number.'
            value='password'
            onClickIcon={() => setShowPassword(!showPassword)}
            isShowPassword={showPassword}
          />
          {formState.errors._form && (
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {formState.errors._form.join(', ')}
            </p>
          )}
          <div className='flex w-full justify-end'>
            <Button
              type='submit'
              variant='gradient'
              color='blue'
              loading={isSubmittingLogin}
              className=' hover:animate-bounce'
            >
              Login
            </Button>
          </div>
        </CardBody>
      </form>
      <CardFooter className='pt-0'>
        {formState.errors.emailVerified && <SendButton />}
        <div className='flex w-full justify-between mt-3'>
          <Link className=' text-blue-500' href={'/register'}>
            Register a new accounts
          </Link>
          <Link className=' text-blue-500' href={'/forget-password'}>
            Forget Password?
          </Link>
        </div>
      </CardFooter>
    </>
  );
};
export default LoginForm;
