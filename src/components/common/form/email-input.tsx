import { Input, Typography } from '@/components/materialTailwind';
import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string[];
  touched: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div>
    <Input
      variant='outlined'
      label='Email Address*'
      type='email'
      placeholder='Email Address'
      name='email'
      value={value}
      error={!!error}
      color='blue'
      className='text-blue-500'
      onBlur={onBlur}
      onChange={onChange}
    />
    {error ? (
      <Typography
        variant='small'
        color='red'
        className='mt-2 flex items-center gap-1 font-normal'
      >
        {error.join(', ')}
      </Typography>
    ) : (
      <Typography
        variant='small'
        color='gray'
        className='mt-2 flex items-center gap-1 font-normal'
      >
        {touched && !value ? (
          <span className='text-red-500 text-sm'>Email is required</span>
        ) : (
          'Please enter your email address'
        )}
      </Typography>
    )}
  </div>
);

export default EmailInput;
