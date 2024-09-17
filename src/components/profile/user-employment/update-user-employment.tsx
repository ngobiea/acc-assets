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
import SelectInput from '@/components/common/form/select-input';
import TextInput from '@/components/common/form/text-input';
import RadioInput from '@/components/common/form/radio-input';
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
  } = useForm<FormValues>({
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
