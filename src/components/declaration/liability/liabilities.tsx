'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
  Button,
  CardFooter,
} from '@/components/materialTailwind';
import { GiTakeMyMoney } from 'react-icons/gi';
import {
  handlePrevDeclarationStep,
  handleNextDeclarationStep,
  setIsLiabilitiesFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import type { LiabilitiesData } from '@/utils/declaration';
import LiabilityGridTable from './table-liability';

export default function LiabilityAccordion({
  liabilities,
}: {
  liabilities: LiabilitiesData[];
}) {
  const dispatch = useAppDispatch();
  const { isLiabilitiesFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <GiTakeMyMoney className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Liabilities
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() =>
                dispatch(setIsLiabilitiesFormOpen(!isLiabilitiesFormOpen))
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {liabilities?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {liabilities.map((liability) => {
        return <LiabilityGridTable liability={liability} key={liability.id} />;
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
