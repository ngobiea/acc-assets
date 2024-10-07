'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from '@/components/materialTailwind';
import { useFormState } from 'react-dom';
import routes from '@/utils/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsDeclarationFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { declarationSchema } from '@/utils/validators/declaration';
import { HiXMark } from 'react-icons/hi2';
import { declarationReasons } from '@/utils/selectOptions';
import { useEffect, useState } from 'react';
import SelectInput from '@/components/common/form/select-input';
import TextInput from '@/components/common/form/text-input';
import { postDeclaration } from '@/actions/declaration/declaration';
import { useRouter } from 'next/navigation';
export default function DeclarationStartForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [formState, action] = useFormState(postDeclaration, { errors: {} });
  const { isDeclarationFormOpen } = useAppSelector((state) => state.declaration);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(declarationSchema),
  });
  const watchReason = watch();
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const currentValues = value as DeclarationClientForm;
      if (name === 'reason') {
        if (currentValues.reason === 'Other') {
          setShowOtherInput(true);
        } else {
          setShowOtherInput(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!isDeclarationFormOpen) {
      reset();
      setShowOtherInput(false);
    }
  }, [isDeclarationFormOpen, reset]);
  useEffect(() => {
    if (formState.data) {
      dispatch(setIsDeclarationFormOpen(false));
      router.push(routes.declarationId(formState.data.declaration.id));
    }
    if (formState.errors.reason) {
      setError('reason', {
        message: formState.errors.reason?.join(', '),
      });
    }
    if (formState.errors.place) {
      setError('place', {
        message: formState.errors.place?.join(', '),
      });
    }
    if (formState.errors.otherReason) {
      setError('otherReason', {
        message: formState.errors.otherReason?.join(', '),
      });
    }
  }, [
    errors,
    setError,
    formState.errors.otherReason,
    formState.errors.place,
    formState.errors.reason,
    formState.data,
    dispatch,
    router,
  ]);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submittedData = data as DeclarationClientForm;
    const formData = new FormData();
    formData.append('reason', submittedData.reason);
    formData.append('place', submittedData.place);
    formData.append('otherReason', submittedData.otherReason);
    console.log(submittedData);
    action(formData);
  };
  return (
    <Dialog
      size='md'
      open={isDeclarationFormOpen}
      handler={() => dispatch(setIsDeclarationFormOpen(!isDeclarationFormOpen))}
      className='p-4'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader className='relative m-0 block'>
          <Typography variant='h5' color='blue-gray'>
            New Declaration
          </Typography>

          <IconButton
            size='sm'
            variant='text'
            className='!absolute right-3.5 top-3.5'
            onClick={() => dispatch(setIsDeclarationFormOpen(!isDeclarationFormOpen))}
          >
            <HiXMark className='h-4 w-4' />
          </IconButton>
        </DialogHeader>
        <DialogBody className='space-y-4 pb-6'>
          <SelectInput
            errors={errors}
            options={declarationReasons}
            register={register}
            value='reason'
            label='Select Declaration Reason'
            title='Declaration Reason*'
          />

          {showOtherInput && (
            <TextInput
              errors={errors}
              label='Other Reason*'
              placeholder='Enter other reason'
              register={register}
              value='otherReason'
            />
          )}
          <TextInput
            errors={errors}
            label='Place of Affidavit'
            placeholder='Enter place of affidavit'
            register={register}
            value='place'
          />
        </DialogBody>
        <DialogFooter>
          {formState.errors._form && (
            <div className='flex w-full justify-between mb-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
          <div className='flex justify-end'>
            <Button
              type='submit'
              color='blue'
              className='ml-auto hover:animate-bounce'
            >
              New Declaration
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
