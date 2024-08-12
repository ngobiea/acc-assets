import { Input, Typography } from '@/components/materialTailwind';
import React from 'react';

interface TextInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string[];
  touched: boolean;
  required?: boolean;
  width?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  width = 'full',
}) => (
  <div style={{ width }}>
    <Input
      variant='outlined'
      label={required ? `${label}*` : label}
      type={type}
      placeholder={required ? `${placeholder}*` : placeholder}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      error={!!error}
      color='blue'
      className='text-blue-500'
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
          <span className='text-red-500 text-sm'>{`${label} is required`}</span>
        ) : (
          `Please enter your ${label.toLowerCase()}`
        )}
      </Typography>
    )}
  </div>
);

export default TextInput;
