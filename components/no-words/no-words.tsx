import { PackageX, Undo2 } from 'lucide-react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function NoWords() {
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