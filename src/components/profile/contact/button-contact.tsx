'use client';
import { FaUserEdit } from 'react-icons/fa';
import { useAppDispatch } from '@/store/hooks';

import { setIsShowContactUpdateForm } from '@/store/slices/setupSlice/setupSlice';
import { Button } from '@/components/materialTailwind';

export default function ContactUpdateButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      color='blue'
      variant='text'
      className='flex items-center gap-1 hover:animate-bounce '
      onClick={() => {
        dispatch(setIsShowContactUpdateForm(true));
      }}
    >
      <FaUserEdit className='h-4 w-4' />
      Edit
    </Button>
  );
}
