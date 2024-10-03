'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from '@/components/materialTailwind';
import { countries } from '@/utils/countries';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postPassport } from '@/actions/setup/passport';
import { passportSchema } from '@/utils/validators/setup';
import {
  setIsSubmittingPassport,
  setIsShowPassportUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { HiXMark } from 'react-icons/hi2';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
export default function PassportUpdateForm() {
  const dispatch = useAppDispatch();
  const { isSubmittingPassport, isShowPassportUpdateForm } = useAppSelector(
    (state) => state.setup
  );
  const [formState, action] = useFormState(postPassport, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(passportSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setIsSubmittingPassport(true));
    const submitted = data as PassportFormClient;
    const formData = new FormData();
    formData.append('country', submitted.country);
    formData.append('issueDate', submitted.issueDate);
    formData.append('expiryDate', submitted.expiryDate);
    formData.append('passportNumber', submitted.passportNumber);
    action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
      dispatch(setIsShowPassportUpdateForm(false));
      dispatch(setIsSubmittingPassport(false));
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
  useEffect(() => {
    if (!isShowPassportUpdateForm) {
      reset();
    }
  }, [isShowPassportUpdateForm, reset]);
  console.log(errors);
  console.log(formState)
  return (
    <Dialog
      open={isShowPassportUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowPassportUpdateForm(!isShowPassportUpdateForm));
      }}
      className='relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray' className=' text-center'>
          Add Passport
        </Typography>
        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowPassportUpdateForm(false));
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
            Passport Information
          </Typography>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Passport Number*'
              placeholder='Enter your passport number'
              register={register}
              value='passportNumber'
            />
            <SelectInput
              errors={errors}
              options={countries}
              register={register}
              value='country'
              label='Select Country*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              type='date'
              label='Issue Date*'
              placeholder='Enter passport issue date'
              register={register}
              value='issueDate'
              errors={errors}
            />
            <TextInput
              type='date'
              label='Enter passport expiry date*'
              placeholder='Expiry Date'
              errors={errors}
              register={register}
              value='expiryDate'
            />
          </div>
          {formState.errors._form && (
            <div className='flex w-full justify-between my-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
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
      </DialogBody>
    </Dialog>
  );
}
