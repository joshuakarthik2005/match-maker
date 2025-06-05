"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Menu,
  ShoppingCart,
  Package,
  MessageSquare,
  Users,
  CreditCard,
  User,
  Settings,
  LogOut,
  Sliders,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SimpleSheet, SimpleSheetTrigger } from "@/components/ui/simple-sheet"
import { SimpleDropdown, SimpleDropdownItem, SimpleDropdownSeparator } from "@/components/ui/simple-dropdown"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [unreadMessages] = useState(3) // Mock unread message count

  const routes = [
    {
      name: "Demand",
      path: "/demand",
      icon: ShoppingCart,
    },
    {
      name: "Supply",
      path: "/supply",
      icon: Package,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
    {
      name: "Connects",
      path: "/connects",
      icon: Users,
    },
    {
      name: "Manage Credits",
      path: "/buy-credits",
      icon: CreditCard,
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
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-bold"
                onClick={() => setIsOpen(false)}
              >
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
                    {route.badge && (
                      <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {route.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </SimpleSheet>

          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold">
            <span className="text-primary">MatchMaker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80 flex items-center gap-2",
                  pathname === route.path ? "text-foreground" : "text-foreground/60",
                )}
              >
                {route.name}
                {route.badge && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {route.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Credit balance: 150
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => (window.location.href = "/notifications")}
          >
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
              Personal Information
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => (window.location.href = "/preferences")}>
              <Sliders className="mr-2 h-4 w-4" />
              Preferences
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => (window.location.href = "/profile")}>
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
