'use client';

import { useEffect, useState } from 'react';
import PersonalForm from '../form/personal/personal';
import { useAppSelector } from '@/store/hooks';
import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { MdWarning } from 'react-icons/md';
import CurrentEmploymentAccordion from '../employment/current-employment';
import PastEmploymentAccordion from '../pastEmployment/past-employment';
import FamilyAccordion from '../family/family';
import ImmovableAccordion from '../form/immovable/immovable';
import ContactAccordion from '../form/contact/contact';
import LiabilityAccordion from '../form/liability/liabilities';
import MovableAccordion from '../form/movable/movable';
import OtherAccordion from '../form/other-asset/other';
import SecurityAccordion from '../form/security/securities';
import type { DeclarationData } from '@/utils/declaration';
import { DPersonal, DContact } from '@prisma/client';
import CashDepositAccordion from '../cash-deposit/cash-deposits';

export default function DeclarationForm({
  declaration,
}: {
  declaration: DeclarationData;
}) {
  const declarationSteps = [
    {
      title: 'Personal',
      content: (
        <Card className=' my-5 '>
          {<PersonalForm personal={declaration?.personal as DPersonal} />}
        </Card>
      ),
    },
    {
      title: 'Current Employment',
      content: (
        <Card className='my-5 '>
          {
            <CurrentEmploymentAccordion
              reason={declaration.reason}
              employments={declaration.employments}
            />
          }
        </Card>
      ),
    },
    {
      title: 'Past Employment',
      content: (
        <Card className='my-5 '>
          {
            <PastEmploymentAccordion
              pastEmployments={declaration.pastEmployments}
            />
          }
        </Card>
      ),
      // icon: <MdWorkHistory />,
    },

    {
      title: 'Contact Details',
      content: (
        <Card className='my-5 '>
          {<ContactAccordion contact={declaration.contact as DContact} />}
        </Card>
      ),
      // icon: <MdOutlineContactPhone />,
    },

    {
      title: 'Family Details',
      content: <Card className='my-5 '>{<FamilyAccordion
      families={declaration.families}
      />}</Card>,
      // icon: <MdFamilyRestroom />,
    },
    {
      title: 'Cash and Deposit',
      content: <Card className='my-5 '>{<CashDepositAccordion
        cashAtHand={declaration.cashAtHand}
        cashDeposits={declaration.cashDeposits}
      />}</Card>,
      // icon: <BsCashCoin />,
    },
    {
      title: 'Immovable Assets',
      content: <Card className='my-5 '>{<ImmovableAccordion />}</Card>,
      // icon: <PiBuildingApartmentDuotone />,
    },
    {
      title: 'Movable Assets',
      content: <Card className='my-5 '>{<MovableAccordion />}</Card>,
      // icon: <PiCarProfileBold />,
    },
    {
      title: 'Securities',
      content: <Card className='my-5 '>{<SecurityAccordion />}</Card>,
      // icon: <MdOutlineSecurity />,
    },
    {
      title: 'Other Assets',
      content: <Card className='my-5 '>{<OtherAccordion />}</Card>,
      // icon: <MdOutlineDevicesOther />,
    },
    {
      title: 'Liabilities',
      content: <Card className='my-5 '>{<LiabilityAccordion />}</Card>,
      // icon: <GiTakeMyMoney />,
    },
    // {
    //   title: 'Preview',
    //   content: <MdStart />,
    //   icon: <MdPreview />,
    // },
    // {
    //   title: 'Declaration',
    //   content: <MdStart />,
    //   icon: <BiDetail />,
    // },
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
