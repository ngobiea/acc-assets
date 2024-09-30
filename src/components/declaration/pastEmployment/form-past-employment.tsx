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
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setIsPastEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { currencies, sourceOfIncome } from '@/utils/selectOptions';
import { pastEmploymentSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { postPastEmployment } from '@/actions/declaration/pastEmployment';
import { useFormState } from 'react-dom';

export default function PastEmploymentForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const { isPastEmploymentFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  const [formState, action] = useFormState(postPastEmployment, {
    errors: {},
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
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
    const formData = new FormData();
    formData.append('employerName', submitted.employerName);
    formData.append('designation', submitted.designation);
    formData.append('rank', submitted.rank);
    formData.append('contractStartDate', submitted.contractStartDate);
    formData.append('contractEndDate', submitted.contractEndDate);
    formData.append('annualSalary', submitted.annualSalary);
    formData.append('currency', submitted.currency);
    formData.append('allowances', submitted.allowances);
    formData.append('allowancesCurrency', submitted.allowancesCurrency);
    formData.append('allowancesDescription', submitted.allowancesDescription);
    formData.append('sourceOfIncome', submitted.sourceOfIncome);
    formData.append('otherSourceOfIncome', submitted.otherSourceOfIncome);
    formData.append('declarationId', declarationId);
    action(formData);
  };
  useEffect(() => {
    if (formState.data) {
      dispatch(setIsPastEmploymentFormOpen(false));
    }
    if (formState.errors.employerName) {
      setError('employerName', {
        message: formState.errors.employerName.join(', '),
      });
    }
    if (formState.errors.designation) {
      setError('designation', {
        message: formState.errors.designation.join(', '),
      });
    }
    if (formState.errors.rank) {
      setError('rank', {
        message: formState.errors.rank.join(', '),
      });
    }
    if (formState.errors.contractEndDate) {
      setError('contractEndDate', {
        message: formState.errors.contractEndDate.join(', '),
      });
    }
    if (formState.errors.contractStartDate) {
      setError('contractStartDate', {
        message: formState.errors.contractStartDate.join(', '),
      });
    }
    if (formState.errors.annualSalary) {
      setError('annualSalary', {
        message: formState.errors.annualSalary.join(', '),
      });
    }
    if (formState.errors.currency) {
      setError('currency', {
        message: formState.errors.currency.join(', '),
      });
    }
    if (formState.errors.allowances) {
      setError('allowances', {
        message: formState.errors.allowances.join(', '),
      });
    }
    if (formState.errors.allowancesCurrency) {
      setError('allowancesCurrency', {
        message: formState.errors.allowancesCurrency.join(', '),
      });
    }

    if (formState.errors.allowancesDescription) {
      setError('allowancesDescription', {
        message: formState.errors.allowancesDescription.join(', '),
      });
    }

    if (formState.errors.sourceOfIncome) {
      setError('sourceOfIncome', {
        message: formState.errors.sourceOfIncome.join(', '),
      });
    }
    if (formState.errors.otherSourceOfIncome) {
      setError('otherSourceOfIncome', {
        message: formState.errors.otherSourceOfIncome.join(', '),
      });
    }
  }, [
    formState.data,
    formState.errors.allowances,
    formState.errors.allowancesDescription,
    formState.errors.annualSalary,
    formState.errors.contractEndDate,
    formState.errors.contractStartDate,
    formState.errors.designation,
    formState.errors.otherSourceOfIncome,
    formState.errors.rank,
    formState.errors.sourceOfIncome,
    reset,
    setError,
    dispatch,
    formState.errors.employerName,
    formState.errors.currency,
    formState.errors.allowancesCurrency,
  ]);
  console.log(formState.errors);
  useEffect(() => {
    if (!isPastEmploymentFormOpen) {
      reset();
      setShowOtherInput(false);
    }
  }, [isPastEmploymentFormOpen, reset]);
  console.log(errors);

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
        <Typography variant='h4' color='gray' className=' text-center'>
          Past Employment
        </Typography>
        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => dispatch(setIsPastEmploymentFormOpen(false))}
        >
          <HiXMark className='h-10 w-10 font-bold' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <Card className=' w-full bg-blue-50 mt-3'>
          <CardBody>
            <Typography className='text-center'>
              All fields marked with * are required to be filled in.
            </Typography>
          </CardBody>
        </Card>
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
          {formState.errors._form && (
            <div className='flex w-full justify-between my-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
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
