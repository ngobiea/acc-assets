'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { GiTakeMyMoney } from 'react-icons/gi';
import LiabilityForm from './form';

export default function LiabilityAccordion() {
  const dispatch = useAppDispatch();
  const { isLiabilitiesFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5 hover:animate-bounce'>
        <div
          className='flex items-center space-x-2
        '
        >
          <GiTakeMyMoney className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Liabilities
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <LiabilityForm />
      </CardBody>
    </Card>
  );
}
