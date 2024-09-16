'use client';
import { CardBody, CardHeader } from '@/components/materialTailwind';
import EmploymentForm from '../form/employment';
import SetupStepper from './setup-step';
import PersonalForm from '../form/personal';
import { MdOutlineContactPhone, MdOutlineWorkOutline } from 'react-icons/md';
import { BsPersonAdd } from 'react-icons/bs';
import ContactForm from '../form/contact';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useEffect, useState } from 'react';

export default function Setup({
  user,
  mdas,
}: {
  user: UserSetupAttributes;
  mdas: MDAAttributes[];
}) {
  const steps = [
    {
      title: 'Personal',
      content: (
        <PersonalForm personal={user.personal as PersonalSetupAttributes} />
      ),
      icon: <BsPersonAdd />,
    },
    {
      title: 'Employment',
      content: (
        <EmploymentForm
          employment={user.userEmployment as UserEmploymentSetupAttributes}
          mdas={mdas}
        />
      ),
      icon: <MdOutlineWorkOutline />,
    },
    {
      title: 'Contact',
      content: <ContactForm contact={user.contact as ContactSetupAttributes} />,
      icon: <MdOutlineContactPhone />,
    },
  ];

  const dispatch = useAppDispatch();
  const { activeProfileStep, } = useAppSelector(
    (state) => state.setup
  );
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [activeProfileStep]);


  return (
    <>
      <CardHeader className=' h-20'>
        <SetupStepper />
      </CardHeader>
      <CardBody className='overflow-hidden '>
        <div
          className={`transform relative transition-all duration-300 ease-in-out pb-10 ${
            isAnimating
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          {steps[activeProfileStep].content}
        </div>
      </CardBody>
    </>
  );
}
