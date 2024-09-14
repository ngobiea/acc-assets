'use client';

// import { SetupProvider } from '@/context/setup-context';
import type { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}

export default function UserProviders({ children }: Readonly<ProviderProps>) {
  return { children };
}
