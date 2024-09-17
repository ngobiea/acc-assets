'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from '@/components/materialTailwind';
import { handleNextDeclarationStep,handlePrevDeclarationStep } from '@/store/slices/declarationSlice/declarationSlice';

import { MdOutlineWorkOutline } from 'react-icons/md';
import CurrentEmploymentForm from './form';
import type { MDA } from '@prisma/client';
import CurrentLastEmploymentTable from './table';
import type { EmploymentData } from '@/utils/declaration';
export default function CurrentEmploymentAccordion({
  reason,
  mdas,
  employments
}: {
  reason: string;
  mdas: MDA[];
  employments: EmploymentData[];
}) {
  const dispatch = useAppDispatch();
  const { isCurrentEmploymentFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5'>
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineWorkOutline className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            {reason === 'Appointment' || reason === 'Biennial Declaration'
              ? 'Current Employment'
              : 'Last Employment'}
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <CurrentEmploymentForm reason={reason} mdas={mdas} />
        <CurrentLastEmploymentTable employments={employments} reason={reason} />
        <div className='mt-16 flex justify-between'>
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
      </CardBody>
    </Card>
  );
}
