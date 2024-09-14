'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { setIsSecurityFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineSecurity } from 'react-icons/md';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import SecurityForm from './form';

export default function SecurityAccordion() {
  const dispatch = useAppDispatch();
  const { isSecurityFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Accordion
      animate={CUSTOM_ANIMATION}
      open={isSecurityFormOpen}
      icon={isSecurityFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() => dispatch(setIsSecurityFormOpen(!isSecurityFormOpen))}
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
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <SecurityForm />
      </AccordionBody>
    </Accordion>
  );
}
