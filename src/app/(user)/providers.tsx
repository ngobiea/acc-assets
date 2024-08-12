'use client';

import { UserProvider } from '@/context/user-context';
import type { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}

export default function UserProviders({ children }: Readonly<ProviderProps>) {
  return (
      <UserProvider>
        {children}
    </UserProvider>
  );
}
