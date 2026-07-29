'use client'

import { useGetWordsQuery } from '@/lib/redux/api/words'
import { useTypedSelector } from '@/lib/redux/hooks'
import { useState } from 'react'
import { NoWords } from '@/components/no-words/no-words'
import { Loader } from '@/components/loader/loader'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Pagination } from '../pagination/pagination'

export function ListWords({ letter }: { letter?: string }) {
  const { learnMode, shuffle } = useTypedSelector(data => data.settings)

  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const [currentPage, setCurrentPage] = useState(1)

  const { data = { items: [], total: 0, limit: 0, page: 1 }, isLoading } = useGetWordsQuery({ letter, shuffle, page: currentPage })

  const totalPages = Math.ceil(data.total / data.limit)

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1)
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1)
    }
  }

  if (isLoading) {
    return <Loader animateStyle='animate-spin-reverse' />
  }

  if (!data.items.length) {
    return <NoWords />
  }

  return (
    <div className='w-full flex-1 flex flex-col justify-center items-center my-12'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-12'>
        {data.items.map(({ word, id, translation }) => (
          <div key={id} className='flex flex-col gap-y-4'>
            <div className='flex gap-2 sm:gap-4 text-[clamp(1.2rem,4vw,2rem)]'>
              <div className='font-semibold'>{word}</div>
              {'-'}
              <div
                onClick={() => learnMode && toggleReveal(id)}
                className={cn(
                  'text-muted-foreground rounded-2xl transition',
                  learnMode &&
                  !revealed.has(id) &&
                  'bg-muted-foreground text-transparent select-none',
                  learnMode && 'cursor-pointer'
                )}
              >
                {translation}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>

      <div className='flex mt-auto justify-center items-center w-full'>
        <div className='flex gap-4'>
          <Pagination nextPage={nextPage} prevPage={prevPage} totalPages={totalPages} page={currentPage} setPage={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}