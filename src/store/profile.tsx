import PersonalForm from '@/components/user/form/personal';
import ContactForm from '@/components/user/form/contact';
import EmploymentForm from '@/components/user/form/employment';
import { BsPersonAdd } from 'react-icons/bs';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { MdOutlineContactPhone } from 'react-icons/md';

export const initialState: UserProfileState = {
  steps: [
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
  ],
  isLastProfileStep: false,
  activeProfileStep: 0,
  isFirstProfileStep: false,
};

export const reducer = (
  state: UserProfileState,
  action: UserProfileAction
): UserProfileState => {
  if (action.type === 'setIsFirstProfileStep') {
    return { ...state, isFirstProfileStep: action.payload };
  } else if (action.type === 'setIsLastProfileStep') {
    return { ...state, isLastProfileStep: action.payload };
  } else if (action.type === 'setActiveProfileStep') {
    return { ...state, activeProfileStep: action.payload };
  } else {
    return { ...state };
  }
};
