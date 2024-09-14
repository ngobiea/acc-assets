'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { setIsCashDepositFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { BsCashCoin } from 'react-icons/bs';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import CashDepositForm from './form';
export default function CashDepositAccordion() {
  const dispatch = useAppDispatch();
  const { isCashDepositFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Accordion
      open={isCashDepositFormOpen}
      icon={isCashDepositFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
      animate={CUSTOM_ANIMATION}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsCashDepositFormOpen(!isCashDepositFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <BsCashCoin className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Cash Deposits
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <CashDepositForm />
      </AccordionBody>
    </Accordion>
  );
}
