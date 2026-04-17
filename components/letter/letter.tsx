'use client'

import { useWordStepByStep } from '@/helpers/get-word-step-by-step'
import { useData } from '@/hooks/use-data'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PackageX, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import Link from 'next/link'
import { Progress } from '../ui/progress'

export function Letter({ letter }: { letter: string }) {
  const data = useData({ letter })

  const { nextWord, currentWord, currentIdx } = useWordStepByStep(data.dataByLetter)

  const total = data.dataByLetter.length
  const progress = ((currentIdx - 1) / total) * 100

  if (!data.dataByLetter.length) {
    return (
      <Empty className="h-full bg-muted/30">
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
    <div className='w-full h-full flex justify-center flex-col gap-20 items-center'>
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer text-7xl sm:text-[7rem] font-bold">
            {currentWord.word}
          </div>
        </PopoverTrigger>
        <PopoverContent side='top' className='text-center'>
          {currentWord.value}
        </PopoverContent>
      </Popover>

      <Button
        size='lg'
        className='w-20'
        onClick={nextWord}>
        Next
      </Button>
      <div className='flex w-full flex-col items-center gap-4'>
        <Progress value={progress} className="w-[40%] transition-all duration-300" />
        <span className='font-semibold'>{currentIdx} / {Object.keys(data.dataByLetter).length}</span>
      </div>
    </div>
  )
}