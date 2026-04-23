import { mapWords } from '@/helpers/map-words'
import { shuffleArray } from '@/helpers/shuffle-array'
import { Word } from '@/lib/redux/types'
import { NextResponse } from 'next/server'

type CacheEntry = {
  data: Word[]
  expires: number
}

const TTL = 1000 * 60 * 5

const cache = new Map<string, CacheEntry>()

function getCacheKey(letter: string, shuffle: boolean) {
  return `${letter}:${shuffle}`
}

const wordModules: Record<string, Record<string, Record<string, string>>> = {}

async function loadLetter(letter: string): Promise<Record<string, Record<string, string>>> {
  if (!wordModules[letter]) {
    const modul = await import(`@/data/${letter}.json`) as {
      default: Record<string, Record<string, string>>
    }
    wordModules[letter] = modul.default
  }

  return wordModules[letter]
}

function transform(data: Record<string, Record<string, string>>) {
  return Object.entries(data).flatMap(([, v]) => mapWords(v))
}

export async function GET(req: Request, { params }: { params: Promise<{ letter: string }> }) {
  try {
    const { searchParams } = new URL(req.url)
    const { letter } = await params

    if (letter !== 'all' && !/^[a-z]$/.test(letter)) {
      return NextResponse.json({ error: 'Invalid letter' }, { status: 400 })
    }

    const isShuffled = searchParams.get('shuffle') === 'true'
    const key = getCacheKey(letter, isShuffled)

    const cached = cache.get(key)

    if (cached) {
      if (cached.expires > Date.now()) {
        return NextResponse.json(cached.data)
      }

      cache.delete(key)
    }

    let result: Word[] = []

    if (letter === 'all') {
      const letters = [...'abcdefghijklmnopqrstuvwxyz']

      const allWords = await Promise.all(
        letters.map(async (l) => {
          const data = await loadLetter(l)

          return transform(data)
        })
      )

      result = allWords.flat()
    } else {
      const data = await loadLetter(letter)

      result = transform(data)
    }

    if (isShuffled) {
      result = shuffleArray(result)
    }

    cache.set(key, {
      data: [...result],
      expires: Date.now() + TTL
    })

    return NextResponse.json([...result])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}