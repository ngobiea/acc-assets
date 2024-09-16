'use client';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Button,
  Typography,
  Radio,
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
import { MdCheckCircle } from 'react-icons/md';
import { getFormatDate } from '@/utils/user';
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
  } = useForm<PersonalFormClient>({
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
  const onSubmit: SubmitHandler<PersonalFormClient> = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('pid', data.pid);
    formData.append('idType', idType);
    formData.append('surname', data.surname);
    formData.append('firstName', data.firstName);
    formData.append('middleName', data.middleName);
    formData.append('aliases', data.aliases);
    formData.append('dateOfBirth', data.dateOfBirth);
    formData.append('maritalStatus', data.maritalStatus);
    formData.append('gender', data.gender);
    formData.append('country', data.country);
    formData.append('acquireBy', data.acquireBy);
    console.log(data);
    // action(formData);
  };
  useEffect(() => {}, []);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'idType') {
      dispatch(setIdType(value === 'NIN' ? 'NIN' : 'Passport'));
      if (value === 'Passport') {
        dispatch(setIsIDType(true));
      }
    }
    if (name === 'isOtherNationality') {
      dispatch(setIsOtherCitizen(value === 'Yes'));
    }
  };

  return (
    <Dialog
      open={isShowPersonalUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowPersonalUpdateForm(!isShowPersonalUpdateForm));
      }}
      className=' pb-10 relative'
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
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full mb-8 group'>
              <select
                {...register('title')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.title
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select your title*</option>
                {titleData.map(({ id, value }) => {
                  return (
                    <option key={id} value={value} className=''>
                      {value}
                    </option>
                  );
                })}
              </select>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.title?.message}
              </p>
            </div>
            <div className='w-full mb-5 group'>
              <div className='flex'>
                <select
                  {...register('idType')}
                  onChange={handleChange}
                  className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.pid
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border border-blue-gray-300 focus:text-blue-500  focus:ring-blue-500 focus:border-blue-500  outline-blue-500'
                  }
                  `}
                >
                  {personalIds.map(({ id, value }) => {
                    return (
                      <option key={id} value={value} className=''>
                        {value}
                      </option>
                    );
                  })}
                </select>
                <Input
                  type='text'
                  {...register('pid')}
                  label={idType === 'NIN' ? 'NIN*' : 'Passport Number*'}
                  placeholder={`Enter your ${idType} number`}
                  color='blue'
                  error={errors?.pid ? true : false}
                />
              </div>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.pid && ` ${idType} ${errors.pid?.message}`}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label='Surname*'
                {...register('surname')}
                placeholder='Enter your surname'
                color='blue'
                error={errors?.surname ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.surname?.message}
              </p>
            </div>
            <div className='w-full group mb-5 '>
              <Input
                {...register('firstName')}
                label='First Name*'
                placeholder='Enter your first name'
                color='blue'
                error={errors?.firstName ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.firstName?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                {...register('middleName')}
                label='Middle Name'
                placeholder='Enter your middle name'
                color='blue'
                error={errors?.middleName ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.middleName?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Input
                {...register('aliases')}
                label='Previous Name/Aliases'
                placeholder='Enter your previous name/aliases'
                color='blue'
                error={errors?.aliases ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.aliases?.message}
              </p>
            </div>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('dateOfBirth')}
              type='date'
              label='Date of Birth*'
              placeholder='Enter your Date of Birth'
              color='blue'
              error={errors?.dateOfBirth ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.dateOfBirth?.message}
            </p>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-5'>
              <Typography
                variant='small'
                className={`${
                  errors.maritalStatus ? 'text-red-500' : 'text-gray-800'
                }`}
              >
                Marital Status*
              </Typography>
              <Radio
                {...register('maritalStatus')}
                color={errors.maritalStatus ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.maritalStatus
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.maritalStatus
                        ? 'text-red-500'
                        : 'text-blue-gray-400'
                    }`}
                  >
                    Single
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Single'}
              />
              <Radio
                {...register('maritalStatus')}
                color='blue'
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.maritalStatus
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.maritalStatus
                        ? 'text-red-500'
                        : 'text-blue-gray-400'
                    }`}
                  >
                    Married
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Married'}
              />
              <Radio
                {...register('maritalStatus')}
                color={errors.maritalStatus ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.maritalStatus
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.maritalStatus
                        ? 'text-red-500'
                        : 'text-blue-gray-400'
                    }`}
                  >
                    Divorced
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Divorced'}
              />
              <Radio
                {...register('maritalStatus')}
                color={errors.maritalStatus ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.maritalStatus
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.maritalStatus
                        ? 'text-red-500'
                        : 'text-blue-gray-400'
                    }`}
                  >
                    Separated
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Separated'}
              />
              <Radio
                {...register('maritalStatus')}
                color={errors.maritalStatus ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.maritalStatus
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.maritalStatus
                        ? 'text-red-500'
                        : 'text-blue-gray-400'
                    }`}
                  >
                    Widowed
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Widowed'}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.maritalStatus?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Typography
                variant='small'
                color={errors.gender ? 'red' : 'gray'}
              >
                Gender*
              </Typography>
              <Radio
                {...register('gender')}
                color={errors.gender ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.gender
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    className={`font-normal ${
                      errors.gender ? 'text-red-500' : 'text-blue-gray-400'
                    }`}
                  >
                    Male
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Male'}
              />
              <Radio
                {...register('gender')}
                color={errors.gender ? 'red' : 'blue'}
                ripple={true}
                className={`p-0 transition-all hover:before:opacity-0 ${
                  errors.gender
                    ? 'border-red-500/40 bg-red-500/20'
                    : 'border-gray-900/10 bg-gray-900/5'
                }`}
                label={
                  <Typography
                    color='blue-gray'
                    className={`font-normal ${
                      errors.gender ? 'text-red-500' : 'text-blue-gray-400'
                    }`}
                  >
                    Female
                  </Typography>
                }
                icon={<MdCheckCircle className='h-full w-full scale-105' />}
                value={'Female'}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.gender?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-5'>
              <Typography variant='small' className='text-gray-800'>
                Present Citizenship*
              </Typography>
              <select
                {...register('country')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.country
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
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
            <div className='w-full group mb-5'>
              <Typography
                variant='small'
                className='text-gray-800'
                as={'label'}
              >
                Acquired By*
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
