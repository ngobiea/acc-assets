import type { SetStateAction } from 'react';

export const handleRegisterBlur = ({
  event,
  setEmailTouched,
  setFirstNameTouched,
  setSurnameTouched,
  setMiddleNameTouched,
  setTitleTouch,
  setIdTouched,
  setIdTypeTouched,
  setPasswordTouched,
  setRepeatPasswordTouched,
}: {
  event: React.FocusEvent<HTMLInputElement>;
  setTitleTouch: (value: SetStateAction<boolean>) => void;
  setEmailTouched: (value: SetStateAction<boolean>) => void;
  setPasswordTouched: (value: SetStateAction<boolean>) => void;
  setIdTouched: (value: SetStateAction<boolean>) => void;
  setIdTypeTouched: (value: SetStateAction<boolean>) => void;
  setRepeatPasswordTouched: (value: SetStateAction<boolean>) => void;
  setFirstNameTouched: (value: SetStateAction<boolean>) => void;
  setSurnameTouched: (value: SetStateAction<boolean>) => void;
  setMiddleNameTouched: (value: SetStateAction<boolean>) => void;
}) => {
  const { name } = event.target;
  if (name === 'email') {
    setEmailTouched(true);
  } else if (name === 'password') {
    setPasswordTouched(true);
  } else if (name === 'title') {
    setTitleTouch(true);
  } else if (name === 'id') {
    setIdTouched(true);
  } else if (name === 'idType') {
    setIdTypeTouched(true);
  } else if (name === 'repeatPassword') {
    setRepeatPasswordTouched(true);
  } else if (name === 'firstName') {
    setFirstNameTouched(true);
  } else if (name === 'surname') {
    setSurnameTouched(true);
  } else if (name === 'middleName') {
    setMiddleNameTouched(true);
  }
};
