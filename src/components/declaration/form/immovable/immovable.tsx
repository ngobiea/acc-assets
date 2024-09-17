'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  CardBody,
  Typography,
  Card,
} from '@/components/materialTailwind';
import { PiBuildingApartmentDuotone } from 'react-icons/pi';
import ImmovableAssetsForm from './form';

export default function ImmovableAccordion() {
  const dispatch = useAppDispatch();
  const { isImmovableAssetFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5 hover:animate-bounce'>
        <div
          className='flex items-center space-x-2
        '
        >
          <PiBuildingApartmentDuotone className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Immovable Assets
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <ImmovableAssetsForm />
      </CardBody>
    </Card>
  );
}
