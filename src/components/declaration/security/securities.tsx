'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
  Button,
  CardFooter,
} from '@/components/materialTailwind';
import { MdOutlineSecurity } from 'react-icons/md';
import {
  handlePrevDeclarationStep,
  handleNextDeclarationStep,
  setIsSecurityFormOpen,
} from '@/store/slices/declarationSlice/declarationSlice';
import type { SecurityData } from '@/utils/declaration';
import SecurityGridTable from './table-security';

export default function SecurityAccordion({securities}: { securities: SecurityData[] }) {
  const dispatch = useAppDispatch();
  const { isSecurityFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card className='my-5 border border-blue-500'>
      <div className='bg-blue-50 px-5 py-5 rounded-t-xl'>
        <div className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0'>
          <div className='flex space-x-1'>
            <MdOutlineSecurity className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Securities
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() =>
                dispatch(setIsSecurityFormOpen(!isSecurityFormOpen))
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {securities?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border-t border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {securities.map((security) => {
        return <SecurityGridTable security={security} key={security.id} />;
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
