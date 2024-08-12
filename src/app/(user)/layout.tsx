import UserNavbar from '@/components/user/common/nav-bar';
import UserProviders from './providers';
import { Sidebar } from '@/components/user/common/side-bar';
import MobileSidebar from '@/components/user/common/mobile-side-bar';

export default async function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UserProviders>
      <div className=' bg-blue-gray-50/50 min-h-screen'>
              <Sidebar />
              {/* <MobileSidebar /> */}
        <div className='p-4 xl:ml-80'>
          <UserNavbar />
          {children}
        </div>
      </div>
    </UserProviders>
  );
}
