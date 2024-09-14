'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@/components/materialTailwind';
import { useContext } from 'react';
import DialogContext from '@/context/dialog';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsIDType } from '@/store/slices/setupSlice/setupSlice';

export default function IdDialog() {
  const dispatch = useAppDispatch();
  const { isIDType } = useAppSelector((state) => state.setup);
  // const { handleOpenIdType, openIdType } = useContext(DialogContext);

  return (
    <Dialog open={isIDType} handler={() => {}}>
      <DialogHeader>
        <Typography variant='h5' color='blue-gray'>
          Your Attention is Required!
        </Typography>
      </DialogHeader>
      <DialogBody divider className='grid place-items-center gap-4'>
        <MdOutlineWarningAmber className='text-6xl text-red-500' />
        <Typography color='red' variant='h4'>
          Warning!
        </Typography>
        <Typography className='text-center font-normal'>
          I hereby affirm that I do not have a NIN, and shall therefore use the
          alternative Passport Number option. I am aware that should I
          Register/declare using the Passport Number option whilst having a
          valid NIN, I shall be liable to penalties.
        </Typography>
      </DialogBody>
      <DialogFooter className='space-x-2 flex justify-center'>
        <Button
          variant='gradient'
          color='blue'
          onClick={() => dispatch(setIsIDType(!isIDType))}
        >
          I  Agree
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
