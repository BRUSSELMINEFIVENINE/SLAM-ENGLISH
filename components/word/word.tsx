'use client'

import { useWordStepByStep } from '@/helpers/get-word-step-by-step'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { RefreshCcw, SkipBack, SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '../ui/progress'
import { useGetWordsQuery } from '@/lib/redux/api/words/words.api'
import { Loader } from '../loader/loader'
import { useTypedSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { usePressKey } from '@/hooks/use-press-key'
import { NoWords } from '../no-words/no-words'
import { Skeleton } from '../ui/skeleton'

export function Word({ letter }: { letter?: string }) {
  const nextRef = useRef<HTMLButtonElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)

  const { learnMode, shuffle } = useTypedSelector(data => data.settings)

  const [currentPage, setCurrentPage] = useState(1)

  const { data = { items: [], total: 0, limit: 0, page: 1 }, isLoading, isFetching } = useGetWordsQuery({ letter, shuffle, page: currentPage })

  const { nextWord, prevWord, reset, currentWord, commonIdx } = useWordStepByStep(
    data.items,
    data.total,
    data.limit,
    currentPage,
    setCurrentPage,
  )

  usePressKey('ArrowRight', () => {
    nextRef.current?.click()
  })

  usePressKey('ArrowLeft', () => {
    prevRef.current?.click()
  })

  const progress = (commonIdx / data.total) * 100

  if (isLoading) {
    return <Loader animateStyle='animate-spin-reverse' />
  }

  if (!data.items.length) {
    return <NoWords />
  }

  return (
    <div className={cn('w-full flex-1 flex flex-col justify-center items-center', learnMode ? 'gap-12' : 'gap-18')}>
      <div className={cn("flex items-end justify-center w-full", !learnMode && 'h-36')}>
        {isFetching ? <Skeleton className="h-[clamp(2rem,8vw,7rem)] w-62.5" /> :
          learnMode ? (
            <div className='w-full flex flex-col gap-4 items-center'>
              <div className="text-center break-all text-[clamp(2rem,8vw,7rem)] font-extrabold">
                {currentWord.word}
              </div>
              <div className="py-2 px-4 bg-muted-foreground/10 rounded-xl text-center break-normal text-[clamp(0.5rem,6vw,1rem)] font-medium">
                {currentWord.translation}
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer text-center break-all text-[clamp(2rem,8vw,7rem)] font-extrabold">
                  {currentWord.word}
                </div>
              </PopoverTrigger>
              <PopoverContent side='top' className='text-center'>
                {currentWord.translation}
              </PopoverContent>
            </Popover>
          )}
      </div>

      <div className='flex flex-col justify-center items-center w-full gap-6'>
        <div className='flex gap-4'>
          <Button
            ref={prevRef}
            disabled={commonIdx <= 1}
            size='lg'
            className='w-20'
            onClick={prevWord}>
            <SkipBack /> Prev
          </Button>
          <Button
            ref={nextRef}
            size='lg'
            className='w-20'
            onClick={commonIdx === data.total ? reset : nextWord}>
            {commonIdx === data.total ? <RefreshCcw /> : <>Next <SkipForward /></>}
          </Button>
        </div>
        <div className='flex w-full flex-col items-center gap-4 mb-8'>
          <Progress value={progress} className="w-[40%] transition-all duration-300" />
          <span className='font-semibold'>{commonIdx} / {data.total}</span>
        </div>
      </div>
    </div>
  )
}