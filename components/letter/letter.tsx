'use client'

import { useWordStepByStep } from '@/helpers/get-word-step-by-step'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PackageX, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import Link from 'next/link'
import { Progress } from '../ui/progress'
import { useGetWordByLetterQuery } from '@/lib/redux/api/words/words.api'
import { Loader } from '../loader/loader'
import { useTypedSelector } from '@/lib/redux/hooks'
import { cn } from '@/lib/utils'

export function Letter({ letter }: { letter: string }) {
  const { learnMode, shuffle } = useTypedSelector(data => data.settings)

  const { data = [], isLoading } = useGetWordByLetterQuery({ letter, shuffle })

  const { nextWord, prevWord, currentWord, currentIdx } = useWordStepByStep(data)

  const total = data.length
  const progress = ((currentIdx - 1) / total) * 100

  if (isLoading) {
    return <Loader animateStyle='animate-spin-reverse' />
  }

  if (!data.length) {
    return (
      <Empty className="h-full mt-4 mb-8 bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageX />
          </EmptyMedia>
          <EmptyTitle>No Words</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            Coming soon...
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href='/'>
            <Button variant="outline">
              <Undo2 />
              Back
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className={cn('w-full flex-1 flex flex-col justify-center items-center', learnMode ? 'gap-12' : 'gap-18')}>
      <div className={cn("flex items-end justify-center w-full", !learnMode && 'h-36')}>
        {learnMode ? (
          <div className='w-full flex flex-col gap-4 items-center'>
            <div className="text-center break-all text-[clamp(2rem,8vw,7rem)] font-extrabold">
              {currentWord.word}
            </div>
            <div className="py-2 px-4 bg-muted-foreground/10 rounded-xl text-center break-normal text-[clamp(0.5rem,6vw,1rem)] font-medium">
              {currentWord.value}
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
              {currentWord.value}
            </PopoverContent>
          </Popover>
        )}

      </div>

      <div className='flex flex-col justify-center items-center w-full gap-6'>
        <div className='flex gap-4'>
          <Button
            disabled={currentIdx <= 1}
            size='lg'
            className='w-20'
            onClick={prevWord}>
            Prev
          </Button>
          <Button
            size='lg'
            className='w-20'
            onClick={nextWord}>
            Next
          </Button>
        </div>
        <div className='flex w-full flex-col items-center gap-4 mb-8'>
          <Progress value={progress} className="w-[40%] transition-all duration-300" />
          <span className='font-semibold'>{currentIdx} / {data.length}</span>
        </div>
      </div>
    </div>
  )
}