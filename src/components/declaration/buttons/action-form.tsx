'use client';
import { Button, Tooltip } from '@/components/materialTailwind';
import { GrCopy } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import {
  postCopyDeclaration,
  deleteDeclaration,
} from '@/actions/declaration/declaration';
import { useFormState } from 'react-dom';

export default function ActionForm({
  status,
  id,
}: {
  status: string;
  id: string;
}) {
  const [formState, formAction] = useFormState(
    status === 'DECLARED'
      ? postCopyDeclaration.bind(null, { id })
      : deleteDeclaration.bind(null, { id }),
    { errors: {} }
  );
  return (
    <form className='' action={formAction}>
      <Tooltip
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        className='bg-blue-500'
        color='red'
        content={
          status === 'DECLARED'
            ? 'Copy As New Declaration'
            : 'Delete Declaration'
        }
      >
        <Button
          variant='text'
          color='red'
          className='flex items-center gap-1 px-1 hover:animate-bounce'
          size='sm'
          type='submit'
        >
          {status === 'DECLARED' ? (
            <GrCopy className='h-4 w-4' />
          ) : (
            <MdDeleteForever className='h-4 w-4' />
          )}
          {status === 'DECLARED' ? 'Copy As New' : 'Delete'}
        </Button>
      </Tooltip>
    </form>
  );
}
