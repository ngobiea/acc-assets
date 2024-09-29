'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  Button,
  CardFooter,
} from '@/components/materialTailwind';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setIsMovableAssetFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import { PiCarProfileBold } from 'react-icons/pi';
import MovableGridTable from './table-movable';
import type { MovableAssetData } from '@/utils/declaration';

export default function MovableAccordion({
  movableAssets,
}: {
  movableAssets: MovableAssetData[];
}) {
  const dispatch = useAppDispatch();
  const { isMovableAssetFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <PiCarProfileBold className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Movable Assets
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() => dispatch(setIsMovableAssetFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {movableAssets?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {movableAssets.map((movable) => {
        return <MovableGridTable movable={movable} key={movable.id} />;
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
