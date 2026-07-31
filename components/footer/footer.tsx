import { RotatingText } from '@/components/rotating-text/rotating-text';

export function Footer() {
  return (
    <div className='w-full mt-auto flex items-center gap-1 justify-center text-sm text-muted-foreground'>
       <a href="https://t.me/skirillux" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-foreground">
        <RotatingText duration={4000} text={['CARMINEFIVENINE', 'SKIRILLUX', 'BRUSSELBOY']} />
      </a>
    </div>
  )
}