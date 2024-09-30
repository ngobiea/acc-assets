'use client';

import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
  Button,
  Card,
  CardBody,
} from '@/components/materialTailwind';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cashAtHandSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { currencies } from '@/utils/selectOptions';
import { MdClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsCashAtHandFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
import { useFormState } from 'react-dom';
import { postCashAtHand } from '@/actions/declaration/cash-at-hand';
import { useEffect } from 'react';

export default function CashAtHandForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const { isCashAtHandFormOpen } = useAppSelector((state) => state.declaration);
  const [formState, action] = useFormState(postCashAtHand, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(cashAtHandSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const submitted = data as CashAtHandClientForm;
    const formData = new FormData();
    formData.append('amount', submitted.amount);
    formData.append('currency', submitted.currency);
    formData.append('details', submitted.details);
    formData.append('jointIncome', submitted.jointIncome);
    formData.append('declarationId', declarationId);
    action(formData);
  };
  useEffect(() => {
    if (formState.data) {
      dispatch(setIsCashAtHandFormOpen(false));
    }
    if (formState.errors.amount) {
      setError('amount', { message: formState.errors.amount.join(', ') });
    }
    if (formState.errors.currency) {
      setError('amount', { message: formState.errors.currency.join(', ') });
    }
    if (formState.errors.details) {
      setError('details', { message: formState.errors.details.join(', ') });
    }
    if (formState.errors.jointIncome) {
      setError('jointIncome', {
        message: formState.errors.jointIncome.join(', '),
      });
    }
  }, [
    dispatch,
    formState.data,
    formState.errors.amount,
    formState.errors.currency,
    formState.errors.details,
    formState.errors.jointIncome,
    reset,
    setError,
  ]);
  console.log(errors);
  console.log(formState);
  useEffect(() => {
    if (!isCashAtHandFormOpen) {
      reset();
    }
  }, [isCashAtHandFormOpen, reset]);

  return (
    <Dialog
      size='lg'
      open={isCashAtHandFormOpen}
      handler={() => dispatch(setIsCashAtHandFormOpen(!isCashAtHandFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' className='text-blue-gray text-center'>
          Cash at Hand
        </Typography>
        <IconButton
          onClick={() =>
            dispatch(setIsCashAtHandFormOpen(!isCashAtHandFormOpen))
          }
          className='!absolute right-3.5 top-3.5 hover:animate-bounce'
          variant='text'
          size='lg'
          color='red'
        >
          <MdClose className='text-blue-gray w-8 h-8' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <Card className='w-full bg-blue-50 mt-3'>
          <CardBody>
            <Typography color='gray'>
              Cash in hand at the time of declaration
            </Typography>
          </CardBody>
        </Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-3xl mx-auto py-10'
        >
          <SelectTextInput
            errors={errors}
            inputValue='amount'
            label='Cash at hand*'
            options={currencies}
            placeholder='Enter cash at hand at time of declaration'
            register={register}
            selectValue='currency'
          />
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextareaInput
              errors={errors}
              label='Description of Cash at Hand'
              register={register}
              value='details'
            />
            <TextareaInput
              errors={errors}
              label='Description of Joint Income(s)/Properties (if any)'
              register={register}
              value='jointIncome'
            />
          </div>
          {formState.errors._form && (
            <div className='flex w-full justify-between my-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
          <div className='flex justify-end'>
            <Button
              type='submit'
              color='blue'
              className='mt-5 hover:animate-bounce'
              ripple={true}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
