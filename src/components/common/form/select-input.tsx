import { Typography } from '@/components/materialTailwind';
import type { UseFormRegister, Path, FieldErrors } from 'react-hook-form';
type SelectProps = {
  register: UseFormRegister<FormValues>;
  label?: string;
  value: Path<FormValues>;
  options: Option[];
  errors: FieldErrors<FormValues>;
  title?: string;
  disabled?: boolean;
};

export default function SelectInput({
  register,
  options,
  label,
  value,
  errors,
  title,
  disabled
}: SelectProps) {
  return (
    <div className='w-full group mb-5'>
      {title && (
        <Typography
          color='gray'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          {title}
        </Typography>
      )}
      <select
        disabled={disabled}
        {...register(value)}
        className={`border text-sm rounded-lg  block w-full p-2.5 ${
          (errors as any)[value]
            ? 'bg-red-50 border-red-300 focus:text-red-500 focus:ring-red-500  focus:border-red-500 outline-red-500'
            : 'bg-gray-50 border-blue-gray-300 focus:text-blue-500 focus:ring-blue-500 focus:border-blue-500 outline-blue-500'
        }`}
      >
        {label && <option value={''}>{label}</option>}
        {options.map(({ id, value }) => {
          return (
            <option key={id} value={id} className=''>
              {value}
            </option>
          );
        })}
      </select>
      {(errors as any)[value] && (
        <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
          {(errors as any)[value]?.message}
        </p>
      )}
    </div>
  );
}
