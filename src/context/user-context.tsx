'use client';
import {
  createContext,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { initialState, reducer } from '@/store/profile';
// type profileStep = 'Personal' | 'Employment' | 'Contact';
export type UserContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isLastProfileStep: boolean;
  setIsLastProfileStep: (value: boolean) => void;
  isFirstProfileStep: boolean;
  setIsFirstProfileStep: (value: boolean) => void;
  activeProfileStep: number;
  setActiveProfileStep: (value: SetStateAction<number>) => void;
  state: UserProfileState;
  dispatch: Dispatch<UserProfileAction>;
};

export type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType >({
  isSidebarOpen: false,
  setIsSidebarOpen: (value: boolean) => {},
  isLastProfileStep: false,
  setIsLastProfileStep: (value: boolean) => {},
  isFirstProfileStep: false,
  setIsFirstProfileStep: (value: boolean) => {},
  activeProfileStep: 0,
  setActiveProfileStep: (value: SetStateAction<number>) => {},
  state: initialState,
  dispatch: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLastProfileStep, setIsLastProfileStep] = useState<boolean>(false);
  const [isFirstProfileStep, setIsFirstProfileStep] = useState<boolean>(false);
  const [activeProfileStep, setActiveProfileStep] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const ValueToShare = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLastProfileStep,
    setIsLastProfileStep,
    isFirstProfileStep,
    setIsFirstProfileStep,
    activeProfileStep,
    setActiveProfileStep,
    state,
    dispatch,
  };
  return (
    <UserContext.Provider value={ValueToShare}>{children}</UserContext.Provider>
  );
};

export default UserContext;
