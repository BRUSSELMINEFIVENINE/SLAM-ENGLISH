'use client'

import { loadDataState } from '@/lib/idb/db'
import { setSettings } from '@/lib/redux/features/settingsSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { useEffect } from 'react'

export const useLoadDataFromDB = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    loadDataState().then((data) => {
      if (!data) return
      dispatch(setSettings(data.settings))
    })
  }, [dispatch])
}