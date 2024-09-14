import { Input } from '@/components/materialTailwind';
import type { HTMLInputTypeAttribute } from 'react';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
type TextInputProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  value: Path<FormValues>;
  type?: HTMLInputTypeAttribute;
  errors: FieldErrors<FormValues>;
  placeholder: string;
};
export default function TextInput({
  register,
  errors,
  label,
  value,
  placeholder,
  type,
}: TextInputProps) {
  return (
    <div className='w-full group mb-5'>
      <Input
        {...register(value)}
        label={label}
        placeholder={placeholder}
        color='blue'
        error={(errors as any)[value] ? true : false}
        type={type}
      />
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[value]?.message}
      </p>
    </div>
  );
}
