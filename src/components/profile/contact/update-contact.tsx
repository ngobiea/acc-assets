'use client';
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  Switch,
  Typography,
} from '@/components/materialTailwind';
import {
  setIsSameAsPermanent,
  setIsShowContactUpdateForm,
} from '@/store/slices/setupSlice/setupSlice';
import { useFormState } from 'react-dom';
import { postUserContact } from '@/actions/setup/contact';
import { SLDistricts } from '@/utils/selectOptions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactUpdateSchema } from '@/utils/validators/setup';
import { HiXMark } from 'react-icons/hi2';
export default function ContactUpdateForm({
  contact,
}: {
  contact: ContactSetupAttributes;
}) {
  const dispatch = useAppDispatch();
  const { isSameAsPermanent, isShowContactUpdateForm } = useAppSelector(
    (state) => state.setup
  );

  const [formState, action] = useFormState(postUserContact, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<ContactFormClient>({
    resolver: zodResolver(contactUpdateSchema),
  });

  const onSubmit: SubmitHandler<ContactFormClient> = (data) => {
    const formData = new FormData();
    formData.append('telephone', data.telephone);
    formData.append('mobile', data.mobile);
    formData.append('permanentAddress', data.permanentAddress);
    formData.append('permanentDistrict', data.permanentDistrict);
    formData.append('presentAddress', data.presentAddress);
    formData.append('presentDistrict', data.presentDistrict);
    formData.append('termsAndConditions', data.termsAndConditions);
      // action(formData);
      console.log('data', data);
  };
  useEffect(() => {
   
    if (formState.errors.telephone) {
      setError('telephone', {
        message: formState.errors.telephone?.join(', '),
      });
    }
    if (formState.errors.mobile) {
      setError('mobile', {
        message: formState.errors.mobile?.join(', '),
      });
    }
    if (formState.errors.permanentAddress) {
      setError('permanentAddress', {
        message: formState.errors.permanentAddress?.join(', '),
      });
    }
    if (formState.errors.permanentDistrict) {
      setError('permanentDistrict', {
        message: formState.errors.permanentDistrict?.join(', '),
      });
    }
    if (formState.errors.presentAddress) {
      setError('presentAddress', {
        message: formState.errors.presentAddress?.join(', '),
      });
    }
    if (formState.errors.presentDistrict) {
      setError('presentDistrict', {
        message: formState.errors.presentDistrict?.join(', '),
      });
    }
    if (formState.errors.termsAndConditions) {
      setError('termsAndConditions', {
        message: formState.errors.termsAndConditions?.join(', '),
      });
    }
  }, [dispatch, formState.errors, setError]);
  useEffect(() => {
    if (isShowContactUpdateForm) {
      setValue('telephone', contact.telephone ?? '');
      setValue('mobile', contact.mobile ?? '');
      setValue('permanentAddress', contact.permanentAddress);
      setValue('permanentDistrict', contact.permanentDistrict);
      setValue('presentAddress', contact.presentAddress ?? '');
      setValue('presentDistrict', contact.presentDistrict ?? '');
      if (contact.permanentAddress === contact.presentAddress) {
        setValue('isSameAsPermanent', true);
        dispatch(setIsSameAsPermanent(true));
      } else {
        // setValue('isSameAsPermanent', false);
        dispatch(setIsSameAsPermanent(false));
      }
    } else {
      reset();
    }
  }, [
    isShowContactUpdateForm,
    contact.mobile,
    contact.permanentAddress,
    contact.permanentDistrict,
    contact.presentAddress,
    contact.presentDistrict,
    contact.telephone,
    dispatch,
    reset,
    setValue,
  ]);
  return (
    <Dialog
      open={isShowContactUpdateForm}
      size='lg'
      handler={() => {
        dispatch(setIsShowContactUpdateForm(!isShowContactUpdateForm));
      }}
      className=' pb-10 relative'
    >
      <DialogHeader className='relative m-0 block'>
        <Typography variant='h4' color='gray'>
          Contact Info
        </Typography>

        <IconButton
          size='sm'
          variant='text'
          className='!absolute right-3.5 top-3.5'
          onClick={() => {
            dispatch(setIsShowContactUpdateForm(false));
          }}
        >
          <HiXMark className='h-10 w-10' />
        </IconButton>
      </DialogHeader>
      <DialogBody className='h-[calc(100vh-170px)] overflow-y-auto'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-3xl mx-auto py-10'
        >
          <Typography className=' text-center'>
            All fields marked with * are required to be filled in.
          </Typography>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label='Telephone'
                placeholder='Enter your telephone number'
                {...register('telephone')}
                color={errors.telephone ? 'red' : 'blue'}
                className={` ${
                  errors.telephone
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.telephone?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <Input
                label='Mobile'
                placeholder='Enter your mobile number'
                {...register('mobile')}
                color={errors.mobile ? 'red' : 'blue'}
                className={` ${
                  errors.mobile
                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.mobile?.message}
              </p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <div className='w-full group mb-8'>
              <Input
                label='Permanent Address*'
                placeholder='Enter your permanent address'
                {...register('permanentAddress')}
                color='blue'
                error={errors?.permanentAddress ? true : false}
              />
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.permanentAddress?.message}
              </p>
            </div>
            <div className='w-full group mb-5'>
              <select
                {...register('permanentDistrict')}
                className={`border text-sm rounded-lg  block w-full p-2.5 ${
                  errors.permanentDistrict
                    ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                    : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                }`}
              >
                <option value={''}>Select Permanent District*</option>
                {SLDistricts.map(({ district, province }) => {
                  return (
                    <option
                      key={district}
                      value={`${district} - ${province}`}
                      className=''
                    >
                      {`${district} - ${province}`}
                    </option>
                  );
                })}
              </select>
              <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                {errors.permanentDistrict?.message}
              </p>
            </div>
          </div>
          <div>
            <Switch
              color='blue'
              {...register('isSameAsPermanent')}
              ripple={true}
              checked={isSameAsPermanent}
              onChange={() =>
                dispatch(setIsSameAsPermanent(!isSameAsPermanent))
              }
              label={
                <div>
                  <Typography color='blue-gray' className='font-medium'>
                    Present Address
                  </Typography>
                  <Typography
                    variant='small'
                    color='gray'
                    className='font-normal'
                  >
                    Same as permanent address
                  </Typography>
                </div>
              }
              containerProps={{
                className: '-mt-5',
              }}
            />
          </div>

          {!isSameAsPermanent && (
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <div className='w-full group mb-8'>
                <Input
                  label='Present Address'
                  placeholder='Enter your permanent address'
                  {...register('presentAddress')}
                  color='blue'
                  error={errors?.presentAddress ? true : false}
                />
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.presentAddress?.message}
                </p>
              </div>
              <div className='w-full group mb-5'>
                <select
                  {...register('presentDistrict')}
                  className={`border text-sm rounded-lg  block w-full p-2.5 ${
                    errors.presentDistrict
                      ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
                  }`}
                >
                  <option value={''}>Select Present District</option>
                  {SLDistricts.map(({ district, province }) => {
                    return (
                      <option
                        key={district}
                        value={`${district} - ${province}`}
                        className=''
                      >
                        {`${district} - ${province}`}
                      </option>
                    );
                  })}
                </select>
                <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
                  {errors.presentDistrict?.message}
                </p>
              </div>
            </div>
          )}
          {formState.errors._form && (
            <div className='flex w-full justify-between mb-5 text-red-500'>
              <Typography>{formState.errors._form.join(', ')}</Typography>
            </div>
          )}
          <div className='flex w-full justify-end mr-5'>
            <Button type='submit' color='blue'>
              Update Contact Info
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
