import { Typography } from '@/components/materialTailwind';
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Typography
    variant='small'
    color='red'
    className='mt-2 flex items-center gap-1 font-normal'
  >
    {message}
  </Typography>
);

export default ErrorMessage;
