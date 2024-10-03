import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { Card } from '@/components/materialTailwind';
import React from 'react';

/*
  <div className=' max-w-2xl w-full bg-white rounded-xl shadow-lg space-y-6 transform transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:animate-bounce'>
          <div className='p-8 rounded-2xl bg-white shadow'>{children}</div>
        </div>
*/
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <div className=' bg-blue-gray-50 font-[sans-serif] pt-20'>
        <div className=' flex flex-col items-center justify-center py-6 px-4'>
          <Card className='max-w-2xl w-full bg-white transform shadow-2xl transition duration-300 ease-in-out hover:scale-105'>
            {children}
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
