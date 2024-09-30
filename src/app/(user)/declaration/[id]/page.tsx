import { Card } from '@/components/materialTailwind';

import DeclarationForm from '@/components/declaration/stepper/declaration';
import MDAService from '@/services/mda-service';
import DeclarationService from '@/services/declaration-service';
import { validateRequest } from '@/lib/verify-auth';
import { notFound, redirect } from 'next/navigation';
import routes from '@/utils/routes';
import EmploymentForm from '@/components/declaration/employment/form';
import PastEmploymentForm from '@/components/declaration/pastEmployment/form-past-employment';
import FamilyForm from '@/components/declaration/family/form-family';
import CashAtHandForm from '@/components/declaration/cash-at-hand/form';
import CashDepositForm from '@/components/declaration/cash-deposit/form';
import ImmovableAssetsForm from '@/components/declaration/immovable/form';
import MovableAssetsForm from '@/components/declaration/movable/form';
import SecurityForm from '@/components/declaration/security/form';
import OtherAssetsForm from '@/components/declaration/other-asset/form';
import LiabilityForm from '@/components/declaration/liability/form';
import React from 'react';
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
      <PastEmploymentForm declarationId={params.id} />
      <FamilyForm declarationId={params.id} />
      <CashAtHandForm declarationId={params.id} />
      <CashDepositForm declarationId={params.id} />
      <ImmovableAssetsForm declarationId={params.id} />
      <MovableAssetsForm declarationId={params.id} />
      <SecurityForm declarationId={params.id} />
      <OtherAssetsForm declarationId={params.id} />
      <LiabilityForm declarationId={params.id} />
      <section className=' w-full mt-4'>
        <Card className=' px-5 '>
          <DeclarationForm declaration={declaration} />
        </Card>
      </section>
    </>
  );
}
