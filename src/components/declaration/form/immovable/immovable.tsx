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
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { setIsImmovableAssetFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { PiBuildingApartmentDuotone } from 'react-icons/pi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import ImmovableAssetsForm from './form';

export default function ImmovableAccordion() {
  const dispatch = useAppDispatch();
  const { isImmovableAssetFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Accordion
      className=''
      animate={CUSTOM_ANIMATION}
      open={isImmovableAssetFormOpen}
      icon={isImmovableAssetFormOpen ? <FiMinimize2 /> : <FiMaximize2 />}
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsImmovableAssetFormOpen(!isImmovableAssetFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <PiBuildingApartmentDuotone className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Immovable Assets
          </Typography>
        </div>
      </AccordionHeader>
      <AccordionBody className='border border-blue-400'>
        <ImmovableAssetsForm />
      </AccordionBody>
    </Accordion>
  );
}
