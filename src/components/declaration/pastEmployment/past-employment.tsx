'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  CardBody,
  Typography,
  Button,
  Card,
  CardFooter,
} from '@/components/materialTailwind';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
} from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineWorkHistory } from 'react-icons/md';
import PastEmploymentForm from '../form/past-employment/form';
import { setIsPastEmploymentFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import type { PastEmploymentData } from '@/utils/declaration';
import PastEmploymentGridTable from './past-employment-table';
export default function PastEmploymentAccordion({pastEmployments}: {
  pastEmployments: PastEmploymentData[];
}) {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.declaration);

  return (
    <Card>
      <div className='bg-blue-50 px-5 py-5 rounded-t-md'>
        <div
          className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0
        '
        >
          <div className='flex space-x-1 '>
            <MdOutlineWorkHistory className='text-3xl' />
            <Typography variant='h5' color='blue-gray' className='text-center'>
              Past Employment List
            </Typography>
          </div>

          <div>
            <Button
              color='blue'
              className='w-full sm:w-min'
              onClick={() => dispatch(setIsPastEmploymentFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {pastEmployments.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {
        pastEmployments.map((employment) => {
          return (<PastEmploymentGridTable
            key={employment.id}
          pastEmployment={employment}
          />)
        })
      }
      <CardFooter className='border border-blue-400'>
        <div className=' flex justify-between'>
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
