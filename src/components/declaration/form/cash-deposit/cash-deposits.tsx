'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { BsCashCoin } from 'react-icons/bs';
import CashDepositForm from './form';
export default function CashDepositAccordion() {
  const dispatch = useAppDispatch();
  const {  } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5 hover:animate-bounce'>
        <div
          className='flex items-center space-x-2
        '
        >
          <BsCashCoin className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Cash Deposits
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <CashDepositForm />
      </CardBody>
    </Card>
  );
}
