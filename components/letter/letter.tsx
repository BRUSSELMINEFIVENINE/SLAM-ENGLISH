'use client'

import { useWordStepByStep } from '@/helpers/get-word-step-by-step'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PackageX, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import Link from 'next/link'
import { Progress } from '../ui/progress'
import { useQueryParams } from '@/helpers/update-query-params'
import { useGetWordByLetterQuery } from '@/lib/redux/api/words/words.api'

export function Letter({ letter }: { letter: string }) {
  const { get } = useQueryParams()

  const shuffle = get('shuffle') === 'true'

  const { data = [] } = useGetWordByLetterQuery({ letter, shuffle })

  const { nextWord, prevWord, currentWord, currentIdx } = useWordStepByStep(data)

  const total = data.length
  const progress = ((currentIdx - 1) / total) * 100

  if (!data.length) {
    return (
      <Empty className="h-full my-4 bg-muted/30">
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
    <div className='w-full flex-1 flex gap-18 flex-col justify-center items-center'>
      <div className="flex h-36 items-end justify-center w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer text-center break-all text-[clamp(2rem,8vw,7rem)] font-bold">
              {currentWord.word}
            </div>
          </PopoverTrigger>
          <PopoverContent side='top' className='text-center'>
            {currentWord.value}
          </PopoverContent>
        </Popover>
      </div>

      <div className='flex flex-col justify-center items-center w-full gap-6'>
        <div className='flex gap-3'>
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
        <div className='flex w-full flex-col items-center gap-4'>
          <Progress value={progress} className="w-[40%] transition-all duration-300" />
          <span className='font-semibold'>{currentIdx} / {data.length}</span>
        </div>
      </div>
    </div>
  )
}