'use client';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '../materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { postVerifyEmail } from '@/actions/auth/verification';
import { verifyEmailSchema } from '@/utils/validators/auth';
import ResendButton from './resend-button';
export default function VerifyForm({ email }: { email: string }) {
  const [formState, action] = useFormState(postVerifyEmail, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<verifyClientForm>({
    resolver: zodResolver(verifyEmailSchema),
  });

  useEffect(() => {
    if (formState.errors.code) {
      setError('code', {
        message: formState.errors.code.join(', '),
      });
    }
  }, [formState.errors.code, setError]);

  const onSubmit: SubmitHandler<verifyClientForm> = (data) => {
    const formData = new FormData();
    formData.append('code', data.code);
    action(formData);
    console.log(data);
  };

  return (
    <>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <CardBody className=' space-y-3'>
          <Typography variant='h3' className='text-center'>
            Please check your email inbox
          </Typography>
          <Typography className='text-center'>
            {`Check span folder if you can't find the email in your inbox`}
          </Typography>
          <Typography className='text-center'>{`We have sent a 6 digit code to ${email}`}</Typography>
          <div className='flex justify-center w-full'>
            <div>
              <Input
                {...register('code')}
                label='Code*'
                placeholder='Enter the code'
                color='blue'
                className='text-center'
                error={errors.code ? true : false}
              />
            </div>
          </div>
          <p className='text-red-500 mt-2 gap-1 font-normal text-center'>
            {errors.code?.message}
          </p>

          {formState.errors._form && (
            <p className='text-red-500 mt-2 text-center gap-1 font-normal'>
              {formState.errors._form.join(', ')}
            </p>
          )}
          <div className='flex w-full justify-center mb-3'>
            <Button
              type='submit'
              variant='gradient'
              color='blue'
              className=' hover:animate-bounce'
            >
              Verify
            </Button>
          </div>
        </CardBody>
      </form>
      <ResendButton />
    </>
  );
}
