import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
import { Sidebar } from '@/components/user/common/side-bar';
import DeclarationTable from '@/components/declaration/declaration-table';
import UserService from '@/services/user-service';
import DeclarationService from '@/services/declaration-service';
import DeclarationStartForm from '@/components/declaration/form/intro';

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
  const declarations = await DeclarationService.getDeclarations(user.id);

  return (
    <>
      <DeclarationStartForm isAnyLastDeclaration={declarations.length > 0} />
      <main className=''>
        <Sidebar />
        <DeclarationTable declarations={declarations} />
      </main>
    </>
  );
}
