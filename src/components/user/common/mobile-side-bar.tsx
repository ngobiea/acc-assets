'use client';
import { useContext } from 'react';

import Image from 'next/image';
import logo from '/public//images.jpeg';

import { HiPower } from 'react-icons/hi2';
import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '../../materialTailwind';
import { BsPersonCircle } from 'react-icons/bs';
import { MdAssignmentAdd } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import UserContext from '@/context/user-context';

export default function MobileSidebar() {
  const { isSidebarOpen,  } = useContext(UserContext);

  return (
    <Drawer open={isSidebarOpen} overlay={false} color='blue'>
      <Card
        color='transparent'
        shadow={false}
        className='h-[calc(100vh-2rem)] w-full p-4'
      >
        <div className='mb-2 flex items-center gap-4 p-4'>
          <Image src={logo} alt='brand' className='h-8 w-8' priority />
          <Typography variant='h5' color='blue-gray'>
            ACC Asset
          </Typography>
        </div>

        <List>
          <hr className='my-2 border-blue-gray-50' />
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
    </Drawer>
  );
}
