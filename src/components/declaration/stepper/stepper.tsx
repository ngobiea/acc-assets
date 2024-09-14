// 'use client';
// import { Button, Step, Stepper, Typography } from '../../materialTailwind';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';

// import { declarationSteps } from './declaration';
// import DeclarationPersonalForm from '../form/personal';
// export default function DeclarationStepper() {
//   const dispatch = useAppDispatch();
//   const {
    
//   } = useAppSelector((state) => state.declaration);

//   return (
//     <div className='w-full px-5 py-4'>
//       <Stepper
//         activeStep={activeDeclarationStep}
//         isLastStep={(value) => dispatch(setLastDeclarationStep(value))}
//         isFirstStep={(value) => dispatch(setFirstDeclarationStep(value))}
//         activeLineClassName='bg-blue-500'
//       >
//         {declarationSteps.map((step, index) => {
//           return (
//             <Step
//               key={step.title}
//               activeClassName='text-blue-500 bg-blue-100'
//               completedClassName='text-blue-500 bg-blue-200'
//             >
//               {step.icon}
//               <div className='absolute -bottom-[1.5rem] w-max text-center'>
//                 <Typography
//                   variant='h6'
//                   color={activeDeclarationStep === index ? 'blue-gray' : 'gray'}
//                 >
//                   {activeDeclarationStep === index && step.title}
//                 </Typography>
//               </div>
//             </Step>
//           );
//         })}
//       </Stepper>
//       <DeclarationPersonalForm />
//       <div className='mt-32 flex justify-between'>
//         <Button
//           onClick={() => dispatch(setPrevDeclarationStep())}
//           disabled={isFirstDeclarationStep}
//         >
//           Prev
//         </Button>
//         <Button
//           onClick={() => dispatch(setNextDeclarationStep())}
//           disabled={isLastDeclarationStep}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
