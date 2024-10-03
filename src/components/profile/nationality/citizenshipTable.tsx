import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import { Citizenship } from '@prisma/client';
import { MdAdd, MdOutlineDelete } from 'react-icons/md';
import AddCitizenButton from './button-add-citizen';
const TABLE_HEAD = ['Nationality', 'Acquired By', 'Action'];
import DeleteCitizenForm from './delete-citizen';
export default function ProfileCitizenshipTable({
  citizenships,
}: {
  citizenships: Citizenship[];
}) {
  return (
    <section className='my-10'>
      <Card className='h-full w-full'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='flex items-center justify-between gap-8 pt-3'>
            <div>
              <Typography variant='h5' color='gray'>
                Citizenship list
              </Typography>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <AddCitizenButton />
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
              {citizenships.map(({ country, id, acquireBy }, index) => {
                const isLast = index === citizenships.length - 1;
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
                        {country}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {acquireBy}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='flex items-center gap-2'>
                        <DeleteCitizenForm id={id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
