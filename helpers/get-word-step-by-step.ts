import { useState } from 'react';

export const useWordStepByStep = (words: { word: string; value: string }[]) => { 
 const [currentIdx, setCurrentIdx] = useState(0)

  const currentWord = words[currentIdx]

  function next() {
    setCurrentIdx((prev) => (prev + 1) % words.length)
  }

  function prev() {
    setCurrentIdx((prev) => (prev - 1) % words.length)
  }

  return {
    currentWord,
    currentIdx: currentIdx + 1,
    nextWord: next,
    prevWord: prev,
  }
}