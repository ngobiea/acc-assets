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
import { cashDepositSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  currencies,
  assetRelation,
  depositType,
  depositSource,
} from '@/utils/selectOptions';
import { setIsCashDepositFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdClose } from 'react-icons/md';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import { postCashDeposit } from '@/actions/declaration/cash-deposit';
import { useFormState } from 'react-dom';

export default function CashDepositForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const [showOtherSource, setShowOtherSource] = useState(false);
  const { isCashDepositFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  const [formState, action] = useFormState(postCashDeposit, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(cashDepositSchema),
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const submitted = data as cashDepositClientForm;
    const formData = new FormData();
    formData.append('ownerName', submitted.ownerName);
    formData.append('registerOwner', submitted.registerOwner);
    formData.append('type', submitted.type);
    formData.append('relation', submitted.relation);
    formData.append('otherRelation', submitted.otherRelation);
    formData.append('accountNo', submitted.accountNo);
    formData.append('institutionOrBank', submitted.institutionOrBank);
    formData.append('location', submitted.location);
    formData.append('accountBalance', submitted.accountBalance);
    formData.append('currency', submitted.currency);
    formData.append('source', submitted.source);
    formData.append('otherSource', submitted.otherSource);
    formData.append('declarationId', declarationId);
    action(formData);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as cashDepositClientForm;
      if (name === 'relation') {
        if (currentValues.relation === 'Other') {
          setShowOtherRelation(true);
        } else {
          setShowOtherRelation(false);
        }
      }
      if (name === 'source') {
        if (currentValues.source === 'Other') {
          setShowOtherSource(true);
        } else {
          setShowOtherSource(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (formState.data) {
      dispatch(setIsCashDepositFormOpen(false));
    }
    if (formState.errors.accountBalance) {
      setError('accountBalance', {
        message: formState.errors.accountBalance.join(', '),
      });
    }
    if (formState.errors.accountNo) {
      setError('accountNo', {
        message: formState.errors.accountNo.join(', '),
      });
    }
    if (formState.errors.institutionOrBank) {
      setError('institutionOrBank', {
        message: formState.errors.institutionOrBank.join(', '),
      });
    }
    if (formState.errors.location) {
      setError('location', {
        message: formState.errors.location.join(', '),
      });
    }
    if (formState.errors.ownerName) {
      setError('ownerName', {
        message: formState.errors.ownerName.join(', '),
      });
    }
    if (formState.errors.registerOwner) {
      setError('registerOwner', {
        message: formState.errors.registerOwner.join(', '),
      });
    }
    if (formState.errors.type) {
      setError('type', {
        message: formState.errors.type.join(', '),
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
    if (formState.errors.source) {
      setError('source', {
        message: formState.errors.source.join(', '),
      });
    }
    if (formState.errors.otherSource) {
      setError('otherSource', {
        message: formState.errors.otherSource.join(', '),
      });
    }
    if (formState.errors.currency) {
      setError('accountBalance', {
        message: formState.errors.currency.join(', '),
      });
    }
  }, [
    dispatch,
    formState.data,
    formState.errors.accountBalance,
    formState.errors.accountNo,
    formState.errors.currency,
    formState.errors.institutionOrBank,
    formState.errors.location,
    formState.errors.otherRelation,
    formState.errors.otherSource,
    formState.errors.ownerName,
    formState.errors.registerOwner,
    formState.errors.relation,
    formState.errors.source,
    formState.errors.type,
    reset,
    setError,
  ]);
  console.log(formState);
  console.log(errors);
  useEffect(() => {
    if (!isCashDepositFormOpen) {
      reset();
      setShowOtherRelation(false);
      setShowOtherSource(false);
    }
  }, [isCashDepositFormOpen, reset]);
  return (
    <Dialog
      size='lg'
      open={isCashDepositFormOpen}
      handler={() => dispatch(setIsCashDepositFormOpen(!isCashDepositFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' className='text-blue-gray text-center'>
          Cash Deposit
        </Typography>
        <IconButton
          onClick={() =>
            dispatch(setIsCashDepositFormOpen(!isCashDepositFormOpen))
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
              CASH or BANK/Interest Bearing Deposits (In and Outside of Sierra
              Leone). All fields marked with * are required to be filled in.
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
              label={`Owner's Name*`}
              placeholder={`Enter Owner's Name`}
              register={register}
              value='ownerName'
            />
            <TextInput
              errors={errors}
              label='Registered Owner*'
              placeholder='Enter Registered Owner'
              register={register}
              value='registerOwner'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={depositType}
              register={register}
              value='type'
              label='Select deposit type*'
            />
            <SelectInput
              errors={errors}
              options={assetRelation}
              register={register}
              value='relation'
              label='Select cash relation*'
            />
          </div>
          <div className=' grid lg:grid-cols-2 lg:gap-6'>
            {showOtherRelation && (
              <TextInput
                errors={errors}
                label='Other cash relation'
                placeholder='Enter other relation'
                register={register}
                value='otherRelation'
              />
            )}
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Account Number*'
              placeholder='Enter account number'
              register={register}
              value='accountNo'
            />
            <TextInput
              errors={errors}
              label='Name of Institution/Bank*'
              placeholder='Enter name of institution or bank'
              register={register}
              value='institutionOrBank'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Location/Branch*'
              placeholder='Enter location or branch'
              register={register}
              value='location'
            />
            <SelectTextInput
              errors={errors}
              inputValue='accountBalance'
              label='Account Balance*'
              options={currencies}
              placeholder='Enter account balance'
              register={register}
              selectValue='currency'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={depositSource}
              register={register}
              value='source'
              label='Select source of deposit*'
            />
            {showOtherSource && (
              <TextInput
                errors={errors}
                label='Other deposit source'
                placeholder='Enter other deposit source'
                register={register}
                value='otherSource'
              />
            )}
          </div>
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
