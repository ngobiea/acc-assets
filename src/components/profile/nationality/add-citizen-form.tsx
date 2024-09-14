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
  } = useForm<CitizenshipForm>({
    resolver: zodResolver(nationalitySchema),
  });

  const onSubmit: SubmitHandler<CitizenshipForm> = (data) => {
    dispatch(setIsSubmittingCitizenship(true));
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('acquireBy', data.acquireBy);
    //   action(formData);
      console.log(data);
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
          Add National Card
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
          <Typography variant='h6' color='blue-gray'>
            Other Nationalities Information
          </Typography>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-5'>
              <Typography
                variant='small'
                className='text-gray-800'
                as={'label'}
              >
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
              <Typography
                variant='small'
                className='text-gray-800'
                as={'label'}
              >
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
