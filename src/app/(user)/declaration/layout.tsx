import DeclarationStartForm from '@/components/declaration/form/intro';
import type { ReactNode } from 'react';

export default function DeclarationRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
