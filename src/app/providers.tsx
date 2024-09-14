'use client';

import { ThemeProvider } from '@material-tailwind/react';
import type { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: Readonly<ProviderProps>) {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}
