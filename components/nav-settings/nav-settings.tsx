'use client'

import { Cog, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useQueryParams } from '@/helpers/update-query-params';

export function NavSettings() {
  const { set, get } = useQueryParams()
  const shuffle = get('shuffle') === 'true'

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Cog />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-105 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className='mr-2 text-lg font-medium'>Toggle theme:</div>
              <ModeToggle />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className='mr-2 text-lg font-medium'>Shuffle:</div>
              <Button
                size="icon"
                variant={get('shuffle') === 'true' ? "default" : "outline"}
                onClick={() => set('shuffle', String(!shuffle))}
              >
                <Shuffle className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}