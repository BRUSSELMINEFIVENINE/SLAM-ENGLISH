'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const get = useCallback(
    (key: string) => {
      return searchParams.get(key)
    },
    [searchParams]
  )

  const set = useCallback(
    (key: string, value: string, replace = false) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(key, value)

      const url = `${pathname}?${params.toString()}`

      replace ? router.replace(url) : router.push(url)
    },
    [pathname, router, searchParams]
  )

  const remove = useCallback(
    (key: string, replace = false) => {
      const params = new URLSearchParams(searchParams.toString())

      params.delete(key)

      const query = params.toString()
      const url = query ? `${pathname}?${query}` : pathname

      replace ? router.replace(url) : router.push(url)
    },
    [pathname, router, searchParams]
  )

  const update = useCallback(
    (values: Record<string, string | null>, replace = false) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(values).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })

      const url = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname

      replace ? router.replace(url) : router.push(url)
    },
    [pathname, router, searchParams]
  )

  const clear = useCallback(
    (replace = false) => {
      const url = pathname
      replace ? router.replace(url) : router.push(url)
    },
    [pathname, router]
  )

  return {
    get,
    set,
    remove,
    update,
    clear,
    raw: searchParams,
  }
}