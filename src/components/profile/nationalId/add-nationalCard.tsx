'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from '@/components/materialTailwind';
import { countries } from '@/utils/countries';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postNationalCard } from '@/actions/setup/nationalCard';
import { nationalCardSchema } from '@/utils/validators/setup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  setIsSubmittingNationalCard,
  setIsShowNationalCardUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { HiXMark } from 'react-icons/hi2';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
export default function NationalCardUpdateForm() {
  const dispatch = useAppDispatch();
  const { isSubmittingNationalCard, isShowNationalCardUpdateForm } =
    useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postNationalCard, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(nationalCardSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setIsSubmittingNationalCard(true));
    const submitted = data as NationalCardFormClient;
    const formData = new FormData();
    formData.append('country', submitted.country);
    formData.append('issueDate', submitted.issueDate);
    formData.append('expiryDate', submitted.expiryDate);
    formData.append('nationalId', submitted.nationalId);
    action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
      dispatch(setIsShowNationalCardUpdateForm(false));
      dispatch(setIsSubmittingNationalCard(false));
    }
    // stop button loading if any field error occurs
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
  useEffect(() => {
    if (!isShowNationalCardUpdateForm) {
      reset();
    }
  }, [isShowNationalCardUpdateForm, reset]);
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
            <TextInput
              errors={errors}
              label='National ID Number*'
              placeholder='Enter your National ID number'
              register={register}
              value='nationalId'
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
              errors={errors}
              label='Issue Date*'
              placeholder='Enter National Card issue date'
              register={register}
              value='issueDate'
              type='date'
            />
            <TextInput
              errors={errors}
              label='Expiry Date*'
              placeholder='Enter National Card expiry date'
              register={register}
              value='expiryDate'
              type='date'
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
