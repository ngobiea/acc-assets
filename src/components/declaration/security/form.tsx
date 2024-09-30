'use client';
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { securitySchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  currencies,
  assetRelation,
  acquisitionMode,
  financeSource,
  securityTypes,
} from '@/utils/selectOptions';
import { setIsSecurityFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdClose } from 'react-icons/md';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import { postSecurity } from '@/actions/declaration/security';
import { useFormState } from 'react-dom';

export default function SecurityForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const { isSecurityFormOpen } = useAppSelector((state) => state.declaration);
  const [formState, action] = useFormState(postSecurity, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(securitySchema),
  });
  const watchInput = watch();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as MovableAssetClientForm;
      if (name === 'relation') {
        if (currentValues.relation === 'Other') {
          setShowOtherRelation(true);
        } else {
          setShowOtherRelation(false);
        }
      }
      if (name === 'financeSource') {
        if (currentValues.financeSource === 'Other') {
          setShowOtherSource(true);
        } else {
          setShowOtherSource(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const submitted = data as SecurityClientForm;
    const formData = new FormData();
    formData.append('declarationId', declarationId);
    formData.append('ownerName', submitted.ownerName);
    formData.append('registerOwner', submitted.registerOwner);
    formData.append('type', submitted.type);
    formData.append('relation', submitted.relation);
    formData.append('name', submitted.name);
    formData.append('certificateNo', submitted.certificateNo);
    formData.append('company', submitted.company);
    formData.append('numberOfShares', submitted.numberOfShares);
    formData.append('yearlyInterest', submitted.yearlyInterest);
    formData.append('natureOfShares', submitted.natureOfShares);
    formData.append('currentMarketValue', submitted.currentMarketValue);
    formData.append('currency', submitted.currency);
    formData.append('acquisitionCost', submitted.acquisitionCost);
    formData.append('acquisitionCurrency', submitted.acquisitionCurrency);
    formData.append('acquisitionMode', submitted.acquisitionMode);
    formData.append('acquisitionYear', submitted.acquisitionYear);
    formData.append('financeSource', submitted.financeSource);
    formData.append('otherFinanceSource', submitted.otherFinanceSource);
    formData.append('otherRelation', submitted.otherRelation);
    action(formData);
  };
  console.log(errors);

  useEffect(() => {
    if (formState.data) {
      dispatch(setIsSecurityFormOpen(false));
    }
    if (formState.errors.acquisitionCost) {
      setError('acquisitionCost', {
        message: formState.errors.acquisitionCost.join(', '),
      });
    }
    if (formState.errors.acquisitionCurrency) {
      setError('acquisitionCurrency', {
        message: formState.errors.acquisitionCurrency.join(', '),
      });
    }
    if (formState.errors.acquisitionMode) {
      setError('acquisitionMode', {
        message: formState.errors.acquisitionMode.join(', '),
      });
    }
    if (formState.errors.acquisitionYear) {
      setError('acquisitionYear', {
        message: formState.errors.acquisitionYear.join(', '),
      });
    }

    if (formState.errors.ownerName) {
      setError('ownerName', {
        message: formState.errors.ownerName.join(', '),
      });
    }
    if (formState.errors.relation) {
      setError('relation', {
        message: formState.errors.relation.join(', '),
      });
    }
    if (formState.errors.registerOwner) {
      setError('registerOwner', {
        message: formState.errors.registerOwner.join(', '),
      });
    }
    if (formState.errors.name) {
      setError('name', {
        message: formState.errors.name.join(', '),
      });
    }
    if (formState.errors.type) {
      setError('type', {
        message: formState.errors.type.join(', '),
      });
    }
    if (formState.errors.certificateNo) {
      setError('certificateNo', {
        message: formState.errors.certificateNo.join(', '),
      });
    }
    if (formState.errors.numberOfShares) {
      setError('numberOfShares', {
        message: formState.errors.numberOfShares.join(', '),
      });
    }
    if (formState.errors.ownerName) {
      setError('company', {
        message: formState.errors.ownerName.join(', '),
      });
    }
    if (formState.errors.yearlyInterest) {
      setError('yearlyInterest', {
        message: formState.errors.yearlyInterest.join(', '),
      });
    }
    if (formState.errors.natureOfShares) {
      setError('natureOfShares', {
        message: formState.errors.natureOfShares.join(', '),
      });
    }
    if (formState.errors.currentMarketValue) {
      setError('currentMarketValue', {
        message: formState.errors.currentMarketValue.join(', '),
      });
    }
    if (formState.errors.currency) {
      setError('currentMarketValue', {
        message: formState.errors.currency.join(', '),
      });
    }
    if (formState.errors.financeSource) {
      setError('financeSource', {
        message: formState.errors.financeSource.join(', '),
      });
    }
    if (formState.errors.otherFinanceSource) {
      setError('otherFinanceSource', {
        message: formState.errors.otherFinanceSource.join(', '),
      });
    }
    if (formState.errors.otherRelation) {
      setError('otherRelation', {
        message: formState.errors.otherRelation.join(', '),
      });
    }
  }, [
    dispatch,
    formState.data,
    formState.errors.acquisitionCost,
    formState.errors.acquisitionCurrency,
    formState.errors.acquisitionMode,
    formState.errors.acquisitionYear,
    formState.errors.certificateNo,
    formState.errors.currency,
    formState.errors.currentMarketValue,
    formState.errors.financeSource,
    formState.errors.name,
    formState.errors.natureOfShares,
    formState.errors.numberOfShares,
    formState.errors.otherFinanceSource,
    formState.errors.otherRelation,
    formState.errors.ownerName,
    formState.errors.registerOwner,
    formState.errors.relation,
    formState.errors.type,
    formState.errors.yearlyInterest,
    setError,
  ]);
  useEffect(() => {
    if (!isSecurityFormOpen) {
      reset();
      setShowOtherRelation(false);
      setShowOtherSource(false);
    }
  }, [isSecurityFormOpen, reset]);

  return (
    <Dialog
      size='lg'
      open={isSecurityFormOpen}
      handler={() => dispatch(setIsSecurityFormOpen(!isSecurityFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' className='text-blue-gray text-center'>
          Security
        </Typography>
        <IconButton
          onClick={() => dispatch(setIsSecurityFormOpen(!isSecurityFormOpen))}
          className='!absolute right-3.5 top-3.5 hover:animate-bounce'
          variant='text'
          size='lg'
          color='red'
        >
          <MdClose className='text-blue-gray w-8 h-8' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <Card className=' w-full bg-blue-50 mt-3'>
          <CardBody>
            <Typography color='gray'>
              Securities including Premium Bonds, Shares, Debentures, Stocks,
              Certificates, Insurance Premiums, Trust Funds, Foreign Exchange
              etc. in and outside Sierra Leone.{' '}
              <span className='bg-yellow-300 rounded px-2 py-1'>
                All fields marked with * are required to be filled in.
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
              label={`Owner's Name*`}
              placeholder='Enter asset owner name'
              register={register}
              value='ownerName'
            />
            <TextInput
              errors={errors}
              label='Registered Owner*'
              placeholder='Enter asset registered owner'
              register={register}
              value='registerOwner'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={securityTypes}
              register={register}
              value='type'
              label='Select asset type*'
            />
            <SelectInput
              errors={errors}
              options={assetRelation}
              register={register}
              value='relation'
              label='Select asset relation*'
            />
          </div>
          <div className=' grid lg:grid-cols-2 lg:gap-6'>
            {showOtherRelation && (
              <TextInput
                errors={errors}
                label='Other asset relation'
                placeholder='Enter other asset relation'
                register={register}
                value='otherRelation'
              />
            )}
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Name of Security*'
              placeholder='Enter name of security'
              register={register}
              value='name'
            />
            <TextInput
              errors={errors}
              label='Certificate No*'
              placeholder='Enter certificate number'
              register={register}
              value='certificateNo'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Number of Shares and stocks (for shareholders only)'
              placeholder='Enter your number of shares and stocks'
              register={register}
              value='numberOfShares'
            />
            <TextInput
              errors={errors}
              label='Name of Company/Business/Bank*'
              placeholder='Enter name of company/business/bank'
              register={register}
              value='company'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Yearly Interest of Shares'
              placeholder='Enter yearly interest of shares'
              register={register}
              value='yearlyInterest'
            />
            <TextInput
              errors={errors}
              label='Nature of Shares'
              placeholder='Enter nature of shares'
              register={register}
              value='natureOfShares'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectTextInput
              errors={errors}
              inputValue='currentMarketValue'
              label='Estimated current market value*'
              options={currencies}
              placeholder='Enter estimated current market value'
              register={register}
              selectValue='currency'
              type='number'
            />
            <SelectTextInput
              errors={errors}
              inputValue='acquisitionCost'
              label='Acquisition Cost*'
              options={currencies}
              placeholder='Enter asset acquisition cost'
              register={register}
              selectValue='acquisitionCurrency'
              type='number'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={acquisitionMode}
              register={register}
              value='acquisitionMode'
              label='Select Acquisition Mode*'
            />
            <TextInput
              errors={errors}
              label='Acquisition Year*'
              placeholder='Enter asset acquisition year'
              register={register}
              value='acquisitionYear'
              type='number'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <SelectInput
              errors={errors}
              options={financeSource}
              register={register}
              value='financeSource'
              label='Select source of asset finance*'
            />
            {showOtherSource && (
              <TextInput
                errors={errors}
                label='Other source of finance*'
                placeholder='Enter other source of finance'
                register={register}
                value='otherFinanceSource'
              />
            )}
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
