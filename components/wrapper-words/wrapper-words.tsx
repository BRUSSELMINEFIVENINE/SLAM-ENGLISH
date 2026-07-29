'use client'

import { Word } from '@/components/word/word'
import { useTypedSelector } from '@/lib/redux/hooks'
import { ListWords } from '@/components/list-words/list-words'

export function WrapperWords({ letter }: { letter?: string }) {
  const { layout } = useTypedSelector(data => data.settings)

  return (
    <>
      {layout === "single" ? <Word letter={letter} /> : <ListWords letter={letter} />}
    </>
  )
}