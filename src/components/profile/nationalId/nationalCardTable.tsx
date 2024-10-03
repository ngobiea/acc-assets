import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@/components/materialTailwind';
import { MdAdd, MdOutlineDelete } from 'react-icons/md';
const TABLE_HEAD = ['ID', 'Country', 'Issue Date', 'Expiry Date', 'Action'];
import AddNationalCardButton from './button-add-nationalCard';
import DeleteNationalCardForm from './delete-nationalCard';

export default function ProfileNationalTable({
  nationalCards,
}: {
  nationalCards: NationalCardSetupAttributes[];
}) {
  return (
    <section className='mb-10'>
      <Card className='h-full w-full'>
        <CardHeader floated={false} shadow={false} className='rounded-none'>
          <div className='flex items-center justify-between gap-8 pt-3'>
            <div>
              <Typography variant='h5' color='gray'>
                National ID list
              </Typography>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <AddNationalCardButton />
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
              {nationalCards?.length === 0 && (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className='p-4 text-center text-blue-gray-400'
                  >
                    No data available
                  </td>
                </tr>
              )}
              {nationalCards.map(
                ({ country, expiryDate, id, issueDate, nationalId }, index) => {
                  const isLast = index === nationalCards.length - 1;
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
                          {nationalId}
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
                        <DeleteNationalCardForm id={id} />
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
