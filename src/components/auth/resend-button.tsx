import { useFormState } from 'react-dom';
import { Button, CardFooter, Typography } from '../materialTailwind';
import { resendVerificationEmail } from '@/actions/auth/verification';
import Link from 'next/link';
import routes from '@/utils/routes';
import SubmitButton from './button/submitButton';
export default function ResendButton() {
  const [formState, formAction] = useFormState(resendVerificationEmail, {
    errors: {},
  });
  return (
    <CardFooter className='pt-0'>
      <form action={formAction}>
        <Typography className=' text-center pt'>
          {`Didn't Received email? `}
          <SubmitButton
            title='Resend Email'
            variant='text'
            className='p-1 text-center'
          />
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
      <div className='flex w-full justify-between mt-3'>
        <Link className=' text-blue-500' href={routes.register}>
          Register a new accounts
        </Link>
        <Link className=' text-blue-500' href={routes.login}>
          Login with your existing account
        </Link>
      </div>
    </CardFooter>
  );
}
