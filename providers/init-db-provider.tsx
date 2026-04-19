'use client'

import { useLoadDataFromDB } from '@/hooks/use-load-data-from-db'
import { ReactNode } from 'react'

export function InitDBProvider({ children }: { children: ReactNode }) {
  useLoadDataFromDB()
  
  return children
}