import { Input, Typography } from '@/components/materialTailwind';
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  error?: string[];
  touched: boolean;
  isRepeatPassword?: boolean;
  passwordsMatch?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  showPassword,
  toggleShowPassword,
  error,
  touched,
  isRepeatPassword = false,
  passwordsMatch = true,
}) => {
  const label = isRepeatPassword ? 'Repeat Password*' : 'Password*';
  const name = isRepeatPassword ? 'repeatPassword' : 'password';

  const getErrorMessage = () => {
    if (error && error.length > 0) {
      return `${label} must include ${error.join(', ')}`;
    }
    if (isRepeatPassword && !passwordsMatch) {
      return "Passwords don't match";
    }
    return '';
  };

  const errorMessage = getErrorMessage();

  return (
    <div>
      <Input
        color='blue'
        variant='outlined'
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={label}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={!!errorMessage}
        icon={
          showPassword ? (
            <FaEyeSlash className='w-4 h-4' onClick={toggleShowPassword} />
          ) : (
            <FaEye className='w-4 h-4' onClick={toggleShowPassword} />
          )
        }
      />
      <Typography
        variant='small'
        color={errorMessage ? 'red' : 'gray'}
        className='mt-2 flex items-center gap-1 font-normal'
      >
        {errorMessage ||
          (touched && !value ? (
            <span className='text-red-500'>{`${label} is required`}</span>
          ) : isRepeatPassword ? (
            'Please repeat the password.'
          ) : (
            'Use at least 8 characters, one uppercase, one lowercase and one number.'
          ))}
      </Typography>
    </div>
  );
};

export default PasswordInput;
