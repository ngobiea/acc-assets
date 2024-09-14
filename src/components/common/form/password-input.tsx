import { Input } from '@/components/materialTailwind';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
type PasswordInputProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  value: Path<FormValues>;
  errors: FieldErrors<FormValues>;
  placeholder: string;
  onClickIcon?: () => void;
  isShowPassword?: boolean;
};
export default function PasswordInput({
  register,
  errors,
  label,
  value,
  placeholder,
  onClickIcon,
  isShowPassword,
}: PasswordInputProps): JSX.Element {
  return (
    <div className='w-full group mb-5'>
      <Input
        {...register(value)}
        label={label}
        placeholder={placeholder}
        color='blue'
        error={(errors as any)[value] ? true : false}
        type={isShowPassword ? 'text' : 'password'}
        icon={
          isShowPassword ? (
            <FaEyeSlash
              className='w-4 h-4 cursor-pointer'
              onClick={onClickIcon}
            />
          ) : (
            <FaEye className='w-4 h-4 cursor-pointer' onClick={onClickIcon} />
          )
        }
      />
      {(errors as any)[value] && (
        <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
          Password must include {(errors as any)[value]?.message}
        </p>
      )}
    </div>
  );
}
