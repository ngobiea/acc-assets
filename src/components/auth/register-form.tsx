'use client';

import { useFormState } from 'react-dom';
import { register } from '@/actions/auth/register';
import { titleData, personalIds } from '@/utils/selectOptions';
import {
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from '../materialTailwind';
import { useState, useContext } from 'react';
import DialogContext from '@/context/dialog';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
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
      {formState.errors._form &&  <div className='flex w-full justify-between mb-5'>
          <Typography>
            {formState.errors._form.join(', ')}
         </Typography>
        </div>}
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

export default RegisterForm;
/**
 *  <div className=' w-full my-5 group'>
        <select
          onBlur={handleBlur}
          id='default'
          className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
            {titleTouched && !title ? (
              <span className='text-red-500 text-sm'>Title is required</span>
            ) : (
              `Please select your title`
            )}
          </Typography>
        )}
      </div>
      <div className='w-full mb-5 group'>
        <div className='flex '>
          <div className=''>
            <Select
              color='blue'
              variant='outlined'
              label='ID Type'
              name='idType'
              className='rounded-r-none  border-r-0 border-blue-gray-200'
              containerProps={{ className: 'min-w-[100px]' }}
              value={idType}
              onChange={(val) => {
                setIdType(val as string);
                if (val === 'Passport') {
                  handleOpenIdType();
                }
              }}
              defaultValue={idType}
            >
              {personalIds.map(({ id, value }) => {
                return (
                  <Option key={id} value={value}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </div>
          <Input
            variant='outlined'
            label={idType === 'NIN' ? 'NIN*' : 'Passport Number*'}
            type='text'
            placeholder={idType === 'NIN' ? 'NIN*' : 'Passport Number*'}
            name='pid'
            error={!!formState.errors.pId}
            color='blue'
            className='text-blue-500 rounded-l-none border border-l-0'
            containerProps={{ className: 'min-w-[100px]' }}
            onBlur={handleBlur}
            onChange={(e) => setPid(e.target.value)}
          />
        </div>
        {formState.errors.pId ? (
          <Typography
            variant='small'
            color='red'
            className='mt-2 flex items-center gap-1 font-normal'
          >
            {`${formState.errors.pId?.join(', ')}`}
          </Typography>
        ) : (
          <Typography
            variant='small'
            color='gray'
            className='mt-2 flex items-center gap-1 font-normal'
          >
            {pidTouched && !pid ? (
              <span className='text-red-500 text-sm'>{idType} is required</span>
            ) : (
              `Please enter your ${idType} number`
            )}
          </Typography>
        )}
      </div>
      <div className=''></div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <TextInput
          label='Surname'
          name='surname'
          placeholder='Surname'
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          onBlur={handleBlur}
          error={formState.errors.surname}
          touched={surnameTouched}
          required
        />
        <TextInput
          label='First Name'
          name='firstName'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={handleBlur}
          error={formState.errors.firstName}
          touched={firstNameTouched}
          required
        />
      </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <TextInput
          label='Middle Name'
          name='middleName'
          placeholder='Middle Name'
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          error={formState.errors.middleName}
          touched={false}
        />

        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          error={formState.errors.email}
          touched={emailTouched}
        />
      </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlur}
          showPassword={showPassword}
          toggleShowPassword={togglePassword}
          error={formState.errors.password}
          touched={passwordTouched}
        />
        <PasswordInput
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          onBlur={handleBlur}
          showPassword={showRepeatPassword}
          toggleShowPassword={() => setShowRepeatPassword(!showRepeatPassword)}
          error={formState.errors.passwordRepeat}
          touched={passwordRepeatTouched}
          isRepeatPassword={true}
          passwordsMatch={passwordsMatch}
        />
      </div>
      <FormButton
        disabled={
          !email ||
          !password ||
          !passwordRepeat ||
          !title ||
          !surname ||
          !firstName ||
          !pid ||
          !passwordsMatch
        }
      >
        Login
      </FormButton>
      <FormButton>Login</FormButton>
 */
