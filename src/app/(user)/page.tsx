import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { Sidebar } from '@/components/user/common/side-bar';
import DeclarationTable from '@/components/declaration/declaration-table';
import UserService from '@/services/user-service';
 

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }
  const profile = await UserService.getUserSetup(user.id);
  if (
    !profile ||
    !profile.personal ||
    !profile.userEmployment ||
    !profile.contact
  ) {
    redirect(routes.setup);
  }

  return (
    <main className=''>
      <Sidebar />
      <DeclarationTable />
    </main>
  );
}
