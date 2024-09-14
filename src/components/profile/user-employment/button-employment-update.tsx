'use client';
import { Tooltip, IconButton } from '@material-tailwind/react';
import { FaUserEdit } from 'react-icons/fa';
import { useAppDispatch } from '@/store/hooks';
import { Button } from '@/components/materialTailwind';

import { setIsShowEmploymentUpdateForm } from '@/store/slices/setupSlice/setupSlice';

export default function UserEmploymentUpdateButton() {
  const dispatch = useAppDispatch();
  return (
    <Button
      color='blue'
      variant='text'
      className='flex items-center gap-1 hover:animate-bounce '
      onClick={() => {
        dispatch(setIsShowEmploymentUpdateForm(true));
      }}
    >
      <FaUserEdit className='h-4 w-4' />
      Edit
    </Button>
  );
}
