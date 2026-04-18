import { Spinner } from '@/components/ui/spinner';

export default async function Loading() {
  return (
    <div className='w-full h-full flex flex-col text-left'>
      <div className='flex h-full justify-center items-center'>
        <Spinner className="size-8" />
      </div>
    </div>
  )
}