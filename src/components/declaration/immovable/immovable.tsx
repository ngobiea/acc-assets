'use client';
import { useAppDispatch } from '@/store/hooks';
import {
  Typography,
  Card,
  CardFooter,
  Button,
} from '@/components/materialTailwind';
import { PiBuildingApartmentDuotone } from 'react-icons/pi';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setIsImmovableAssetFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import type { ImmovableAssetData } from '@/utils/declaration';
import ImmovableGridTable from './table-immovable';

export default function ImmovableAccordion({
  immovableAssets,
}: {
  immovableAssets: ImmovableAssetData[];
}) {
  const dispatch = useAppDispatch();
  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <PiBuildingApartmentDuotone className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Immovable Assets
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() => dispatch(setIsImmovableAssetFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {immovableAssets?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {immovableAssets.map((immovable) => {
        return <ImmovableGridTable immovable={immovable} key={immovable.id} />;
      })}

      <CardFooter className='border-t border-blue-400 '>
        <div className='flex justify-between'>
          <Button
            onClick={() => dispatch(handlePrevDeclarationStep())}
            color='blue'
          >
            Prev
          </Button>
          <Button
            color='blue'
            onClick={() => dispatch(handleNextDeclarationStep())}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
