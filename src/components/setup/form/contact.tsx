'use client';
import { Button, CardBody, Typography } from '@/components/materialTailwind';
import {
  handlePrevSetupStep,
  setIsNationalCardExist,
  setIsPassportExist,
  setIsSameAsPermanent,
} from '@/store/slices/setupSlice/setupSlice';
import { useFormState } from 'react-dom';
import { postUserContact } from '@/actions/setup/contact';
import { SLDistricts } from '@/utils/selectOptions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactClientSetupSchema } from '@/utils/validators/setup';
import { countries } from '@/utils/countries';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import RadioInput from '@/components/common/form/radio-input';
import SwitchInput from '@/components/common/form/switch-input';
import CheckBoxInput from '@/components/common/form/checkbox-input';

export default function ContactForm({
  contact,
}: {
  contact: ContactSetupAttributes;
}) {
  const dispatch = useAppDispatch();
  const { isSameAsPermanent, isPassportExist, isNationalCardExist } =
    useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postUserContact, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(contactClientSetupSchema),
  });

  // console.log(errors);
  // console.log(formState);
  const watchForm = watch([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as ContactClientSetupForm;
    const formData = new FormData();
    formData.append('telephone', submitted.telephone);
    formData.append('mobile', submitted.mobile);
    formData.append('permanentAddress', submitted.permanentAddress);
    formData.append('permanentDistrict', submitted.permanentDistrict);
    formData.append('isSameAsPermanent', submitted.isSameAsPermanent);
    formData.append('presentAddress', submitted.presentAddress);
    formData.append('presentDistrict', submitted.presentDistrict);
    formData.append('termsAndConditions', submitted.termsAndConditions);
    formData.append('isPassportExist', submitted.isPassportExist);
    formData.append('isNationalIdExist', submitted.isNationalIdExist);
    if (submitted.isPassportExist === 'Yes') {
      formData.append('passportNumber', submitted.passportNumber);
      formData.append('passportCountry', submitted.passportCountry);
      formData.append('passportIssueDate', submitted.passportIssueDate);
      formData.append('passportExpiryDate', submitted.passportExpiryDate);
    }
    if (submitted.isNationalIdExist === 'Yes') {
      formData.append('nationalId', submitted.nationalId);
      formData.append('nationalIdCountry', submitted.nationalIdCountry);
      formData.append('nationalIdIssueDate', submitted.nationalIdIssueDate);
      formData.append('nationalIdExpiryDate', submitted.nationalIdExpiryDate);
    }
    action(formData);
    console.log(data);
  };
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as ContactClientSetupForm;
      currentValues.isSameAsPermanent;
      if (name === 'isPassportExist') {
        dispatch(setIsPassportExist(currentValues.isPassportExist === 'Yes'));
      }
      if (name === 'isSameAsPermanent') {
        console.log(typeof currentValues.isSameAsPermanent);
        dispatch(setIsSameAsPermanent(!!currentValues.isSameAsPermanent));
      }
      if (name === 'isNationalIdExist') {
        dispatch(
          setIsNationalCardExist(currentValues.isNationalIdExist === 'Yes')
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  useEffect(() => {
    if (!isPassportExist) {
      unregister('passportNumber');
      unregister('passportCountry');
      unregister('passportIssueDate');
      unregister('passportExpiryDate');
    }
    if (!isNationalCardExist) {
      unregister('nationalId');
      unregister('nationalIdCountry');
      unregister('nationalIdIssueDate');
      unregister('nationalIdExpiryDate');
    }
  }, [isNationalCardExist, isPassportExist, unregister]);
  console.log(formState.errors);
  useEffect(() => {
    if (formState.errors.telephone) {
      setError('telephone', {
        message: formState.errors.telephone?.join(', '),
      });
    }
    if (formState.errors.mobile) {
      setError('mobile', {
        message: formState.errors.mobile?.join(', '),
      });
    }
    if (formState.errors.permanentAddress) {
      setError('permanentAddress', {
        message: formState.errors.permanentAddress?.join(', '),
      });
    }
    if (formState.errors.permanentDistrict) {
      setError('permanentDistrict', {
        message: formState.errors.permanentDistrict?.join(', '),
      });
    }
    if (formState.errors.presentAddress) {
      setError('presentAddress', {
        message: formState.errors.presentAddress?.join(', '),
      });
    }
    if (formState.errors.presentDistrict) {
      setError('presentDistrict', {
        message: formState.errors.presentDistrict?.join(', '),
      });
    }
    if (formState.errors.termsAndConditions) {
      setError('termsAndConditions', {
        message: formState.errors.termsAndConditions?.join(', '),
      });
    }
    if (formState.errors.isSameAsPermanent) {
      setError('isSameAsPermanent', {
        message: formState.errors.isSameAsPermanent?.join(', '),
      });
    }
    if (formState.errors.isPassportExist) {
      setError('isPassportExist', {
        message: formState.errors.isPassportExist?.join(', '),
      });
    }
    if (formState.errors.isNationalIdExist) {
      setError('isNationalIdExist', {
        message: formState.errors.isNationalIdExist?.join(', '),
      });
    }
    if (formState.errors.passportNumber) {
      setError('passportNumber', {
        message: formState.errors.passportNumber?.join(', '),
      });
    }
    if (formState.errors.passportCountry) {
      setError('passportCountry', {
        message: formState.errors.passportCountry?.join(', '),
      });
    }
    if (formState.errors.passportIssueDate) {
      setError('passportIssueDate', {
        message: formState.errors.passportIssueDate?.join(', '),
      });
    }
    if (formState.errors.passportExpiryDate) {
      setError('passportExpiryDate', {
        message: formState.errors.passportExpiryDate?.join(', '),
      });
    }
    if (formState.errors.nationalId) {
      setError('nationalId', {
        message: formState.errors.nationalId?.join(', '),
      });
    }
    if (formState.errors.nationalIdCountry) {
      setError('nationalIdCountry', {
        message: formState.errors.nationalIdCountry?.join(', '),
      });
    }
    if (formState.errors.nationalIdIssueDate) {
      setError('nationalIdIssueDate', {
        message: formState.errors.nationalIdIssueDate?.join(', '),
      });
    }
    if (formState.errors.nationalIdExpiryDate) {
      setError('nationalIdExpiryDate', {
        message: formState.errors.nationalIdExpiryDate?.join(', '),
      });
    }
  }, [
    dispatch,
    setError,
    formState.errors.isNationalIdExist,
    formState.errors.isPassportExist,
    formState.errors.mobile,
    formState.errors.nationalId,
    formState.errors.nationalIdCountry,
    formState.errors.nationalIdExpiryDate,
    formState.errors.nationalIdIssueDate,
    formState.errors.passportCountry,
    formState.errors.passportExpiryDate,
    formState.errors.passportIssueDate,
    formState.errors.passportNumber,
    formState.errors.permanentAddress,
    formState.errors.permanentDistrict,
    formState.errors.presentAddress,
    formState.errors.presentDistrict,
    formState.errors.telephone,
    formState.errors.termsAndConditions,
  ]);

  return (
    <>
      <CardBody className='flex flex-col gap-4 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
          <Typography className=' text-center'>
            All fields marked with * are required to be filled in.
          </Typography>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Telephone'
              placeholder='Enter your telephone number'
              register={register}
              value='telephone'
            />
            <TextInput
              errors={errors}
              label='Mobile'
              placeholder='Enter your mobile number'
              register={register}
              value='mobile'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Permanent Address*'
              placeholder='Enter your permanent address'
              register={register}
              value='permanentAddress'
            />
            <SelectInput
              errors={errors}
              label='Select Permanent District*'
              options={SLDistricts.map(({ district, province }) => {
                return { id: district, value: `${district} - ${province}` };
              })}
              register={register}
              value='permanentDistrict'
            />
          </div>

          <SwitchInput
            label='Present Address'
            linkLabel='Same as permanent address'
            register={register}
            value='isSameAsPermanent'
          />
          {!isSameAsPermanent && (
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <TextInput
                errors={errors}
                label='Present Address'
                placeholder='Enter your present address'
                register={register}
                value='presentAddress'
              />
              <SelectInput
                errors={errors}
                label='Select Present District'
                options={SLDistricts.map(({ district, province }) => {
                  return { id: district, value: `${district} - ${province}` };
                })}
                register={register}
                value='presentDistrict'
              />
            </div>
          )}
          <RadioInput
            errors={errors}
            radioLabel='Do you have a passport'
            register={register}
            value='isPassportExist'
            values={[
              { radioValue: 'Yes' },
              { radioValue: 'No', defaultChecked: true },
            ]}
          />
          {isPassportExist && (
            <>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='Passport Number'
                  placeholder='Enter your passport number'
                  register={register}
                  value='passportNumber'
                />
                <SelectInput
                  errors={errors}
                  label='Select Passport Country'
                  options={countries}
                  register={register}
                  value='passportCountry'
                />
              </div>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='Issue Date'
                  placeholder='Enter passport issue date'
                  register={register}
                  value='passportIssueDate'
                  type='date'
                />
                <TextInput
                  errors={errors}
                  label='Enter passport expiry date'
                  placeholder='Expiry Date'
                  register={register}
                  value='passportExpiryDate'
                  type='date'
                />
              </div>
            </>
          )}
          <RadioInput
            errors={errors}
            radioLabel='Do you have a national ID card'
            register={register}
            value='isNationalIdExist'
            values={[
              { radioValue: 'Yes' },
              { radioValue: 'No', defaultChecked: true },
            ]}
          />
          {isNationalCardExist && (
            <>
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
                  label='Select Country*'
                  options={countries}
                  register={register}
                  value='nationalIdCountry'
                />
              </div>
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <TextInput
                  errors={errors}
                  label='Issue Date*'
                  placeholder='Enter National Card issue date'
                  register={register}
                  value='nationalIdIssueDate'
                  type='date'
                />
                <TextInput
                  errors={errors}
                  label='Enter National Car expiry date*'
                  placeholder='Expiry Date'
                  register={register}
                  value='nationalIdExpiryDate'
                  type='date'
                />
              </div>
            </>
          )}
          {formState.errors._form && (
            <div className='flex w-full justify-between mb-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}

          <CheckBoxInput
            errors={errors}
            label=' I agree with the'
            linkLabel='Terms and Conditions of the ACC'
            register={register}
            value='termsAndConditions'
            placeholder=''
          />
          <div className='flex justify-between space-y-5 flex-col sm:flex-row sm:space-y-0 '>
            <Button
              color='blue'
              onClick={() => {
                window.scrollTo(0, 0);
                dispatch(handlePrevSetupStep());
              }}
            >
              Prev: Employment
            </Button>
            <Button type='submit' color='blue'>
              Save & Continue
            </Button>
          </div>
        </form>
      </CardBody>
    </>
  );
}
