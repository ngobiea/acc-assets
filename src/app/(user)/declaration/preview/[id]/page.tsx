import DeclarationService from '@/services/declaration-service';
import { validateRequest } from '@/lib/verify-auth';
import { notFound, redirect } from 'next/navigation';
import routes from '@/utils/routes';
import PersonalPreview from '@/components/declaration/preview/table/personal-table';
import EmploymentPreview from '@/components/declaration/preview/employment-preview';
import PastEmploymentPreview from '@/components/declaration/preview/past-employment-preview';
import ContactPreview from '@/components/declaration/preview/table/contact-preview';
import FamilyPreview from '@/components/declaration/preview/family-preview';
import CashAtHandPreviewGridTable from '@/components/declaration/preview/table/cash-at-hand';
import ImmovablePreview from '@/components/declaration/preview/immovable-preview';
import MovablePreview from '@/components/declaration/preview/movable-preview';
import SecurityPreview from '@/components/declaration/preview/security-preview';
import OtherPreview from '@/components/declaration/preview/other-preview';
import LiabilityPreview from '@/components/declaration/preview/liability-preview';
import DeclarationPreviewGridTable from '@/components/declaration/preview/table/declaration-table';

import React from 'react';
import CashDepositPreview from '@/components/declaration/preview/cash-deposit-preview';
interface NewDeclarationProps {
  params: {
    id: string;
  };
}
export default async function PreviewDeclaration({
  params,
}: NewDeclarationProps) {
  const { user } = await validateRequest();
  if (!user) {
    redirect(routes.login);
  }

  const declaration = await DeclarationService.getDeclaration(params.id);
  if (!declaration) {
    notFound();
  }

  return (
      <section className='w-full mt-4'>
        <DeclarationPreviewGridTable declaration={declaration} />
      <PersonalPreview personal={declaration?.personal} />
      <ContactPreview contact={declaration?.contact} email={user.email} />
      <EmploymentPreview
        employments={declaration?.employments}
        reason={declaration.reason}
      />
      <PastEmploymentPreview pastEmployments={declaration?.pastEmployments} />
      <FamilyPreview families={declaration?.families} />
      <CashAtHandPreviewGridTable cashAtHand={declaration?.cashAtHand} />
      <CashDepositPreview cashDeposits={declaration?.cashDeposits} />
      <ImmovablePreview immovableAssets={declaration?.immovableAssets} />
      <MovablePreview movableAssets={declaration?.movableAssets} />
      <SecurityPreview securities={declaration?.securities} />
      <OtherPreview otherAssets={declaration?.otherAssets} />
      <LiabilityPreview liabilities={declaration?.liabilities} />
    </section>
  );
}
