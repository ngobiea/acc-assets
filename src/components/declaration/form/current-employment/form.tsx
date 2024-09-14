import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { currentLastEmploymentSchema } from '@/utils/validators/declaration';
import { CardBody, Input, Textarea } from '@/components/materialTailwind';
import {
  currencies,
  sourceOfIncome,
  contractTypes,
} from '@/utils/selectOptions';
export default function CurrentEmploymentForm() {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const { mdas } = useAppSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<CurrentLastEmploymentClientForm>({
    resolver: zodResolver(currentLastEmploymentSchema),
    defaultValues: {
      annualSalary: '0',
      allowance: '0',
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
  const onSubmit: SubmitHandler<CurrentLastEmploymentClientForm> = (data) => {
    console.log(data);
  };
  return (
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <option value={''}>
                Select Ministry/Department/Agency (MDA)*
              </option>
              {mdas.map(({ id, abbreviation, name }) => {
                return (
                  <option key={id} value={id} className=''>
                    {`${abbreviation} - ${name}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='w-full group mb-5'>
            <Input
              color='blue'
              {...register('employeeCategory')}
              label='Employee Category*'
              placeholder='Enter your employee category'
              error={errors?.employeeCategory ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.employeeCategory?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              color='blue'
              {...register('posting')}
              label='Current Posting*'
              placeholder='Enter your current posting'
              error={errors?.posting ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.posting?.message}
            </p>
          </div>

          <div className='w-full group mb-5'>
            <Input
              color='blue'
              {...register('designation')}
              label='Job Title/Designation*'
              placeholder='Enter your job title/designation'
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
              color='blue'
              {...register('rank')}
              label='Grade/Rank*'
              placeholder='Enter your grade/rank'
              error={errors?.rank ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.rank?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              color='blue'
              {...register('SSNo')}
              label='Social Security Number-SSNo'
              placeholder='Enter your social security number'
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
              color='blue'
              {...register('employeeId')}
              label='Employee ID*'
              placeholder='Enter your employee ID'
              error={errors?.employeeId ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.employeeId?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              color='blue'
              {...register('employeePin')}
              label='Employee PIN No (if any)'
              placeholder='Enter your job title/designation'
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
              color='blue'
              {...register('establishmentRegNo')}
              label='Establishment Registration No (if any)'
              placeholder='Enter your establishment registration number'
              error={errors?.establishmentRegNo ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.establishmentRegNo?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <select
              {...register('contractType')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.contractType
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
            >
              <option value={''}>Select Contract Type*</option>
              {contractTypes.map(({ id, value }) => {
                return (
                  <option key={id} value={id} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.contractType?.message}
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
                    errors.annualSalary
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
                color='blue'
                type='number'
                {...register('annualSalary')}
                label={`Annual Net Salary*`}
                min={0}
                placeholder={`Enter your annual net salary`}
                className={`rounded-l-none `}
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
                color='blue'
                {...register('allowance')}
                label={`Other Allowances (if any)`}
                min={0}
                placeholder={`Enter your other allowances `}
                className={`rounded-l-none `}
                error={errors?.allowance ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.allowance?.message}
            </p>
          </div>
        </div>
        <div className='w-full group mb-5'>
          <Textarea
            {...register('allowancesDescription')}
            label='Description of Allowances (if any)'
            error={errors?.allowancesDescription ? true : false}
          />
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {errors.allowancesDescription?.message}
          </p>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
            color='blue'
              {...register('contractStartDate')}
              label='Employment Start Date*'
              type='date'
              error={errors?.contractStartDate ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.contractStartDate?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              color='blue'
              {...register('contractEndDate')}
              label='Employment End Date (if known)'
              type='date'
              error={errors?.contractEndDate ? true : false}
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
              color='blue'
                {...register('otherSourceOfIncome')}
                label='Other Source of Income'
                placeholder='Enter other source of income'
                error={errors?.otherSourceOfIncome ? true : false}
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
