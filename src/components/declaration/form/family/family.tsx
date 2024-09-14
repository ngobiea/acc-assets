'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { setIsFamilyFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdFamilyRestroom } from 'react-icons/md';
import FamilyForm from './form';
export default function FamilyAccordion() {
  const dispatch = useAppDispatch();
  const { isFamilyFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Accordion
      open={isFamilyFormOpen}
      icon={isFamilyFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
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
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <FamilyForm />
      </AccordionBody>
    </Accordion>
  );
}
