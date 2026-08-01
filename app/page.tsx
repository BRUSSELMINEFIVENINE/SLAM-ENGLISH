import { NavSettings } from '@/components/nav-settings/nav-settings';
import { ScrambleText } from '@/components/scramble-text/scramble-text';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import Link from 'next/link';

type Counts = Record<string, number>

async function getCounts(): Promise<Counts> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/words/counts`)

  if (!response.ok) {
    throw new Error("Failed to fetch word counts")
  }

  return response.json()
}

export default async function Home() {
  const counts = await getCounts()

  const data = 'abcdefghijklmnopqrstuvwxyz'.split('').map((v) => {
    if (counts[v]) return { letter: v, count: counts[v] }
    else return { letter: v, count: 0 }
  })

  return (
    <>
      <div className="w-full flex flex-col gap-6 items-start text-left">
        <span className='w-full flex justify-between pt-4 items-center'>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            <ScrambleText text='Slam English' />
          </h1>
          <NavSettings />
        </span>
        <Link href='/letter/all'>
          <div className="
          hover:border-l-0 hover:border-b-0 hover:border-t-2 hover:border-r border-l border-b-2 bg-background flex justify-center
           px-6 py-6 rounded-md
           text-2xl sm:text-3xl font-bold text-foreground">
            All
          </div>
        </Link>
        <Separator />
        <div className='w-full grid grid-cols-3 mb-6 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-8'>
          {data.map(({ letter, count }) => (
            <Link key={letter} href={`/letter/${letter}?isEmpty=${count === 0}`} prefetch={count !== 0}>
              <div className="relative hover:border-l-0 hover:border-b-0 hover:border-t-2 hover:border-r border-l border-b-2 bg-background flex justify-center px-4 py-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold uppercase text-foreground">{letter}</div>
                <Badge className={
                  cn(
                    "absolute -top-2 -right-2",
                    count > 0 ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                  )}>
                  <div className="text-sm font-medium">{count}</div>
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
