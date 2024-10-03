import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import { MdOutlineDelete } from 'react-icons/md';
import AddPassportButton from './button-add-passport';
import DeletePassportForm from './delete-passport';
const TABLE_HEAD = [
  'Passport No.',
  'Country',
  'Issue Date',
  'Expiry Date',
  'Action',
];

export default function ProfilePassportTable({
  passports,
}: {
  passports: PassportSetupAttributes[];
}) {
  return (
    <section className='mb-10'>
      <Card className='h-full w-full'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='flex items-center justify-between gap-8 pt-3'>
            <div>
              <Typography variant='h5' color='blue-gray'>
                Passport list
              </Typography>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <AddPassportButton /> 
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
              {passports?.length === 0 && (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className='p-4 text-center text-blue-gray-400'
                  >
                    No data available
                  </td>
                </tr>
              )}
              {passports.map(
                (
                  { country, expiryDate, id, issueDate, passportNumber },
                  index
                ) => {
                  const isLast = index === passports.length - 1;
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
                          {passportNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {country}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {issueDate.toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {expiryDate.toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <DeletePassportForm id={id} />
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
