'use client';

import { useRef, useState } from 'react';

import nullImage from '/public/download.png';

import { Avatar, Button } from '../materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFile } from '@/store/slices/appSlice/appSlice';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export default function ImagePicker({
  register,errors

}: {
    register: UseFormRegister<PersonalFormClient>;
   errors: FieldErrors<PersonalFormClient>
  }) {
  const dispatch = useAppDispatch();
  const { file } = useAppSelector((state) => state.app);
  // const [pickedImage, setPickedImage] = useState<File | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
     
    if (!file) {
      // setPickedImage(null);
      dispatch(setFile(null));
      
      return;
    }
    // setPickedImage(file);
    dispatch(setFile(file));
  }

  return (
    <div className='mb-5' id='imagePicker'>
      <input
        type='file'
        {...register('image')}
        ref={imageInput}
        style={{ display: 'none' }}
        onChange={handleImageChange}
        accept={'.png,.jpg,.jpeg'}
      />
        <Avatar
          src={file ? URL.createObjectURL(file) : nullImage.src}
          size='xxl'
        variant='rounded'
        className='object-fill'
        />
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {errors.image?.message}
      </p>
      <div className=''>
        <Button
          type='button'
          onClick={handlePickClick}
          color='blue'
          variant='text'
        >
          Pick Image
        </Button>
      </div>
    </div>
  );
}
