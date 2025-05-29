"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Headphones } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function FloatingChatbot() {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Hide on chatbot page itself
  useEffect(() => {
    setIsVisible(!pathname.includes("/chatbot"))
  }, [pathname])

  const handleChatbotClick = () => {
    // Store current page context for the chatbot
    sessionStorage.setItem("chatbot-context", pathname)
    router.push("/chatbot")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-6">
      <Button
        onClick={handleChatbotClick}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "group relative overflow-hidden",
        )}
      >
        <Headphones className="h-6 w-6 transition-transform group-hover:scale-110" />
        <span className="sr-only">Open AI Assistant</span>

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Need help? Talk to our AI assistant
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </Button>
    </div>
  )
}
