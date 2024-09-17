'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Typography, Card, CardBody } from '@/components/materialTailwind';

import { BsPersonVcard } from 'react-icons/bs';
import DeclarationPersonalForm from './form';
import { DPersonal } from '@prisma/client';
export default function DeclarationPersonalAccordion({ personal }: { personal: DPersonal }) {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.declaration);

  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5'>
        <div className='flex items-center space-x-2'>
          <BsPersonVcard className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Personal Information
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400 relative'>
        <DeclarationPersonalForm personal={personal} />
      </CardBody>
    </Card>
  );
}
