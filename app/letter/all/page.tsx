import { LetterHeader } from '@/components/letter-header/letter-header';
import { Letter } from '@/components/letter/letter';
import { MainLayout } from '@/components/main-layout/main-layout';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'All | SLAM ENGLISH',
  description: 'Learn English words',
}

export default function All() {
  return (
    <MainLayout>
        <LetterHeader />
        <Separator />
        <Letter letter='all' />
    </MainLayout>
  )
}