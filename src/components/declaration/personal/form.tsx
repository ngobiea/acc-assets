'use client';

import { useFormState } from 'react-dom';
import { titleData, personalIds } from '@/utils/selectOptions';
import { useEffect } from 'react';
import { countries, acquireNationalityBy } from '@/utils/countries';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Typography } from '@/components/materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalSchemaClient } from '@/utils/validators/setup';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextInput from '@/components/common/form/text-input';
import RadioInput from '@/components/common/form/radio-input';
import { setIdType, setIsIDType } from '@/store/slices/setupSlice/setupSlice';
import ImagePicker from '@/components/application/image-picker';
import { getFormatDate } from '@/utils/user';
import { handleNextDeclarationStep } from '@/store/slices/declarationSlice/declarationSlice';
import { DPersonal } from '@prisma/client';
import { postDPersonal } from '@/actions/declaration/personal';
import React from 'react';

export default function DeclarationPersonalForm({
  personal,
}: {
  personal: DPersonal;
}) {
  const dispatch = useAppDispatch();
  const { idType } = useAppSelector((state) => state.setup);
  const { file } = useAppSelector((state) => state.app);
  const [formState, action] = useFormState(postDPersonal, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(personalSchemaClient),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!file) {
      setError('image', {
        message: 'Image is required',
      });
      //navigate to the top of the page
      window.scrollTo(0, 0);
      return;
    }
    const formData = new FormData();
    const submitted = data as PersonalClientForm;
    formData.append('title', submitted.title);
    formData.append('pid', submitted.pid);
    formData.append('idType', idType);
    formData.append('surname', submitted.surname);
    formData.append('firstName', submitted.firstName);
    formData.append('middleName', submitted.middleName);
    formData.append('aliases', submitted.aliases);
    formData.append('dateOfBirth', submitted.dateOfBirth);
    formData.append('maritalStatus', submitted.maritalStatus);
    formData.append('gender', submitted.gender);
    formData.append('country', submitted.country);
    formData.append('acquireBy', submitted.acquireBy);

    if (file) {
      formData.append('image', file);
    }
    if (personal) {
      formData.append('id', personal.id);
      formData.append('declarationId', personal.declarationId);
    } else {
      formData.append('id', '');
    }
    action(formData);
  };
  const watchIdType = watch('idType');
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const currentValues = value as PersonalClientForm;
      if (type === 'change' && name === 'idType') {
        dispatch(
          setIdType(currentValues.idType === 'NIN' ? 'NIN' : 'Passport')
        );
        if (currentValues.idType === 'Passport') {
          dispatch(setIsIDType(true));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);
  // console.log(formState.errors);
  // console.log(errors);
  useEffect(() => {
    if (personal) {
      setValue('title', personal?.title);
      setValue('pid', personal?.pid);
      setValue('surname', personal?.surname);
      setValue('firstName', personal?.firstName);
      setValue('middleName', personal?.middleName ? personal?.middleName : '');
      setValue('aliases', personal?.aliases ? personal?.aliases : '');
      setValue('dateOfBirth', getFormatDate(personal?.dateOfBirth));
      setValue('maritalStatus', personal?.maritalStatus);
      setValue('gender', personal.gender);
      setValue('country', personal?.country);
      setValue('acquireBy', personal?.acquireBy);
      setValue('idType', personal?.idType);
    } else {
      reset();
    }
  }, [personal, reset, setValue]);
  useEffect(() => {
    if (file) {
      clearErrors('image');
    }
  }, [clearErrors, file]);

  useEffect(() => {
    if (formState?.data) {
      window.scrollTo(0, 0);
      dispatch(handleNextDeclarationStep());
    }
    if (formState.errors.title) {
      setError('title', {
        message: formState.errors.title?.join(', '),
      });
    }
    if (formState.errors.pid) {
      setError('pid', {
        message: formState.errors.pid?.join(', '),
      });
    }
    if (formState.errors.surname) {
      setError('surname', {
        message: formState.errors.surname?.join(', '),
      });
    }
    if (formState.errors.firstName) {
      setError('firstName', {
        message: formState.errors.firstName?.join(', '),
      });
    }
    if (formState.errors.dateOfBirth) {
      setError('dateOfBirth', {
        message: formState.errors.dateOfBirth?.join(', '),
      });
    }
    if (formState.errors.maritalStatus) {
      setError('maritalStatus', {
        message: formState.errors.maritalStatus?.join(', '),
      });
    }
    if (formState.errors.gender) {
      setError('gender', { message: formState.errors.gender.join(', ') });
    }
    if (formState.errors.country) {
      setError('country', { message: formState.errors.country.join(', ') });
    }
    if (formState.errors.acquireBy) {
      setError('acquireBy', { message: formState.errors.acquireBy.join(', ') });
    }
    if (formState.errors.image) {
      setError('image', { message: formState.errors.image.join(', ') });
    }
  }, [dispatch, setError, formState]);

  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <ImagePicker register={register} errors={errors} value='image' />
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <SelectInput
          label='Select your title*'
          errors={errors}
          options={titleData}
          register={register}
          value={'title'}
        />
        <SelectTextInput
          disabled={true}
          errors={errors}
          label={idType === 'NIN' ? 'NIN*' : 'Passport Number*'}
          options={personalIds}
          placeholder={`Enter your ${idType} number`}
          register={register}
          inputValue={'pid'}
          selectValue={'idType'}
          idType={idType}
        />
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <TextInput
          register={register}
          errors={errors}
          label='Surname*'
          placeholder='Enter your surname'
          value='surname'
        />
        <TextInput
          register={register}
          errors={errors}
          label='First Name*'
          placeholder='Enter your first name'
          value='firstName'
        />
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <TextInput
          register={register}
          errors={errors}
          label='Middle Name'
          placeholder='Enter your middle name'
          value='middleName'
        />
        <TextInput
          register={register}
          errors={errors}
          label='Previous Name/Aliases'
          placeholder='Enter your previous name/aliases'
          value='aliases'
        />
      </div>
      <TextInput
        disabled
        register={register}
        errors={errors}
        label='Date of Birth*'
        placeholder='Enter your Date of Birth'
        type='date'
        value='dateOfBirth'
      />
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <RadioInput
          radioLabel='Marital Status*'
          register={register}
          value={'maritalStatus'}
          values={[
            { radioValue: 'Single' },
            { radioValue: 'Married' },
            { radioValue: 'Divorced' },
            { radioValue: 'Separated' },
            { radioValue: 'Widowed' },
          ]}
          errors={errors}
        />
        <RadioInput
          radioLabel='Gender*'
          errors={errors}
          register={register}
          value={'gender'}
          values={[{ radioValue: 'Male' }, { radioValue: 'Female' }]}
        />
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-6'>
        <SelectInput
          errors={errors}
          title='Present Citizenship*'
          options={countries}
          register={register}
          value={'country'}
        />
        <SelectInput
          errors={errors}
          title='Acquire By*'
          label='Acquire By*'
          options={acquireNationalityBy}
          register={register}
          value={'acquireBy'}
        />
      </div>
      {formState.errors._form && (
        <div className='flex w-full justify-between my-5 text-red-500'>
          <Typography>{formState.errors._form.join(', ')}</Typography>
        </div>
      )}
      <div className='flex justify-end mt-5'>
        <Button type='submit' color='blue' className='hover:animate-bounce'>
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
