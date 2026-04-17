'use client'

import { useMemo } from 'react'
import { useTypedSelector } from '@/store/hooks'
import data from '../data.json'
import { shuffleArray } from '@/helpers/shuffle-array'
import { mapWords } from '@/helpers/map-words'

export type Word = {
  word: string
  value: string
}

interface UseData {
  letter?: string
}

const entries = Object.entries(data)



export function useData({ letter }: UseData = {}) {
  const isShuffled = useTypedSelector((state) => state.settings.shuffle)

  const baseArray = useMemo<Word[]>(() => {
    if (!letter) return []

    if (letter === 'all') {
      return entries.flatMap(([, v]) =>
        mapWords(v as Record<string, string>)
      )
    }

    const found = entries.find(([l]) => l === letter)
    const dataByLetter = found ? found[1] : null

    return dataByLetter
      ? mapWords(dataByLetter as Record<string, string>)
      : []
  }, [letter])

  const dataByLetterArray = useMemo(() => {
    if (!isShuffled) return baseArray

    return shuffleArray(baseArray)
  }, [baseArray, isShuffled])

  const allData = useMemo(() => {
    return entries.map(([l, v]) => ({
      letter: l,
      letterData: v,
      count: Object.keys(v).length,
    }))
  }, [])

  return {
    allData,
    dataByLetter: dataByLetterArray,
  }
}