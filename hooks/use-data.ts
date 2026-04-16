import { useMemo } from 'react'
import data from '../data.json'

interface UseData {
  letter?: string
}

const entries = Object.entries(data)

export function useData({ letter }: UseData = {}) {
  return useMemo(() => {
    const allData = entries.map(([l, v]) => ({
      letter: l,
      letterData: v,
      count: Object.keys(v).length,
    }))

    const found = letter
      ? entries.find(([l]) => l === letter)
      : undefined

    const dataByLetter = found
      ? found[1]
      : null

    const dataByLetterArray = dataByLetter
      ? Object.entries(dataByLetter as Record<string, string>).map(([word, value]) => ({
        word,
        value,
      }))
      : []

    return {
      allData,
      dataByLetter: dataByLetterArray,
    }
  }, [letter])
}