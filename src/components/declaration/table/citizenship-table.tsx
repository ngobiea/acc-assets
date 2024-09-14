import {
  Button,
  Card,
  Tooltip,
  Typography,
} from '@/components/materialTailwind';
const TABLE_HEAD = ['Nationality', 'Acquired By', 'Action'];
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MdOutlineDeleteForever } from 'react-icons/md';
export default function CitizenshipTable() {
  const dispatch = useAppDispatch();
  const { isDeletingCitizenship, user } = useAppSelector(
    (state) => state.setup
  );
  const handleDelete = async (id: string) => {
  };

  return (
    <Card className='h-full w-full overflow-auto mb-10'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='border-b border-blue-100 bg-blue-50 p-4'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {user?.citizenships?.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_HEAD.length}
                className='p-4 text-center text-blue-gray-400'
              >
                No data available
              </td>
            </tr>
          )}
          {user?.citizenships &&
            user?.citizenships?.length > 0 &&
            user.citizenships.map(({ country, acquireBy, id }) => (
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
                <td className='p-4' onClick={() => handleDelete(id as string)}>
                  <Tooltip
                    content='Delete Citizenship'
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className='bg-blue-500'
                  >
                    <Button
                      color='red'
                      className='flex items-center gap-3'
                      loading={isDeletingCitizenship}
                    >
                      Delete
                      <MdOutlineDeleteForever className='font-medium text-lg cursor-pointer' />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
}
