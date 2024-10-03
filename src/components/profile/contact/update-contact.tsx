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
import SelectInput from '@/components/common/form/select-input';
import TextInput from '@/components/common/form/text-input';
import SwitchInput from '@/components/common/form/switch-input';
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
  } = useForm<FormValues>({
    resolver: zodResolver(contactUpdateSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as ContactClientSetupForm;
    const formData = new FormData();
    formData.append('telephone', submitted.telephone);
    formData.append('mobile', submitted.mobile);
    formData.append('permanentAddress', submitted.permanentAddress);
    formData.append('permanentDistrict', submitted.permanentDistrict);
    formData.append('isSameAsPermanent', submitted.isSameAsPermanent);
    formData.append('presentAddress', submitted.presentAddress);
    formData.append('presentDistrict', submitted.presentDistrict);
    action(formData);
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
      setValue('permanentDistrict', contact.permanentDistrict?? '');
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
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Telephone'
              placeholder='Enter your telephone number'
              register={register}
              value='telephone'
            />
            <TextInput
              errors={errors}
              label='Mobile'
              placeholder='Enter your mobile number'
              register={register}
              value='mobile'
            />
          </div>
          <div className='grid lg:grid-cols-2 lg:gap-6'>
            <TextInput
              errors={errors}
              label='Permanent Address*'
              placeholder='Enter your permanent address'
              register={register}
              value='permanentAddress'
            />
            <SelectInput
              errors={errors}
              label='Select Permanent District*'
              options={SLDistricts.map(({ district, province }) => {
                return { id: district, value: `${district} - ${province}` };
              })}
              register={register}
              value='permanentDistrict'
            />
          </div>

          <SwitchInput
            label='Present Address'
            linkLabel='Same as permanent address'
            register={register}
            value='isSameAsPermanent'
          />
          {!isSameAsPermanent && (
            <div className='grid lg:grid-cols-2 lg:gap-6'>
              <TextInput
                errors={errors}
                label='Present Address'
                placeholder='Enter your present address'
                register={register}
                value='presentAddress'
              />
              <SelectInput
                errors={errors}
                label='Select Present District'
                options={SLDistricts.map(({ district, province }) => {
                  return { id: district, value: `${district} - ${province}` };
                })}
                register={register}
                value='presentDistrict'
              />
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
