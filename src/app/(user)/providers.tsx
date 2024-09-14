'use client';

import type { ReactNode } from 'react';
interface ProviderProps {
  children: ReactNode;
}

export default function UserProviders({ children }: Readonly<ProviderProps>) {
  return { children };
}
