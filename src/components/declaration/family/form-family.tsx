'use client'
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { familySchema } from '@/utils/validators/declaration';
import { countries } from '@/utils/countries';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
  Button,
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { familyRelation, gender } from '@/utils/selectOptions';
import { MdClose } from 'react-icons/md';
import { setIsFamilyFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import RadioInput from '@/components/common/form/radio-input';
import { useFormState } from 'react-dom';
import { postFamily } from '@/actions/declaration/family';
import React from 'react';

export default function FamilyForm({declarationId}: { declarationId: string }) {
  const dispatch = useAppDispatch();
  const [showEmploymentInput, setShowEmploymentInput] = useState(false);
  const { isFamilyFormOpen } = useAppSelector((state) => state.declaration);
    const [formState, action] = useFormState(postFamily, {
      errors: {},
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {},
  });
  const watchInput = watch();
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as FamilyClientForm;
        if (name === 'isFamilyEmployment') {
          setShowEmploymentInput(currentValues.isFamilyEmployment === 'Yes');
        }
    });
    return () => subscription.unsubscribe();
  }, [ watch]);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const submitted = data as FamilyClientForm;
    const formData = new FormData();
    formData.append('surname', submitted.surname);
    formData.append('firstName', submitted.firstName);
    formData.append('middleName', submitted.middleName);
    formData.append('relation', submitted.relation);
    formData.append('address', submitted.address);
    formData.append('relation', submitted.relation);
    formData.append('dateOfBirth', submitted.dateOfBirth);
    formData.append('gender', submitted.gender);
    formData.append('nationality', submitted.nationality);
    formData.append('phoneNumber', submitted.phoneNumber);
    formData.append('email', submitted.email);
    formData.append('mobile', submitted.mobile);
    formData.append('businessName', submitted.businessName);
    formData.append('isFamilyEmployment', submitted.isFamilyEmployment);
    formData.append('employeeNo', submitted.employeeNo);
    formData.append('category', submitted.category);
    formData.append('institution', submitted.institution);
    formData.append('SSNo', submitted.SSNo);
    formData.append('pinCode', submitted.pinCode);
    formData.append('designation', submitted.designation);
    formData.append('declarationId', declarationId);
    formData.append('otherRelation', submitted.otherRelation);
    action(formData);
  };

    useEffect(() => {
      if (formState.data) {
        dispatch(setIsFamilyFormOpen(false));
  
      }
      if (formState.errors.firstName) {
        setError('firstName', {
          message: formState.errors.firstName.join(', '),
        });
      }
      if (formState.errors.surname) {
        setError('surname', {
          message: formState.errors.surname.join(', '),
        });
      }
      if (formState.errors.middleName) {
        setError('middleName', {
          message: formState.errors.middleName.join(', '),
        });
      }
      if (formState.errors.relation) {
        setError('relation', {
          message: formState.errors.relation.join(', '),
        });
      }
      if (formState.errors.dateOfBirth) {
        setError('address', {
          message: formState.errors.dateOfBirth.join(', '),
        });
      }
      if (formState.errors.gender) {
        setError('gender', {
          message: formState.errors.gender.join(', '),
        });
      }
      if (formState.errors.nationality) {
        setError('nationality', {
          message: formState.errors.nationality.join(', '),
        });
      }
      if (formState.errors.phoneNumber) {
        setError('phoneNumber', {
          message: formState.errors.phoneNumber.join(', '),
        });
      }
      if (formState.errors.email) {
        setError('email', {
          message: formState.errors.email.join(', '),
        });
      }
      if (formState.errors.mobile) {
        setError('mobile', {
          message: formState.errors.mobile.join(', '),
        });
      }
      if (formState.errors.businessName) {
        setError('businessName', {
          message: formState.errors.businessName.join(', '),
        });
      }
      if (formState.errors.employeeNo) {
        setError('employeeNo', {
          message: formState.errors.employeeNo.join(', '),
        });
      }
      if (formState.errors.category) {
        setError('category', {
          message: formState.errors.category.join(', '),
        });
      }
      if (formState.errors.institution) {
        setError('institution', {
          message: formState.errors.institution.join(', '),
        });
      }
      if (formState.errors.SSNo) {
        setError('SSNo', {
          message: formState.errors.SSNo.join(', '),
        });
      }
      if (formState.errors.pinCode) {
        setError('pinCode', {
          message: formState.errors.pinCode.join(', '),
        });
      }
      if (formState.errors.designation) {
        setError('designation', {
          message: formState.errors.designation.join(' '),
        });
      }
    }, [
      dispatch,
      formState.data,
      formState.errors.SSNo,
      formState.errors.businessName,
      formState.errors.category,
      formState.errors.dateOfBirth,
      formState.errors.designation,
      formState.errors.email,
      formState.errors.employeeNo,
      formState.errors.firstName,
      formState.errors.gender,
      formState.errors.institution,
      formState.errors.middleName,
      formState.errors.mobile,
      formState.errors.nationality,
      formState.errors.phoneNumber,
      formState.errors.pinCode,
      formState.errors.relation,
      formState.errors.surname,
      reset,
      setError,
    ]);

  
  useEffect(() => {
    if (!isFamilyFormOpen) {
      reset();
      setShowEmploymentInput(false);
    }
  }, [isFamilyFormOpen, reset]);

  return (
    <Dialog
      size='lg'
      open={isFamilyFormOpen}
      handler={() => dispatch(setIsFamilyFormOpen(!isFamilyFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' className='text-blue-gray text-center'>
          Family
        </Typography>
        <IconButton
          onClick={() => dispatch(setIsFamilyFormOpen(!isFamilyFormOpen))}
          className='!absolute right-3.5 top-3.5 hover:animate-bounce'
          variant='text'
          size='lg'
          color='red'
        >
          <MdClose className='text-blue-gray w-8 h-8' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <Card className='w-full bg-blue-50 mt-3'>
          <CardBody>
            <Typography color='gray'>
              Details of Spouse(s)*, and Dependents under 18 years. All fields
              marked with * are required to be filled in.
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
              label='Surname*'
              placeholder='Enter family surname'
              register={register}
              value='surname'
            />
            <TextInput
              errors={errors}
              label='First Name*'
              placeholder='Enter family first name'
              register={register}
              value='firstName'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Middle Name'
              placeholder='Enter family middle name'
              register={register}
              value='middleName'
            />
            <SelectInput
              errors={errors}
              options={familyRelation}
              register={register}
              value='relation'
              label='Select family relation*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Present Address*'
              placeholder='Enter family present address'
              register={register}
              value='address'
            />
            <SelectInput
              errors={errors}
              options={gender}
              register={register}
              value='gender'
              label='Select family gender*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Date of Birth*'
              placeholder='Enter family date of birth'
              register={register}
              value='dateOfBirth'
              type='date'
            />
            <SelectInput
              errors={errors}
              options={countries}
              register={register}
              value='nationality'
              label='Select family nationality*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Phone Number'
              placeholder='Enter family phone number'
              register={register}
              value='phoneNumber'
            />
            <TextInput
              errors={errors}
              label='Mobile Number'
              placeholder='Enter family mobile number'
              register={register}
              value='mobile'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Email Address'
              placeholder='Enter family email address'
              register={register}
              value='email'
              type='email'
            />
            <TextInput
              errors={errors}
              label='Name of Business (if self-employed)'
              placeholder='Enter family business name'
              register={register}
              value='businessName'
            />
          </div>
          <RadioInput
            errors={errors}
            radioLabel='Is your spouse or dependent employed*'
            register={register}
            value='isFamilyEmployment'
            values={[
              { radioValue: 'Yes' },
              { radioValue: 'No', defaultChecked: true },
            ]}
          />

          {showEmploymentInput && (
            <>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='Employee No.'
                  placeholder='Enter family employee number'
                  register={register}
                  value='employeeNo'
                />
                <TextInput
                  errors={errors}
                  label='Category'
                  placeholder='Enter family employee category'
                  register={register}
                  value='category'
                />
              </div>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='Institution Name*'
                  placeholder='Enter family institution name'
                  register={register}
                  value='institution'
                />
                <TextInput
                  errors={errors}
                  label='Social Security No.'
                  placeholder='Enter family employee social security number'
                  register={register}
                  value='SSNo'
                />
              </div>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='PIN Code'
                  placeholder='Enter family PIN code'
                  register={register}
                  value='pinCode'
                />
                <TextInput
                  errors={errors}
                  label='Designation*'
                  placeholder='Enter family employee designation'
                  register={register}
                  value='designation'
                />
              </div>
            </>
          )}
          {formState.errors._form && (
            <div className='flex w-full justify-between my-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
          <div className='flex justify-end'>
            <Button
              type='submit'
              color='blue'
              className='mt-5 hover:animate-bounce'
              ripple={true}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
