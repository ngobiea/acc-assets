import { HiPencil } from 'react-icons/hi';
import { nanoid } from '@/utils/declarations/id-generator';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from '../materialTailwind';
import { Declaration } from '@prisma/client';
import NewDeclarationButton from './buttons/new-declaration';
const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Submitted',
    value: 'submitted',
  },
];
const TABLE_HEAD = ['ID', 'Date', 'Reasons', 'Status', 'Actions'];

const TABLE_ROWS = [
  {
    id: nanoid(),
    createdAt: new Date(),
    reason: 'Manager',
    userId: '1',
    updatedAt: new Date(),
    status: 'pending',
  },
];
const tableData: Declaration[] = [
  {
    id: '1',
    reason: 'I am a student',
    createdAt: new Date(),
    updatedAt: new Date(),
    place: 'Lagos',
    status: 'pending',
    userId: '1',
  },
];
export default function DeclarationTable() {
  return (
    <Card className='h-full w-full mt-5'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8 pt-5'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Declarations
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <NewDeclarationButton />
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<HiMagnifyingGlass className='h-5 w-5' />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <table className='mt-4 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ id, createdAt, reason, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
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
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {createdAt.toDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {reason}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className='w-max'>
                      <Chip
                        className='text-blue-500'
                        variant='ghost'
                        size='sm'
                        value={status === 'pending' ? 'pending' : 'Submitted'}
                        color={status === 'pending' ? 'yellow' : 'green'}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content='Edit User'>
                      <IconButton variant='text'>
                        <HiPencil className='h-4 w-4' />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 10
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
