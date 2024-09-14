'use client';

import React, { useState, useEffect } from 'react';

import {
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/materialTailwind';
import PersonalForm from '@/components/setup/form/personal';
import ContactForm from '@/components/setup/form/contact';
import EmploymentForm from '@/components/setup/form/employment';
import SetupStepper from '@/components/setup/stepper/setup-step';
import SetupStepButton from '@/components/setup/stepper/setup-step-button';
import { BsPersonAdd } from 'react-icons/bs';
import { MdOutlineWorkOutline, MdOutlineContactPhone } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
export const steps = [
  {
    title: 'Personal',
    content: <PersonalForm />,
    icon: <BsPersonAdd />,
  },
  {
    title: 'Employment',
    content: <EmploymentForm />,
    icon: <MdOutlineWorkOutline />,
  },
  {
    title: 'Contact',
    content: <ContactForm />,
    icon: <MdOutlineContactPhone />,
  },
];

export default function Setup() {
  const { activeProfileStep } = useAppSelector((state) => state.setup);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [activeProfileStep]);
  return (
    <>
      <CardHeader className='h-20'>
        <SetupStepper />
      </CardHeader>
      <CardBody className='overflow-hidden'>
        <div
          className={`transform transition-all duration-300 ease-in-out ${
            isAnimating
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          {steps[activeProfileStep].content}
        </div>
      </CardBody>
      <CardFooter>
        <SetupStepButton />
      </CardFooter>
    </>
  );
}
