'use client';

import { useEffect } from 'react';
import PersonalForm from '../form/personal/personal';
import { useAppDispatch } from '@/store/hooks';
import CashDepositAccordion from '../form/cash-deposit/cash-deposits';
import {
  Card,
  CardBody,
  Typography,
} from '@/components/materialTailwind';
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
export const declarationSteps = [
  {
    title: 'Personal',
    content: <Card className=' my-5 '>{<PersonalForm />}</Card>,
    // icon: <MdPersonAddAlt />,
  },
  {
    title: 'Current Employment',
    content: <Card className='mb-5 '>{<CurrentEmploymentAccordion />}</Card>,
    // icon: <MdWorkHistory />,
  },
  {
    title: 'Past Employment',
    content: <Card className='mb-5 '>{<PastEmploymentAccordion />}</Card>,
    // icon: <MdWorkHistory />,
  },

  {
    title: 'Contact Details',
    content: <Card className='mb-5 '>{<ContactAccordion />}</Card>,
    // icon: <MdOutlineContactPhone />,
  },

  {
    title: 'Family Details',
    content: <Card className='mb-5 '>{<FamilyAccordion />}</Card>,
    // icon: <MdFamilyRestroom />,
  },
  {
    title: 'Cash and Deposit',
    content: <Card className='mb-5 '>{<CashDepositAccordion />}</Card>,
    // icon: <BsCashCoin />,
  },
  {
    title: 'Immovable Assets',
    content: <Card className='mb-5 '>{<ImmovableAccordion />}</Card>,
    // icon: <PiBuildingApartmentDuotone />,
  },
  {
    title: 'Movable Assets',
    content: <Card className='mb-5 '>{<MovableAccordion />}</Card>,
    // icon: <PiCarProfileBold />,
  },
  {
    title: 'Securities',
    content: <Card className='mb-5 '>{<SecurityAccordion />}</Card>,
    // icon: <MdOutlineSecurity />,
  },
  {
    title: 'Other Assets',
    content: <Card className='mb-5 '>{<OtherAccordion />}</Card>,
    // icon: <MdOutlineDevicesOther />,
  },
  {
    title: 'Liabilities',
    content: <Card className='mb-5 '>{<LiabilityAccordion />}</Card>,
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

export const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export default function DeclarationForm() {
  const dispatch = useAppDispatch();
  useEffect(() => {
  }, [dispatch]);
  return (
    <>
      <Card className='my-6 w-full bg-blue-50'>
        <CardBody>
          <div className='flex justify-center w-full'>
            <MdWarning className='text-3xl text-orange-500' />
          </div>
          <Typography color='gray'>
            Fields marked with * in the application form are mandatory,
            remaining fields are non-mandatory and can be left unfilled.
            However, providing information in these fields will help in the
            decision process of your declaration.
          </Typography>
        </CardBody>
      </Card>
      {declarationSteps.map(({ content, title }, index) => {
        return <div key={title}>{content}</div>;
      })}
    </>
  );
}
