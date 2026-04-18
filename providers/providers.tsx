'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/lib/redux/store'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider store={store}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  </ReduxProvider>
}