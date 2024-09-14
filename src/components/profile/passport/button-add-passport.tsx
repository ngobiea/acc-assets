'use client';
import { useAppDispatch } from '@/store/hooks';
import { setIsShowPassportUpdateForm } from '@/store/slices/setupSlice/setupSlice';
import { Button } from '@/components/materialTailwind';
import { MdAdd } from 'react-icons/md';

export default function AddPassportButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      size='sm'
      color='blue'
      variant='text'
      className='flex items-center gap-1 hover:animate-bounce '
      onClick={() => {
        dispatch(setIsShowPassportUpdateForm(true));
      }}
    >
      <MdAdd className='h-4 w-4' /> Add
    </Button>
  );
}
