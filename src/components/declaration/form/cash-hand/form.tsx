import {
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from '@/components/materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cashAtHandSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { currencies } from '@/utils/selectOptions';
import { MdCheckCircle } from 'react-icons/md';

export default function CashAtHandForm() {
  const [isCashAtHand, setIsCashAtHand] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<CashAtHandClientForm>({
    resolver: zodResolver(cashAtHandSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<CashAtHandClientForm> = (data) => {
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
        // unregister('jointIncome');
      }
    }
    if (name === 'isCashAtHand') {
      setIsCashAtHand(value === 'Yes');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full group mb-5'>
        <Typography variant='small' className='text-gray-800'>
          Do you have cash at hand at the time of declaration?
        </Typography>
        <Radio
          {...register('isCashAtHand')}
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
          {...register('isCashAtHand')}
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
      {isCashAtHand && (
        <>
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
                {...register('amount')}
                label={`Cash at hand*`}
                min={0}
                placeholder={`Enter cash at hand at time of declaration`}
                className={`rounded-l-none `}
                color='blue'
                error={errors?.amount ? true : false}
              />
            </div>
            <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
              {errors.amount?.message}
            </p>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-5'>
              <Textarea
                {...register('details')}
                label='Details of Cash at hand (if any)'
                error={errors?.details ? true : false}
                color='blue'
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.details?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Textarea
                {...register('jointIncome')}
                label='Description of Allowances (if any)'
                error={errors?.jointIncome ? true : false}
                color='blue'
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.jointIncome?.message}
              </p>
            </div>
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
        </>
      )}
    </form>
  );
}
