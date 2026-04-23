import { Word } from '@/components/word/word'

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
    <Word letter={letter} />
  )
}