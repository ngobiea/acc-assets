import {
  Button,
  Card,
  Tooltip,
  Typography,
} from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MdOutlineDeleteForever } from 'react-icons/md';
const TABLE_HEAD = [
  'National ID Number',
  'Country',
  'Issue Date',
  'Expiry Date',
  'Action',
];

export default function NationalTable() {
  const dispatch = useAppDispatch();
  const { user, isDeletingNationalCard } = useAppSelector(
    (state) => state.setup
  );

  const handleDelete = async (id: string) => {
  };

  return (
    <section className='mb-20'>
      <Card className='p-6 bg-blue-50 rounded-b-none'>
        <Typography variant='lead' color='blue-gray' className='font-bold'>
          All National Card Information
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
            {user?.nationalCards?.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_HEAD.length}
                  className='p-4 text-center text-blue-gray-400'
                >
                  No data available
                </td>
              </tr>
            )}
            {user?.nationalCards &&
              user?.nationalCards?.length > 0 &&
              user.nationalCards?.map(
                ({ country, id, expiryDate, issueDate, nationalId }, index) => (
                  <tr key={id} className='even:bg-blue-gray-50/50'>
                    <td className='p-4'>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {nationalId}
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
                        content='Delete National ID Card'
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className='bg-blue-500'
                      >
                        <Button
                          color='red'
                          className='flex items-center gap-3'
                          loading={isDeletingNationalCard}
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
    </section>
  );
}
