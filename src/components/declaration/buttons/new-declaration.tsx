'use client';
import { Button } from '@/components/materialTailwind';
import { MdAssignmentAdd } from 'react-icons/md';
import { useAppDispatch } from '@/store/hooks';
import { toggleIsStartDeclaration } from '@/store/slices/declarationSlice/declarationSlice';

export default function NewDeclarationButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => dispatch(toggleIsStartDeclaration())}
      className='flex items-center gap-2 hover:animate-bounce'
      color='blue'
    >
      <MdAssignmentAdd className='h-4 w-4' />
      New 
    </Button>
  );
}
