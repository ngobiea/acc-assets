import { useFormState } from 'react-dom';
import { Button, CardFooter, Typography } from '../materialTailwind';
import { sendEmail } from '@/actions/auth/verification';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import SubmitButton from './button/submitButton';

export default function SendButton() {
  const dispatch = useAppDispatch();
  const { isSubmittingResendVerification } = useAppSelector(
    (state) => state.auth
  );
  const [formState, formAction] = useFormState(sendEmail, {
    errors: {},
  });
    useEffect(() => { 
        
    }, [formState, dispatch]);
  console.log(formState);
  return (
    <CardFooter className='pt-0'>
      <form action={formAction}>
        <Typography className=' text-center pt'>
          {`Please verify your email. `}
                  <SubmitButton title='Verify Email'
                      className='p-2 text-center' 
                      
                  />

          {/* <Button
            type='submit'
            color='blue'
            className='p-2 text-center'
            loading={isSubmittingResendVerification}
          >
            Verify Email
          </Button> */}
        </Typography>
        {formState.errors._form && (
          <p className='text-red-500 mt-2 text-center gap-1 font-normal'>
            {formState.errors._form.join(', ')}
          </p>
        )}
        {formState.errors.message && (
          <p className='text-green-500 mt-2 text-center gap-1 font-normal'>
            {formState.errors.message.join(', ')}
          </p>
        )}
      </form>
    </CardFooter>
  );
}
