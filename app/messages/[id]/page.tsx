"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Send, Paperclip, Info, ArrowLeft, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "provider"
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

export default function ConversationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [conversation, setConversation] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversation and messages
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setConversation({
      id: params.id,
      provider: {
        id: "1",
        name: "John's Plumbing Services",
        image: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      request: {
        id: "req-1",
        title: "Emergency Plumbing Repair",
        status: "active",
      },
    })

    // Simulate initial messages
    setMessages([
      {
        id: "1",
        content:
          "Hello! I saw your request for emergency plumbing repair. Can you provide more details about the issue you're experiencing?",
        sender: "provider",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
      },
      {
        id: "2",
        content:
          "Hi there! I have a leaking pipe under my bathroom sink. Water is starting to damage the floor and cabinet.",
        sender: "user",
        timestamp: new Date(Date.now() - 3000000),
        status: "read",
      },
      {
        id: "3",
        content:
          "I understand. That sounds like it needs immediate attention. Do you know if the leak is coming from the drain pipe or the water supply line?",
        sender: "provider",
        timestamp: new Date(Date.now() - 2400000),
        status: "read",
      },
      {
        id: "4",
        content:
          "I think it's the drain pipe. There's a joint that appears to be leaking whenever water goes down the drain.",
        sender: "user",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
      },
      {
        id: "5",
        content: "Got it. I can come by tomorrow at 2 PM to take a look at the leak. Does that work for you?",
        sender: "provider",
        timestamp: new Date(Date.now() - 600000),
        status: "read",
      },
    ])
  }, [params.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simulate typing indicator
    setIsTyping(true)

    // Simulate response after delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Yes, 2 PM tomorrow works for me. I'll make sure someone is home. Do you need any additional information from me before you arrive?",
        sender: "provider",
        timestamp: new Date(),
        status: "delivered",
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsTyping(false)
    }, 2000)
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6 flex flex-col">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center flex-1">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={conversation.provider.image || "/placeholder.svg"} alt={conversation.provider.name} />
              <AvatarFallback>{conversation.provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h1 className="text-xl font-bold">{conversation.provider.name}</h1>
                {conversation.provider.verified && <CheckCircle className="h-4 w-4 text-green-500 ml-1" />}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2">
                  {conversation.request.title}
                </Badge>
                <Clock className="h-3 w-3 mr-1" />
                <span>Usually responds within 1 hour</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/provider/${conversation.provider.id}`}>
              <Info className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "provider" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage
                        src={conversation.provider.image || "/placeholder.svg"}
                        alt={conversation.provider.name}
                      />
                      <AvatarFallback>{conversation.provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    } ${message.sender === "user" ? "bounce-in" : "scale-in"}`}
                  >
                    <p>{message.content}</p>
                    <div className="flex items-center justify-end mt-1 gap-1">
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {message.sender === "user" && message.status && (
                        <span className="text-xs opacity-70">
                          {message.status === "sent" && "✓"}
                          {message.status === "delivered" && "✓✓"}
                          {message.status === "read" && "✓✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage
                      src={conversation.provider.image || "/placeholder.svg"}
                      alt={conversation.provider.name}
                    />
                    <AvatarFallback>{conversation.provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>

              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />

              <Button className="flex-shrink-0" onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
