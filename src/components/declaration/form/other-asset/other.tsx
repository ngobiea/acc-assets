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
import { setIsOtherAssetFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineDevicesOther } from 'react-icons/md';
import OtherAssetsForm from './form';
export default function OtherAccordion() {
  const dispatch = useAppDispatch();
  const { isOtherAssetFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card
    >
      <AccordionHeader
        className='bg-blue-100 px-5 hover:animate-bounce'
      >
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineDevicesOther className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Other Assets
          </Typography>
        </div>
      </AccordionHeader>
      <CardBody className='border border-blue-400'>
        <OtherAssetsForm />
      </CardBody>
    </Card>
  );
}
