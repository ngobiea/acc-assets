'use client';
import { Button, CardBody } from '@/components/materialTailwind';
import { setIsSameAsPermanent } from '@/store/slices/setupSlice/setupSlice';
import { useFormState } from 'react-dom';
import { SLDistricts } from '@/utils/selectOptions';
import { postDUserContact } from '@/actions/declaration/contact';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/common/form/text-input';
import SelectInput from '@/components/common/form/select-input';
import SwitchInput from '@/components/common/form/switch-input';
import type { DContact } from '@prisma/client';
import { contactClientDSchema } from '@/utils/validators/declaration';
import {
  handleNextDeclarationStep,
  handlePrevDeclarationStep,
} from '@/store/slices/declarationSlice/declarationSlice';
export default function ContactDeclarationForm({
  contact,
}: {
  contact: DContact;
}) {
  const dispatch = useAppDispatch();
  const { isSameAsPermanent } = useAppSelector((state) => state.setup);
  const [formState, action] = useFormState(postDUserContact, { errors: {} });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactClientDSchema),
  });

  const watchForm = watch([]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const currentValues = value as ContactClientDForm;
      currentValues.isSameAsPermanent;
      if (name === 'isSameAsPermanent') {
        console.log(typeof currentValues.isSameAsPermanent);
        dispatch(setIsSameAsPermanent(!!currentValues.isSameAsPermanent));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  useEffect(() => {
    if (formState.data?.contact) {
      dispatch(handleNextDeclarationStep());
    }
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
    if (formState.errors.isSameAsPermanent) {
      setError('isSameAsPermanent', {
        message: formState.errors.isSameAsPermanent?.join(', '),
      });
    }
  }, [
    dispatch,
    formState.data?.contact,
    formState.errors.isSameAsPermanent,
    formState.errors.mobile,
    formState.errors.permanentAddress,
    formState.errors.permanentDistrict,
    formState.errors.presentAddress,
    formState.errors.presentDistrict,
    formState.errors.telephone,
    setError,
  ]);
  useEffect(() => {
    if (contact) {
      setValue('telephone', contact?.telephone || '');
      setValue('mobile', contact?.mobile || '');
      setValue('permanentAddress', contact?.permanentAddress);
      setValue('permanentDistrict', contact?.permanentDistrict);
      setValue('presentAddress', contact?.presentAddress || '');
      setValue('presentDistrict', contact?.presentDistrict || '');
      setValue(
        'isSameAsPermanent',
        contact.permanentAddress === contact.presentAddress &&
          contact.permanentDistrict === contact.presentDistrict
      );
    } else {
      reset();
    }
  }, [contact, setValue, reset]);
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
    formData.append('id', contact?.id || '');
    formData.append('declarationId', contact?.declarationId || '');
    action(formData);
    console.log(data);
  };
  console.log(errors);
  console.log(formState.errors);
  return (
    <>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className='flex justify-between mt-5'>
            <Button
              onClick={() => dispatch(handlePrevDeclarationStep())}
              color='blue'
            >
              Prev
            </Button>
            <Button type='submit' color='blue' className='hover:animate-bounce'>
              Save & Continue
            </Button>
          </div>
        </form>
      </CardBody>
    </>
  );
}
