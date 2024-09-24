'use client';
import type { MDA } from '@prisma/client';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from '@/components/materialTailwind';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setIsEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { postCurrentLastEmployment } from '@/actions/declaration/currentLastEmployment';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employmentSchema } from '@/utils/validators/declaration';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import {
  contractTypes,
  currencies,
  sourceOfIncome,
} from '@/utils/selectOptions';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
import { HiXMark } from 'react-icons/hi2';

export default function EmploymentForm({
  reason,
  mdas,
  declarationId,
}: {
  reason: string;
  mdas: MDA[];
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const { isEmploymentFormOpen } = useAppSelector((state) => state.declaration);

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [formState, action] = useFormState(postCurrentLastEmployment, {
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
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      annualSalary: '0',
      allowances: '0',
      declarationId,
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
  useEffect(() => {
    if (formState.data) {
      dispatch(setIsEmploymentFormOpen(false));
      reset();
    }
    if (formState.errors.mdaId) {
      setError('mdaId', {
        message: formState.errors.mdaId.join(', '),
      });
    }
    if (formState.errors.employeeCategory) {
      setError('employeeCategory', {
        message: formState.errors.employeeCategory.join(', '),
      });
    }
    if (formState.errors.posting) {
      setError('posting', {
        message: formState.errors.posting.join(', '),
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
    if (formState.errors.SSNo) {
      setError('SSNo', {
        message: formState.errors.SSNo.join(', '),
      });
    }
    if (formState.errors.employeeId) {
      setError('employeeId', {
        message: formState.errors.employeeId.join(', '),
      });
    }
    if (formState.errors.employeeNo) {
      setError('employeeNo', {
        message: formState.errors.employeeNo.join(', '),
      });
    }
    if (formState.errors.establishmentRegNo) {
      setError('establishmentRegNo', {
        message: formState.errors.establishmentRegNo.join(', '),
      });
    }
    if (formState.errors.contractType) {
      setError('contractType', {
        message: formState.errors.contractType.join(', '),
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
    if (formState.errors.otherSourceOfIncome) {
      setError('otherSourceOfIncome', {
        message: formState.errors.otherSourceOfIncome.join(', '),
      });
    }
    if (formState.errors.sourceOfIncome) {
      setError('sourceOfIncome', {
        message: formState.errors.sourceOfIncome.join(', '),
      });
    }
  }, [
    formState.data,
    formState.errors.SSNo,
    formState.errors.allowances,
    formState.errors.allowancesDescription,
    formState.errors.annualSalary,
    formState.errors.contractEndDate,
    formState.errors.contractStartDate,
    formState.errors.contractType,
    formState.errors.designation,
    formState.errors.employeeCategory,
    formState.errors.employeeId,
    formState.errors.employeeNo,
    formState.errors.establishmentRegNo,
    formState.errors.mdaId,
    formState.errors.otherSourceOfIncome,
    formState.errors.posting,
    formState.errors.rank,
    formState.errors.sourceOfIncome,
    reset,
    setError,
    dispatch,
    formState.errors.currency,
    formState.errors.allowancesCurrency,
  ]);
  // console.log(formState.errors);
  useEffect(() => {
    if (!isEmploymentFormOpen) {
      reset();
    }
  }, [isEmploymentFormOpen, reset]);
  // console.log(errors);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as EmploymentClientForm;
    const formData = new FormData();
    formData.append('mdaId', submitted.mdaId);
    formData.append('employeeCategory', submitted.employeeCategory);
    formData.append('posting', submitted.posting);
    formData.append('designation', submitted.designation);
    formData.append('rank', submitted.rank);
    formData.append('annualSalary', submitted.annualSalary);
    formData.append('currency', submitted.currency);
    formData.append('allowances', submitted.allowances);
    formData.append('allowancesCurrency', submitted.allowancesCurrency);
    formData.append('allowancesDescription', submitted.allowancesDescription);
    formData.append('SSNo', submitted.SSNo);
    formData.append('employeeId', submitted.employeeId);
    formData.append('employeeNo', submitted.employeeNo);
    formData.append('establishmentRegNo', submitted.establishmentRegNo);
    formData.append('contractType', submitted.contractType);
    formData.append('contractStartDate', submitted.contractStartDate);
    formData.append('contractEndDate', submitted.contractEndDate);
    formData.append('sourceOfIncome', submitted.sourceOfIncome);
    formData.append('otherSourceOfIncome', submitted.otherSourceOfIncome);
    formData.append('declarationId', declarationId);
    // console.log(data);
    action(formData);
  };
  return (
    <Dialog
      open={isEmploymentFormOpen}
      size='lg'
      handler={() => dispatch(setIsEmploymentFormOpen(!isEmploymentFormOpen))}
      className='pb-10 relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray'>
          {reason === 'Appointment' || reason === 'Biennial Declaration'
            ? 'Current Employment'
            : 'Last Employment'}
        </Typography>
        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsEmploymentFormOpen(false));
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
            <SelectInput
              errors={errors}
              options={mdas.map(({ id, abbreviation, name }) => {
                return {
                  id: id,
                  value: `${abbreviation} - ${name}`,
                };
              })}
              register={register}
              value='mdaId'
              label='Ministry/Department/Agency (MDA)*'
            />
            <TextInput
              errors={errors}
              label='Employee Category*'
              placeholder='Enter your employee category'
              register={register}
              value='employeeCategory'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label={
                reason === 'Appointment' || reason === 'Biennial Declaration'
                  ? 'Current Posting*'
                  : 'Last Posting*'
              }
              placeholder={
                reason === 'Appointment' || reason === 'Biennial Declaration'
                  ? 'Enter your current posting'
                  : 'Enter your last posting'
              }
              register={register}
              value='posting'
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
              label='Grade/Rank*'
              placeholder='Enter your grade/rank'
              register={register}
              value='rank'
            />
            <TextInput
              errors={errors}
              label='Social Security Number-SSNo'
              placeholder='Enter your social security number'
              register={register}
              value='SSNo'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Employee ID*'
              placeholder='Enter your employee ID'
              register={register}
              value='employeeId'
            />
            <TextInput
              errors={errors}
              label='Employee PIN No (if any)'
              placeholder='Enter your job title/designation'
              register={register}
              value='employeeNo'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Establishment Registration No (if any)'
              placeholder='Enter your establishment registration number'
              register={register}
              value='establishmentRegNo'
            />
            <SelectInput
              errors={errors}
              label='Select Contract Type*'
              options={contractTypes}
              register={register}
              value='contractType'
            />
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
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={sourceOfIncome}
              register={register}
              value='sourceOfIncome'
              label='Select Source of Income'
            />

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
