import { Checkbox, Input, Switch, Typography } from '@/components/materialTailwind';
import type { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

type SwitchProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  linkLabel: string;
  value: Path<FormValues>;
  // handleChange: (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => void;
  // checked: boolean;
};
export default function SwitchInput({
  register,
  label,
  // handleChange,
  linkLabel,
    value,
  // checked
}: SwitchProps) {
  return (
    <div className='w-full mb-5 group'>
      <Switch
        color='blue'
        {...register(value)}
        ripple={true}
        // checked={checked}
        // onChange={handleChange}
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
