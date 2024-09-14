'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Step, Stepper, Typography } from '@/components/materialTailwind';
import { setFirstProfileStep, setLastProfileStep } from '@/store/slices/setupSlice/setupSlice';
import { BsPersonAdd } from 'react-icons/bs';
import { MdOutlineContactPhone, MdOutlineWorkOutline } from 'react-icons/md';

const steps = [
  {
    title: 'Personal',
    icon: <BsPersonAdd />,
  },
  {
    title: 'Employment',
    icon: <MdOutlineWorkOutline />,
  },
  {
    title: 'Contact',
    icon: <MdOutlineContactPhone />,
  },
];
export default function SetupStepper() {
  const { activeProfileStep } = useAppSelector((state) => state.setup);
  const dispatch = useAppDispatch();

  return (
    <div className='w-full px-5 py-4'>
      <Stepper
        activeStep={activeProfileStep}
        isFirstStep={(value) => dispatch(setFirstProfileStep(value))}
        isLastStep={(value) => dispatch(setLastProfileStep(value))}
        activeLineClassName='bg-blue-500'
      >
        {steps.map((step, index) => {
          return (
            <Step
              key={step.title}
              activeClassName='text-blue-500 bg-blue-100'
              completedClassName='text-blue-500 bg-blue-200'
            >
              {step.icon}
              <div className='absolute -bottom-[1.5rem] w-max text-center'>
                <Typography
                  variant='h6'
                  color={activeProfileStep === index ? 'blue' : 'gray'}

                  
                >
                  {activeProfileStep===index &&step.title}
                </Typography>
              </div>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
