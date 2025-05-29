"use client"

import { Home, Star, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      label: "Matches",
      href: "/matches",
      icon: Star,
    },
    {
      label: "Messages",
      href: "/messages",
      icon: MessageCircle,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive && "scale-in")} />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
