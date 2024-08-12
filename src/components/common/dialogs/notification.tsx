'use client';

import {
  Button,
  CardBody,
  CardFooter,
  Drawer,
  Typography,
} from '@/components/materialTailwind';
import DialogContext from '@/context/dialog';
import { useContext } from 'react';

export default function Notification() {
  const { notification, handleNotification } = useContext(DialogContext);

  return (
    <Drawer
      open={notification.message !== ''}
      overlay={false}
      placement='right'
      onClose={() => handleNotification({ message: '', state: 'success' })}
      className='p-4 mt-[calc(100vh-264px)] rounded-l-lg'
      size={500}
    >
      <CardBody className='grid place-items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-5 w-5 text-red-500'
        >
          <path
            fillRule='evenodd'
            d='M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z'
            clipRule='evenodd'
          />
        </svg>
        <Typography color='red' variant='h4'>
          You should read this!
        </Typography>
        <Typography className='text-center font-normal'>
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia.
        </Typography>
      </CardBody>
      <CardFooter className='space-x-2'>
        <Button variant='text' color='blue-gray' onClick={() => {}}>
          close
        </Button>
        <Button variant='gradient' onClick={() => {}}>
          Ok, Got it
        </Button>
      </CardFooter>
    </Drawer>
  );
}
