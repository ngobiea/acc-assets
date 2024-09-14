import { Input } from '@/components/materialTailwind';
import type { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

type SelectTextProps = {
  register: UseFormRegister<FormValues>;
  label: string;
  options: Option[];
  errors: FieldErrors<FormValues>;
  type?: string;
  selectValue: Path<FormValues>;
  inputValue: Path<FormValues>;
  // handleChange?: (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => void;
  placeholder: string;
  idType?: string;
};
export default function SelectTextInput({
  register,
  errors,
  label,
  placeholder,
  // handleChange,
  options,
  type,
  idType,
  inputValue,
  selectValue,
}: SelectTextProps) {
  return (
    <div className='w-full mb-5 group'>
      <div className='flex w-full'>
        <select
          {...register(selectValue)}
          // onChange={handleChange}
          className={`
                  text-sm rounded-lg p-2.5 rounded-r-none 
                  ${
                    (errors as any)[inputValue]
                      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500 outline-red-500'
                      : 'bg-gray-50 border border-blue-gray-300 focus:text-blue-500  focus:ring-blue-500 focus:border-blue-500  outline-blue-500'
                  }
                  `}
        >
          {options.map(({ id, value }) => {
            return (
              <option key={id} value={value} className=''>
                {value}
              </option>
            );
          })}
        </select>
        <Input
          {...register(inputValue)}
          label={label}
          placeholder={placeholder}
          color='blue'
          error={(errors as any)[inputValue] ? true : false}
          type={type}
          className='rounded-l-none rounded-tl-none'
          containerProps={{
            className: 'min-w-[90px]',
          }}
        />
      </div>
      <p className='text-red-500 mt-2 flex items-center gap-1 font-normal'>
        {(errors as any)[inputValue] &&
          `${idType} ${(errors as any)[inputValue]?.message}`}
      </p>
    </div>
  );
}
