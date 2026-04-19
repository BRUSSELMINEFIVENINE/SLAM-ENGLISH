'use client'

import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export function ScrambleText({
  text,
}: {
  text: string
}) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      setOutput(() =>
        text
          .split('')
          .map((char, index) => {
            if (index < i) return char
            if (char === ' ') return ' '
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      i += 0.3

      if (i >= text.length) {
        clearInterval(interval)
        setOutput(text)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [text])

  return <span>{output}</span>
}
