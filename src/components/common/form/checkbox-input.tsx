import { Checkbox, Input, Typography } from '@/components/materialTailwind';
import type { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

type SelectTextProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  linkLabel: string;
  errors: FieldErrors<FormValues>;
  value: Path<FormValues>;
  placeholder: string;
  disabled?: boolean;
};
export default function CheckBoxInput({
  register,
  errors,
  label,
  linkLabel,
  value,
  disabled,
}: SelectTextProps) {
  return (
    <div className='w-full mb-5 group'>
      <Checkbox
        disabled={disabled}
        {...register(value)}
        color='blue'
        label={
          <Typography color='blue-gray' className='flex font-medium'>
            {label}
            <Typography
              as='a'
              href='#'
              color='blue'
              className='font-medium transition-colors hover:text-blue-700'
            >
              {` ${linkLabel} `}
            </Typography>
            .
          </Typography>
        }
        ripple={true}
      />
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[value]?.message}
      </p>
    </div>
  );
}
