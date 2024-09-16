'use client';

import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userEmploymentSchema } from '@/utils/validators/setup';
import { useEffect, useState } from 'react';
import { postUserEmployment } from '@/actions/setup/userEmployment';
import { useAppDispatch } from '@/store/hooks';
import {
  Button,
  CardBody,
  CardFooter,
  Typography,
} from '@/components/materialTailwind';
import { sourceOfIncome } from '@/utils/selectOptions';
import {
  handleNextSetupStep,
  handlePrevSetupStep,
} from '@/store/slices/setupSlice/setupSlice';
import type { MDA } from '@prisma/client';
import { isOtherOption } from '@/utils/user';
import TextInput from '@/components/common/form/text-input';
import RadioInput from '@/components/common/form/radio-input';
import SelectInput from '@/components/common/form/select-input';

const EmploymentForm = ({
  employment,
  mdas,
}: {
  employment: UserEmploymentSetupAttributes;
  mdas: MDA[];
}) => {
  const dispatch = useAppDispatch();
  const [formState, action] = useFormState(postUserEmployment, { errors: {} });
  const [showOtherInput, setShowOtherInput] = useState(
    !isOtherOption({
      value: employment?.sourceOfIncome ? employment?.sourceOfIncome : '',
      options: sourceOfIncome,
    })
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(userEmploymentSchema),
  });
  const watchSourceOfIncome = watch('sourceOfIncome');
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as UserEmploymentClientForm;
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as UserEmploymentClientForm;

    const formData = new FormData();
    formData.append('mdaId', submitted.mdaId);
    formData.append('employeeCategory', submitted.employeeCategory);
    formData.append('currentPosting', submitted.currentPosting);
    formData.append('designation', submitted.designation);
    formData.append('rankOrGrade', submitted.rankOrGrade);
    formData.append('employeePin', submitted.employeePin);
    formData.append('establishmentRegNo', submitted.establishmentRegNo);
    formData.append('sourceOfIncome', submitted.sourceOfIncome);
    formData.append('isAdministrative', submitted.isAdministrative);
    formData.append('isFinancial', submitted.isFinancial);
    formData.append('isPolitical', submitted.isPolitical);
    formData.append('isProfessional', submitted.isProfessional);
    if (employment) {
      formData.append('id', employment.id);
    }
    if (showOtherInput) {
      formData.append('otherSourceOfIncome', submitted.otherSourceOfIncome);
    } else {
      formData.append('otherSourceOfIncome', '');
    }
    // console.log(data);
    action(formData);
  };
  useEffect(() => {
    if (formState.data) {
      window.scrollTo(0, 0);
      dispatch(handleNextSetupStep());
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
    if (formState.errors.designation) {
      setError('designation', {
        message: formState.errors.designation.join(', '),
      });
    }
    if (formState.errors.isAdministrative) {
      setError('isAdministrative', {
        message: formState.errors.isAdministrative.join(', '),
      });
    }
    if (formState.errors.isFinancial) {
      setError('isFinancial', {
        message: formState.errors.isFinancial.join(', '),
      });
    }
    if (formState.errors.isPolitical) {
      setError('isPolitical', {
        message: formState.errors.isPolitical.join(', '),
      });
    }
    if (formState.errors.isProfessional) {
      setError('isProfessional', {
        message: formState.errors.isProfessional.join(', '),
      });
    }
  }, [
    dispatch,
    formState?.data,
    formState.errors.designation,
    formState.errors.employeeCategory,
    formState.errors.isAdministrative,
    formState.errors.isFinancial,
    formState.errors.isPolitical,
    formState.errors.isProfessional,
    formState.errors.mdaId,
    setError,
  ]);
  useEffect(() => {
    if (employment) {
      setValue('mdaId', employment?.mdaId);
      setValue('employeeCategory', employment?.employeeCategory);
      setValue(
        'currentPosting',
        employment?.currentPosting ? employment?.currentPosting : ''
      );
      setValue('designation', employment?.designation);
      setValue(
        'rankOrGrade',
        employment?.rankOrGrade ? employment?.rankOrGrade : ''
      );
      setValue(
        'employeePin',
        employment?.employeePin ? employment?.employeePin : ''
      );
      setValue(
        'establishmentRegNo',
        employment?.establishmentRegNo ? employment?.establishmentRegNo : ''
      );
      if (showOtherInput) {
        setValue('sourceOfIncome', 'Other');
        setValue(
          'otherSourceOfIncome',
          employment?.sourceOfIncome ? employment?.sourceOfIncome : ''
        );
      } else {
        setValue(
          'sourceOfIncome',
          employment?.sourceOfIncome ? employment?.sourceOfIncome : ''
        );
      }

      setValue('isAdministrative', employment?.isAdministrative ? 'Yes' : 'No');
      setValue('isFinancial', employment?.isFinancial ? 'Yes' : 'No');
      setValue('isPolitical', employment?.isPolitical ? 'Yes' : 'No');
      setValue('isProfessional', employment?.isProfessional ? 'Yes' : 'No');
    } else {
      reset();
    }
  }, [
    employment?.currentPosting,
    employment?.designation,
    employment?.employeeCategory,
    employment?.employeePin,
    employment?.establishmentRegNo,
    employment?.isAdministrative,
    employment?.isFinancial,
    employment?.isPolitical,
    employment?.isProfessional,
    employment?.mdaId,
    employment?.rankOrGrade,
    employment?.sourceOfIncome,
    reset,
    setValue,
  ]);
  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <Typography className='text-center'>
        All fields marked with * are required to be filled in.
      </Typography>
      <CardBody className='flex flex-col gap-4'>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <SelectInput
            errors={errors}
            label='Select MDA*'
            options={mdas.map(({ id, abbreviation, name }) => {
              return {
                id: id,
                value: `${abbreviation} - ${name}`,
              };
            })}
            register={register}
            value='mdaId'
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
            label='Current Posting'
            placeholder='Enter your current posting'
            register={register}
            value='currentPosting'
          />
          <TextInput
            errors={errors}
            label='Designation*'
            placeholder='Enter your designation'
            register={register}
            value='designation'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Rank/Grade'
            placeholder='Enter your rank or grade'
            register={register}
            value='rankOrGrade'
          />
          <TextInput
            errors={errors}
            label='Employee PIN'
            placeholder='Enter your employee PIN'
            register={register}
            value='employeePin'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Establishment Registration Number'
            placeholder='Enter your establishment registration number'
            register={register}
            value='establishmentRegNo'
          />
          <SelectInput
            errors={errors}
            label='Select Source of Income'
            options={sourceOfIncome}
            register={register}
            value='sourceOfIncome'
          />
        </div>
        {showOtherInput && (
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Other Source of Income'
              placeholder='Enter your other source of income'
              register={register}
              value='otherSourceOfIncome'
            />
          </div>
        )}
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <RadioInput
            errors={errors}
            radioLabel='Do you have an administrative responsibility?*'
            register={register}
            value='isAdministrative'
            values={[{ radioValue: 'Yes' }, { radioValue: 'No' }]}
          />
          <RadioInput
            errors={errors}
            radioLabel='Do you have financial responsibility?*'
            register={register}
            value='isFinancial'
            values={[{ radioValue: 'Yes' }, { radioValue: 'No' }]}
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <RadioInput
            errors={errors}
            radioLabel='Do you have political responsibility?*'
            register={register}
            value='isPolitical'
            values={[{ radioValue: 'Yes' }, { radioValue: 'No' }]}
          />
          <RadioInput
            errors={errors}
            radioLabel='Do you have a professional responsibility?*'
            register={register}
            value='isProfessional'
            values={[{ radioValue: 'Yes' }, { radioValue: 'No' }]}
          />
        </div>
      </CardBody>
      <CardFooter className='pt-0'>
        {formState.errors._form && (
          <div className='flex w-full justify-between mb-5 text-red-500'>
            <Typography>{formState.errors._form.join(', ')}</Typography>
          </div>
        )}
        <div className='flex justify-between space-y-3 flex-col sm:flex-row sm:space-y-0 '>
          <Button
            color='blue'
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(handlePrevSetupStep());
            }}
          >
            Prev: Personal
          </Button>
          <Button type='submit' color='blue'>
            Save & Continue
          </Button>
        </div>
      </CardFooter>
    </form>
  );
};

export default EmploymentForm;
