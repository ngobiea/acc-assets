'use client';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  Typography,
  IconButton,
} from '@/components/materialTailwind';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setIdType,
  setIsIDType,
  setIsOtherCitizen,
  setIsShowPersonalUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { acquireNationalityBy, countries } from '@/utils/countries';
import { personalIds, titleData } from '@/utils/selectOptions';
import { personalSchema } from '@/utils/validators/setup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { getFormatDate } from '@/utils/user';
import ImagePicker from '@/components/application/image-picker';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextInput from '@/components/common/form/text-input';
import RadioInput from '@/components/common/form/radio-input';
export default function PersonalUpdateForm({
  personal,
}: {
  personal: PersonalSetupAttributes;
}) {
  const dispatch = useAppDispatch();
  const { idType, isShowPersonalUpdateForm } = useAppSelector(
    (state) => state.setup
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(personalSchema),
  });
  useEffect(() => {
    if (isShowPersonalUpdateForm) {
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
    } else {
      reset();
    }
  }, [
    isShowPersonalUpdateForm,
    personal?.aliases,
    personal?.dateOfBirth,
    personal?.firstName,
    personal.gender,
    personal?.maritalStatus,
    personal?.middleName,
    personal?.pid,
    personal?.surname,
    personal?.title,
    setValue,
    reset,
    personal?.country,
    personal?.acquireBy,
  ]);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
    console.log(data);
    // action(formData);
  };
 

  return (
    <Dialog
      open={isShowPersonalUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowPersonalUpdateForm(!isShowPersonalUpdateForm));
      }}
      className='pb-10 relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray'>
          Personal Info
        </Typography>

        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowPersonalUpdateForm(false));
          }}
        >
          <HiXMark className='h-4 w-4' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <form
          className='max-w-3xl mx-auto py-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography className=' text-center'>
            All fields marked with * are required to be filled in.
          </Typography>
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

          <div className='flex justify-end'>
            <Button type='submit' color='blue' className='hover:animate-bounce'>
              Update
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
