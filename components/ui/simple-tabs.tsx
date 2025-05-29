"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SimpleTabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

export function SimpleTabs({ defaultValue, value, onValueChange, className, children }: SimpleTabsProps) {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            selectedValue,
            onValueChange: handleValueChange,
          })
        }
        return child
      })}
    </div>
  )
}

interface SimpleTabsListProps {
  className?: string
  children: React.ReactNode
  selectedValue?: string
  onValueChange?: (value: string) => void
}

export function SimpleTabsList({ className, children, selectedValue, onValueChange }: SimpleTabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            selectedValue,
            onValueChange,
          })
        }
        return child
      })}
    </div>
  )
}

interface SimpleTabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
  selectedValue?: string
  onValueChange?: (value: string) => void
}

export function SimpleTabsTrigger({
  value,
  className,
  children,
  selectedValue,
  onValueChange,
}: SimpleTabsTriggerProps) {
  const isActive = selectedValue === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
        className,
      )}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </button>
  )
}

interface SimpleTabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
  selectedValue?: string
}

export function SimpleTabsContent({ value, className, children, selectedValue }: SimpleTabsContentProps) {
  if (value !== selectedValue) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </div>
  )
}
