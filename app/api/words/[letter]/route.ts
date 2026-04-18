import { mapWords } from '@/helpers/map-words'
import { shuffleArray } from '@/helpers/shuffle-array'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ letter: string }> }) {
  try {
    const { searchParams } = new URL(req.url)
    const { letter } = await params

    const isShuffled = searchParams.get('shuffle') === 'true'

    let result = []

    if (letter === 'all') {
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

      const allWords = await Promise.all(
        letters.map(async (l) => {
          const data = await import(`@/data/${l}.json`)

          return Object.entries(data.default).flatMap(([, v]) =>
            mapWords(v as Record<string, string>)
          )
        })
      )

      result = allWords.flat()
    } else {
      const data = await import(`@/data/${letter}.json`)

      result = Object.entries(data.default).flatMap(([, v]) => mapWords(v as Record<string, string>))
    }

    if (isShuffled) {
      result = shuffleArray([...result])
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 })
  }
}