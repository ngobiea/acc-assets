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
import { setIsCurrentEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import { MdOutlineWorkOutline, MdWork } from 'react-icons/md';
import CurrentEmploymentForm from './form';
export default function CurrentEmploymentAccordion() {
  const dispatch = useAppDispatch();
  const { isCurrentEmploymentFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Accordion
      className=''
      open={isCurrentEmploymentFormOpen}
      icon={isCurrentEmploymentFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
      animate={CUSTOM_ANIMATION}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsCurrentEmploymentFormOpen(!isCurrentEmploymentFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineWorkOutline className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Current Employment
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <CurrentEmploymentForm />
      </AccordionBody>
    </Accordion>
  );
}
