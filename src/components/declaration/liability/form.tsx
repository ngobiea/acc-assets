'use client';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { liabilitySchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  currencies,
  assetRelation,
  loanRepayment,
} from '@/utils/selectOptions';
import { setIsLiabilitiesFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdClose } from 'react-icons/md';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
import { useFormState } from 'react-dom';
import { postLiability } from '@/actions/declaration/liability';

export default function LiabilityForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const { isLiabilitiesFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  const [formState, action] = useFormState(postLiability, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(liabilitySchema),
  });
  console.log(errors)
  console.log(formState)
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as LiabilityClientForm;
    const formData = new FormData();
    formData.append('debtorName', submitted.debtorName);
    formData.append('relation', submitted.relation);
    formData.append('creditor', submitted.creditor);
    formData.append('creditorAddress', submitted.creditorAddress);
    formData.append('otherRelation', submitted.otherRelation);
    formData.append('loanAmount', submitted.loanAmount);
    formData.append('currency', submitted.currency);
    formData.append('yearContracted', submitted.yearContracted);
    formData.append('loanPurpose', submitted.loanPurpose);
    formData.append('loanRepayment', submitted.loanRepayment);
    formData.append('paymentPeriod', submitted.paymentPeriod);
    formData.append('loanOutstanding', submitted.loanOutstanding);
    formData.append('currencyOutstanding', submitted.currencyOutstanding);
    formData.append('maturityDate', submitted.maturityDate);
    formData.append('remarks', submitted.remarks);
    formData.append('declarationId', declarationId);
    // action(formData);
    console.log(data)
  };

  const watchInput = watch();
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as LiabilityClientForm;
      if (name === 'relation') {
        if (currentValues.relation === 'Other') {
          setShowOtherRelation(true);
        } else {
          setShowOtherRelation(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  useEffect(() => {
    if (!isLiabilitiesFormOpen) {
      reset();
      setShowOtherRelation(false);
    }
  }, [isLiabilitiesFormOpen, reset]);

  useEffect(() => {
    if (formState.data) {
      dispatch(setIsLiabilitiesFormOpen(false));
    }
    if (formState.errors.debtorName) {
      setError('debtorName', {
        message: formState.errors.debtorName.join(', '),
      });
    }
    if (formState.errors.relation) {
      setError('relation', {
        message: formState.errors.relation.join(', '),
      });
    }
    if (formState.errors.otherRelation) {
      setError('otherRelation', {
        message: formState.errors.otherRelation.join(', '),
      });
    }
    if (formState.errors.creditor) {
      setError('creditor', {
        message: formState.errors.creditor.join(', '),
      });
    }
    if (formState.errors.creditorAddress) {
      setError('creditorAddress', {
        message: formState.errors.creditorAddress.join(', '),
      });
    }
    if (formState.errors.loanAmount) {
      setError('loanAmount', {
        message: formState.errors.loanAmount.join(', '),
      });
    }
    if (formState.errors.currency) {
      setError('currency', {
        message: formState.errors.currency.join(', '),
      });
    }
    if (formState.errors.yearContracted) {
      setError('yearContracted', {
        message: formState.errors.yearContracted.join(', '),
      });
    }
    if (formState.errors.loanPurpose) {
      setError('loanPurpose', {
        message: formState.errors.loanPurpose.join(', '),
      });
    }
    if (formState.errors.loanRepayment) {
      setError('loanRepayment', {
        message: formState.errors.loanRepayment.join(', '),
      });
    }
    if (formState.errors.paymentPeriod) {
      setError('paymentPeriod', {
        message: formState.errors.paymentPeriod.join(', '),
      });
    }
    if (formState.errors.loanOutstanding) {
      setError('loanOutstanding', {
        message: formState.errors.loanOutstanding.join(', '),
      });
    }
    if (formState.errors.currencyOutstanding) {
      setError('currencyOutstanding', {
        message: formState.errors.currencyOutstanding.join(', '),
      });
    }
    if (formState.errors.maturityDate) {
      setError('maturityDate', {
        message: formState.errors.maturityDate.join(', '),
      });
    }
    if (formState.errors.remarks) {
      setError('remarks', {
        message: formState.errors.remarks.join(', '),
      });
    }
  }, [dispatch, formState.data, formState.errors, setError]);
  return (
    <Dialog
      size='lg'
      open={isLiabilitiesFormOpen}
      handler={() => dispatch(setIsLiabilitiesFormOpen(!isLiabilitiesFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='blue-gray' className='text-center'>
          Liabilities
        </Typography>
        <IconButton
          onClick={() =>
            dispatch(setIsLiabilitiesFormOpen(!isLiabilitiesFormOpen))
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
        <Card className='bg-blue-50 w-full'>
          <CardBody>
            <Typography color='gray'>
              Loans, mortgages, Overdrafts and Other liabilities in and outside
              of Sierra Leone.
              <span className='bg-yellow-300 rounded px-2 py-1'>
                Fields marked with * in the application form are mandatory,
                remaining fields are non-mandatory and can be left unfilled.
              </span>
            </Typography>
          </CardBody>
        </Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-3xl mx-auto py-10'
        >
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label={`Debtor's Name*`}
              placeholder='Enter debtor name'
              register={register}
              value='debtorName'
            />
            <TextInput
              errors={errors}
              label='Creditor (Financial Institutions/Individuals)*'
              placeholder='Enter creditor name'
              register={register}
              value='creditor'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Location of Creditor'
              placeholder='Enter creditor location'
              register={register}
              value='creditorAddress'
            />
            <SelectInput
              errors={errors}
              options={assetRelation}
              register={register}
              value='relation'
              label='Select liability relation*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            {showOtherRelation && (
              <TextInput
                errors={errors}
                label='Other liability relation'
                placeholder='Enter other liability relation'
                register={register}
                value='otherRelation'
              />
            )}
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectTextInput
              errors={errors}
              inputValue='loanAmount'
              label='Loan Amount (Actual amount Available)*'
              options={currencies}
              placeholder='Enter Actual loan amount Available'
              register={register}
              selectValue='currency'
              type='number'
            />
            <SelectTextInput
              errors={errors}
              inputValue='loanOutstanding'
              label='Outstanding Loan Amount*'
              options={currencies}
              placeholder='Enter outstanding loan amount'
              register={register}
              selectValue='currencyOutstanding'
              type='number'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Year Loan Contracted'
              placeholder='Enter year loan was contracted'
              register={register}
              value='yearContracted'
              type='number'
            />
            <TextInput
              errors={errors}
              label='Loan Purpose'
              placeholder='Enter purpose of loan'
              register={register}
              value='loanPurpose'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectTextInput
              errors={errors}
              inputValue='paymentPeriod'
              label='Payment Period(Months)*'
              options={loanRepayment}
              placeholder='Enter payment period'
              register={register}
              selectValue='loanRepayment'
              type='number'
            />
            <TextInput
              errors={errors}
              label='Maturity Date'
              placeholder='Enter maturity date'
              register={register}
              value='maturityDate'
              type='date'
            />
          </div>
          <TextareaInput
            errors={errors}
            label='Remarks (if any)'
            register={register}
            value='remarks'
          />
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
