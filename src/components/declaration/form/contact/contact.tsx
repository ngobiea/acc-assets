'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { setIsContactFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineContactPhone } from 'react-icons/md';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import ContactForm from './form';

export default function ContactAccordion() {
  const dispatch = useAppDispatch();
  const { isContactFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Accordion
      className=''
      open={isContactFormOpen}
      icon={isContactFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
      animate={CUSTOM_ANIMATION}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() => dispatch(setIsContactFormOpen(!isContactFormOpen))}
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineContactPhone className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Contact
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <ContactForm />
      </AccordionBody>
    </Accordion>
  );
}
