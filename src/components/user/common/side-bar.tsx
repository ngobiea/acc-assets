'use client';
import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from '@/components/materialTailwind';
import logo from '/public//images.jpeg';
import Image from 'next/image';
import { BsPersonCircle } from 'react-icons/bs';
import { HiPower } from 'react-icons/hi2';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdAssignmentAdd } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import { useContext } from 'react';
import UserContext from '@/context/user-context';

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(UserContext);

  return (
    <Card
      className={` ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className='mb-2 flex items-center gap-4 p-4'>
        <Image src={logo} alt='brand' className='h-8 w-8' />
        <Typography variant='h5' color='blue-gray'>
          ACC Asset
        </Typography>
      </div>

      <List>
        <hr className='my-2 border-blue-gray-50' />
        <ListItem>
          <ListItemPrefix>
            <LuLayoutDashboard className='h-5 w-5' />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdAssignmentAdd className='h-5 w-5' />
          </ListItemPrefix>
          New Declaration
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TbReport className='h-5 w-5' />
          </ListItemPrefix>
          Declarations
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BsPersonCircle className='h-5 w-5' />
          </ListItemPrefix>
          Profile
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <HiPower className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
