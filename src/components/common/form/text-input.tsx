import { Input } from '@/components/materialTailwind';
import type { containerProps } from '@material-tailwind/react/types/components/input';
import type { HTMLInputTypeAttribute } from 'react';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
type TextInputProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  value: Path<FormValues>;
  type?: HTMLInputTypeAttribute;
  errors: FieldErrors<FormValues>;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  containerProps?: containerProps;
  divClassName?: string;
};
export default function TextInput({
  register,
  errors,
  label,
  value,
  placeholder,
  type,
  disabled,
  className,
  containerProps,
  divClassName,
}: TextInputProps) {
  return (
    <div className={divClassName ? divClassName : `w-full group mb-5 +`}>
      <Input
        disabled={disabled}
        {...register(value)}
        label={label}
        placeholder={placeholder}
        color='blue'
        error={(errors as any)[value] ? true : false}
        type={type}
        min={type === 'number' ? 0 : undefined}
        className={className}
        containerProps={containerProps}
      />
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[value]?.message}
      </p>
    </div>
  );
}
