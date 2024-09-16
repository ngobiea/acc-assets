import UserNavbar from '@/components/user/common/nav-bar';
import { Sidebar } from '@/components/user/common/side-bar';
import type { ReactNode } from 'react';
// import MobileSidebar from '@/components/user/common/mobile-side-bar';

export default async function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className=' bg-blue-gray-50/50 min-h-screen'>

      <Sidebar />
      {/* <MobileSidebar /> */}
      <section className='p-4 xl:ml-80'>
        <UserNavbar />
        {children}
      </section>
    </main>
  );
}
