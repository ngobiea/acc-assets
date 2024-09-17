'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { MdOutlineSecurity } from 'react-icons/md';
import SecurityForm from './form';

export default function SecurityAccordion() {
  const dispatch = useAppDispatch();
  const { isSecurityFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card
    >
      <div
        className='bg-blue-100 px-5 py-5'
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineSecurity className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Securities
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <SecurityForm />
      </CardBody>
    </Card>
  );
}
