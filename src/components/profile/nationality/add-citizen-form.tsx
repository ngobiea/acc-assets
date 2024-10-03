'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from '@/components/materialTailwind';
import { postNationality } from '@/actions/setup/citizenship';
import { acquireNationalityBy, countries } from '@/utils/countries';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nationalitySchema } from '@/utils/validators/setup';
import {
  setIsSubmittingCitizenship,
  setIsShowCitizenshipUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { HiXMark } from 'react-icons/hi2';
import SelectInput from '@/components/common/form/select-input';

export default function CitizenUpdateForm() {
  const dispatch = useAppDispatch();
  const { isSubmittingCitizenship, isShowCitizenshipUpdateForm } =
    useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postNationality, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(nationalitySchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setIsSubmittingCitizenship(true));
    const submitted = data as CitizenshipForm;
    const formData = new FormData();
    formData.append('country', submitted.country);
    formData.append('acquireBy', submitted.acquireBy);
    action(formData);
  };
  useEffect(() => {
    if (formState?.data) {
      dispatch(setIsShowCitizenshipUpdateForm(false));
      dispatch(setIsSubmittingCitizenship(false));
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

  useEffect(() => {
    if (!isShowCitizenshipUpdateForm) {
      reset();
    }
  }, [isShowCitizenshipUpdateForm, reset]);
  return (
    <Dialog
      open={isShowCitizenshipUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowCitizenshipUpdateForm(!isShowCitizenshipUpdateForm));
      }}
      className='relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray' className=' text-center'>
          Add Citizenship
        </Typography>

        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowCitizenshipUpdateForm(false));
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
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={countries}
              register={register}
              value='country'
              label='Select Country*'
              title='Select Country'
            />
            <SelectInput
              errors={errors}
              options={acquireNationalityBy}
              register={register}
              value='acquireBy'
              label='Select'
              title='Acquire By*'
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
              loading={isSubmittingCitizenship}
            >
              Add Nationality
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
