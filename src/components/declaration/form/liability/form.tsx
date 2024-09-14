import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { liabilitySchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  currencies,
  assetRelation,
  acquisitionMode,
  financeSource,
  loanRepayment,
} from '@/utils/selectOptions';

export default function LiabilityForm() {
  const dispatch = useAppDispatch();
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [showOtherRelation, setShowOtherRelation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    // unregister,
  } = useForm<LiabilityClientForm>({
    resolver: zodResolver(liabilitySchema),
  });

  const onSubmit: SubmitHandler<LiabilityClientForm> = (data) => {
    console.log(data);
  };
  console.log(errors);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'relation') {
      if (value === 'Other') {
        setShowOtherRelation(true);
      } else {
        setShowOtherRelation(false);
        // unregister('jointIncome');
      }
    }
    if (name === 'financeSource') {
      if (value === 'Other') {
        setShowOtherSource(true);
      } else {
        setShowOtherSource(false);
        // unregister('jointIncome');
      }
    }
  };

  return (
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              label={`Debtor's Name*`}
              {...register('debtorName')}
              placeholder='Enter debtor name'
              color='blue'
              error={errors?.debtorName ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.debtorName?.message}
            </p>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('creditor')}
              label='Creditor (Financial Institutions/Individuals)*'
              placeholder='Enter creditor name'
              color='blue'
              error={errors?.creditor ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.creditor?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5 '>
            <Input
              {...register('creditorAddress')}
              label='Location of Creditor'
              placeholder='Enter creditor location'
              color='blue'
              error={errors?.creditorAddress ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.creditorAddress?.message}
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
              onChange={handleChange}
            >
              <option value={''}>Select asset relation*</option>
              {assetRelation.map(({ id, value }) => {
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
          {showOtherRelation && (
            <div className='w-full group mb-5'>
              <Input
                {...register('otherRelation')}
                label='Other asset relation'
                placeholder='Enter other asset relation'
                error={errors?.otherRelation ? true : false}
                color='blue'
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.otherRelation?.message}
              </p>
            </div>
          )}
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <div className='flex'>
              <select
                {...register('currency')}
                className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.loanAmount
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
                {...register('loanAmount')}
                label={`Loan Amount (Actual amount Available)*`}
                min={0}
                placeholder={`Enter estimated current market value`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.loanAmount ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.loanAmount?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <div className='flex'>
              <select
                {...register('currencyOutstanding')}
                className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.loanOutstanding
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
                {...register('loanOutstanding')}
                label={`Outstanding Loan Amount*`}
                min={0}
                placeholder={`Enter outstanding loan amount`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.loanOutstanding ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.loanOutstanding?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <Input
              type='number'
              {...register('yearContracted')}
              label={`Year Loan Contracted`}
              min={0}
              placeholder={`Enter year loan was contracted`}
              color='blue'
              error={errors?.yearContracted ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.yearContracted?.message}
            </p>
          </div>
          <div className='w-full group mb-5'>
            <Input
              {...register('loanPurpose')}
              label='Purpose of Loan'
              placeholder='Enter purpose of loan'
              error={errors?.loanPurpose ? true : false}
              color='blue'
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.loanPurpose?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-5'>
            <div className='flex'>
              <select
                {...register('loanRepayment')}
                className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.paymentPeriod
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border border-blue-gray-300 focus:text-blue-500  focus:ring-blue-500 focus:border-blue-500  outline-blue-500'
                  }
                  `}
              >
                {loanRepayment.map(({ id, value }) => {
                  return (
                    <option key={id} value={id} className=''>
                      {value}
                    </option>
                  );
                })}
              </select>
              <Input
                type='number'
                {...register('paymentPeriod')}
                label={`Payment Period*`}
                min={0}
                placeholder={`Enter payment period`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.paymentPeriod ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.loanAmount?.message}
            </p>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('maturityDate')}
              type='date'
              label='Maturity Date'
              placeholder='Enter maturity date'
              color='blue'
              error={errors?.maturityDate ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.maturityDate?.message}
            </p>
          </div>
        </div>

        <div className='w-full group mb-5'>
          <Textarea
            {...register('remarks')}
            label='Remarks (if any)'
            color={errors.remarks ? 'red' : 'blue'}
          />
          <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
            {errors.remarks?.message}
          </p>
        </div>
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
