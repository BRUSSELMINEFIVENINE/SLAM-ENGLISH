import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { NavSettings } from '../nav-settings/nav-settings';
import Link from 'next/link';

export function LetterHeader({ letter = 'all' }: { letter?: string }) {
  return (
    <div className='w-full'>
      <div className="w-full flex justify-between items-center py-4">
        <Link href='/'>
          <Button variant='ghost' size='icon'>
            <ChevronLeft className="justify-self-start" />
          </Button>
        </Link>
        <span className="text-center uppercase font-medium text-2xl">{letter}</span>
        <NavSettings />
      </div>
      <Separator />
    </div>
  )
}