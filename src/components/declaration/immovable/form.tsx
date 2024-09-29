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
import { immovableAssetsSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  currencies,
  assetRelation,
  immovableAssetType,
  acquisitionMode,
  financeSource,
} from '@/utils/selectOptions';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import { setIsImmovableAssetFormOpen } from '@/store/slices/declarationSlice/declarationSlice';
import { MdClose } from 'react-icons/md';
import { postImmovableAsset } from '@/actions/declaration/immovable';
import { useFormState } from 'react-dom';

export default function ImmovableAssetsForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useAppDispatch();
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [showOtherRelation, setShowOtherRelation] = useState(false);
  const { isImmovableAssetFormOpen } = useAppSelector(
    (state) => state.declaration
  );
  const [formState, action] = useFormState(postImmovableAsset, { errors: {} });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(immovableAssetsSchema),
  });
  const watchInput = watch();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as ImmovableAssetClientForm;
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
    const submitted = data as ImmovableAssetClientForm;
    const formData = new FormData();
    formData.append('acquisitionCost', submitted.acquisitionCost);
    formData.append('acquisitionCurrency', submitted.acquisitionCurrency);
    formData.append('acquisitionMode', submitted.acquisitionMode);
    formData.append('acquisitionYear', submitted.acquisitionYear);
    formData.append('assetType', submitted.assetType);
    formData.append('currency', submitted.currency);
    formData.append('declarationId', declarationId);
    formData.append('estimatedValue', submitted.estimatedValue);
    formData.append('financeSource', submitted.financeSource);
    formData.append('location', submitted.location);
    formData.append('otherFinanceSource', submitted.otherFinanceSource);
    formData.append('otherRelation', submitted.otherRelation);
    formData.append('ownerName', submitted.ownerName);
    formData.append('plotNo', submitted.plotNo);
    formData.append('registerOwner', submitted.registerOwner);
    formData.append('relation', submitted.relation);
    formData.append('size', submitted.size);
    action(formData);
  };
  console.log(errors);

  useEffect(() => {
    if (formState.data) {
      dispatch(setIsImmovableAssetFormOpen(false));
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
    if (formState.errors.assetType) {
      setError('assetType', {
        message: formState.errors.assetType.join(', '),
      });
    }
    if (formState.errors.currency) {
      setError('estimatedValue', {
        message: formState.errors.currency.join(', '),
      });
    }
    if (formState.errors.estimatedValue) {
      setError('estimatedValue', {
        message: formState.errors.estimatedValue.join(', '),
      });
    }
    if (formState.errors.financeSource) {
      setError('financeSource', {
        message: formState.errors.financeSource.join(', '),
      });
    }
    if (formState.errors.location) {
      setError('location', {
        message: formState.errors.location.join(', '),
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
    if (formState.errors.ownerName) {
      setError('ownerName', {
        message: formState.errors.ownerName.join(', '),
      });
    }
    if (formState.errors.plotNo) {
      setError('plotNo', {
        message: formState.errors.plotNo.join(', '),
      });
    }
    if (formState.errors.registerOwner) {
      setError('registerOwner', {
        message: formState.errors.registerOwner.join(', '),
      });
    }
    if (formState.errors.relation) {
      setError('relation', {
        message: formState.errors.relation.join(', '),
      });
    }
    if (formState.errors.size) {
      setError('size', {
        message: formState.errors.size.join(', '),
      });
    }
  }, [
    dispatch,
    formState.data,
    formState.errors.acquisitionCost,
    formState.errors.acquisitionCurrency,
    formState.errors.acquisitionMode,
    formState.errors.acquisitionYear,
    formState.errors.assetType,
    formState.errors.currency,
    formState.errors.estimatedValue,
    formState.errors.financeSource,
    formState.errors.location,
    formState.errors.otherFinanceSource,
    formState.errors.otherRelation,
    formState.errors.ownerName,
    formState.errors.plotNo,
    formState.errors.registerOwner,
    formState.errors.relation,
    formState.errors.size,
    reset,
    setError,
  ]);

  useEffect(() => {
    if (!isImmovableAssetFormOpen) {
      reset();
      setShowOtherRelation(false);
      setShowOtherSource(false);
    }
  }, [isImmovableAssetFormOpen, reset]);
  return (
    <Dialog
      size='lg'
      open={isImmovableAssetFormOpen}
      handler={() =>
        dispatch(setIsImmovableAssetFormOpen(!isImmovableAssetFormOpen))
      }
      className='pb-10 relative'
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' className='text-blue-gray text-center'>
          Immovable Assets
        </Typography>
        <IconButton
          onClick={() =>
            dispatch(setIsImmovableAssetFormOpen(!isImmovableAssetFormOpen))
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
        <Card className=' w-full bg-blue-50 mt-3'>
          <CardBody>
            <Typography color='gray'>
              Immovable Properties such as land and building/house in and
              outside of Sierra Leone.{' '}
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
              options={immovableAssetType}
              register={register}
              value='assetType'
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
                label='Other asset relation*'
                placeholder='Enter other asset relation'
                register={register}
                value='otherRelation'
              />
            )}
          </div>

          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Location*'
              placeholder='Enter asset location'
              register={register}
              value='location'
            />
            <TextInput
              errors={errors}
              label='Plot No'
              placeholder='Enter asset plot number'
              register={register}
              value='plotNo'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Asset Size/Acre'
              placeholder='Enter asset size/acre'
              register={register}
              value='size'
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
