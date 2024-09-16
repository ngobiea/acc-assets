
import DeclarationTable from '@/components/declaration/declaration-table';
import { validateRequest } from '@/lib/verify-auth';
import DeclarationService from '@/services/declaration-service';
import routes from '@/utils/routes';
import { redirect } from 'next/navigation';

export async function Declaration () {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }
  const declarations = await DeclarationService.getDeclarations(user.id);
  
  return (
    <main className=''>
      <DeclarationTable declarations={declarations} />
    </main>
  );
};

export default Declaration;
