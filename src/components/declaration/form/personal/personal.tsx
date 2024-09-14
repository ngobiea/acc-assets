'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@/components/materialTailwind';

import { setIsPersonalFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import { BsPersonVcard } from 'react-icons/bs';
import DeclarationPersonalForm from './form';
export default function DeclarationPersonalAccordion() {
  const dispatch = useAppDispatch();
  const { isPersonalFormOpen } = useAppSelector((state) => state.declaration);

  return (
    <Accordion
      open={isPersonalFormOpen}
      icon={isPersonalFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
      animate={CUSTOM_ANIMATION}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() => dispatch(setIsPersonalFormOpen(!isPersonalFormOpen))}
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <BsPersonVcard className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Personal Information
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400 relative'>
        <DeclarationPersonalForm />
      </AccordionBody>
    </Accordion>
  );
}
