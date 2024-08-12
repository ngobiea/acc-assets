import Link from 'next/link';

import { MdPersonAddAlt1 } from 'react-icons/md';
import RegisterForm from '@/components/auth/register-form';
import IdDialog from '@/components/common/dialogs/id-dialog';
import { Button, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@/components/materialTailwind';

const RegisterPage = () => {
  return (
    <>
      <IdDialog />
      <CardHeader
        variant='gradient'
        color='green'
        className='mb-4 grid h-28 place-items-center'
      >
        <MdPersonAddAlt1 className='text-white text-6xl mx-auto' />

        <Typography variant='h3' color='white'>
          Registration
        </Typography>
      </CardHeader>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
