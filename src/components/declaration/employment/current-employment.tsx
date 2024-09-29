'use client';
import { useAppDispatch } from '@/store/hooks';
import {
  Typography,
  Card,
  CardFooter,
  Button,
} from '@/components/materialTailwind';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
  setIsEmploymentFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';

import { MdOutlineWorkOutline } from 'react-icons/md';
import CurrentEmploymentGridTable from './current-employment-table';
import type { EmploymentData } from '@/utils/declaration';
export default function CurrentEmploymentAccordion({
  reason,
  employments,
}: {
  reason: string;
  employments: EmploymentData[];
}) {
  const dispatch = useAppDispatch();

  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div
          className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0
        '
        >
          <div className='flex space-x-1 '>
            <MdOutlineWorkOutline className='text-3xl' />
            <Typography variant='h5' color='blue-gray' className='text-center'>
              {reason === 'Appointment' || reason === 'Biennial Declaration'
                ? 'Current Employment List'
                : 'Last Employment List'}
            </Typography>
          </div>

          <div>
            <Button
              color='blue'
              className='w-full sm:w-min'
              onClick={() => dispatch(setIsEmploymentFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {employments?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {employments.map((employment) => {
        return (
          <CurrentEmploymentGridTable
            employment={employment}
            reason={reason}
            key={employment.id}
          />
        );
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
