"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RotatingTextProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string | string[]
  duration?: number
  animationDuration?: number
  y?: number
  containerClassName?: string
};

export function RotatingText({
  text,
  duration = 2000,
  animationDuration = 500,
  y = 50,
  containerClassName,
  className,
  style,
  ...props
}: RotatingTextProps) {
  const items = React.useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    if (items.length <= 1) return

    const interval = setInterval(() => {
      setVisible(false)

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length)
        setVisible(true)
      }, animationDuration)

      return () => clearTimeout(timeout)
    }, duration)

    return () => clearInterval(interval)
  }, [items, duration, animationDuration])

  return (
    <div
      className={cn("overflow-hidden py-1", containerClassName)}
    >
      <div
        {...props}
        className={className}
        style={{
          ...style,
          transform: visible
            ? "translateY(0)"
            : `translateY(-${y}px)`,
          transition: `transform ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out`,
          willChange: "transform, opacity",
        }}
      >
        {items[index]}
      </div>
    </div>
  );
}