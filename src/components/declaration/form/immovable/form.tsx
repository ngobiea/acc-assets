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
import { immovableAssetsSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  currencies,
  assetRelation,
  immovableAssetType,
  acquisitionMode,
  financeSource,
} from '@/utils/selectOptions';

export default function ImmovableAssetsForm() {
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
  } = useForm<ImmovableAssetClientForm>({
    resolver: zodResolver(immovableAssetsSchema),
  });

  const onSubmit: SubmitHandler<ImmovableAssetClientForm> = (data) => {
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
              Immovable Properties such as land and building/house in and
              outside of Sierra Leone
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
                {...register('assetType')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.relation
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select asset type*</option>
                {immovableAssetType.map(({ id, value }) => {
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
                {...register('location')}
                label='Location*'
                placeholder='Enter asset location'
                color='blue'
                error={errors?.location ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.location?.message}
              </p>
            </div>
            <div className='w-full group mb-5 '>
              <Input
                {...register('plotNo')}
                label='Plot No*'
                placeholder='Enter asset plot number'
                color='blue'
                error={errors?.plotNo ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.plotNo?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                {...register('size')}
                label='Asset Size/Acre*'
                placeholder='Enter asset size/acre'
                color='blue'
                error={errors?.size ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.size?.message}
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
                  {...register('estimatedValue')}
                  label={`Estimated current market value*`}
                  min={0}
                  placeholder={`Enter estimated current market value`}
                  className={`rounded-l-none `}
                  color='blue'
                  error={errors?.estimatedValue ? true : false}
                />
              </div>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.estimatedValue?.message}
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
              <div className='flex'>
                <select
                  {...register('acquisitionCurrency')}
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
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
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
