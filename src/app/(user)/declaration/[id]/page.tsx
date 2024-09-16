import { Card } from '@/components/materialTailwind';

import DeclarationForm from '@/components/declaration/stepper/declaration';
import MDAService from '@/services/mda-service';
import DeclarationService from '@/services/declaration-service';
import { validateRequest } from '@/lib/verify-auth';
import { notFound, redirect } from 'next/navigation';
import routes from '@/utils/routes';
import type { DeclarationData } from '@/utils/declaration';
interface NewDeclarationProps {
  params: {
    id: string;
  };
}
export default async function NewDeclaration({ params }: NewDeclarationProps) {
   const { user } = await validateRequest();
   if (!user) {
     redirect(routes.login);
  }
 
  const mdas = await MDAService.getMDAs();
  const declaration = await DeclarationService.getDeclaration(params.id);
  if (!declaration) {
    notFound();
  }
  console.log(declaration);



  return (
    <main className=' w-full mt-4'>
      <Card className=' px-5 py-10'>
        <DeclarationForm
          mdas={mdas}
          declaration={declaration}
        />
      </Card>
    </main>
  );
}