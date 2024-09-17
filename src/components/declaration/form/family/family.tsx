'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Typography, Card, CardBody } from '@/components/materialTailwind';
import { setIsFamilyFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdFamilyRestroom } from 'react-icons/md';
import FamilyForm from './form';
export default function FamilyAccordion() {
  const dispatch = useAppDispatch();
  const { isFamilyFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card>
      <div
        className='bg-blue-100 px-5 py-5 hover:animate-bounce'
        onClick={() => dispatch(setIsFamilyFormOpen(!isFamilyFormOpen))}
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdFamilyRestroom className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Family
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <FamilyForm />
      </CardBody>
    </Card>
  );
}
