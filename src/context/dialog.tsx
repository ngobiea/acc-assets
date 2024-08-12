// 'use client';
import { createContext, useState } from 'react';

export type DialogContextType = {
  openIdType: boolean;
  handleOpenIdType: () => void;
  notification: {
    message: string;
    state: 'success' | 'error' | 'warning' | 'info';
  };
  handleNotification: ({
    message,
    state,
  }: {
    message: string;
    state: 'success' | 'error' | 'warning' | 'info';
  }) => void;
};
export type DialogProviderProps = {
  children: React.ReactNode;
};

const DialogContext = createContext<DialogContextType>({
  openIdType: false,
  handleOpenIdType: () => {},
  notification: {
    message: '',
    state: 'success',
  },
  handleNotification: ({
    message,
    state,
  }: {
    message: string;
    state: 'success' | 'error' | 'warning' | 'info';
  }) => {},
});

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [openIdType, setOpenIdType] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    state: 'success' | 'error' | 'warning' | 'info';
  }>({
    message: '',
    state: 'success',
  });

  const handleNotification = ({
    message,
    state,
  }: {
    message: string;
    state: 'success' | 'error' | 'warning' | 'info';
  }) => setNotification({ message, state });

  const handleOpenIdType = () => setOpenIdType(!openIdType);

  const ValueToShare = {
    openIdType,
    handleOpenIdType,
    notification,
    handleNotification,
  };
  return (
    <DialogContext.Provider value={ValueToShare}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;
