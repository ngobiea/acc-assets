import { HiMagnifyingGlass } from 'react-icons/hi2';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from '../materialTailwind';
import { Declaration } from '@prisma/client';
import NewDeclarationButton from './buttons/new-declaration';
import routes from '@/utils/routes';
import Link from 'next/link';
import DeclarationGridTable from './declaration-gridTable';
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
    label: 'Declared',
    value: 'declared',
  },
];

export default function DeclarationTable({
  declarations,
}: {
  declarations: Declaration[];
}) {
  return (
    <Card className='h-full w-full mt-5 border border-blue-500'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8 pt-5'>
          <div>
            <Typography variant='h3' color='blue-gray' className='text-lg'>
              Declarations
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <NewDeclarationButton />
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader className=''>
              {TABS.map(({ label, value }) => (
                <Link
                  className='w-full'
                  key={value}
                  href={
                    value === 'all'
                      ? routes.home
                      : routes.home + `?tab=${value}`
                  }
                >
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                </Link>
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
      <CardBody className=' px-0 pb-0'>
        {declarations?.length === 0 && (
          <div className='p-4 text-center text-blue-gray-400 border-t border-blue-500'>
            No data available
          </div>
        )}
        {declarations.map((declaration) => (
          <DeclarationGridTable
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-500 p-4'>
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
