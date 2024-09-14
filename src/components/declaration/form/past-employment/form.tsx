import { CardBody, Input, Textarea } from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { pastEmploymentSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { currencies, sourceOfIncome } from '@/utils/selectOptions';

export default function PastEmploymentForm() {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<PastEmploymentClientForm>({
    resolver: zodResolver(pastEmploymentSchema),
    defaultValues: {
      annualSalary: '0',
      allowances: '0',
    },
  });

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
        unregister('otherSourceOfIncome');
      }
    }
  };

  console.log(errors);
  const onSubmit: SubmitHandler<PastEmploymentClientForm> = (data) => {
    console.log(data);
  };
  return (
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              color='blue'
              {...register('employerName')}
              label='Previous Employer - MDA/Private (if any)'
              placeholder='Enter your previous employer'
              error={errors?.employerName ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.employerName?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              {...register('designation')}
              label='Job Title/Designation*'
              placeholder='Enter your job title/designation'
              color='blue'
              error={errors?.designation ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.designation?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <Input
              {...register('rank')}
              label='Rank'
              placeholder='Enter your rank'
              color={'blue'}
              error={errors?.rank ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.rank?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <div className='flex'>
              <select
                {...register('currency')}
                className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.currency
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border border-blue-gray-300 focus:text-blue-500  focus:ring-blue-500 focus:border-blue-500  outline-blue-500'
                  }
                  `}
              >
                {currencies.map(({ id, value }) => {
                  return (
                    <option key={id} value={id} className=''>
                      {value}
                    </option>
                  );
                })}
              </select>
              <Input
                type='number'
                {...register('annualSalary')}
                label={`Annual Net Salary*`}
                min={0}
                placeholder={`Enter your annual net salary`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.annualSalary ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.annualSalary?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <div className='flex'>
              <select
                {...register('allowancesCurrency')}
                className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.allowancesCurrency
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border border-blue-gray-300 focus:text-blue-500  focus:ring-blue-500 focus:border-blue-500  outline-blue-500'
                  }
                  `}
              >
                {currencies.map(({ id, value }) => {
                  return (
                    <option key={id} value={id} className=''>
                      {value}
                    </option>
                  );
                })}
              </select>
              <Input
                type='number'
                {...register('allowances')}
                label={`Other Allowances (if any)`}
                min={0}
                placeholder={`Enter your other allowances `}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.allowances ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.allowances?.message}
            </p>
          </div>
        </div>
        <div className='w-full group mb-5'>
          <Textarea
            {...register('allowancesDescription')}
            label='Description of Allowances (if any)'
            color={errors.allowancesDescription ? 'red' : 'blue'}
          />
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {errors.allowancesDescription?.message}
          </p>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              {...register('contractStartDate')}
              label='Employment Start Date*'
              type='date'
              error={errors?.contractStartDate ? true : false}
              color='blue'
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.contractStartDate?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              {...register('contractEndDate')}
              label='Employment End Date (if known)'
              type='date'
              error={errors?.contractEndDate ? true : false}
              color='blue'
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.contractEndDate?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
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
          </div>
          {showOtherInput && (
            <div className='w-full group mb-5'>
              <Input
                {...register('otherSourceOfIncome')}
                label='Other Source of Income'
                placeholder='Enter other source of income'
                error={errors?.otherSourceOfIncome ? true : false}
                color='blue'
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.otherSourceOfIncome?.message}
              </p>
            </div>
          )}
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-lg '
          >
            Save Employment
          </button>
        </div>
      </form>
    </CardBody>
  );
}
