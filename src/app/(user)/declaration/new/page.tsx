import { Card } from '@/components/materialTailwind';

import DeclarationForm from '@/components/declaration/stepper/declaration';
import MDAService from '@/services/mda-service';
import { validateRequest } from '@/lib/verify-auth';
import { redirect } from 'next/navigation';
import routes from '@/utils/routes';
export default async function NewDeclaration() {
   const { user } = await validateRequest();
   if (!user) {
     redirect(routes.login);
   }
  const mdas = await MDAService.getMDAs();

  return (
    <main className=' w-full mt-4'>
      <Card className=' px-5 py-10'>
        <DeclarationForm />
      </Card>
    </main>
  );
}