'use client';
import { Button } from '@/components/materialTailwind';
import type { color, variant } from '@material-tailwind/react/types/components/button';
import { useFormStatus } from 'react-dom';
interface SubmitButtonProps {
  title: string;
  variant?: variant;
  className?: string;
  color?: color;
}
export default function SubmitButton({
  title,
  variant,
  className,
  color,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      variant={variant}
      color={color}
      loading={pending}
      className={className + ' hover:animate-bounce'}
    >
      {title}
    </Button>
  );
}
