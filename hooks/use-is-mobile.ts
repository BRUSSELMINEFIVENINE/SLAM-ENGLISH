import { useRef, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const isMobile = useRef<boolean>(false)

  useEffect(() => {
    const mql = window.matchMedia(`(width <= ${breakpoint - 1}px)`)
    const onChange = () => isMobile.current = mql.matches;

    mql.addEventListener("change", onChange)
    isMobile.current = mql.matches
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
