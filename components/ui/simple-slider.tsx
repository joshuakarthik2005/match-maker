"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SimpleSliderProps {
  defaultValue?: number[]
  value?: number[]
  max: number
  step?: number
  onValueChange?: (value: number[]) => void
  className?: string
}

export function SimpleSlider({
  defaultValue = [0],
  value,
  max,
  step = 1,
  onValueChange,
  className,
}: SimpleSliderProps) {
  const [values, setValues] = React.useState(value || defaultValue)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (value !== undefined) {
      setValues(value)
    }
  }, [value])

  const handlePointerDown = (event: React.PointerEvent, index: number) => {
    const slider = sliderRef.current
    if (!slider) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = slider.getBoundingClientRect()
      const newPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const newValue = Math.round((newPosition * max) / step) * step

      const newValues = [...values]
      newValues[index] = newValue

      if (value === undefined) {
        setValues(newValues)
      }

      onValueChange?.(newValues)
    }

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerup", handlePointerUp)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }

  return (
    <div ref={sliderRef} className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute h-full bg-primary"
          style={{
            width: `${(Math.max(...values) / max) * 100}%`,
          }}
        />
      </div>
      {values.map((val, i) => (
        <div
          key={i}
          className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background"
          style={{
            left: `calc(${(val / max) * 100}% - 10px)`,
          }}
          onPointerDown={(e) => handlePointerDown(e, i)}
        />
      ))}
    </div>
  )
}
