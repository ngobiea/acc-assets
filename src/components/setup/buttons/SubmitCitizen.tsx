'use client';

import { Button } from '@/components/materialTailwind';
import { useFormStatus } from 'react-dom';

export default function SubmitCitizen({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}) {
    const { pending } = useFormStatus();
    // console.log(pending);

  return (
    <Button loading={pending} onClick={handleSubmit} color='blue'>
      Add Nationality
    </Button>
  );
}
