import {
  Button,
  Card,
  Tooltip,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MdOutlineDeleteForever } from 'react-icons/md';

const TABLE_HEAD = [
  'Passport Number',
  'Country',
  'Issue Date',
  'Expiry Date',
  'Action',
];

export default function PassportTable() {
  const dispatch = useAppDispatch();
  const { user, isDeletingPassport } = useAppSelector((state) => state.setup);

  const handleDelete = async (id: string) => {
  };

  return (
    <Card className='h-full w-full overflow-auto shadow-md sm:rounded-lg mb-5'>
      <Typography
        className='p-5 text-lg font-semibold text-left rtl:text-right bg-blue-50'
        color='gray'
      >
        All Passport Information
      </Typography>
      <hr className='h-px  bg-blue-500 border-0 dark:bg-gray-700'></hr>
      <table className='w-full min-w-max table-auto text-left'>
        <thead className=''>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='border-b border-blue-500 bg-blue-50 p-4'
              >
                <Typography
                  variant='small'
                  color='gray'
                  className='font-normal leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user?.passports?.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_HEAD.length}
                className='p-4 text-center text-blue-gray-400'
              >
                No data available
              </td>
            </tr>
          )}
          {user?.passports &&
            user?.passports?.length > 0 &&
            user.passports.map(
              ({ country, id, expiryDate, issueDate, passportNumber }) => (
                <tr key={id} className='even:bg-blue-gray-50/50'>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {passportNumber}
                    </Typography>
                  </td>

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
                      {issueDate.toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className='p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {expiryDate.toLocaleDateString()}
                    </Typography>
                  </td>
                  <td
                    className='p-4'
                    onClick={() => handleDelete(id as string)}
                  >
                    <Tooltip
                      content='Delete Passport'
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      className='bg-blue-500'
                    >
                      <Button
                        color='red'
                        className='flex items-center gap-3'
                        loading={isDeletingPassport}
                      >
                        Delete
                        <MdOutlineDeleteForever className='font-medium text-lg cursor-pointer' />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </Card>
  );
}
