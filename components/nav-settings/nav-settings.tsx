'use client'

import { Cog, GraduationCap, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAppDispatch, useTypedSelector } from '@/lib/redux/hooks';
import { toggleLearnMode, toggleShuffle } from '@/lib/redux/features/settingsSlice';

export function NavSettings() {
  const dispatch = useAppDispatch()

  const { learnMode, shuffle } = useTypedSelector(data => data.settings)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <Cog />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto h-105 w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-6">
            <div className="flex items-center justify-between">
              <div className='mr-2 text-lg font-medium'>Toggle theme:</div>
              <ModeToggle />
            </div>

            <div className="flex items-center justify-between">
              <div className='mr-2 text-lg font-medium'>Learn mode:</div>
              <Button
                size="icon"
                variant={learnMode ? "default" : "outline"}
                onClick={() => dispatch(toggleLearnMode())}
              >
                <GraduationCap />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className='mr-2 text-lg font-medium'>Shuffle:</div>
              <Button
                size="icon"
                variant={shuffle ? "default" : "outline"}
                onClick={() => dispatch(toggleShuffle())}
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