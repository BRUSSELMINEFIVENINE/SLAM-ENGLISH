import { LetterHeader } from '@/components/letter-header/letter-header';
import { MainLayout } from '@/components/main-layout/main-layout';
import { Separator } from '@/components/ui/separator';

export default function All() {
  return (
    <MainLayout>
        <LetterHeader />
        <Separator />
        <div>dd</div>
    </MainLayout>
  )
}