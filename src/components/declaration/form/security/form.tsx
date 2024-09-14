import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { securitySchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  currencies,
  assetRelation,
  acquisitionMode,
  financeSource,
  securityTypes,
} from '@/utils/selectOptions';

export default function SecurityForm() {
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
  } = useForm<SecurityClientForm>({
    resolver: zodResolver(securitySchema),
  });

  const onSubmit: SubmitHandler<SecurityClientForm> = (data) => {
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
    <>
      <CardBody>
        <Card className=' w-full bg-blue-50 mb-5'>
          <CardBody>
            <Typography color='gray'>
              Securities including Premium Bonds, Shares, Debentures, Stocks,
              Certificates, Insurance Premiums, Trust Funds, Foreign Exchange
              etc. in and outside Sierra Leone.
            </Typography>
          </CardBody>
        </Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label={`Owner's Name*`}
                {...register('ownerName')}
                placeholder='Enter asset owner name'
                color='blue'
                error={errors?.ownerName ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.ownerName?.message}
              </p>
            </div>
            <div className='w-full group mb-5 '>
              <Input
                {...register('registerOwner')}
                label='Registered Owner*'
                placeholder='Enter asset registered owner'
                color='blue'
                error={errors?.registerOwner ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.registerOwner?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full mb-5 group'>
              <select
                {...register('type')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.type
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select type of security*</option>
                {securityTypes.map(({ id, value }) => {
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
          <div className=' grid lg:grid-cols-2 lg:gap-6'>
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
            <div className='w-full group mb-8'>
              <Input
                {...register('name')}
                label='Name of Security*'
                placeholder='Enter name of security'
                color='blue'
                error={errors?.name ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.name?.message}
              </p>
            </div>
            <div className='w-full group mb-5 '>
              <Input
                {...register('certificateNo')}
                label='Certificate No*'
                placeholder='Enter certificate number'
                color='blue'
                error={errors?.certificateNo ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.certificateNo?.message}
              </p>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                color='blue'
                {...register('numberOfShares')}
                label='Number of Shares and stocks (for shareholders only)'
                placeholder='Enter your number of shares and stocks'
                error={errors?.numberOfShares ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.numberOfShares?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Input
                color='blue'
                {...register('company')}
                label='Name of Company/Business/Bank*'
                placeholder='Enter name of company/business/bank'
                error={errors?.company ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.company?.message}
              </p>
            </div>
          </div>

          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                color='blue'
                {...register('yearlyInterest')}
                label='Yearly Interest of Shares'
                placeholder='Enter yearly interest of shares'
                error={errors?.yearlyInterest ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.yearlyInterest?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Input
                color='blue'
                {...register('natureOfShares')}
                label='Nature of Shares'
                placeholder='Enter nature of shares'
                error={errors?.natureOfShares ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.natureOfShares?.message}
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
                    errors.currentMarketValue
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
                  {...register('currentMarketValue')}
                  label={`Estimated current market value*`}
                  min={0}
                  placeholder={`Enter estimated current market value`}
                  className={`rounded-l-none `}
                  color='blue'
                  error={errors?.currency ? true : false}
                />
              </div>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.currency?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <div className='flex'>
                <select
                  {...register('acquisitionCurrency')}
                  className={`
                  text-sm rounded-lg block p-2.5 rounded-r-none
                  ${
                    errors.acquisitionCost
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
                  {...register('acquisitionCost')}
                  label={`Acquisition Cost*`}
                  min={0}
                  placeholder={`Enter asset acquisition cost`}
                  className={`rounded-l-none `}
                  color='blue'
                  error={errors?.acquisitionCost ? true : false}
                />
              </div>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.acquisitionCost?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full mb-5 group'>
              <select
                {...register('acquisitionMode')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.relation
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select Acquisition Mode*</option>
                {acquisitionMode.map(({ id, value }) => {
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
            <div className='w-full group mb-5'>
              <Input
                type='number'
                {...register('acquisitionYear')}
                label={`Acquisition Year*`}
                min={0}
                placeholder={`Enter asset acquisition year`}
                color='blue'
                error={errors?.acquisitionYear ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.acquisitionYear?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full mb-8 group'>
              <select
                {...register('financeSource')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.relation
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
                onChange={handleChange}
              >
                <option value={''}>Select source of asset finance*</option>
                {financeSource.map(({ id, value }) => {
                  return (
                    <option key={id} value={value} className=''>
                      {value}
                    </option>
                  );
                })}
              </select>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.financeSource?.message}
              </p>
            </div>
            {showOtherSource && (
              <div className='w-full group mb-5'>
                <Input
                  {...register('otherFinanceSource')}
                  label='Other source of finance*'
                  placeholder='Enter other source of finance'
                  error={errors?.otherFinanceSource ? true : false}
                  color='blue'
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.otherFinanceSource?.message}
                </p>
              </div>
            )}
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
    </>
  );
}
