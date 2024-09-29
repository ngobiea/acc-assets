'use client';

import { useEffect, useState } from 'react';
import PersonalForm from '../personal/personal';
import { useAppSelector } from '@/store/hooks';
import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { MdWarning } from 'react-icons/md';
import CurrentEmploymentAccordion from '../employment/current-employment';
import PastEmploymentAccordion from '../pastEmployment/past-employment';
import FamilyAccordion from '../family/family';
import ImmovableAccordion from '../immovable/immovable';
import ContactAccordion from '../contact/contact';
import LiabilityAccordion from '../liability/liabilities';
import MovableAccordion from '../movable/movable';
import OtherAccordion from '../other-asset/other';
import SecurityAccordion from '../security/securities';
import type { DeclarationData } from '@/utils/declaration';
import { DPersonal, DContact } from '@prisma/client';
import CashDepositAccordion from '../cash-deposit/cash-deposits';
import Preview from '../preview/preview';
import React from 'react';
export default function DeclarationForm({
  declaration,
}: {
  declaration: DeclarationData;
}) {
  const declarationSteps = [
    {
      title: 'Personal',
      content: <PersonalForm personal={declaration?.personal as DPersonal} />,
    },
    {
      title: 'Current Employment',
      content: (
        <CurrentEmploymentAccordion
          reason={declaration.reason}
          employments={declaration.employments}
        />
      ),
    },
    {
      title: 'Past Employment',
      content: (
        <PastEmploymentAccordion
          pastEmployments={declaration.pastEmployments}
        />
      ),
    },
    {
      title: 'Contact Details',
      content: <ContactAccordion contact={declaration.contact as DContact} />,
    },
    {
      title: 'Family Details',
      content: <FamilyAccordion families={declaration.families} />,
    },
    {
      title: 'Cash and Deposit',
      content: (
        <CashDepositAccordion
          cashAtHand={declaration.cashAtHand}
          cashDeposits={declaration.cashDeposits}
        />
      ),
    },
    {
      title: 'Immovable Assets',
      content: (
        <ImmovableAccordion immovableAssets={declaration.immovableAssets} />
      ),
    },
    {
      title: 'Movable Assets',
      content: <MovableAccordion movableAssets={declaration.movableAssets} />,
    },
    {
      title: 'Securities',
      content: <SecurityAccordion securities={declaration.securities} />,
    },
    {
      title: 'Other Assets',
      content: <OtherAccordion otherAssets={declaration.otherAssets} />,
    },
    {
      title: 'Liabilities',
      content: <LiabilityAccordion liabilities={declaration.liabilities} />,
    },
    {
      title: 'Preview',
      content: <Preview declaration={declaration} />,
    },
  ];
  const { activeDeclarationStep } = useAppSelector(
    (state) => state.declaration
  );

  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [activeDeclarationStep]);

  return (
    <>
      <Card className='w-full bg-blue-50 mt-3'>
        <CardBody>
          <div className='flex justify-center w-full'>
            <MdWarning className='text-3xl text-orange-500' />
          </div>
          <Typography color='gray'>
            Fields marked with * in the application form are mandatory,
            remaining fields are non-mandatory and can be left unfilled.
          </Typography>
        </CardBody>
      </Card>
      <div className='overflow-hidden'>
        <div
          className={`transform relative transition-all duration-300 ease-in-out pb-10 ${
            isAnimating
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          {declarationSteps[activeDeclarationStep].content}
        </div>
      </div>
    </>
  );
}
