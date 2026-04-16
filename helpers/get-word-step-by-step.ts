import { useState } from 'react';

export const useWordStepByStep = (words: { word: string; value: string }[]) => { 
  const [currentWord, setCurrentWord] = useState(words[0])

  function next() {
    const currentIndex = words.findIndex(w => w.word === currentWord.word)
    const nextIndex = (currentIndex + 1) % words.length
    setCurrentWord(words[nextIndex])
  }

  return {
    currentWord,
    nextWord: next,
  }
}