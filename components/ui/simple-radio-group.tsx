"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SimpleRadioGroupProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function SimpleRadioGroup({ value, onValueChange, children, className }: SimpleRadioGroupProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: child.props.value === value,
            onChange: () => onValueChange(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
}

interface SimpleRadioGroupItemProps {
  value: string
  id: string
  checked?: boolean
  onChange?: () => void
  className?: string
}

export function SimpleRadioGroupItem({ value, id, checked, onChange, className }: SimpleRadioGroupItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked && "border-[5px]",
          className,
        )}
        onClick={onChange}
      />
      <label htmlFor={id} className="text-sm font-medium leading-none cursor-pointer" onClick={onChange}>
        {value}
      </label>
    </div>
  )
}
