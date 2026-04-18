import { Spinner } from '../ui/spinner';

export function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner className="size-8" />
    </div>
  )
}