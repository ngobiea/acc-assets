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
import { otherAssetsSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  currencies,
  assetRelation,
  acquisitionMode,
  financeSource,
} from '@/utils/selectOptions';
import { setIsOtherAssetFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdClose } from 'react-icons/md';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
import { useFormState } from 'react-dom';
import { postOtherAsset } from '@/actions/declaration/other';

export default function OtherAssetsForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const { isOtherAssetFormOpen } = useAppSelector((state) => state.declaration);
  const [formState, action] = useFormState(postOtherAsset, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(otherAssetsSchema),
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
    const submitted = data as OtherAssetClientForm;
    const formData = new FormData();
    formData.append('ownerName', submitted.ownerName);
    formData.append('registerOwner', submitted.registerOwner);
    formData.append('assetType', submitted.assetType);
    formData.append('relation', submitted.relation);
    formData.append('otherRelation', submitted.otherRelation);
    formData.append('location', submitted.location);
    formData.append('estimatedValue', submitted.estimatedValue);
    formData.append('currency', submitted.currency);
    formData.append('acquisitionMode', submitted.acquisitionMode);
    formData.append('acquisitionCost', submitted.acquisitionCost);
    formData.append('acquisitionCurrency', submitted.acquisitionCurrency);
    formData.append('acquisitionYear', submitted.acquisitionYear);
    formData.append('financeSource', submitted.financeSource);
    formData.append('otherFinanceSource', submitted.otherFinanceSource);
    formData.append('remarks', submitted.remarks);
    formData.append('declarationId', declarationId);
    action(formData);
  };
  console.log(errors);

  useEffect(() => {
    if (!isOtherAssetFormOpen) {
      reset();
      setShowOtherRelation(false);
      setShowOtherSource(false);
    }
  }, [isOtherAssetFormOpen, reset]);
  useEffect(() => {
    if (formState.data) {
      dispatch(setIsOtherAssetFormOpen(false));
    }
    if (formState.errors.registerOwner) {
      setError('registerOwner', { message: formState.errors.registerOwner.join(", ") });
    }
    if (formState.errors.ownerName) {
      setError('ownerName', { message: formState.errors.ownerName.join(", ") });
    }
    if (formState.errors.assetType) {
      setError('assetType', { message: formState.errors.assetType.join(", ") });
    }
    if (formState.errors.relation) {
      setError('relation', { message: formState.errors.relation.join(", ") });
    }
    if (formState.errors.location) {
      setError('location', { message: formState.errors.location.join(", ") });
    }
    if (formState.errors.estimatedValue) {
      setError('estimatedValue', { message: formState.errors.estimatedValue.join(", ") });
    }
    if (formState.errors.currency) {
      setError('estimatedValue', {
        message: formState.errors.currency.join(', '),
      });
    }
    if (formState.errors.acquisitionMode) {
      setError('acquisitionMode', { message: formState.errors.acquisitionMode.join(", ") });
    }
    if (formState.errors.acquisitionCost) {
      setError('acquisitionCost', { message: formState.errors.acquisitionCost.join(", ") });
    }
    if (formState.errors.acquisitionCurrency) {
      setError('acquisitionCost', {
        message: formState.errors.acquisitionCurrency.join(', '),
      });
    }
    if (formState.errors.acquisitionYear) {
      setError('acquisitionYear', { message: formState.errors.acquisitionYear.join(", ") });
    }
    if (formState.errors.financeSource) {
      setError('financeSource', { message: formState.errors.financeSource.join(", ") });
    }
    if (formState.errors.otherFinanceSource) {
      setError('otherFinanceSource', { message: formState.errors.otherFinanceSource.join(", ") });
    }
    if (formState.errors.remarks) {
      setError('remarks', { message: formState.errors.remarks.join(", ") });
    }
    if(formState.errors.otherRelation) {
      setError('otherRelation', { message: formState.errors.otherRelation.join(", ") });
    }

  }, [dispatch, formState.data, formState.errors, setError]);
  return (
    <Dialog
      size='lg'
      open={isOtherAssetFormOpen}
      handler={() => dispatch(setIsOtherAssetFormOpen(!isOtherAssetFormOpen))}
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='blue-gray' className='text-center'>
          Other Assets
        </Typography>
        <IconButton
          onClick={() =>
            dispatch(setIsOtherAssetFormOpen(!isOtherAssetFormOpen))
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
              Fields marked with * in the application form are mandatory,
              remaining fields are non-mandatory and can be left unfilled.
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
            <TextInput
              errors={errors}
              label='Type of Assets*'
              placeholder='Enter type of assets'
              register={register}
              value='assetType'
            />
            <SelectInput
              errors={errors}
              options={assetRelation}
              register={register}
              value='relation'
              label='Select asset relation*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
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
              label='Location'
              placeholder='Enter asset location'
              register={register}
              value='location'
            />
            <SelectTextInput
              errors={errors}
              inputValue='estimatedValue'
              label='Estimated current market value*'
              options={currencies}
              placeholder='Enter estimated current market value'
              register={register}
              selectValue='currency'
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
            <TextInput
              errors={errors}
              label='Acquisition Year*'
              placeholder='Enter asset acquisition year'
              register={register}
              value='acquisitionYear'
              type='number'
            />
            <SelectInput
              errors={errors}
              options={financeSource}
              register={register}
              value='financeSource'
              label='Select source of asset finance*'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
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
          <TextareaInput
            errors={errors}
            label='Remarks (if any)'
            register={register}
            value='remarks'
          />
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
