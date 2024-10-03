'use client';
import { Button } from '@/components/materialTailwind';
import { MdAssignmentAdd } from 'react-icons/md';
import { useAppDispatch } from '@/store/hooks';
import { setIsDeclarationFormOpen } from '@/store/slices/declarationSlice/declarationSlice';

export default function NewDeclarationButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => dispatch(setIsDeclarationFormOpen(true))}
      className='flex items-center gap-2 hover:animate-bounce'
      color='blue'
      variant='text'
    >
      <MdAssignmentAdd className='h-4 w-4' />
      New 
    </Button>
  );
}
