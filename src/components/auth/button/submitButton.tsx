'use client';
import { Button } from '@/components/materialTailwind';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  // console.log('pending', pending);
  return (
    <Button
      type='submit'
      variant='gradient'
      color='blue'
      loading={pending}
      className=' hover:animate-bounce'
    >
      {title}
    </Button>
  );
}
