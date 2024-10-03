'use client';
import { useFormState } from 'react-dom';
import { signup } from '@/actions/auth/register';
import { Typography, CardBody, CardFooter, Button } from '../materialTailwind';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema } from '@/utils/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../common/form/text-input';
import { setSubmittingRegister } from '@/store/slices/authSlice/authSlice';
import PasswordInput from '../common/form/password-input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import routes from '@/utils/routes';

const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSubmittingRegister } = useAppSelector((state) => state.auth);
  const [formState, action] = useFormState(signup, { errors: {} });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (formState.data) {
      dispatch(setSubmittingRegister(false));
      router.push(routes.verify);
    }
    if (formState.errors._form) {
      dispatch(setSubmittingRegister(false));
    }
    if (formState.errors.email) {
      dispatch(setSubmittingRegister(false));
      setError('email', {
        message: formState.errors.email.join(', '),
      });
    }
    if (formState.errors.password) {
      dispatch(setSubmittingRegister(false));
      setError('password', {
        message: formState.errors.password.join(', '),
      });
    }
    if (formState.errors.passwordRepeat) {
      dispatch(setSubmittingRegister(false));
      setError('passwordRepeat', {
        message: formState.errors.passwordRepeat.join(', '),
      });
    }
  }, [formState, setError, dispatch, router]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setSubmittingRegister(true));
    const submitted = data as RegisterClientForm;
    const formData = new FormData();
    formData.append('email', submitted.email);
    formData.append('password', submitted.password);
    formData.append('passwordRepeat', submitted.passwordRepeat);
    action(formData);
  };

  return (
    <form className='space-y-7' onSubmit={handleSubmit(onSubmit)}>
      <CardBody className='flex flex-col gap-2'>
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
        <PasswordInput
          register={register}
          errors={errors}
          label='Repeat Password*'
          placeholder='Repeat your password'
          value='passwordRepeat'
          onClickIcon={() => setShowRepeatPassword(!showRepeatPassword)}
          isShowPassword={showRepeatPassword}
        />
        {formState.errors._form && (
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {formState.errors._form.join(', ')}
          </p>
        )}
      </CardBody>
      <CardFooter className='pt-0'>
        <div className='flex w-full justify-end'>
          <Button
            type='submit'
            variant='gradient'
            color='blue'
            loading={isSubmittingRegister}
            className=' hover:animate-bounce'
          >
            Register
          </Button>
        </div>
        <Typography variant='small' className='mt-6  text-center'>
          Create an account to register yourself in Income, Assets & Liabilities
          Declaration System. Or{' '}
          <Link href='/login' color='blue' className=' font-bold text-blue-500'>
            Login with your existing account
          </Link>
        </Typography>
      </CardFooter>
    </form>
  );
};
export default RegisterForm;
