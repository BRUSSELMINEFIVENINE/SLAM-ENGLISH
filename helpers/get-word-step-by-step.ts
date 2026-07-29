import { WordResponse } from '@/lib/redux/api/words';
import { Dispatch, SetStateAction, useState } from 'react';

export const useWordStepByStep = (words: WordResponse[], total: number, limit: number, page: number, setCurrentPage: Dispatch<SetStateAction<number>>) => { 
  const [currentIdx, setCurrentIdx] = useState(0)
  const [commonIdx, setCommonIdx] = useState(0)

  const currentWord = words[currentIdx]

  function nextWord() {
    const isLastWordOnPage = currentIdx === limit - 1

    if (isLastWordOnPage) {
      setCurrentIdx(0)
      setCurrentPage((p) => p + 1)
    } else {
      setCurrentIdx((prev) => prev + 1)
    }

    setCommonIdx((prev) => (prev + 1) % total)
  }

  function prevWord() {
    const isFirstWordOnPage = currentIdx === 0

    if (isFirstWordOnPage) {
      setCurrentPage((p) => Math.max(p - 1, 1))
      setCurrentIdx(limit - 1)
    } else {
      setCurrentIdx((prev) => prev - 1)
    }

    setCommonIdx((prev) => (prev - 1) % total)
  }

  function reset() {
    setCurrentPage(1)
    setCurrentIdx(0)
    setCommonIdx(0)
  }

  return {
    currentWord,
    commonIdx: commonIdx + 1,
    nextWord,
    prevWord,
    reset,
  }
}