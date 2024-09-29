'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  CardFooter,
  Typography,
  Button,
  Card,
} from '@/components/materialTailwind';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setIsOtherAssetFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineDevicesOther } from 'react-icons/md';
import type { OtherAssetData } from '@/utils/declaration';
import OtherGridTable from './table-other';
export default function OtherAccordion({
  otherAssets,
}: {
  otherAssets: OtherAssetData[];
}) {
  const dispatch = useAppDispatch();
  const { isOtherAssetFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <MdOutlineDevicesOther className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Other Assets
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() =>
                dispatch(setIsOtherAssetFormOpen(!isOtherAssetFormOpen))
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {otherAssets?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {otherAssets.map((other) => {
        return <OtherGridTable other={other} key={other.id} />;
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
