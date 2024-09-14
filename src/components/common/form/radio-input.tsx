import { Typography, Radio } from '@/components/materialTailwind';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { MdCheckCircle } from 'react-icons/md';

type RadioProps = {
  register: UseFormRegister<FormValues>;
  radioLabel: string;
  value: Path<FormValues>;
  errors: FieldErrors<FormValues>;
  values: { radioValue: string; defaultChecked?: boolean }[];
  // handleChange?: (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => void;
};

export default function RadioInput({
  register,
  errors,
  radioLabel,
  values,
  value,
  // handleChange,
}: RadioProps) {
  return (
    <div className='w-full group mb-5'>
      <Typography
        variant='small'
        className={`${
          (errors as any)[value] ? 'text-red-500' : 'text-gray-800'
        }`}
      >
        {radioLabel}
      </Typography>
      {values.map(({radioValue,defaultChecked}) => {
        return (
          <Radio
            defaultChecked={defaultChecked}
            key={radioValue}
            {...register(value)}
            color={(errors as any)[value] ? 'red' : 'blue'}
            ripple={true}
            className={`p-0 transition-all hover:before:opacity-0 ${
              (errors as any)[value]
                ? 'border-red-500/40 bg-red-500/20'
                : 'border-gray-900/10 bg-gray-900/5'
            }`}
            label={
              <Typography
                color='blue-gray'
                className={`font-normal ${
                  (errors as any)[value] ? 'text-red-500' : 'text-blue-gray-400'
                }`}
              >
                {radioValue}
              </Typography>
            }
            icon={<MdCheckCircle className='h-full w-full scale-105' />}
            value={radioValue}
            // onChange={handleChange}
          />
        );
      })}

      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[value]?.message}
      </p>
    </div>
  );
}
