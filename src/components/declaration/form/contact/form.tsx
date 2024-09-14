import {
  Button,
  CardBody,
  Input,
  Radio,
  Switch,
  Typography,
} from '@/components/materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SLDistricts } from '@/utils/selectOptions';
import { contactSchema } from '@/utils/validators/declaration';
export default function ContactForm() {
  const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<ContactClientForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<ContactClientForm> = (data) => {
    console.log(data);
  };
  console.log(errors);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement >
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

      if (name === 'isSameAsPermanent') {
        console.log(event.target.checked);
      console.log(value);
      setIsSameAsPermanent(event.target.checked);
    }
  };

  return (
    <>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8 '>
              <Input
                label='Telephone'
                placeholder='Enter your telephone number'
                {...register('telephone')}
                color={errors.telephone ? 'red' : 'blue'}
                className={` ${
                  errors.telephone
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.telephone?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Input
                label='Mobile'
                placeholder='Enter your mobile number'
                {...register('mobile')}
                color={errors.mobile ? 'red' : 'blue'}
                className={` ${
                  errors.mobile
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.mobile?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label='Permanent Address*'
                placeholder='Enter your permanent address'
                {...register('permanentAddress')}
                color={errors.permanentAddress ? 'red' : 'blue'}
                className={` ${
                  errors.permanentAddress
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.permanentAddress?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <select
                {...register('permanentDistrict')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.permanentDistrict
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select Permanent District*</option>
                {SLDistricts.map(({ district, province }) => {
                  return (
                    <option
                      key={district}
                      value={`${district} - ${province}`}
                      className=''
                    >
                      {`${district} - ${province}`}
                    </option>
                  );
                })}
              </select>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.permanentDistrict?.message}
              </p>
            </div>
          </div>
          <div>
            <Switch
              {...register('isSameAsPermanent')}
              color='blue'
              ripple={true}
              onChange={handleChange}
              label={
                <div>
                  <Typography color='blue-gray' className='font-medium'>
                    Present Address
                  </Typography>
                  <Typography
                    variant='small'
                    color='gray'
                    className='font-normal'
                  >
                    Same as permanent address
                  </Typography>
                </div>
              }
              containerProps={{
                className: '-mt-5',
              }}
            />
          </div>

          {!isSameAsPermanent && (
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group '>
                <Input
                  label='Present Address'
                  placeholder='Enter your permanent address'
                  {...register('presentAddress')}
                  color={errors.presentAddress ? 'red' : 'blue'}
                  className={` ${
                    errors.presentAddress
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                      : ''
                  }`}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.presentAddress?.message}
                </p>
              </div>
              <div className='w-full group'>
                <select
                  {...register('presentDistrict')}
                  className={`border text-sm rounded-lg  block w-full p-2.5 ${
                    errors.presentDistrict
                      ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                  }`}
                >
                  <option value={''}>Select Present District</option>
                  {SLDistricts.map(({ district, province }) => {
                    return (
                      <option
                        key={district}
                        value={`${district} - ${province}`}
                        className=''
                      >
                        {`${district} - ${province}`}
                      </option>
                    );
                  })}
                </select>
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.presentDistrict?.message}
                </p>
              </div>
            </div>
          )}

          <div className=' absolute bottom-0 right-0'>
            <Button type='submit' color='blue'>
              Save and Continue
            </Button>
          </div>
        </form>
      </CardBody>
    </>
  );
}
