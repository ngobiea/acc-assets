'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  CardBody,
  Typography,
  Button,
  Card,
} from '@/components/materialTailwind';
import { handleNextDeclarationStep, handlePrevDeclarationStep } from '@/store/slices/declarationSlice/declarationSlice';
import { MdOutlineWorkHistory } from 'react-icons/md';
import PastEmploymentForm from './form';
export default function PastEmploymentAccordion() {
  const dispatch = useAppDispatch();
  const {  } = useAppSelector(
    (state) => state.declaration
  );

  return (
    <Card>
      <div className='bg-blue-100 px-5 py-5 hover:animate-bounce'>
        <div
          className='flex items-center space-x-2
        '
        >
          <MdOutlineWorkHistory className='text-3xl' />
          <Typography variant='h4' color='blue-gray'>
            Past Employment
          </Typography>
        </div>
      </div>
      <CardBody className='border border-blue-400'>
        <PastEmploymentForm />
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
