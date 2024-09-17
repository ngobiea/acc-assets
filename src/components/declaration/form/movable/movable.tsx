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
import { setIsMovableAssetFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { PiCarProfileBold } from 'react-icons/pi';
import { CUSTOM_ANIMATION } from '../../stepper/declaration';
import MovableAssetsForm from './form';

export default function MovableAccordion() {
  const dispatch = useAppDispatch();
  const { isMovableAssetFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card
    >
      <div
        className='bg-blue-100 px-5 py-5 hover:animate-bounce'
        onClick={() =>
          dispatch(setIsMovableAssetFormOpen(!isMovableAssetFormOpen))
        }
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <PiCarProfileBold className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Movable Assets
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <MovableAssetsForm />
      </CardBody>
    </Card>
  );
}
