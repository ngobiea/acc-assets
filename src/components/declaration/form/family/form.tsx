import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { familySchema } from '@/utils/validators/declaration';
import { countries } from '@/utils/countries';
import {
  Button,
  CardBody,
  Input,
  Radio,
  Typography,
} from '@/components/materialTailwind';
import { familyRelation, gender } from '@/utils/selectOptions';
import { MdCheckCircle } from 'react-icons/md';

export default function FamilyForm() {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showEmploymentInput, setShowEmploymentInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
    setValue,
    resetField,
  } = useForm<FamilyClientForm>({
    resolver: zodResolver(familySchema),
    defaultValues: {},
  });

  console.log(errors);
  const onSubmit: SubmitHandler<FamilyClientForm> = (data) => {
    console.log(data);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'sourceOfIncome') {
      if (value === 'Other') {
        setShowOtherInput(true);
      } else {
        setShowOtherInput(false);
        unregister('otherRelation');
      }
    }
    if (name === 'isFamilyEmployment') {
      setShowEmploymentInput(value === 'Yes');

      if (value === 'No') {
        resetField('employeeNo');
        resetField('category');
        resetField('institution');
        resetField('SSNo');
        resetField('pinCode');
        resetField('designation');

        unregister('employeeNo');
        unregister('category');
        unregister('institution');
        unregister('SSNo');
        unregister('pinCode');
        unregister('designation');
      }
    }
  };

  return (
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              label='Surname*'
              {...register('surname')}
              placeholder='Enter family surname'
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
              placeholder='Enter family first name'
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
              placeholder='Enter family middle name'
              color='blue'
              error={errors?.middleName ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.middleName?.message}
            </p>
          </div>
          <div className='w-full mb-5 group'>
            <select
              {...register('relation')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.relation
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
            >
              <option value={''}>Select family relation*</option>
              {familyRelation.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.relation?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <Input
              {...register('address')}
              label='Present Address*'
              placeholder='Enter family present address'
              color='blue'
              error={errors?.firstName ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.firstName?.message}
            </p>
          </div>
          <div className='w-full mb-8 group'>
            <select
              {...register('gender')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.gender
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
            >
              <option value={''}>Select family gender*</option>
              {gender.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.gender?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5 '>
            <Input
              {...register('dateOfBirth')}
              type='date'
              label='Date of Birth*'
              placeholder='Enter family Date of Birth'
              color='blue'
              error={errors?.dateOfBirth ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.dateOfBirth?.message}
            </p>
          </div>
          <div className='w-full mb-8 group'>
            <select
              {...register('nationality')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.nationality
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
            >
              <option value={''}>Select family nationality*</option>
              {countries.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.nationality?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              label='Phone Number'
              {...register('phoneNumber')}
              placeholder='Enter family phone number'
              color='blue'
              error={errors?.phoneNumber ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.phoneNumber?.message}
            </p>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('mobile')}
              label='Mobile Number'
              placeholder='Enter family mobile number'
              color='blue'
              error={errors?.mobile ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.mobile?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              label='Email Address'
              {...register('email')}
              placeholder='Enter family email address'
              color='blue'
              error={errors?.email ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.email?.message}
            </p>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('businessName')}
              label='Name of Business (if self-employed)'
              placeholder='Enter family business name'
              color='blue'
              error={errors?.mobile ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.mobile?.message}
            </p>
          </div>
        </div>

        <div className='w-full group mb-5'>
          <Typography variant='small' className='text-gray-800'>
            Is your spouse or dependent employed*
          </Typography>
          <Radio
            {...register('isFamilyEmployment')}
            color='blue'
            ripple={true}
            className='border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0'
            label={
              <Typography
                color='blue-gray'
                className='font-normal text-blue-gray-400'
              >
                Yes
              </Typography>
            }
            icon={<MdCheckCircle className='h-full w-full scale-105' />}
            value={'Yes'}
            onChange={handleChange}
          />
          <Radio
            defaultChecked={true}
            {...register('isFamilyEmployment')}
            color='blue'
            ripple={true}
            className='border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0'
            label={
              <Typography
                color='blue-gray'
                className='font-normal text-blue-gray-400'
              >
                No
              </Typography>
            }
            icon={<MdCheckCircle className='h-full w-full scale-105' />}
            value={'No'}
            onChange={handleChange}
          />
        </div>
        {showEmploymentInput && (
          <>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('employeeNo')}
                  label='Employee No.*'
                  placeholder='Enter family employee number'
                  color='blue'
                  error={errors?.employeeNo ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.employeeNo?.message}
                </p>
              </div>
              <div className='w-full group mb-5 '>
                <Input
                  {...register('category')}
                  label='Category'
                  placeholder='Enter family employee category'
                  color='blue'
                  error={errors?.category ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.category?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('institution')}
                  label='Institution Name*'
                  placeholder='Enter family institution name'
                  color='blue'
                  error={errors?.institution ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.institution?.message}
                </p>
              </div>
              <div className='w-full group mb-5 '>
                <Input
                  {...register('SSNo')}
                  label='Social Security No.'
                  placeholder='Enter family employee social security number'
                  color='blue'
                  error={errors?.SSNo ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.SSNo?.message}
                </p>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  {...register('pinCode')}
                  label='PIN Code'
                  placeholder='Enter family PIN code'
                  color='blue'
                  error={errors?.pinCode ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.pinCode?.message}
                </p>
              </div>
              <div className='w-full group mb-5 '>
                <Input
                  {...register('designation')}
                  label='Designation*'
                  placeholder='Enter family employee designation'
                  color='blue'
                  error={errors?.designation ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.designation?.message}
                </p>
              </div>
            </div>
          </>
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
    </CardBody>
  );
}
