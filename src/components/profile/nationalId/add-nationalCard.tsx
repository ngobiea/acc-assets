'use client';
import { Button, Dialog, DialogBody, DialogHeader, IconButton, Input, Typography } from '@/components/materialTailwind';
import { countries } from '@/utils/countries';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postNationalCard } from '@/actions/setup/nationalCard';
import { nationalCardSchema } from '@/utils/validators/setup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { setIsSubmittingNationalCard,setIsShowNationalCardUpdateForm } from '@/store/slices/setupSlice/setupSlice';
import { HiXMark } from 'react-icons/hi2';
export default function NationalCardUpdateForm() {
  const dispatch = useAppDispatch();
  const { isSubmittingNationalCard,isShowNationalCardUpdateForm } = useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postNationalCard, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NationalCardFormClient>({
    resolver: zodResolver(nationalCardSchema),
  });
  const onSubmit: SubmitHandler<NationalCardFormClient> = (data) => {
    dispatch(setIsSubmittingNationalCard(true));
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('issueDate', data.issueDate);
    formData.append('expiryDate', data.expiryDate);
    formData.append('nationalId', data.nationalId);
    console.log(data);
    // action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
    }
    if (
      formState.errors._form ||
      formState.errors.country ||
      formState.errors.expiryDate ||
      formState.errors.issueDate ||
      formState.errors.nationalId
    ) {
      dispatch(setIsSubmittingNationalCard(false));
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
    if (formState.errors.nationalId) {
      setError('nationalId', {
        message: formState.errors.nationalId?.join(', '),
      });
    }
  }, [
    formState?.data,
    formState.errors._form,
    formState.errors.country,
    formState.errors.expiryDate,
    formState.errors.issueDate,
    formState.errors.nationalId,
    setError,
    dispatch,
  ]);
  return (
    <Dialog
      open={isShowNationalCardUpdateForm}
      size='lg'
      handler={() => {
        dispatch(
          setIsShowNationalCardUpdateForm(!isShowNationalCardUpdateForm)
        );
      }}
      className='relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray' className='md:pl-10'>
          Add National Card
        </Typography>

        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowNationalCardUpdateForm(false));
          }}
        >
          <HiXMark className='h-5 w-5' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='sm:h-[calc(100vh-300px)] h-[calc(100vh-150px)]  overflow-y-auto'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-3xl mx-auto py-10'
        >
          <Typography variant='h6' color='gray' className='mb-3'>
            National Card Information
          </Typography>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label='National ID Number*'
                placeholder='Enter your National ID number'
                {...register('nationalId')}
                color={errors.nationalId ? 'red' : 'blue'}
                className={` ${
                  errors.nationalId
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-sm text-red-500 mt-2'>
                {errors.nationalId?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
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
              <p className='text-sm text-red-500 mt-2'>
                {errors.country?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                type='date'
                label='Issue Date*'
                placeholder='Enter National Card issue date'
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
            <div className='w-full group mb-5'>
              <Input
                type='date'
                label='Enter National Car expiry date*'
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
              loading={isSubmittingNationalCard}
              className=' hover:animate-bounce'
            >
              Add National Card
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
