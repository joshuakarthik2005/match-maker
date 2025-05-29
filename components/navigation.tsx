"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Home, Search, MessageSquare, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { SimpleSheet, SimpleSheetTrigger } from "@/components/ui/simple-sheet"
import { SimpleDropdown, SimpleDropdownItem, SimpleDropdownSeparator } from "@/components/ui/simple-dropdown"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Browse",
      path: "/browse",
      icon: Search,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <SimpleSheetTrigger onClick={() => setIsOpen(true)}>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SimpleSheetTrigger>

          <SimpleSheet open={isOpen} onOpenChange={setIsOpen} side="left">
            <div className="flex flex-col gap-6 py-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setIsOpen(false)}>
                <span className="text-primary">MatchMaker</span>
              </Link>
              <nav className="flex flex-col gap-2">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === route.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SimpleSheet>

          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="text-primary">MatchMaker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === route.path ? "text-foreground" : "text-foreground/60",
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>

          <SimpleDropdown
            trigger={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            }
          >
            <div className="px-2 py-1.5 text-sm font-medium">My Account</div>
            <SimpleDropdownSeparator />
            <SimpleDropdownItem onClick={() => (window.location.href = "/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => (window.location.href = "/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </SimpleDropdownItem>
            <SimpleDropdownSeparator />
            <SimpleDropdownItem onClick={() => (window.location.href = "/login")}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </SimpleDropdownItem>
          </SimpleDropdown>
        </div>
      </div>
    </header>
  )
}
