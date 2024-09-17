import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { currentLastEmploymentSchema } from '@/utils/validators/declaration';
import { CardBody, Input, Textarea } from '@/components/materialTailwind';
import {
  currencies,
  sourceOfIncome,
  contractTypes,
} from '@/utils/selectOptions';
import SelectInput from '@/components/common/form/select-input';
import type { MDA } from '@prisma/client';
import TextInput from '@/components/common/form/text-input';
import SelectTextInput from '@/components/common/form/select-text-input';
import TextareaInput from '@/components/common/form/text-area-input';
export default function CurrentEmploymentForm({
  reason,
  mdas,
}: {
  reason: string;
  mdas: MDA[];
}) {
  const dispatch = useAppDispatch();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    unregister,
  } = useForm<FormValues>({
    resolver: zodResolver(currentLastEmploymentSchema),
    defaultValues: {
      annualSalary: '0',
      allowance: '0',
    },
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'sourceOfIncome') {
      if (value === 'Other') {
        setShowOtherInput(true);
      } else {
        setShowOtherInput(false);
        unregister('otherSourceOfIncome');
      }
    }
  };

  console.log(errors);
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitted = data as CurrentLastEmploymentClientForm;
    console.log(data);
  };
  return (
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <SelectInput
            errors={errors}
            options={mdas.map(({ id, abbreviation, name }) => {
              return {
                id: id,
                value: `${abbreviation} - ${name}`,
              };
            })}
            register={register}
            value='mdaId'
            label='Ministry/Department/Agency (MDA)*'
          />
          <TextInput
            errors={errors}
            label='Employee Category*'
            placeholder='Enter your employee category'
            register={register}
            value='employeeCategory'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Current Posting*'
            placeholder='Enter your current posting'
            register={register}
            value='posting'
          />
          <TextInput
            errors={errors}
            label='Job Title/Designation*'
            placeholder='Enter your job title/designation'
            register={register}
            value='designation'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Grade/Rank*'
            placeholder='Enter your grade/rank'
            register={register}
            value='rank'
          />
          <TextInput
            errors={errors}
            label='Social Security Number-SSNo'
            placeholder='Enter your social security number'
            register={register}
            value='SSNo'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Employee ID*'
            placeholder='Enter your employee ID'
            register={register}
            value='employeeId'
          />
          <TextInput
            errors={errors}
            label='Employee PIN No (if any)'
            placeholder='Enter your job title/designation'
            register={register}
            value='employeePin'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Establishment Registration No (if any)'
            placeholder='Enter your establishment registration number'
            register={register}
            value='establishmentRegNo'
          />
          <SelectInput
            errors={errors}
            label='Select Contract Type*'
            options={contractTypes}
            register={register}
            value='contractType'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <SelectTextInput
            errors={errors}
            inputValue='annualSalary'
            label={`Annual Net Salary*`}
            options={currencies}
            placeholder='Enter your annual net salary'
            register={register}
            selectValue='currency'
          />
          <SelectTextInput
            errors={errors}
            inputValue='allowance'
            label='Other Allowances (if any)'
            options={currencies}
            placeholder='Enter your other allowances'
            register={register}
            selectValue='allowancesCurrency'
          />
        </div>
        <TextareaInput
          errors={errors}
          label='Description of Allowances (if any)'
          register={register}
          value='allowancesDescription'
        />

        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <TextInput
            errors={errors}
            label='Employment Start Date*'
            placeholder='Enter Employment Start Date'
            register={register}
            value='contractStartDate'
          />
          <TextInput
            errors={errors}
            label='Employment End Date (if known)'
            placeholder='Enter Employment End Date'
            register={register}
            value='contractEndDate'
          />
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-6'>
          <SelectInput
            errors={errors}
            options={sourceOfIncome}
            register={register}
            value='sourceOfIncome'
            label='Select Source of Income'
          />

          {showOtherInput && (
            <TextInput
              errors={errors}
              label='Other Source of Income'
              placeholder='Enter other source of income'
              register={register}
              value='otherSourceOfIncome'
            />
          )}
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-lg '
          >
            Save Employment
          </button>
        </div>
      </form>
    </CardBody>
  );
}
