'use client';
import { Button, Typography } from '@/components/materialTailwind';
import { postNationality } from '@/actions/setup/citizenship';
import { acquireNationalityBy, countries } from '@/utils/countries';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nationalitySchema } from '@/utils/validators/setup';
import { setIsSubmittingCitizenship } from '@/store/slices/setupSlice/setupSlice';

export default function Citizenship() {
  const dispatch = useAppDispatch();
  const { isSubmittingCitizenship } = useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postNationality, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CitizenshipForm>({
    resolver: zodResolver(nationalitySchema),
  });

  const onSubmit: SubmitHandler<CitizenshipForm> = (data) => {
    dispatch(setIsSubmittingCitizenship(true));
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('acquireBy', data.acquireBy);
    action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
    }
    if (
      formState.errors._form ||
      formState.errors.country ||
      formState.errors.acquireBy
    ) {
      dispatch(setIsSubmittingCitizenship(false));
    }
    if (formState.errors.acquireBy) {
      setError('acquireBy', {
        message: formState.errors.acquireBy?.join(', '),
      });
    }
    if (formState.errors.country) {
      setError('country', {
        message: formState.errors.country?.join(', '),
      });
    }
  }, [
    formState?.data,
    formState.errors._form,
    formState.errors.acquireBy,
    formState.errors.country,
    dispatch,
    setError,
  ]);

  return (
    <form className='pb-10' onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h6' color='blue-gray'>
        Other Nationalities Information
      </Typography>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <div className='w-full group mb-5'>
          <Typography variant='small' className='text-gray-800' as={'label'}>
            Other Nationality*
          </Typography>
          <select
            {...register('country')}
            className={`border text-sm rounded-lg  block w-full p-2.5 ${
              errors.country
                ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
            }`}
          >
            <option value={''}>Select Country</option>

            {countries.map(({ id, value }) => {
              return (
                <option key={id} value={value} className=''>
                  {value}
                </option>
              );
            })}
          </select>
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {errors.country?.message}
          </p>
        </div>
        <div className='w-full group'>
          <Typography variant='small' className='text-gray-800' as={'label'}>
            Acquire By*
          </Typography>
          <select
            {...register('acquireBy')}
            className={`border text-sm rounded-lg  block w-full p-2.5 ${
              errors.acquireBy
                ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
            }`}
          >
            <option value={''}>Select</option>
            {acquireNationalityBy.map(({ id, value }) => {
              return (
                <option key={id} value={value} className=''>
                  {value}
                </option>
              );
            })}
          </select>
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {errors.acquireBy?.message}
          </p>
        </div>
      </div>
      {formState.errors._form && (
        <div className='flex w-full justify-between my-5 text-red-500'>
          <Typography>{formState.errors._form.join(', ')}</Typography>
        </div>
      )}
      <div className='mt-4 w-full flex justify-end'>
        <Button type='submit' color='blue' loading={isSubmittingCitizenship}>
          Add Nationality
        </Button>
      </div>
    </form>
  );
}
