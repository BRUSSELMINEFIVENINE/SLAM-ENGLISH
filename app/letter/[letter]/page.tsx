import { Letter } from '@/components/letter/letter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>
}) {
  const { letter } = await params

  return {
    title: `Letter ${letter.toUpperCase()} | SLAM ENGLISH`,
  }
}

export default async function LetterPage({ params }: { params: Promise<{ letter: string }> }) {
  const { letter } = await params

  return (
    <Letter letter={letter} />
  )
}