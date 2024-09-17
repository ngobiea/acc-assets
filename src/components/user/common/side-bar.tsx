'use client';
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@/components/materialTailwind';
import logo from '/public//images.jpeg';
import Image from 'next/image';
import { BsPersonCircle } from 'react-icons/bs';
import { HiPower } from 'react-icons/hi2';
import { TbReport } from 'react-icons/tb';
import { useContext } from 'react';
import UserContext from '@/context/user-context';
import routes from '@/utils/routes';
import SideBarLink from './side-bar-link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [

  // {
  //   title: 'DECLARATION',
  //   icon: <TbReport className='h-5 w-5' />,
  //   route: routes.home,
  // },
  {
    title: 'PROFILE',
    icon: <BsPersonCircle className='h-5 w-5' />,
    route: routes.profile,
  },
];
export function Sidebar() {
  const path = usePathname();

  const { isSidebarOpen, setIsSidebarOpen } = useContext(UserContext);
        const activeStyle =
          'flex w-full h-full p-3 items-center gap-4 px-4 capitalize bg-blue-400 text-white rounded-xl shadow-md hover:shadow-lg';
        const inActiveStyle =
          'flex w-full h-full p-3 items-center gap-4 px-4 capitalize';
  return (
    <Card
      className={` ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className='mb-2 flex items-center gap-4 p-4'>
        <Image src={logo} alt='brand' className='h-16 w-16' priority />
        <div>
          <Typography variant='h3' color='gray'>
            ACC
          </Typography>
          <Typography variant='h5' color='gray'>
            Asset Declaration
          </Typography>
        </div>
      </div>

      <List>
        <hr className='my-2 border-blue-gray-50' />
        <ListItem className='p-0'>
          <Link
            href={routes.home}
            className={path === '/' || path.includes('declaration') ? activeStyle : inActiveStyle}
          >
            <ListItemPrefix>
              <TbReport className='h-5 w-5' />
            </ListItemPrefix>
            {'DECLARATION'}
          </Link>
        </ListItem>
        {sidebarItems.map(({ icon, title, route }) => {
          return (
            <SideBarLink key={title} title={title} icon={icon} href={route} />
          );
        })}
        <ListItem className=''>
          <ListItemPrefix>
            <HiPower className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
