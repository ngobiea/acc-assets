'use client';

import {
  Button,
  CardBody,
  Checkbox,
  Typography,
} from '@/components/materialTailwind';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { handlePrevDeclarationStep } from '@/store/slices/declarationSlice/declarationSlice';
import { useDispatch } from 'react-redux';
import { previewSchema } from '@/utils/validators/declaration';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { postPreview } from '@/actions/declaration/declaration';
export default function PreviewForm({
  declarationId,
}: {
  declarationId: string;
}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm<PreviewClientForm>({
    resolver: zodResolver(previewSchema),
  });
  const [formState, action] = useFormState(postPreview, { errors: {} });

  const onSubmit: SubmitHandler<PreviewClientForm> = (data) => {
    const formData = new FormData();
    formData.append('isAccepted', data.isAccepted);
    formData.append('declarationId', declarationId);
    action(formData);
    console.log(data);
  };
  useEffect(() => {
    if (formState.errors.isAccepted) {
      setError('isAccepted', {
        message: formState.errors.isAccepted.join(','),
      });
    }
  }, [formState.errors.isAccepted, setError]);
  return (
    <CardBody className='bg-blue-50/50 border border-blue-500 rounded-xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <span className='p-3'>By clicking and accepting here,</span>
          <Checkbox
            className=' border border-blue-600'
            {...register('isAccepted')}
            color='blue'
            ripple={true}
          />
        </div>
        <Typography className='px-3'>
          I hereby affirm that the contents of this declaration are true to the
          best of my knowledge, information and belief. I am aware that should I
          knowingly record false, inaccurate or misleading information in this
          declaration form, I shall be liable to penalties, including
          administrative sanctions set out in sub-section (5) of section 122A of
          the Anti-Corruption Act 2008 (as amended by Act No.9 of 2019) to wit:
          withholding of salary, suspension and dismissal. Criminal action could
          also be brought against me for recording false and inaccurate
          information and willfully misleading the Anti-Corruption Commission.
        </Typography>
        {errors.isAccepted && (
          <Typography color='red' className='px-3'>
            {errors.isAccepted.message}
          </Typography>
        )}
        <div className='flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0 mt-5'>
          <Button
            onClick={() => dispatch(handlePrevDeclarationStep())}
            color='blue'
          >
            Prev
          </Button>
          <Button color='blue' type='submit'>
            Submit Declaration
          </Button>
        </div>
      </form>
    </CardBody>
  );
}
