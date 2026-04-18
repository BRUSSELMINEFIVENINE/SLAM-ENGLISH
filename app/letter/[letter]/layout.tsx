import { LetterHeader } from '@/components/letter-header/letter-header';
import { ReactNode } from 'react';

export default async function Layout({
  children, params
}: {
  children: ReactNode,
  params: Promise<{ letter: string }>
  }) {
  const { letter } = await params
  
  return (
    <>
      <LetterHeader letter={letter} />
      {children}
    </>
  )
}