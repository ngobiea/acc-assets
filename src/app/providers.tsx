'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { DialogProvider } from '@/context/dialog';
import type { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: Readonly<ProviderProps>) {
  return (
    <DialogProvider>
      <ThemeProvider>{children}</ThemeProvider>;
    </DialogProvider>
  );
}
