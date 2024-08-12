'use client'
import { Button } from '@/components/materialTailwind';
import UserContext from '@/context/user-context';
import { useContext } from 'react';

export default function ProfileStepButton() {
  const { isFirstProfileStep, isLastProfileStep, setActiveProfileStep } =
    useContext(UserContext);

  const handleNext = () =>
    !isLastProfileStep && setActiveProfileStep((cur) => cur + 1);
  const handlePrev = () =>
    !isFirstProfileStep && setActiveProfileStep((cur) => cur - 1);
  return (
    <div className='mt-32 flex justify-between'>
      <Button onClick={handlePrev} disabled={isFirstProfileStep}>
        Prev
      </Button>
      <Button onClick={handleNext} disabled={isLastProfileStep}>
        Next
      </Button>
    </div>
  );
}
