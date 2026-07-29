import { useEffect, useRef } from "react"

type UsePressKeyOptions = {
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  preventDefault?: boolean
};

export function usePressKey(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: UsePressKeyOptions = {}
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== key.toLowerCase() ||
        !!options.ctrl !== event.ctrlKey ||
        !!options.shift !== event.shiftKey ||
        !!options.alt !== event.altKey ||
        !!options.meta !== event.metaKey
      ) {
        return
      }

      if (options.preventDefault) {
        event.preventDefault()
      }

      callbackRef.current(event)
    };

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    };
  }, [key, options.ctrl, options.shift, options.alt, options.meta, options.preventDefault])
}