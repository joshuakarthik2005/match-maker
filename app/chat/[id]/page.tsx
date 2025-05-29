"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, Menu, Paperclip } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load existing conversation based on project ID
    const projectTitles: { [key: string]: string } = {
      "1": "Website Development",
      "2": "Logo Design Project",
      "3": "Content Writing",
    }

    const title = projectTitles[params.id] || "Project Chat"

    setMessages([
      {
        id: "1",
        content: `Let's continue working on your ${title} project. How can I help you today?`,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [params.id])

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
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand your requirements. Let me help you find the best matches for your project. I'll analyze your needs and connect you with suitable providers.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Project Chat</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[80%] p-4 ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-white"
                } ${message.sender === "user" ? "bounce-in" : "scale-in"}`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-white p-4">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center space-x-2 bg-white rounded-full p-2 border">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5 text-gray-400" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1 border-0 focus-visible:ring-0 bg-transparent"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            size="icon"
            className="rounded-full bg-black hover:bg-gray-800"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  )
}
