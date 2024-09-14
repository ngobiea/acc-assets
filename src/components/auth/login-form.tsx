'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '@/actions/auth/login';
import { useEffect, useState } from 'react';
import { Button, CardBody, CardFooter } from '../materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginSchema } from '@/utils/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import routes from '@/utils/routes';
import { FcGoogle } from 'react-icons/fc';
import Divider from '../common/divider';
import SubmitButton from './button/submitButton';
import TextInput from '../common/form/text-input';
import PasswordInput from '../common/form/password-input';

const LoginForm = () => {
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
    if (formState.errors.email) {
      setError('email', {
        message: formState.errors.email.join(', '),
      });
    }
    if (formState.errors.password) {
      setError('password', {
        message: formState.errors.password.join(', '),
      });
    }
  }, [formState.errors.email, formState.errors.password, setError]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as LoginClientForm;
    const formData = new FormData();
    formData.append('email', submitted.email);
    formData.append('password', submitted.password);
    action(formData);
  };

  return (
    <form className='space-y-7' onSubmit={handleSubmit(onSubmit)}>
      <CardBody className='flex flex-col gap-4'>
        <div className='flex w-full justify-center'>
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
        <Divider />
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
      </CardBody>
      <CardFooter className='pt-0'>
        <div className='flex w-full justify-end'>
          <SubmitButton title='Login' />
        </div>
        <div className='flex w-full justify-between mt-3'>
          <Link className=' text-blue-500' href={'/register'}>
            Register a new accounts
          </Link>
          <Link className=' text-blue-500' href={'/forget-password'}>
            Forget Password?
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};
export default LoginForm;
