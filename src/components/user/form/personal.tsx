'use client';

import { useFormState } from 'react-dom';
import { register } from '@/actions/auth/register';
import { titleData, personalIds } from '@/utils/selectOptions';

import { useState, useContext } from 'react';
import DialogContext from '@/context/dialog';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  Button,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@/components/materialTailwind';

const PersonalForm = () => {
  const [formState, action] = useFormState(register, { errors: {} });
  const { handleOpenIdType } = useContext(DialogContext);

  const [idType, setIdType] = useState('NIN');

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === 'idType') {
      setIdType(value);
      if (value === 'Passport') {
        handleOpenIdType();
      }
    }
  };

  console.log(formState.errors);

  return (
    <form className=' space-y-7' action={action} noValidate>
      <CardBody className='flex flex-col gap-4'>
        <div className='w-full group'>
          <select
            name='title'
            id='default'
            className='bg-gray-50 border border-blue-gray-300 focus:text-blue-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option>Select a title</option>
            {titleData.map(({ id, value }) => {
              return (
                <option key={id} value={value} className=''>
                  {value}
                </option>
              );
            })}
          </select>
          {formState.errors.title ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.title?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              Please select your title
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <div className='flex'>
            <select
              onChange={handleChange}
              name='idType'
              className='bg-gray-50 border border-blue-gray-300 focus:text-blue-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 rounded-r-none'
            >
              {personalIds.map(({ id, value }) => {
                return (
                  <option key={id} value={value} className=''>
                    {value}
                  </option>
                );
              })}
            </select>
            <Input
              name='pid'
              type='text'
              label={idType === 'NIN' ? 'NIN*' : 'Passport Number*'}
              placeholder={idType === 'NIN' ? 'NIN' : 'Passport Number'}
              color='blue'
              className=' rounded-l-none'
            />
          </div>

          {formState.errors.pid ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${idType} ${formState.errors.pid?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your {idType} number`
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            name='surname'
            label='Surname*'
            placeholder='Surname'
            color='blue'
          />
          {formState.errors.surname ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.surname?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your surname`
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            name='firstName'
            label='First Name*'
            placeholder='First Name'
            color='blue'
          />
          {formState.errors.firstName ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.firstName?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your first name`
            </Typography>
          )}
        </div>
        <div className='w-full group'>
          <Input
            name='middleName'
            label='Middle Name'
            placeholder='Middle Name'
            color='blue'
          />
          {formState.errors.middleName ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.middleName?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your middle name`
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            type='email'
            name='email'
            label='Email*'
            placeholder='Email'
            color='blue'
          />
          {formState.errors.email ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.email?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              `Please enter your email`
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password*'
            placeholder='Password'
            color='blue'
            icon={
              showPassword ? (
                <FaEyeSlash
                  className='w-4 h-4'
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className='w-4 h-4'
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
          {formState.errors.password ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`Password must include ${formState.errors.password?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              Use at least 8 characters, one uppercase, one lowercase and one
              number.
            </Typography>
          )}
        </div>
        <div className='w-full group '>
          <Input
            type={showRepeatPassword ? 'text' : 'password'}
            name='passwordRepeat'
            label='Confirm Password*'
            placeholder='Confirm Password'
            color='blue'
            icon={
              showRepeatPassword ? (
                <FaEyeSlash
                  className='w-4 h-4'
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                />
              ) : (
                <FaEye
                  className='w-4 h-4'
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                />
              )
            }
          />
          {formState.errors.passwordRepeat ? (
            <Typography
              variant='small'
              color='red'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              {`${formState.errors.passwordRepeat?.join(', ')}`}
            </Typography>
          ) : (
            <Typography
              variant='small'
              color='gray'
              className='mt-2 flex items-center gap-1 font-normal'
            >
              Please confirm your password
            </Typography>
          )}
        </div>
      </CardBody>
      <CardFooter className='pt-0'>
        {formState.errors._form && (
          <div className='flex w-full justify-between mb-5'>
            <Typography>{formState.errors._form.join(', ')}</Typography>
          </div>
        )}
        <Button
          type='submit'
          variant='gradient'
          color='blue'
          fullWidth
          className=' hover:animate-bounce'
        >
          Sign In
        </Button>
        <Typography variant='small' className='mt-6  text-center'>
          Create an account to register yourself in Income, Assets & Liabilities
          Declaration System. Or{' '}
          <Link href='/login' color='blue' className=' font-bold text-blue-500'>
            Login with your existing account
          </Link>
        </Typography>
      </CardFooter>
    </form>
  );
};

export default PersonalForm;
