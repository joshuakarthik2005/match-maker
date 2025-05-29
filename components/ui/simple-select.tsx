"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SimpleSelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  placeholder?: string
  className?: string
}

export function SimpleSelect({
  value,
  defaultValue,
  onValueChange,
  children,
  placeholder,
  className,
}: SimpleSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
  const [selectedLabel, setSelectedLabel] = React.useState(placeholder || "Select an option")
  const selectRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)

      // Find the label for the selected value
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props.value === value) {
          setSelectedLabel(child.props.children)
        }
      })
    }
  }, [value, children])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (newValue: string, label: React.ReactNode) => {
    if (value === undefined) {
      setSelectedValue(newValue)
    }
    setSelectedLabel(label)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="line-clamp-1">{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSelect: handleSelect,
                isSelected: child.props.value === selectedValue,
              })
            }
            return child
          })}
        </div>
      )}
    </div>
  )
}

interface SimpleSelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
  onSelect?: (value: string, label: React.ReactNode) => void
  isSelected?: boolean
}

export function SimpleSelectItem({ value, children, className, onSelect, isSelected }: SimpleSelectItemProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        className,
      )}
      onClick={() => onSelect?.(value, children)}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
      {children}
    </div>
  )
}
