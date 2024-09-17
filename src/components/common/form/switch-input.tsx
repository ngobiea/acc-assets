import { Checkbox, Input, Switch, Typography } from '@/components/materialTailwind';
import type { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

type SwitchProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  linkLabel: string;
  value: Path<FormValues>;
  disabled?: boolean;
};
export default function SwitchInput({
  register,
  label,
  linkLabel,
    value,
     disabled,
}: SwitchProps) {
  return (
    <div className='w-full mb-5 group'>
      <Switch
        disabled={disabled}
        color='blue'
        {...register(value)}
        ripple={true}
        label={
          <div>
            <Typography color='blue-gray' className='font-medium'>
              {label}
            </Typography>
            <Typography variant='small' color='gray' className='font-normal'>
              {linkLabel}
            </Typography>
          </div>
        }
        containerProps={{
          className: '-mt-5',
        }}
      />
    </div>
  );
}
