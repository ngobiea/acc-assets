'use client';
import { useContext } from 'react';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { HiBuildingLibrary, HiUser } from 'react-icons/hi2';
import { MdOutlineContactPhone, MdOutlineWorkOutline, MdWork } from 'react-icons/md';
import UserContext from '@/context/user-context';
import { BsPersonAdd } from 'react-icons/bs';
import ContactForm from '../form/contact';
import EmploymentForm from '../form/employment';
import PersonalForm from '../form/personal';

const steps = [
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
export default function ProfileStepper() {
  const {
    isFirstProfileStep,
    isLastProfileStep,
    activeProfileStep,
    setIsFirstProfileStep,
    setIsLastProfileStep,
    setActiveProfileStep,
  } = useContext(UserContext);

  console.log('activeProfileStep', activeProfileStep);

  return (
    <div className='w-full px-24 py-4'>
      <Stepper
        activeStep={activeProfileStep}
        isLastStep={(value) => setIsLastProfileStep(value)}
        isFirstStep={(value) => setIsFirstProfileStep(value)}
      >
        {steps.map((step, index) => {
          return (
            <Step key={step.title} onClick={() => setActiveProfileStep(index)}>
       
              {step.icon}
              <div className='absolute -bottom-[1.5rem] w-max text-center'>
                <Typography
                  variant='h6'
                  color={activeProfileStep === index ? 'blue-gray' : 'gray'}
                >
                  {step.title}
                </Typography>
              </div>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
