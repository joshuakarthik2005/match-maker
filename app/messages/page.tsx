"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Search, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const conversations = [
    {
      id: "1",
      provider: {
        id: "1",
        name: "John's Plumbing Services",
        image: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      lastMessage: "I can come by tomorrow at 2 PM to take a look at the leak. Does that work for you?",
      timestamp: "10 min ago",
      unread: true,
      request: {
        id: "req-1",
        title: "Emergency Plumbing Repair",
      },
    },
    {
      id: "2",
      provider: {
        id: "2",
        name: "TechSolutions Inc.",
        image: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      lastMessage:
        "I've reviewed your requirements for the website. I have a few questions about the e-commerce functionality you mentioned.",
      timestamp: "2 hours ago",
      unread: false,
      request: {
        id: "req-2",
        title: "Website Development for Small Business",
      },
    },
    {
      id: "3",
      provider: {
        id: "3",
        name: "MoveMasters",
        image: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      lastMessage: "We're available this Saturday for your move. We'll bring a team of 3 movers and a 20ft truck.",
      timestamp: "Yesterday",
      unread: false,
      request: {
        id: "req-3",
        title: "Moving Help Needed",
      },
    },
    {
      id: "4",
      provider: {
        id: "4",
        name: "Dr. Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      lastMessage: "Thank you for scheduling your appointment. I look forward to our session next week.",
      timestamp: "2 days ago",
      unread: false,
      request: {
        id: "req-4",
        title: "Mental Health Consultation",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 max-w-7xl mx-auto w-full">
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Communicate with your connects</p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                    <div
                      className={`p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors ${
                        conversation.unread ? "bg-primary/5 border-l-2 border-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage
                            src={conversation.provider.image || "/placeholder.svg"}
                            alt={conversation.provider.name}
                          />
                          <AvatarFallback className="text-sm">{conversation.provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1 min-w-0">
                              <h3
                                className={`text-sm font-medium truncate ${conversation.unread ? "font-semibold" : ""}`}
                              >
                                {conversation.provider.name}
                              </h3>
                              {conversation.provider.verified && (
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <p
                            className={`text-xs line-clamp-2 mb-2 ${
                              conversation.unread ? "text-foreground font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs py-0 px-2 h-5 truncate max-w-[120px]">
                              {conversation.request.title}
                            </Badge>
                            {conversation.unread && (
                              <Badge className="h-4 w-4 rounded-full p-0 flex items-center justify-center">
                                <span className="text-[10px]">1</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Choose a conversation from the list to start communicating with your connects.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
