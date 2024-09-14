'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { setIsLiabilitiesFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { GiTakeMyMoney } from 'react-icons/gi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import LiabilityForm from './form';

export default function LiabilityAccordion() {
  const dispatch = useAppDispatch();
  const { isLiabilitiesFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Accordion
      animate={CUSTOM_ANIMATION}
      open={isLiabilitiesFormOpen}
      icon={isLiabilitiesFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsLiabilitiesFormOpen(!isLiabilitiesFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <GiTakeMyMoney className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Liabilities
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
       <LiabilityForm />
      </AccordionBody>
    </Accordion>
  );
}
