import { LetterHeader } from '@/components/letter-header/letter-header';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <LetterHeader letter='all' />
      {children}
    </>
  )
}