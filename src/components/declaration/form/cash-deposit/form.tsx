import {
  Card,
  CardBody,
  Input,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cashDepositSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  currencies,
  assetRelation,
  depositType,
  depositSource,
} from '@/utils/selectOptions';
import CashAtHandForm from '../cash-hand/form';

export default function CashDepositForm() {
  const dispatch = useAppDispatch();
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const [showOtherSource, setShowOtherSource] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<cashDepositClientForm>({
    resolver: zodResolver(cashDepositSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<cashDepositClientForm> = (data) => {
    console.log(data);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'relation') {
      if (value === 'Other') {
        setShowOtherRelation(true);
      } else {
        setShowOtherRelation(false);
        // unregister('jointIncome');
      }
    }
    if (name === 'source') {
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
      <Card className=' w-full bg-blue-50 mb-5'>
        <CardBody>
          <Typography color='gray'>
            CASH or BANK/Interest Bearing Deposits (In and Outside of Sierra
            Leone)
          </Typography>
        </CardBody>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full mb-8 group'>
            <Input
              {...register('ownerName')}
              label={`Owner's Name*`}
              placeholder='Enter asset owner name'
              color='blue'
              error={errors?.ownerName ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors?.ownerName?.message}
            </p>
          </div>
          <div className='w-full mb-5 group'>
            <Input
              {...register('registerOwner')}
              label='Registered Owner*'
              placeholder='Enter asset registered owner'
              color='blue'
              error={errors?.registerOwner ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors?.registerOwner?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full mb-5 group'>
            <select
              {...register('type')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.relation
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
            >
              <option value={''}>Select deposit type*</option>
              {depositType.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.type?.message}
            </p>
          </div>
          <div className='w-full mb-8 group'>
            <select
              {...register('relation')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.relation
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
              onChange={handleChange}
            >
              <option value={''}>Select cash relation*</option>
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
        <div className=' grid lg:grid-cols-2 lg:gap-6'>
          {showOtherRelation && (
            <div className='w-full group mb-5'>
              <Input
                {...register('otherRelation')}
                label='Other cash relation'
                placeholder='Enter other relation'
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
          <div className='w-full group mb-8'>
            <Input
              label='Account Number*'
              {...register('AccountNo')}
              placeholder='Enter account number'
              color='blue'
              error={errors?.AccountNo ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.AccountNo?.message}
            </p>
          </div>
          <div className='w-full group mb-5 '>
            <Input
              {...register('institutionOrBank')}
              label='Name of Institution/Bank*'
              placeholder='Enter name of institution or bank'
              color='blue'
              error={errors?.institutionOrBank ? true : false}
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.institutionOrBank?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full group mb-8'>
            <Input
              {...register('location')}
              label='Location/Branch*'
              placeholder='Enter location or branch'
              error={errors?.location ? true : false}
              color='blue'
            />
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.location?.message}
            </p>
          </div>
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
                {...register('accountBalance')}
                label={`Account Balance*`}
                min={0}
                placeholder={`Enter your account balance`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.accountBalance ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.accountBalance?.message}
            </p>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <div className='w-full mb-8 group'>
            <select
              {...register('source')}
              className={`border text-sm rounded-lg  block w-full p-2.5 ${
                errors.relation
                  ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                  : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
              }`}
              onChange={handleChange}
            >
              <option value={''}>Select source of deposit*</option>
              {depositSource.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.source?.message}
            </p>
          </div>
          {showOtherSource && (
            <div className='w-full group mb-5'>
              <Input
                {...register('otherSource')}
                label='Deposit source*'
                placeholder='Enter other deposit source'
                error={errors?.otherSource ? true : false}
                color='blue'
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.otherSource?.message}
              </p>
            </div>
          )}
        </div>
      </form>
      <hr className='h-px my-8 bg-blue-500 border-0 dark:bg-gray-700'></hr>
      <CashAtHandForm />
    </CardBody>
  );
}
