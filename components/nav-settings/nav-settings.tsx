'use client'

import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function NavSettings() {
  return (
    <Drawer>
      <DrawerTrigger asChild className='fixed bottom-0 left-1/2 -translate-x-1/2'>
        <Button variant="outline" className='border-border rounded-bl-none rounded-ee-none sm:border-x-0 border-b-0 px-6'>
          <ChevronUp />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-105 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className='mr-2 text-lg font-medium'>Toggle theme:</div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}