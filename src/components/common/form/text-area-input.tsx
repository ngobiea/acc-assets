import {  Textarea} from '@/components/materialTailwind';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
type TextareaInputProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  value: Path<FormValues>;
  errors: FieldErrors<FormValues>;
  placeholder?: string;
  disabled?: boolean;
};
export default function TextareaInput({
  register,
  errors,
  label,
  value,
  placeholder,
  disabled,
}: TextareaInputProps) {
  return (
    <div className='w-full group mb-5'>
      <Textarea
        disabled={disabled}
        {...register(value)}
        label={label}
        placeholder={placeholder}
        color='blue'
        error={(errors as any)[value] ? true : false}
      />
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[value]?.message}
      </p>
    </div>
  );
}
