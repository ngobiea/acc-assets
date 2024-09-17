import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import type { EmploymentData } from '@/utils/declaration';

import { MdOutlineDelete } from 'react-icons/md';
export default function CurrentLastEmploymentTable({
  employments,
  reason,
}: {
  employments: EmploymentData[];
  reason: string;
}) {
  const TABLE_HEAD = [
    'MDA',
    'Category',
    'Posting',
    'Designation',
    'Grade or Rank',
    'Annual Net Salary',
    'Other Allowances',
    'Allowances Details',
    'SSNo',
    'Employee ID',
    'Employee No',
    'Establishment Registration',
    'Contract Type',
    'Start Date',
    'End Date',
    'Source of Income',
  ];

  return (
    <section className='my-10'>
      <Card className='h-full w-full border-t-2'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='flex items-center justify-between gap-8 pt-3'>
            <div>
              <Typography variant='h5' color='gray'>
                {reason === 'Appointment' || reason === 'Biennial Declaration'
                  ? 'Current Employment List'
                  : 'Last Employment List'}
              </Typography>
            </div>
          
          </div>
        </CardHeader>
        <CardBody className='overflow-auto px-0'>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr className='even:bg-blue-gray-50/50'>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-bold leading-none opacity-70'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employments?.length === 0 && (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className=' pl-48 py-3 text-blue-gray-400 text-start'
                  >
                    No data available
                  </td>
                </tr>
              )}
              {employments.map(
                (
                  {
                    SSNo,
                    allowances,
                    allowancesCurrency,
                    allowancesDescription,
                    annualSalary,
                    contractEndDate,
                    contractStartDate,
                    contractType,
                    currency,
                    designation,
                    employeeCategory,
                    employeeId,
                    declarationId,
                    employeePin,
                    establishmentRegNo,
                    mda,
                    posting,
                    sourceOfIncome,
                    rank,
                    status,
                    id,
                  },
                  index
                ) => {
                  const isLast = index === employments.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {mda.abbreviation + '-' + mda.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {employeeCategory}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <form action=''>
                          <Button
                            variant='text'
                            color='red'
                            className='flex items-center gap-1 hover:animate-bounce px-0'
                          >
                            <MdOutlineDelete className='h-4 w-4' /> Delete
                          </Button>
                        </form>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </section>
  );
}

/**
 *   <section className='my-10'>
      <Card className='p-6 bg-blue-50 rounded-b-none'>
        <Typography variant='lead' color='blue-gray' className='font-bold'>
          All Nationality Information
        </Typography>
      </Card>
      <Card className='h-full w-full overflow-auto shadow-md  rounded-t-none border-t border-blue-500'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b border-blue-500 bg-blue-50 p-4'
                >
                  <Typography
                    variant='small'
                    color='gray'
                    className='font-bold leading-none'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {citizenships?.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_HEAD.length}
                  className='p-4 text-center text-blue-gray-400'
                >
                  No data available
                </td>
              </tr>
            )}
            {citizenships.map(({ country, acquireBy, id }) => (
              <tr key={id} className='even:bg-blue-gray-50/50'>
                <td className='p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                  >
                    {country}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal'
                  >
                    {acquireBy}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
 */
