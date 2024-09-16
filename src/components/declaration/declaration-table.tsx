import { HiPencil } from 'react-icons/hi';
import { nanoid } from '@/utils/declarations/id-generator';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdOutlinePreview } from 'react-icons/md';
import { GrCopy } from 'react-icons/gr';
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
import Link from 'next/link';
import routes from '@/utils/routes';
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


export default function DeclarationTable({ declarations }: { declarations: Declaration[]; }) {
 
  return (
    <Card className='h-full w-full mt-5'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8 pt-5'>
          <div>
            <Typography variant='h6' color='blue-gray'>
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
            {declarations?.length === 0 && (
              <tr>
                <td
                  colSpan={TABLE_HEAD.length}
                  className='p-4 text-center text-blue-gray-400'
                >
                  No data available
                </td>
              </tr>
            )}
            {declarations.map(({ id, createdAt, reason, status }, index) => {
              const isLast = index === declarations.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={id} className='even:bg-blue-gray-50'>
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
                        value={status}
                        color={status === 'PENDING' ? 'yellow' : 'green'}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <div>
                      <Tooltip
                        content='View Declaration'
                        className='bg-blue-500'
                      >
                        <Link href={routes.declarationId(id)}>
                          <IconButton variant='text' color='blue'>
                            <MdOutlinePreview className='h-4 w-4' />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip
                        content='Copy as New Declaration'
                        className='bg-blue-500'
                      >
                        <IconButton variant='text' color='blue'>
                          <GrCopy className='h-4 w-4' />
                        </IconButton>
                      </Tooltip>
                    </div>
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
