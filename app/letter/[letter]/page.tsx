import { LetterHeader } from '@/components/letter-header/letter-header'
import { Letter } from '@/components/letter/letter'
import { MainLayout } from '@/components/main-layout/main-layout'
import { Separator } from '@/components/ui/separator'

export default async function LetterPage({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = await params

  return (
    <MainLayout>
      <LetterHeader letter={letter} />
      <Separator />
      <Letter letter={letter} />
    </MainLayout>
  )
}