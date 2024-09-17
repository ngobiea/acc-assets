'use client';

import { useEffect, useState } from 'react';
import PersonalForm from '../form/personal/personal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CashDepositAccordion from '../form/cash-deposit/cash-deposits';
import { Card, CardBody, Typography } from '@/components/materialTailwind';
import { MdWarning } from 'react-icons/md';
import CurrentEmploymentAccordion from '../form/current-employment/current-employment';
import PastEmploymentAccordion from '../form/past-employment/past-employment';
import FamilyAccordion from '../form/family/family';
import ImmovableAccordion from '../form/immovable/immovable';
import ContactAccordion from '../form/contact/contact';
import LiabilityAccordion from '../form/liability/liabilities';
import MovableAccordion from '../form/movable/movable';
import OtherAccordion from '../form/other-asset/other';
import SecurityAccordion from '../form/security/securities';
import type { DeclarationData } from '@/utils/declaration';
import { DPersonal, DContact } from '@prisma/client';
import { setActiveProfileStep } from '@/store/slices/setupSlice/setupSlice';

export const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function DeclarationForm({
  declaration,
  mdas,
}: {
  declaration: DeclarationData;
  mdas: MDAAttributes[];
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
              mdas={mdas}
              employments={declaration.employments}
            />
          }
        </Card>
      ),
    },
    {
      title: 'Past Employment',
      content: <Card className='my-5 '>{<PastEmploymentAccordion />}</Card>,
      // icon: <MdWorkHistory />,
    },

    {
      title: 'Contact Details',
      content: <Card className='my-5 '>{<ContactAccordion
      contact={declaration.contact as DContact}
      />}</Card>,
      // icon: <MdOutlineContactPhone />,
    },

    {
      title: 'Family Details',
      content: <Card className='my-5 '>{<FamilyAccordion />}</Card>,
      // icon: <MdFamilyRestroom />,
    },
    {
      title: 'Cash and Deposit',
      content: <Card className='my-5 '>{<CashDepositAccordion />}</Card>,
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
  const dispatch = useAppDispatch();
  const { activeDeclarationStep } = useAppSelector(
    (state) => state.declaration
  );
  useEffect(() => {
    dispatch(setActiveProfileStep(0));
  }, [dispatch]);
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
