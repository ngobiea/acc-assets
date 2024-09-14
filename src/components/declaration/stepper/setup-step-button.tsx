'use client';
import { Button } from '@/components/materialTailwind';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveProfileStep } from '@/store/slices/setupSlice/setupSlice';
export default function SetupStepButton() {
  const dispatch = useAppDispatch()
  const {activeProfileStep,isFirstProfileStep,isLastProfileStep}= useAppSelector(state=>state.setup)

  const handlePrev = () =>!isFirstProfileStep && dispatch(setActiveProfileStep(activeProfileStep-1));
  const handleNext = () =>
    !isLastProfileStep && dispatch(setActiveProfileStep(activeProfileStep + 1));
  return (
    <div className='flex justify-between'>
      <Button
        color='blue'
        onClick={handlePrev}
        disabled={isFirstProfileStep}
      >
        Prev
      </Button>
      <Button
        type='submit'
        color='blue'
        // onClick={handleNext}
        // disabled={isLastProfileStep}
      >
        Next
      </Button>
    </div>
  );
}
