import { NavSettings } from '@/components/nav-settings/nav-settings';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getSummary } from '@/lib/get-summary';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  const data = await getSummary()

  return (
    <>
      <div className="w-full flex flex-col gap-6 items-start text-left">
        <span className='w-full flex justify-between pt-4 items-center'>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Slam English
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
        <div className='w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-8'>
          {data.map((item) => (
            <Link key={item.letter} href={`/letter/${item.letter}`}>
              <div className="relative hover:border-l-0 hover:border-b-0 hover:border-t-2 hover:border-r border-l border-b-2 bg-background flex justify-center px-4 py-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold uppercase text-foreground mr-2">{item.letter}</div>
                <Badge className={
                  cn(
                    "absolute -top-2 -right-2",
                    item.count > 0 ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                  )}>
                  <div className="text-sm font-medium">{item.count}</div>
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
