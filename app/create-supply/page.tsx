"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  Send,
  Bot,
  Upload,
  FileText,
  ImageIcon,
  FileArchive,
  Mic,
  Video,
  X,
  ArrowLeft,
  Menu,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { SimpleDropdown, SimpleDropdownItem } from "@/components/ui/simple-dropdown"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  files?: File[]
}

export default function CreateSupplyPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [requirementScore, setRequirementScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Initialize with supply-specific welcome message
  useEffect(() => {
    const welcomeMessage = `Hi there! I'm here to help you create an amazing supply listing. I can guide you through:

• **Service Description** - What services do you offer?
• **Portfolio & Examples** - Showcase your best work
• **Pricing Strategy** - Set competitive rates
• **Skills & Expertise** - Highlight your qualifications
• **Availability** - When are you available to work?

Let's start by telling me what type of service you'd like to offer. What's your expertise?`

    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const supplySuggestions = [
    "I'm a web developer",
    "I offer graphic design services",
    "I'm a content writer",
    "I provide digital marketing",
    "I'm a photographer",
    "I offer consulting services",
    "Help me set my pricing",
    "What should I include in my portfolio?",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSendMessage = async () => {
    if (!input.trim() && files.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      files: files.length > 0 ? [...files] : undefined,
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setFiles([])

    // Simulate typing indicator
    setIsTyping(true)

    // Process the message and generate a response
    processMessage(input, files)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const processMessage = (userMessage: string, userFiles: File[]) => {
    if (userFiles.length > 0) {
      setIsAnalyzing(true)

      setTimeout(() => {
        setIsAnalyzing(false)
        setIsTyping(false)

        const newScore = Math.min(requirementScore + 25, 100)
        setRequirementScore(newScore)

        const fileTypes = userFiles.map((file) => {
          const type = file.type.split("/")[0]
          return type === "application" ? "document" : type
        })

        const uniqueTypes = [...new Set(fileTypes)]

        const botResponse: Message = {
          id: Date.now().toString(),
          content: `Excellent! I've analyzed the ${userFiles.length} ${userFiles.length === 1 ? "file" : "files"} you uploaded (${uniqueTypes.join(", ")}). These will make great additions to your portfolio!

${userMessage ? `Combined with your message: "${userMessage}"` : ""}

Your listing completeness is now at ${newScore}%. ${getSupplyAdvice(newScore)}`,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
      }, 2000)

      return
    }

    setTimeout(() => {
      const botResponse = getSupplyResponse(userMessage)

      const responseMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, responseMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getSupplyResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage.includes("web developer") || lowerCaseMessage.includes("developer")) {
      const newScore = Math.min(requirementScore + 15, 100)
      setRequirementScore(newScore)
      return `Great! Web development is in high demand. Here's how to create a standout listing:

**Service Title**: "Professional Web Development Services"

**Key areas to highlight**:
• Frontend technologies (React, Vue, Angular)
• Backend expertise (Node.js, Python, PHP)
• Database management
• Responsive design
• E-commerce solutions

**Portfolio must-haves**:
• Live website examples
• Before/after screenshots
• Client testimonials
• Code samples (GitHub links)

What's your primary tech stack? This will help me suggest specific pricing strategies.`
    }

    if (lowerCaseMessage.includes("graphic design") || lowerCaseMessage.includes("designer")) {
      const newScore = Math.min(requirementScore + 15, 100)
      setRequirementScore(newScore)
      return `Perfect! Graphic design is always in demand. Here's your listing strategy:

**Service Title**: "Creative Graphic Design Solutions"

**Services to offer**:
• Logo design & branding
• Marketing materials (flyers, brochures)
• Social media graphics
• Web design mockups
• Print design

**Portfolio essentials**:
• High-quality design samples
• Different style examples
• Brand identity projects
• Before/after case studies

What type of design work do you enjoy most? This will help position your specialty.`
    }

    if (lowerCaseMessage.includes("pricing") || lowerCaseMessage.includes("rates")) {
      return `Great question! Here's a strategic approach to pricing:

**Research Phase**:
• Check competitor rates in your area
• Consider your experience level
• Factor in project complexity

**Pricing Models**:
• **Hourly**: $25-150/hour (based on expertise)
• **Project-based**: Fixed price for defined scope
• **Retainer**: Monthly fee for ongoing work

**Pro Tips**:
• Start slightly below market rate to build reviews
• Offer package deals for multiple services
• Include revisions in your base price
• Always provide detailed quotes

What's your experience level? Beginner, intermediate, or expert?`
    }

    if (lowerCaseMessage.includes("portfolio")) {
      return `Your portfolio is crucial for winning clients! Here's what makes it shine:

**Must-Have Elements**:
• **Best Work First** - Lead with your strongest pieces
• **Variety** - Show range across different projects
• **Case Studies** - Explain your process and results
• **Client Results** - Include metrics and testimonials

**Technical Tips**:
• High-resolution images
• Mobile-friendly presentation
• Fast loading times
• Easy navigation

**Content Strategy**:
• 8-12 pieces maximum
• Update regularly
• Include work-in-progress shots
• Show personality and style

Would you like help organizing your existing work, or do you need guidance on creating new portfolio pieces?`
    }

    // Default response
    const newScore = Math.min(requirementScore + 10, 100)
    setRequirementScore(newScore)

    return `Thanks for that information! I've updated your listing profile (${newScore}% complete).

${getSupplyAdvice(newScore)}

To help you further, could you tell me more about:
• Your specific skills and expertise
• Types of projects you want to work on
• Your availability and preferred working style

What would you like to focus on next?`
  }

  const getSupplyAdvice = (score: number): string => {
    if (score >= 80) {
      return "Your listing is looking comprehensive! You're ready to start attracting quality clients."
    } else if (score >= 60) {
      return "Good progress! Consider adding more portfolio examples and detailed service descriptions."
    } else if (score >= 40) {
      return "You're on the right track. Focus on showcasing your best work and defining your unique value proposition."
    } else {
      return "Let's build a strong foundation. Start by clearly defining your services and uploading portfolio examples."
    }
  }

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "audio":
        return <Mic className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "application":
        if (file.type.includes("pdf")) {
          return <FileText className="h-5 w-5 text-red-500" />
        }
        return <FileArchive className="h-5 w-5 text-amber-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6 flex flex-col">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Create Supply Listing</h1>
            <p className="text-muted-foreground">
              AI-powered assistant to help you create an attractive service listing
            </p>
          </div>
          <SimpleDropdown
            trigger={
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            }
          >
            <SimpleDropdownItem onClick={() => console.log("Chat Settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Chat Settings
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={() => console.log("Help & Support")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </SimpleDropdownItem>
          </SimpleDropdown>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Quick Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {supplySuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 whitespace-normal"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 bg-primary/10">
                        <AvatarFallback>
                          <Bot className="h-5 w-5 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                      } ${message.sender === "user" ? "bounce-in" : "scale-in"}`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>

                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs opacity-70">Uploaded files:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.files.map((file, index) => (
                              <Badge
                                key={index}
                                variant={message.sender === "user" ? "secondary" : "outline"}
                                className="flex items-center gap-1 text-xs"
                              >
                                {getFileIcon(file)}
                                <span className="truncate max-w-[100px]">{file.name}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1 bg-primary/10">
                      <AvatarFallback>
                        <Bot className="h-5 w-5 text-primary" />
                      </AvatarFallback>
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

                {isAnalyzing && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1 bg-primary/10">
                      <AvatarFallback>
                        <Bot className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary px-4 py-3 rounded-lg max-w-[80%]">
                      <p className="text-sm mb-2">Analyzing your portfolio files...</p>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {files.length > 0 && (
                <div className="mb-4 p-3 border rounded-md bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Portfolio files to upload ({files.length})</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setFiles([])}>
                      Clear all
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 p-1 pl-2 border rounded-md bg-background text-sm"
                      >
                        {getFileIcon(file)}
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload portfolio files</span>
                </Button>
                <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

                <Input
                  placeholder="Describe your services or ask for help..."
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

                <Button
                  className="flex-shrink-0"
                  onClick={handleSendMessage}
                  disabled={(!input.trim() && files.length === 0) || isTyping || isAnalyzing}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  Upload portfolio examples • Get personalized listing advice
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Listing completeness:</span>
                  <Progress value={requirementScore} className="w-24 h-1.5" />
                  <span className="text-xs font-medium">{requirementScore}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
