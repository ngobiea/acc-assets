'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleIsStartDeclaration } from '@/store/slices/declarationSlice/declarationSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { declarationSchema } from '@/utils/validators/declaration';
import { HiXMark } from 'react-icons/hi2';
import { declarationReasons } from '@/utils/selectOptions';
import { useState } from 'react';
export default function DeclarationStartForm() {
  const dispatch = useAppDispatch();
  const { isStartDeclaration } = useAppSelector((state) => state.declaration);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    unregister,
  } = useForm<DeclarationClientForm>({
    resolver: zodResolver(declarationSchema),
    // defaultValues: {
    //   reason: '',
    //   otherReason: 'otherReason',
    //   place: '',
    // },
  });

  const resetForm = () => {
    setValue('reason', '');
    setValue('place', '');
    setValue('otherReason', '');
    setShowOtherInput(false);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'reason') {
      if (value === 'Other') {
        setShowOtherInput(true);
      } else {
        setShowOtherInput(false);
        unregister('otherReason');
      }
    }
  };

  console.log(errors);
  const onSubmit: SubmitHandler<DeclarationClientForm> = (data) => {
    console.log(data);
  };
  return (
    <Dialog
      size='sm'
      open={isStartDeclaration}
      handler={() => {
        if (isStartDeclaration) {
          resetForm();
        }
        dispatch(toggleIsStartDeclaration());
      }}
      className='p-4'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className='relative m-0 block'>
          <Typography variant='h4' color='blue-gray'>
            New Declaration
          </Typography>

          <IconButton
            size='sm'
            variant='text'
            className='!absolute right-3.5 top-3.5'
            onClick={() => {
              if (isStartDeclaration) {
                resetForm();
              }
              dispatch(toggleIsStartDeclaration());
            }}
          >
            <HiXMark className='h-4 w-4' />
          </IconButton>
        </DialogHeader>
        <DialogBody className='space-y-4 pb-6'>
          <div className='w-full group mb-5'>
            <Typography variant='small' className='text-gray-800' as={'label'}>
              Declaration Reason*
            </Typography>
            <select
              {...register('reason')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.reason
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
              onChange={handleChange}
            >
              <option value={''}>Select Declaration Reason</option>

              {declarationReasons.map(({ id, value }) => {
                return (
                  <option key={id} value={id} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.reason?.message}
            </p>
          </div>

          {showOtherInput && (
            <div className='w-full group mb-5'>
              <Input
                label='Other Reason'
                placeholder='Enter other reason'
                {...register('otherReason')}
                color={errors.otherReason ? 'red' : 'blue'}
                className={` ${
                  errors.otherReason
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-sm text-red-500 mt-2'>
                {errors.otherReason?.message}
              </p>
            </div>
          )}

          <div className='w-full group mb-5'>
            <Input
              label='Place of Affidavit'
              placeholder='Enter place of affidavit'
              {...register('place')}
              color={errors.place ? 'red' : 'blue'}
              className={` ${
                errors.place
                  ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                  : ''
              }`}
            />
            <p className='text-sm text-red-500 mt-2'>{errors.place?.message}</p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            type='submit'
            color='blue'
            className='ml-auto hover:animate-bounce'
          >
            New Declaration
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
