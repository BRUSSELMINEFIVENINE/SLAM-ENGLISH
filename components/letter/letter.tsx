'use client'

import { useWordStepByStep } from '@/helpers/get-word-step-by-step'
import { useData } from '@/hooks/use-data'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function Letter({ letter }: { letter: string }) {
  const data = useData({ letter })

  const { nextWord, currentWord } = useWordStepByStep(data.dataByLetter)

  return (
    <div className='w-full h-full flex justify-center flex-col gap-20 items-center'>
      <Popover>
        <PopoverTrigger asChild>
          <div className="text-7xl sm:text-[7rem] font-bold">
            {currentWord.word}
          </div>
        </PopoverTrigger>
        <PopoverContent side='top' className='text-center'>
          {currentWord.value}
        </PopoverContent>
      </Popover>

      <Button size='lg' className='w-20' onClick={nextWord}>Next</Button>
    </div>
  )
}