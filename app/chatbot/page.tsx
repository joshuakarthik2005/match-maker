"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Send, Bot, Upload, FileText, ImageIcon, FileArchive, Mic, Video, X, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  files?: File[]
}

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [requirementScore, setRequirementScore] = useState(0)
  const [contextPage, setContextPage] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Get context from where user came from
  useEffect(() => {
    const context = sessionStorage.getItem("chatbot-context") || "/home"
    setContextPage(context)

    // Initialize with context-aware welcome message
    const welcomeMessage = getContextualWelcomeMessage(context)
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

  const getContextualWelcomeMessage = (path: string): string => {
    const pageContext = {
      "/home":
        "Hi! I see you're on the home page. I can help you navigate the platform, understand how matching works, or assist with creating your first request. What would you like to know?",
      "/demand":
        "Hello! I see you're looking at demand opportunities. I can help you create a professional service request, understand pricing strategies, or find the right suppliers for your needs. How can I assist you?",
      "/supply":
        "Hi there! I notice you're on the supply side. I can help you create compelling listings, optimize your profile for better visibility, or understand how to respond to buyer inquiries effectively. What would you like help with?",
      "/browse":
        "Hello! I see you're browsing available services. I can help you filter results, understand provider ratings, compare options, or guide you through the hiring process. What are you looking for?",
      "/matches":
        "Hi! I see you're checking your matches. I can help you understand match scores, improve your profile for better matches, or guide you on how to engage with potential partners. How can I help?",
      "/messages":
        "Hello! I notice you're in your messages. I can help you craft professional responses, understand communication best practices, or resolve any issues with conversations. What do you need help with?",
      "/profile":
        "Hi there! I see you're working on your profile. I can help you optimize your profile for better visibility, suggest improvements, or guide you through verification processes. How can I assist?",
      "/dashboard":
        "Hello! I see you're on your dashboard. I can help you understand your metrics, improve your performance, or guide you through platform features. What would you like to know about?",
    }

    return (
      pageContext[path as keyof typeof pageContext] ||
      "Hi there! I'm your AI assistant. I can help you with anything related to our platform - from creating requests to finding the perfect matches. How can I help you today?"
    )
  }

  const getPageSpecificSuggestions = (path: string): string[] => {
    const suggestions = {
      "/home": [
        "How does the matching algorithm work?",
        "What's the difference between demand and supply?",
        "How do I get started on the platform?",
        "Show me success stories",
      ],
      "/demand": [
        "Help me create a service request",
        "What makes a good project description?",
        "How should I set my budget?",
        "How do I choose the right supplier?",
      ],
      "/supply": [
        "How do I create an attractive listing?",
        "What should I include in my portfolio?",
        "How do I set competitive pricing?",
        "Tips for getting more inquiries",
      ],
      "/browse": [
        "How do I filter search results?",
        "What do the ratings mean?",
        "How do I compare different providers?",
        "What questions should I ask providers?",
      ],
      "/matches": [
        "Why am I getting these matches?",
        "How can I improve my match score?",
        "How do I contact a match?",
        "What if I don't like my matches?",
      ],
      "/messages": [
        "How do I write a professional message?",
        "What should I include in my first message?",
        "How do I negotiate terms?",
        "How do I handle difficult conversations?",
      ],
      "/profile": [
        "How do I optimize my profile?",
        "What photos should I upload?",
        "How do I get verified?",
        "How do I showcase my skills?",
      ],
      "/dashboard": [
        "What do these metrics mean?",
        "How can I improve my performance?",
        "How do I track my earnings?",
        "What are the best practices?",
      ],
    }

    return (
      suggestions[path as keyof typeof suggestions] || [
        "How does the platform work?",
        "Help me get started",
        "Show me around",
        "What can you help me with?",
      ]
    )
  }

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
    // Context-aware responses based on current page
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

        let contextualResponse = ""
        if (contextPage.includes("/demand")) {
          contextualResponse = "Perfect! These files will help create a detailed service request. "
        } else if (contextPage.includes("/supply")) {
          contextualResponse = "Great! These files will enhance your service listing and portfolio. "
        } else {
          contextualResponse = "Excellent! These files will help me understand your needs better. "
        }

        const botResponse: Message = {
          id: Date.now().toString(),
          content: `${contextualResponse}I've analyzed the ${userFiles.length} ${userFiles.length === 1 ? "file" : "files"} you uploaded (${uniqueTypes.join(", ")}). ${userMessage ? `Combined with your message: "${userMessage}"` : ""}

Based on this information and your current context, I've updated your requirement profile. Your completeness is now at ${newScore}%.

${getContextualAdvice(contextPage, newScore)}`,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
      }, 2000)

      return
    }

    setTimeout(() => {
      const botResponse = getContextualResponse(userMessage, contextPage)

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

  const getContextualResponse = (message: string, context: string): string => {
    const lowerCaseMessage = message.toLowerCase()

    // Context-specific responses
    if (context.includes("/demand")) {
      if (lowerCaseMessage.includes("create") || lowerCaseMessage.includes("request")) {
        return `Since you're on the demand page, I can help you create a compelling service request. Here's what makes a great request:

• **Clear title** - Be specific about what you need
• **Detailed description** - Include scope, requirements, and expectations  
• **Realistic budget** - Research market rates for your project
• **Timeline** - When do you need this completed?
• **Skills required** - What expertise should the provider have?

Would you like me to guide you through creating a request step by step?`
      }
    } else if (context.includes("/supply")) {
      if (lowerCaseMessage.includes("listing") || lowerCaseMessage.includes("profile")) {
        return `I see you're working on your supply profile! Here's how to create a standout listing:

• **Professional headline** - Clearly state what you offer
• **Compelling description** - Highlight your unique value proposition
• **Portfolio showcase** - Upload your best work examples
• **Competitive pricing** - Research what others charge
• **Skills & certifications** - List relevant qualifications
• **Availability** - Be clear about your schedule

Want me to help you optimize any specific section?`
      }
    } else if (context.includes("/browse")) {
      if (lowerCaseMessage.includes("filter") || lowerCaseMessage.includes("search")) {
        return `Great! I can help you find exactly what you're looking for. Here are the best filtering strategies:

• **Use specific keywords** - Be precise about your needs
• **Set budget range** - Filter by what you can afford
• **Check ratings** - Look for 4.5+ star providers
• **Review portfolios** - See examples of their work
• **Read reviews** - Learn from others' experiences
• **Location matters** - Consider time zones for communication

What type of service are you looking for?`
      }
    }

    // General responses with context awareness
    if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("how")) {
      return `I'm here to help! Based on where you are in the platform, here are some things I can assist with:

${getContextualAdvice(context, requirementScore)}

Feel free to ask me anything specific, or I can guide you through any process step by step.`
    }

    // Default contextual response
    const newScore = Math.min(requirementScore + 10, 100)
    setRequirementScore(newScore)

    return `Thanks for that information! I've noted your request and updated your profile (${newScore}% complete).

${getContextualAdvice(context, newScore)}

Is there anything specific about ${getPageName(context)} that you'd like help with?`
  }

  const getContextualAdvice = (context: string, score: number): string => {
    if (context.includes("/demand")) {
      return score >= 70
        ? "Your request details look comprehensive! Ready to post and start receiving proposals?"
        : "To attract quality suppliers, consider adding more details about your project scope, timeline, and budget."
    } else if (context.includes("/supply")) {
      return score >= 70
        ? "Your profile is looking great! You should start getting quality inquiries soon."
        : "To improve your visibility, consider adding more portfolio items, skills, and client testimonials."
    }
    return score >= 70
      ? "You're all set! Your profile is comprehensive and should perform well on the platform."
      : "Consider adding more details to improve your success rate on the platform."
  }

  const getPageName = (context: string): string => {
    const pageNames = {
      "/demand": "creating service requests",
      "/supply": "managing your listings",
      "/browse": "finding services",
      "/matches": "your matches",
      "/messages": "messaging",
      "/profile": "your profile",
      "/dashboard": "your dashboard",
    }
    return pageNames[context as keyof typeof pageNames] || "the platform"
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

  const suggestions = getPageSpecificSuggestions(contextPage)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6 flex flex-col">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
            <p className="text-muted-foreground">
              Context-aware help for {getPageName(contextPage)} • Upload files and ask questions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Quick Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestions.map((suggestion, index) => (
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
                      <p className="text-sm mb-2">Analyzing your files...</p>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {files.length > 0 && (
                <div className="mb-4 p-3 border rounded-md bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Files to upload ({files.length})</h3>
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
                  <span className="sr-only">Upload files</span>
                </Button>
                <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

                <Input
                  placeholder={`Ask about ${getPageName(contextPage)}...`}
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
                  Context: {getPageName(contextPage)} • Upload files for better assistance
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Profile completeness:</span>
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
