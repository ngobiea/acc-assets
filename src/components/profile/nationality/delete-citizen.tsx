'use client';
import { Button } from '@/components/materialTailwind';
import { useFormState } from 'react-dom';
import { MdOutlineDelete } from 'react-icons/md';
import { deleteCitizenship } from '@/actions/setup/citizenship';
export default function DeleteCitizenForm({ id }: { id: string }) {
  const [formState, formAction] = useFormState(
    deleteCitizenship.bind(null, { id }),
    { errors: {} }
  );
  console.log(formState);
  return (
    <form action={formAction}>
      <Button
        variant='text'
        color='red'
        className='flex items-center gap-1 hover:animate-bounce px-0'
        type='submit'
      >
        <MdOutlineDelete className='h-4 w-4' />
        Delete
      </Button>
    </form>
  );
}
