import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { Sidebar } from '@/components/user/common/side-bar';

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }
  return (
    <main className='bg-blue-gray-50/50'>
      <Sidebar />
    </main>
  );
}
