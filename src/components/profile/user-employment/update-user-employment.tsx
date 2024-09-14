'use client';

import { useFormState } from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userEmploymentSchema } from '@/utils/validators/setup';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { postUserEmployment } from '@/actions/setup/userEmployment';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Radio,
  Typography,
} from '@/components/materialTailwind';
import { sourceOfIncome } from '@/utils/selectOptions';
import {
  handleNextSetupStep,
  setIsShowEmploymentUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { MDA } from '@prisma/client';
import { HiXMark } from 'react-icons/hi2';
import { isOtherOption } from '@/utils/user';
export default function UserEmploymentUpdateForm({
  employment,
  mdas,
}: {
  employment: UserEmploymentSetupAttributes;
  mdas: MDA[];
}) {
  const dispatch = useAppDispatch();
  const [formState, action] = useFormState(postUserEmployment, { errors: {} });
  const [showOtherInput, setShowOtherInput] = useState(
    !isOtherOption({
      value: employment?.sourceOfIncome ? employment?.sourceOfIncome : '',
      options: sourceOfIncome,
    })
  );
  const { isShowEmploymentUpdateForm } = useAppSelector((state) => state.setup);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<UserEmploymentFormClient>({
    resolver: zodResolver(userEmploymentSchema),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'sourceOfIncome') {
      if (value === 'Other') {
        setShowOtherInput(true);
      } else {
        setShowOtherInput(false);
      }
    }
  };
  const onSubmit: SubmitHandler<UserEmploymentFormClient> = (data) => {
    const formData = new FormData();
    formData.append('mdaId', data.mdaId);
    formData.append('employeeCategory', data.employeeCategory);
    formData.append('currentPosting', data.currentPosting);
    formData.append('designation', data.designation);
    formData.append('rankOrGrade', data.rankOrGrade);
    formData.append('employeePin', data.employeePin);
    formData.append('establishmentRegNo', data.establishmentRegNo);
    formData.append('sourceOfIncome', data.sourceOfIncome);
    formData.append('isAdministrative', data.isAdministrative);
    formData.append('isFinancial', data.isFinancial);
    formData.append('isPolitical', data.isPolitical);
    formData.append('isProfessional', data.isProfessional);
    if (showOtherInput) {
      formData.append('otherSourceOfIncome', data.otherSourceOfIncome);
    } else {
      formData.append('otherSourceOfIncome', '');
    }
    console.log(data);
    // action(formData);
  };
  useEffect(() => {
    if (formState.data?.userEmployment) {
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
    if (isShowEmploymentUpdateForm) {
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
      } else {
        setValue(
          'sourceOfIncome',
          employment?.sourceOfIncome ? employment?.sourceOfIncome : ''
        );
      }
      setValue(
        'otherSourceOfIncome',
        employment?.sourceOfIncome ? employment?.sourceOfIncome : ''
      );
      setValue(
        'isAdministrative',
        employment?.isAdministrative ? 'true' : 'false'
      );
      setValue('isFinancial', employment?.isFinancial ? 'true' : 'false');
      setValue('isPolitical', employment?.isPolitical ? 'true' : 'false');
      setValue('isProfessional', employment?.isProfessional ? 'true' : 'false');
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
    isShowEmploymentUpdateForm,
    reset,
    setValue,
  ]);
  return (
    <Dialog
      open={isShowEmploymentUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowEmploymentUpdateForm(!isShowEmploymentUpdateForm));
      }}
      className=' pb-10 relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray'>
          Employment Info
        </Typography>

        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowEmploymentUpdateForm(false));
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
          <CardBody className='flex flex-col gap-4'>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <select
                  {...register('mdaId')}
                  className={`border text-sm rounded-lg  block w-full p-2.5 ${
                    errors.mdaId
                      ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                  }`}
                >
                  <option value={''}>Select MDA*</option>
                  {mdas.map(({ id, abbreviation, name }) => {
                    return (
                      <option key={id} value={id} className=''>
                        {`${abbreviation} - ${name}`}
                      </option>
                    );
                  })}
                </select>
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.mdaId?.message}
                </p>
              </div>
              <div className='w-full group mb-5'>
                <Input
                  {...register('employeeCategory')}
                  label='Employee Category*'
                  placeholder='Enter your employee category'
                  color='blue'
                  error={errors?.employeeCategory ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors?.employeeCategory?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('currentPosting')}
                  label='Current Posting'
                  placeholder='Enter your current posting'
                  color='blue'
                  error={errors?.currentPosting ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.currentPosting?.message}
                </p>
              </div>
              <div className='w-full group mb-5 '>
                <Input
                  {...register('designation')}
                  label='Designation*'
                  placeholder='Enter your designation'
                  color='blue'
                  error={errors?.designation ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.designation?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('rankOrGrade')}
                  label='Rank/Grade'
                  placeholder='Enter your rank or grade'
                  color='blue'
                  error={errors?.rankOrGrade ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.rankOrGrade?.message}
                </p>
              </div>
              <div className='w-full group mb-5 '>
                <Input
                  {...register('employeePin')}
                  label='Employee PIN'
                  placeholder='Enter your employee PIN'
                  color='blue'
                  error={errors?.employeePin ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.employeePin?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('establishmentRegNo')}
                  label='Establishment Registration Number'
                  placeholder='Enter your establishment registration number'
                  color='blue'
                  error={errors?.establishmentRegNo ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.establishmentRegNo?.message}
                </p>
              </div>
              <div className='w-full group mb-8'>
                <select
                  {...register('sourceOfIncome')}
                  onChange={handleChange}
                  className={`border text-sm rounded-lg  block w-full p-2.5 ${
                    errors.sourceOfIncome
                      ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                  }`}
                >
                  <option value={''}>Select Source of Income</option>
                  {sourceOfIncome.map(({ id, value }) => {
                    return (
                      <option key={id} value={id} className=''>
                        {value}
                      </option>
                    );
                  })}
                </select>
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.sourceOfIncome?.message}
                </p>
              </div>
            </div>
            {showOtherInput && (
              <div className='grid lg:grid-cols-2 lg:gap-6'>
                <div className='w-full group lg:col-start-2 '>
                  <Input
                    {...register('otherSourceOfIncome')}
                    label='Source of Income'
                    placeholder='Enter your source of income'
                    color='blue'
                    error={errors?.otherSourceOfIncome ? true : false}
                  />
                  <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                    {errors.otherSourceOfIncome?.message}
                  </p>
                </div>
              </div>
            )}

            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Typography variant='small' className='text-gray-800'>
                  Do you have an administrative responsibility?*
                </Typography>
                <Radio
                  {...register('isAdministrative')}
                  color={errors.isAdministrative ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isAdministrative
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isAdministrative
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      Yes
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'true'}
                />
                <Radio
                  {...register('isAdministrative')}
                  color={errors.isAdministrative ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isAdministrative
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isAdministrative
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      No
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'false'}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.isAdministrative?.message}
                </p>
              </div>
              <div className='w-full group '>
                <Typography variant='small' className='text-gray-800'>
                  Do you have financial responsibility?*
                </Typography>
                <Radio
                  {...register('isFinancial')}
                  color={errors.isFinancial ? 'red' : 'blue'}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isFinancial
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  ripple={true}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isFinancial
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      Yes
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'true'}
                />
                <Radio
                  {...register('isFinancial')}
                  color={errors.isFinancial ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isFinancial
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isFinancial
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      No
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'false'}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.isFinancial?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group '>
                <Typography variant='small' className='text-gray-800'>
                  Do you have political responsibility?*
                </Typography>
                <Radio
                  {...register('isPolitical')}
                  color={errors.isPolitical ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isPolitical
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isPolitical
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      Yes
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'true'}
                />
                <Radio
                  {...register('isPolitical')}
                  color={errors.isPolitical ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isPolitical
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isPolitical
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      No
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'false'}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.isPolitical?.message}
                </p>
              </div>
              <div className='w-full group '>
                <Typography variant='small' className='text-gray-800'>
                  Do you have a professional responsibility?*
                </Typography>
                <Radio
                  {...register('isProfessional')}
                  color={errors.isProfessional ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isProfessional
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isProfessional
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      Yes
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'true'}
                />
                <Radio
                  {...register('isProfessional')}
                  color={errors.isProfessional ? 'red' : 'blue'}
                  ripple={true}
                  className={`p-0 transition-all hover:before:opacity-0 ${
                    errors.isProfessional
                      ? 'border-red-500/40 bg-red-500/20'
                      : 'border-gray-900/10 bg-gray-900/5'
                  }`}
                  label={
                    <Typography
                      color='blue-gray'
                      className={`font-normal ${
                        errors.isProfessional
                          ? 'text-red-500'
                          : 'text-blue-gray-400'
                      }`}
                    >
                      No
                    </Typography>
                  }
                  icon={<MdCheckCircle className='h-full w-full scale-105' />}
                  value={'false'}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.isProfessional?.message}
                </p>
              </div>
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            {formState.errors._form && (
              <div className='flex w-full justify-between mb-5 text-red-500'>
                <Typography>{formState.errors._form.join(', ')}</Typography>
              </div>
            )}
            <div className='flex justify-end'>
              {/* <Button  color='blue'
          onClick={handlePrev}
          >
            Prev: Personal
          </Button> */}
              <Button type='submit' color='blue'>
                Next Step: Contact
              </Button>
            </div>
          </CardFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
}
