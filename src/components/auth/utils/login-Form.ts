import type { SetStateAction } from 'react';


 export const handleBlur = (
   event: React.FocusEvent<HTMLInputElement>,
   setEmailTouched: (value: SetStateAction<boolean>) => void,
   setPasswordTouched: (value: SetStateAction<boolean>) => void
 ) => {
   const { name } = event.target;
   if (name === 'email') {
     setEmailTouched(true);
   } else if (name === 'password') {
     setPasswordTouched(true);
   }
 };
