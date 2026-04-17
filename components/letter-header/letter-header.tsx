'use client'

import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function LetterHeader({ letter = 'all' }: { letter?: string }) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-3 items-center w-full mb-6">
      <Button className='w-12' onClick={() => router.back()}>
        <ChevronLeft className="justify-self-start" />
      </Button>
      <span className="text-center uppercase font-medium text-2xl">{letter}</span>
    </div>
  )
}