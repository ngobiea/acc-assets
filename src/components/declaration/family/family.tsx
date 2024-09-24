'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
  Button,
  CardFooter,
} from '@/components/materialTailwind';
import { handleNextDeclarationStep, handlePrevDeclarationStep, setIsFamilyFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdFamilyRestroom } from 'react-icons/md';
import type { FamilyData } from '@/utils/declaration';
import FamilyGridTable from './table-family';
export default function FamilyAccordion({

  families
}: { families: FamilyData[] }) {
  const dispatch = useAppDispatch();
  const { isFamilyFormOpen } = useAppSelector((state) => state.declaration);
  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5 rounded-t-md'>
        <div
          className='flex sm:justify-between space-x-2 flex-col sm:flex-row space-y-2 sm:space-y-0
        '
        >
          <div className='flex space-x-1'>
            <MdFamilyRestroom className='text-3xl' />
            <Typography variant='h4' color='blue-gray'>
              Family
            </Typography>
          </div>
          <div>
            <Button
              color='blue'
              className='w-full sm:w-min hover:animate-bounce'
              onClick={() => dispatch(setIsFamilyFormOpen(true))}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {families?.length === 0 && (
        <Typography
          className='p-4 text-blue-gray-400 text-center border border-blue-400'
          variant='h6'
        >
          No data available
        </Typography>
      )}
      {families.map(family => {
        return (
          <FamilyGridTable
            family={family}
            key={family.id}
          />
        )
      })}
      {/* <CardBody className='border border-blue-400'> */}
      {/* <FamilyForm /> */}
      {/* </CardBody> */}
      <CardFooter className='border border-blue-400 '>
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
