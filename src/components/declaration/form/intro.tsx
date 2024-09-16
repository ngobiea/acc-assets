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
import { toggleIsStartDeclaration } from '@/store/slices/declarationSlice/declarationSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { declarationSchema } from '@/utils/validators/declaration';
import { HiXMark } from 'react-icons/hi2';
import { declarationReasons } from '@/utils/selectOptions';
import { useEffect, useState } from 'react';
import SelectInput from '@/components/common/form/select-input';
import TextInput from '@/components/common/form/text-input';
import RadioInput from '@/components/common/form/radio-input';
import { postDeclaration } from '@/actions/declaration/declaration';
import { useRouter } from 'next/navigation';
export default function DeclarationStartForm({
  isAnyLastDeclaration,
}: {
  isAnyLastDeclaration: boolean;
  }) {
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const [formState, action] = useFormState(postDeclaration, { errors: {} });

  const { isStartDeclaration } = useAppSelector((state) => state.declaration);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    unregister,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(declarationSchema),
  });
  const watchReason = watch('reason');
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const currentValues = value as DeclarationClientForm;
      if (name === 'reason' && type === 'change') {
        if (currentValues.reason === 'Other') {
          setShowOtherInput(!showOtherInput);
        } else {
          setShowOtherInput(false);
          unregister('otherReason');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const resetForm = () => {
    setValue('reason', '');
    setValue('place', '');
    setValue('otherReason', '');
    setShowOtherInput(false);
  };
  console.log(formState.errors);  
  useEffect(() => {
    if (formState.data) {
      resetForm();
      dispatch(toggleIsStartDeclaration());
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
    if (formState.errors.isUseLastDeclaration) {
      setError('isUseLastDeclaration', {
        message: formState.errors.isUseLastDeclaration?.join(', '),
      });
    }
  }, [
    errors,
    setError,
    formState.errors.isUseLastDeclaration,
    formState.errors.otherReason,
    formState.errors.place,
    formState.errors.reason,
    formState.data,
  ]);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submittedData = data as DeclarationClientForm;
    const formData = new FormData();
    formData.append('reason', submittedData.reason);
    formData.append('place', submittedData.place);
    if (submittedData.reason === 'Other') {
      formData.append('otherReason', submittedData.otherReason);
    }
    if (submittedData.isUseLastDeclaration) {
      formData.append(
        'isUseLastDeclaration',
        submittedData.isUseLastDeclaration
      );
    }
    console.log(submittedData);
    action(formData);
  };
  return (
    <Dialog
      size='md'
      open={isStartDeclaration}
      handler={() => {
        if (isStartDeclaration) {
          resetForm();
        }
        dispatch(toggleIsStartDeclaration());
      }}
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
            onClick={() => {
              if (isStartDeclaration) {
                resetForm();
              }
              dispatch(toggleIsStartDeclaration());
            }}
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
          {isAnyLastDeclaration && (
            <RadioInput
              errors={errors}
              radioLabel='Use last declaration as template'
              register={register}
              value='isUseLastDeclaration'
              values={[
                { radioValue: 'Yes' },
                { radioValue: 'No', defaultChecked: true },
              ]}
            />
          )}
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
