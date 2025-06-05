"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
}

export default function CreateDemandPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Welcome! What product are you looking for?",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [demandData, setDemandData] = useState({
    product: "",
    quantity: "",
    itemType: "",
    budget: "",
    location: "",
    deadline: "",
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const questions = [
    "Welcome! What product are you looking for?",
    "How many units do you need?",
    "What type of item is this?",
    "What is your price range or budget?",
    "Where should it be delivered?",
    "By when do you need it?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: inputMessage,
    }
    setMessages((prev) => [...prev, userMessage])

    // Update demand data based on current step
    const newDemandData = { ...demandData }
    switch (currentStep) {
      case 0:
        newDemandData.product = inputMessage
        break
      case 1:
        newDemandData.quantity = inputMessage
        break
      case 2:
        newDemandData.itemType = inputMessage
        break
      case 3:
        newDemandData.budget = inputMessage
        break
      case 4:
        newDemandData.location = inputMessage
        break
      case 5:
        newDemandData.deadline = inputMessage
        break
    }
    setDemandData(newDemandData)
    setInputMessage("")

    // Move to next step or complete
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const nextStep = currentStep + 1
        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot" as const,
          content: questions[nextStep],
        }
        setMessages((prev) => [...prev, botMessage])
        setCurrentStep(nextStep)
      } else {
        // Final confirmation
        const successMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot" as const,
          content: "✅ Demand submitted successfully!",
        }
        setMessages((prev) => [...prev, successMessage])

        // Add summary message
        const summaryMessage = {
          id: (Date.now() + 2).toString(),
          type: "bot" as const,
          content: `📦 Product: ${newDemandData.product}\n🔢 Quantity: ${newDemandData.quantity}\n📱 Item Type: ${newDemandData.itemType}\n💰 Budget: ₹${newDemandData.budget}\n📍 Location: ${newDemandData.location}\n⏳ Deadline: ${newDemandData.deadline}`,
        }
        setMessages((prev) => [...prev, summaryMessage])
        setIsCompleted(true)
      }
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <h1 className="text-lg font-medium">Create Demand</h1>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line text-sm leading-relaxed ${
                message.type === "user"
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-gray-500"
            disabled={isCompleted}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isCompleted}
            size="icon"
            className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
