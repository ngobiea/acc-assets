'use client';
import {
  Button,
  IconButton,
  Navbar,
  Typography,
} from '@/components/materialTailwind';
import UserContext from '@/context/user-context';
import { useContext } from 'react';
import { MdArrowBack } from 'react-icons/md';
export default function UserNavbar() {
  //   const windowSize = useWindowSize();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(UserContext);
  //   useEffect(() => {
  //     if (windowSize.width && windowSize.width < 1024) {
  //       setIsSidebarOpen(true);
  //     }
  //   }, [windowSize]);

  // useEffect(() => {

  //   }, []);

  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='#' className='flex items-center'>
          Pages
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='#' className='flex items-center'>
          Account
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='#' className='flex items-center'>
          Blocks
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <a href='#' className='flex items-center'>
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <div>
          <IconButton className='' color='blue'>
            <MdArrowBack className=' w-10 h-10' />
          </IconButton>
        </div>
        <div className='flex items-center gap-4'>
          <div className='mr-4 hidden lg:block'>{navList}</div>
          <div className='flex items-center gap-x-1'>
            <Button
              variant='text'
              size='sm'
              className='hidden lg:inline-block'
              color='blue'
            >
              <span>Log In</span>
            </Button>
            <Button
              color='blue'
              variant='gradient'
              size='sm'
              className='hidden lg:inline-block'
            >
              <span>Sign in</span>
            </Button>
          </div>
          <IconButton
            color='blue'
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden'
            ripple={false}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
/**
 *
 */
