'use client';

import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
import TextInput from '@/components/common/form/text-input';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from '@/components/materialTailwind';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setIsPastEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { currencies, sourceOfIncome } from '@/utils/selectOptions';
import { pastEmploymentSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';

export default function PastEmploymentForm() {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const { isPastEmploymentFormOpen } = useAppSelector(
    (state) => state.declaration
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(pastEmploymentSchema),
    defaultValues: {
      annualSalary: '0',
      allowances: '0',
    },
  });
  const watchSourceOfIncome = watch('sourceOfIncome');
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as EmploymentClientForm;
      if (name === 'sourceOfIncome') {
        if (currentValues.sourceOfIncome === 'Other') {
          setShowOtherInput(true);
        } else {
          setShowOtherInput(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  console.log(errors);
    const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as PastEmploymentClientForm;
      
    console.log(data);
  };

  return (
    <Dialog
      open={isPastEmploymentFormOpen}
      size='lg'
      handler={() =>
        dispatch(setIsPastEmploymentFormOpen(!isPastEmploymentFormOpen))
      }
      className='pb-10 relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray' className='lg:ml-10'>
          Past Employment
        </Typography>
        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsPastEmploymentFormOpen(false));
          }}
        >
          <HiXMark className='h-10 w-10 font-bold' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <Typography className=' text-center'>
          All fields marked with * are required to be filled in.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-3xl mx-auto py-10'
        >
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Previous Employer - MDA/Private (if any)'
              placeholder='Enter your previous employer'
              register={register}
              value='employerName'
            />
            <TextInput
              errors={errors}
              label='Job Title/Designation*'
              placeholder='Enter your job title/designation'
              register={register}
              value='designation'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Rank'
              placeholder='Enter your rank'
              register={register}
              value='rank'
            />
            <SelectInput
              errors={errors}
              options={sourceOfIncome}
              register={register}
              value='sourceOfIncome'
              label='Select Source of Income'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            {showOtherInput && (
              <TextInput
                errors={errors}
                label='Other Source of Income'
                placeholder='Enter other source of income'
                register={register}
                value='otherSourceOfIncome'
              />
            )}
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectTextInput
              errors={errors}
              inputValue='annualSalary'
              label={`Annual Net Salary*`}
              options={currencies}
              placeholder='0.0'
              register={register}
              selectValue='currency'
              type='number'
            />
            <SelectTextInput
              errors={errors}
              inputValue='allowances'
              label='Other Allowances (if any)'
              options={currencies}
              placeholder='0.0'
              register={register}
              selectValue='allowancesCurrency'
              type='number'
            />
          </div>
          <TextareaInput
            errors={errors}
            label='Description of Allowances (if any)'
            register={register}
            value='allowancesDescription'
          />
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Employment Start Date*'
              placeholder='Enter Employment Start Date'
              register={register}
              value='contractStartDate'
              type='date'
            />
            <TextInput
              errors={errors}
              label='Employment End Date (if known)'
              placeholder='Enter Employment End Date'
              register={register}
              value='contractEndDate'
              type='date'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded-lg '
            >
              Add Employment
            </button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
