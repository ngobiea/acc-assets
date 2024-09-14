'use client';
import { useFormState } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  CardBody,
  CardFooter,
  Input,
  Typography,
  Radio,
  Button,
  Card,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/materialTailwind';
import { setIsPastEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import { MdOutlineWorkHistory } from 'react-icons/md';
import PastEmploymentForm from './form';
export default function PastEmploymentAccordion() {
  const dispatch = useAppDispatch();
  const { isPastEmploymentFormOpen } = useAppSelector(
    (state) => state.declaration
  );

  return (
    <Accordion
      className=''
      open={isPastEmploymentFormOpen}
      icon={isPastEmploymentFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
      animate={CUSTOM_ANIMATION}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsPastEmploymentFormOpen(!isPastEmploymentFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineWorkHistory className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Past Employment
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <PastEmploymentForm />
      </AccordionBody>
    </Accordion>
  );
}
