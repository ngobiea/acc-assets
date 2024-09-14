'use client';
import { Button, Input, Typography } from '@/components/materialTailwind';
import { countries } from '@/utils/countries';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postPassport } from '@/actions/setup/passport';
import { passportSchema } from '@/utils/validators/setup';
import { setIsSubmittingPassport } from '@/store/slices/setupSlice/setupSlice';

export default function PassportForm() {
  const dispatch = useAppDispatch();
  const { isSubmittingPassport } = useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postPassport, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PassportFormClient>({
    resolver: zodResolver(passportSchema),
  });

  const onSubmit: SubmitHandler<PassportFormClient> = (data) => {
    dispatch(setIsSubmittingPassport(true));
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('issueDate', data.issueDate);
    formData.append('expiryDate', data.expiryDate);
    formData.append('passportNumber', data.passportNumber);
    action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
    }
    if (
      formState.errors._form ||
      formState.errors.country ||
      formState.errors.expiryDate ||
      formState.errors.issueDate ||
      formState.errors.passportNumber
    ) {
      dispatch(setIsSubmittingPassport(false));
    }
    if (formState.errors.country) {
      setError('country', {
        message: formState.errors.country?.join(', '),
      });
    }
    if (formState.errors.issueDate) {
      setError('issueDate', {
        message: formState.errors.issueDate?.join(', '),
      });
    }
    if (formState.errors.expiryDate) {
      setError('expiryDate', {
        message: formState.errors.expiryDate?.join(', '),
      });
    }
    if (formState.errors.passportNumber) {
      setError('passportNumber', {
        message: formState.errors.passportNumber?.join(', '),
      });
    }
  }, [
    formState?.data,
    formState.errors._form,
    formState.errors.country,
    formState.errors.expiryDate,
    formState.errors.issueDate,
    formState.errors.passportNumber,
    setError,
    dispatch,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
      <Typography variant='h6' color='gray' className='mb-3'>
        Passport Information
      </Typography>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <div className='w-full group mb-6'>
          <Input
            label='Passport Number*'
            placeholder='Enter your passport number'
            {...register('passportNumber')}
            color={errors.passportNumber ? 'red' : 'blue'}
            className={` ${
              errors.passportNumber
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                : ''
            }`}
          />
          <p className='text-sm text-red-500 mt-2'>
            {errors.passportNumber?.message}
          </p>
        </div>
        <div className='w-full group mb-6'>
          <select
            {...register('country')}
            className={`border text-sm rounded-lg  block w-full p-2.5 ${
              errors.country
                ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
            }`}
          >
            <option value={''}>Select Country*</option>
            {countries.map(({ id, value }) => {
              return (
                <option key={id} value={value} className=''>
                  {value}
                </option>
              );
            })}
          </select>
          <p className='text-sm text-red-500 mt-2'>{errors.country?.message}</p>
        </div>
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <div className='w-full group mb-6'>
          <Input
            type='date'
            label='Issue Date*'
            placeholder='Enter passport issue date'
            {...register('issueDate')}
            color={errors.issueDate ? 'red' : 'blue'}
            className={` ${
              errors.issueDate
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                : ''
            }`}
          />
          <p className='text-sm text-red-500 mt-2'>
            {errors.issueDate?.message}
          </p>
        </div>
        <div className='w-full group mb-6'>
          <Input
            type='date'
            label='Enter passport expiry date*'
            placeholder='Expiry Date'
            {...register('expiryDate')}
            color={errors.expiryDate ? 'red' : 'blue'}
            className={` ${
              errors.expiryDate
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                : ''
            }`}
          />
          <p className='text-sm text-red-500 mt-2'>
            {errors.expiryDate?.message}
          </p>
        </div>
      </div>
      <div className='mt-4 w-full flex justify-end'>
        <Button
          type='submit'
          color='blue'
          loading={isSubmittingPassport}
          className=' hover:animate-bounce'
        >
          Add Passport
        </Button>
      </div>
    </form>
  );
}
