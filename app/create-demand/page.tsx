"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { Send, Bot, User, Paperclip, Mic, Camera } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function CreateDemandPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm here to help you create a demand request. Let's start by understanding what you're looking for. What service or product do you need?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputMessage, messages.length)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: botResponse,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const generateBotResponse = (userInput: string, messageCount: number): string => {
    const responses = [
      "Great! Can you tell me more details about what exactly you need? For example, is this urgent or can it wait?",
      "That sounds like an important requirement. What's your budget range for this service?",
      "Perfect! And where do you need this service? Is it at your location or can it be done remotely?",
      "Excellent! Do you have any specific requirements or preferences for the service provider?",
      "Thank you for all the details! Let me create your demand request. You'll be able to review it before posting.",
      "Your demand request has been created! You can now review and publish it to start receiving responses from suppliers.",
    ]

    if (messageCount < responses.length * 2) {
      return responses[Math.floor(messageCount / 2)] || responses[responses.length - 1]
    }

    return "I have all the information I need. Would you like me to create your demand request now?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Create Demand Request</h1>
          <p className="text-muted-foreground">Chat with our AI assistant to create your perfect demand request</p>
        </div>

        <Card className="flex-1 flex flex-col h-[calc(100vh-200px)]">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "bot" && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.type === "user" && (
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2 items-end">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[40px]"
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="h-10 w-10 p-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">Press Enter to send, Shift + Enter for new line</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push("/demand")}>
                    Cancel
                  </Button>
                  {messages.length > 6 && (
                    <Button size="sm" onClick={() => router.push("/create-request")}>
                      Create Request
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
