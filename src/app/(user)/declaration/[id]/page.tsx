import { Card } from '@/components/materialTailwind';

import DeclarationForm from '@/components/declaration/stepper/declaration';
import MDAService from '@/services/mda-service';
import DeclarationService from '@/services/declaration-service';
import { validateRequest } from '@/lib/verify-auth';
import { notFound, redirect } from 'next/navigation';
import routes from '@/utils/routes';
import type { DeclarationData } from '@/utils/declaration';
import EmploymentForm from '@/components/declaration/employment/form';
import PastEmploymentForm from '@/components/declaration/pastEmployment/form-past-employment';
export const dynamic = 'force-dynamic';
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
  

 
  return (
    <>
      <EmploymentForm
        declarationId={params.id}
        mdas={mdas}
        reason={declaration.reason}
      />
      <PastEmploymentForm />
      <main className=' w-full mt-4'>
        <Card className=' px-5 '>
          <DeclarationForm  declaration={declaration} />
        </Card>
      </main>
      
    </>
  );
}