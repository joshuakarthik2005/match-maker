"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { Send, ArrowLeft, Paperclip, Eye, Copy } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isSystemMessage?: boolean
  isHelpMessage?: boolean
}

interface DemandData {
  product?: string
  quantity?: string
  itemType?: string
  budget?: string
  location?: string
  requiredDate?: string
}

interface SupplyData {
  service?: string
  experience?: string
  portfolio?: string
  pricing?: string
  availableDates?: string[]
  location?: string
}

type ConversationStep =
  | "product"
  | "quantity"
  | "itemType"
  | "budget"
  | "location"
  | "requiredDate"
  | "complete"
  | "service"
  | "experience"
  | "portfolio"
  | "pricing"
  | "availableDates"
  | "supplyLocation"
  | "supplyComplete"

type RequestStatus = "draft" | "paused" | "active" | "closed"

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<ConversationStep>("product")
  const [conversationType, setConversationType] = useState<"demand" | "supply">("demand")
  const [demandData, setDemandData] = useState<DemandData>({})
  const [supplyData, setSupplyData] = useState<SupplyData>({})
  const [showPreview, setShowPreview] = useState(false)
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("draft")
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [statusDialogMessage, setStatusDialogMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user came from Create Demand or Create Supply
    const context = sessionStorage.getItem("chatbot-context") || ""
    const type = context.includes("demand") ? "demand" : context.includes("supply") ? "supply" : "demand"
    setConversationType(type)

    // Set initial step based on type
    setCurrentStep(type === "demand" ? "product" : "service")

    // Initialize with welcome message
    const welcomeMessage =
      type === "demand" ? "Welcome! What product are you looking for?" : "Welcome! What service do you want to offer?"

    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getQuickHelpSuggestions = (): string[] => {
    if (conversationType === "demand") {
      switch (currentStep) {
        case "product":
          return [
            "What types of products can I request?",
            "How do I describe my product needs?",
            "Can I request multiple products?",
            "What details should I include?",
          ]
        case "quantity":
          return [
            "How do I determine the right quantity?",
            "Can I change quantity later?",
            "What if I need a large volume?",
            "Do suppliers offer bulk discounts?",
          ]
        case "itemType":
          return [
            "How specific should I be about the item type?",
            "What if I'm flexible on the model?",
            "Should I mention alternatives?",
            "How do I specify technical requirements?",
          ]
        case "budget":
          return [
            "How should I set my budget?",
            "What's a reasonable price range?",
            "Should I include taxes in my budget?",
            "Can I negotiate after setting a budget?",
          ]
        case "location":
          return [
            "How do delivery locations affect pricing?",
            "Can I request international shipping?",
            "What if I need delivery to multiple locations?",
            "How do I specify delivery instructions?",
          ]
        case "requiredDate":
          return [
            "How far in advance should I plan?",
            "What if I need it urgently?",
            "Should I give myself buffer time?",
            "What if my date is flexible?",
          ]
        default:
          return [
            "Help me create a service request",
            "What makes a good project description?",
            "How should I set my budget?",
            "How do I choose the right supplier?",
          ]
      }
    } else {
      switch (currentStep) {
        case "service":
          return [
            "How do I describe my service effectively?",
            "What services are in high demand?",
            "How specific should my service offering be?",
            "Should I list multiple services?",
          ]
        case "experience":
          return [
            "How do I showcase my experience?",
            "Does experience level affect pricing?",
            "What if I'm new to this service?",
            "Should I mention certifications?",
          ]
        case "portfolio":
          return [
            "What makes a good portfolio?",
            "How many examples should I include?",
            "What if I can't share previous work?",
            "How do I describe confidential projects?",
          ]
        case "pricing":
          return [
            "How should I set my pricing?",
            "What pricing models work best?",
            "Should I offer different packages?",
            "How do I stay competitive with pricing?",
          ]
        case "availableDates":
          return [
            "How should I set my delivery timeline?",
            "Should I include buffer time?",
            "What if I can deliver earlier?",
            "How do I handle rush orders?",
          ]
        case "supplyLocation":
          return [
            "Does my location matter for services?",
            "Should I offer remote services?",
            "How does location affect pricing?",
            "Can I serve multiple locations?",
          ]
        default:
          return [
            "Help me create a service listing",
            "What makes a good portfolio?",
            "How should I set my pricing?",
            "How do I attract the right clients?",
          ]
      }
    }
  }

  const getHelpResponse = (question: string): string => {
    const helpResponses: { [key: string]: string } = {
      // Demand help responses
      "What types of products can I request?":
        "You can request any physical products like electronics, furniture, clothing, books, home appliances, sports equipment, and more. Our platform connects you with suppliers for various product categories.",
      "How do I describe my product needs?":
        "Be specific about the product name, brand preferences, specifications, quality requirements, and any special features you need. The more details you provide, the better suppliers can understand your needs.",
      "Can I request multiple products?":
        "Yes, you can request multiple products in a single request or create separate requests for different products. For bulk orders with multiple items, mention this in your description.",
      "What details should I include?":
        "Include product specifications, preferred brands, quality standards, packaging requirements, and any certifications needed. This helps suppliers provide accurate quotes.",

      "How do I determine the right quantity?":
        "Consider your actual needs, storage capacity, and budget. Start with smaller quantities for new suppliers to test quality before placing larger orders.",
      "Can I change quantity later?":
        "You can discuss quantity changes with suppliers before finalizing the order. However, significant changes might affect pricing and delivery timelines.",
      "What if I need a large volume?":
        "For bulk orders, mention this upfront as suppliers often offer volume discounts. You may also need to discuss extended delivery timelines for large quantities.",
      "Do suppliers offer bulk discounts?":
        "Yes, most suppliers offer better pricing for larger quantities. The discount percentage varies by product and supplier, so compare multiple quotes.",

      "How specific should I be about the item type?":
        "Be as specific as possible about the exact model, specifications, and features you need. This ensures you get accurate quotes and the right product.",
      "What if I'm flexible on the model?":
        "If you're open to alternatives, mention this and specify your key requirements. Suppliers can suggest similar products that might offer better value.",
      "Should I mention alternatives?":
        "Yes, mentioning acceptable alternatives gives suppliers more options to work with and might lead to better pricing or availability.",
      "How do I specify technical requirements?":
        "List all technical specifications, compatibility requirements, certifications needed, and performance standards. Include any technical documentation if available.",

      "How should I set my budget?":
        "Research market prices for similar products, consider quality requirements, and set a realistic range. Include some buffer for unexpected costs like shipping or taxes.",
      "What's a reasonable price range?":
        "Price ranges vary by product category. Research online marketplaces and competitor pricing to set a competitive budget that attracts quality suppliers.",
      "Should I include taxes in my budget?":
        "Specify whether your budget includes or excludes taxes, shipping, and other fees. This helps suppliers provide accurate quotes.",
      "Can I negotiate after setting a budget?":
        "Yes, budgets are starting points for negotiation. Suppliers may offer different pricing based on quantity, payment terms, or delivery schedules.",

      "How do delivery locations affect pricing?":
        "Remote or international locations typically cost more for shipping. Urban areas usually have better delivery options and lower costs.",
      "Can I request international shipping?":
        "Yes, but consider customs duties, longer delivery times, and higher shipping costs. Ensure suppliers can handle international shipping requirements.",
      "What if I need delivery to multiple locations?":
        "Mention all delivery locations upfront. Some suppliers offer consolidated shipping, while others might charge separately for each location.",
      "How do I specify delivery instructions?":
        "Include specific addresses, contact persons, delivery time preferences, and any special handling requirements like fragile items or security protocols.",

      "How far in advance should I plan?":
        "Plan at least 1-2 weeks in advance for standard products, and 4-6 weeks for custom or specialized items. This gives suppliers time to prepare and ensures better pricing.",
      "What if I need it urgently?":
        "For urgent requests, be prepared to pay premium rates and have limited supplier options. Clearly communicate your urgency and be flexible on other requirements.",
      "Should I give myself buffer time?":
        "Yes, providing multiple acceptable dates increases your chances of finding available suppliers and may result in better pricing.",
      "What if my date is flexible?":
        "Flexible dates often result in better pricing as suppliers can optimize their schedules. Mention your flexibility to get more competitive offers.",

      // Supply help responses
      "How do I describe my service effectively?":
        "Use clear, specific language to describe what you offer. Focus on the value you provide, your unique approach, and the problems you solve for clients.",
      "What services are in high demand?":
        "Digital services like web development, mobile apps, digital marketing, content creation, and consulting are currently in high demand. Tech and creative services perform well.",
      "How specific should my service offering be?":
        "Be specific enough to attract the right clients but broad enough to capture various opportunities. Focus on your core expertise while mentioning related skills.",
      "Should I list multiple services?":
        "You can offer multiple related services, but ensure you can deliver quality in all areas. It's better to excel in fewer services than to be mediocre in many.",

      "How do I showcase my experience?":
        "Mention years of experience, number of projects completed, types of clients served, and any notable achievements. Use specific numbers and results when possible.",
      "Does experience level affect pricing?":
        "Yes, more experienced professionals typically command higher rates. However, newer professionals can compete with competitive pricing and exceptional service.",
      "What if I'm new to this service?":
        "Focus on your transferable skills, education, certifications, and any personal projects. Offer competitive rates and exceptional service to build your reputation.",
      "Should I mention certifications?":
        "Yes, relevant certifications add credibility and can justify higher rates. Include industry-recognized certifications and ongoing education.",

      "What makes a good portfolio?":
        "A good portfolio shows diverse, high-quality work that demonstrates your skills and range. Include case studies with challenges, solutions, and results achieved.",
      "How many examples should I include?":
        "Include 5-10 of your best, most relevant examples. Quality is more important than quantity. Ensure each example showcases different skills or approaches.",
      "What if I can't share previous work?":
        "Create sample projects, use anonymized case studies, or describe projects without revealing confidential details. Focus on your process and results achieved.",
      "How do I describe confidential projects?":
        "Focus on your role, challenges overcome, skills used, and results achieved without revealing client names or sensitive details. Use generic industry terms.",

      "How should I set my pricing?":
        "Research market rates for your skill level and location. Consider your experience, the value you provide, and your target profit margin. Start competitive and adjust based on demand.",
      "What pricing models work best?":
        "Hourly rates work for ongoing work, fixed prices for defined projects, and retainers for long-term relationships. Choose based on project type and client preference.",
      "Should I offer different packages?":
        "Yes, offering basic, standard, and premium packages gives clients options and can increase your average project value. Clearly define what's included in each package.",
      "How do I stay competitive with pricing?":
        "Monitor market rates regularly, focus on value over price, improve your skills to justify higher rates, and consider offering unique services or faster delivery.",

      "How should I set my delivery timeline?":
        "Provide at least 3-5 available dates over the next 2-4 weeks. This gives clients flexibility while showing your availability.",
      "Should I include buffer time?":
        "Include weekends if you're willing to work them, as this can be a competitive advantage. Many clients appreciate weekend availability for urgent projects.",
      "What if I can deliver earlier?":
        "Update your available dates regularly to keep them current. Clients appreciate accurate, up-to-date availability information.",
      "How do I handle rush orders?":
        "Plan your availability 2-4 weeks in advance. This helps with scheduling and shows clients you're organized and professional.",

      "Does my location matter for services?":
        "For remote services, location matters less, but time zones and local market rates can be factors. For on-site services, location is crucial.",
      "Should I offer remote services?":
        "Remote services expand your market reach and often have higher demand. Many clients prefer remote work for cost and convenience.",
      "How does location affect pricing?":
        "Local market rates vary significantly. Research rates in your area and target markets. Remote work often allows access to higher-paying markets.",
      "Can I serve multiple locations?":
        "Yes, especially for remote services. For on-site work, consider travel costs and time when serving multiple locations.",
    }

    return (
      helpResponses[question] ||
      "I'd be happy to help with that question. Could you please be more specific about what you'd like to know?"
    )
  }

  const isQuickHelpQuestion = (userInput: string): boolean => {
    const allHelpQuestions = getQuickHelpSuggestions()
    return allHelpQuestions.includes(userInput)
  }

  const handleQuickHelpClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const generateSummary = (): string => {
    if (conversationType === "demand") {
      const { product, quantity, itemType, budget, location, requiredDate } = demandData
      return `I am looking to purchase ${quantity || "some"} ${product || "product"} of ${itemType || "type"} for ₹${budget || "budget"}. I need this by ${requiredDate || "date"} and can pick up from ${location || "location"}.`
    } else {
      const { service, experience, portfolio, pricing, availableDates, location } = supplyData
      return `I offer ${service || "service"} with ${experience || "experience"} years of experience. My portfolio includes ${portfolio || "portfolio details"}. My pricing is ${pricing || "pricing details"}. I can deliver by ${availableDates?.join(", ") || "available dates"} and I'm located in ${location || "location"}.`
    }
  }

  const getStatusColor = (status: RequestStatus): string => {
    switch (status) {
      case "draft":
        return "text-blue-500"
      case "paused":
        return "text-orange-500"
      case "active":
        return "text-green-500"
      case "closed":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const handleStatusAction = (action: "save" | "submit" | "pause" | "close" | "cancel" | "resume") => {
    switch (action) {
      case "save":
        setRequestStatus("paused")
        setStatusDialogMessage("Your request has been saved as draft.")
        setShowStatusDialog(true)
        setShowPreview(false)
        break
      case "submit":
        setRequestStatus("active")
        setShowPreview(false)
        // Handle actual submission logic here
        break
      case "pause":
        setRequestStatus("paused")
        setStatusDialogMessage("Your request has been paused.")
        setShowStatusDialog(true)
        setShowPreview(false)
        break
      case "close":
        setRequestStatus("closed")
        setStatusDialogMessage("Your request has been closed.")
        setShowStatusDialog(true)
        setShowPreview(false)
        break
      case "cancel":
        setShowPreview(false)
        break
      case "resume":
        setRequestStatus("active")
        setStatusDialogMessage("Your request has been resumed and is now active.")
        setShowStatusDialog(true)
        setShowPreview(false)
        break
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      isHelpMessage: isQuickHelpQuestion(input.trim()),
    }

    setMessages((prev) => [...prev, userMessage])

    // Check if this is a help question
    if (isQuickHelpQuestion(input.trim())) {
      handleHelpQuestion(input.trim())
    } else {
      // Process the response based on current step
      processStep(input.trim())
    }

    setInput("")
  }

  const handleHelpQuestion = (question: string) => {
    setTimeout(() => {
      const helpResponse = getHelpResponse(question)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: helpResponse,
        sender: "bot",
        timestamp: new Date(),
        isHelpMessage: true,
      }
      setMessages((prev) => [...prev, botMessage])

      // After answering the help question, remind user of the current step
      setTimeout(() => {
        const reminderMessage = getCurrentStepReminder()
        const reminderBotMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: reminderMessage,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, reminderBotMessage])
      }, 1000)
    }, 1000)
  }

  const getCurrentStepReminder = (): string => {
    if (conversationType === "demand") {
      switch (currentStep) {
        case "product":
          return "Now, what product are you looking for?"
        case "quantity":
          return "How many units do you need?"
        case "itemType":
          return "What type of item is this?"
        case "budget":
          return "What is your price range or budget?"
        case "location":
          return "Where should it be delivered?"
        case "requiredDate":
          return "On or before which date do you need this delivered? (Please provide a date like 'June 5, 2025')"
        default:
          return "Please continue with your request."
      }
    } else {
      switch (currentStep) {
        case "service":
          return "What service do you want to offer?"
        case "experience":
          return "How many years of experience do you have?"
        case "portfolio":
          return "Can you describe your portfolio or past work?"
        case "pricing":
          return "What are your pricing rates?"
        case "availableDates":
          return "On or before which date can you deliver/complete this? (Please provide a date like 'June 5, 2025')"
        case "supplyLocation":
          return "Where are you located?"
        default:
          return "Please continue with your listing."
      }
    }
  }

  const processStep = (userInput: string) => {
    if (conversationType === "demand") {
      processDemandStep(userInput)
    } else {
      processSupplyStep(userInput)
    }
  }

  const processDemandStep = (userInput: string) => {
    let nextStep: ConversationStep = currentStep
    let botResponse = ""

    switch (currentStep) {
      case "product":
        setDemandData((prev) => ({ ...prev, product: userInput }))
        botResponse = "How many units do you need?"
        nextStep = "quantity"
        break
      case "quantity":
        setDemandData((prev) => ({ ...prev, quantity: userInput }))
        botResponse = "What type of item is this?"
        nextStep = "itemType"
        break
      case "itemType":
        setDemandData((prev) => ({ ...prev, itemType: userInput }))
        botResponse = "What is your price range or budget?"
        nextStep = "budget"
        break
      case "budget":
        setDemandData((prev) => ({ ...prev, budget: userInput }))
        botResponse = "Where should it be delivered?"
        nextStep = "location"
        break
      case "location":
        setDemandData((prev) => ({ ...prev, location: userInput }))
        botResponse = "On or before which date do you need this delivered? (Please provide a date like 'June 5, 2025')"
        nextStep = "requiredDate"
        break
      case "requiredDate":
        // Validate date is not in the past
        const inputDate = new Date(userInput)
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Reset time to start of day for comparison

        if (inputDate < today) {
          setTimeout(() => {
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: "Please provide a future date. Past dates are not allowed.",
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
          }, 1000)
          return
        }

        setDemandData((prev) => ({ ...prev, requiredDate: userInput }))
        showDemandSummary(userInput)
        nextStep = "complete"
        return
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setCurrentStep(nextStep)
    }, 1000)
  }

  const processSupplyStep = (userInput: string) => {
    let nextStep: ConversationStep = currentStep
    let botResponse = ""

    switch (currentStep) {
      case "service":
        setSupplyData((prev) => ({ ...prev, service: userInput }))
        botResponse = "How many years of experience do you have?"
        nextStep = "experience"
        break
      case "experience":
        setSupplyData((prev) => ({ ...prev, experience: userInput }))
        botResponse = "Can you describe your portfolio or past work?"
        nextStep = "portfolio"
        break
      case "portfolio":
        setSupplyData((prev) => ({ ...prev, portfolio: userInput }))
        botResponse = "What are your pricing rates?"
        nextStep = "pricing"
        break
      case "pricing":
        setSupplyData((prev) => ({ ...prev, pricing: userInput }))
        botResponse =
          "On or before which date can you deliver/complete this? (Please provide a date like 'June 5, 2025')"
        nextStep = "availableDates"
        break
      case "availableDates":
        // Parse and validate dates
        const dates = userInput.split(",").map((date) => date.trim())
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const hasInvalidDates = dates.some((dateStr) => {
          const date = new Date(dateStr)
          return date < today
        })

        if (hasInvalidDates) {
          setTimeout(() => {
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: "Please provide future dates only. Past dates are not allowed.",
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
          }, 1000)
          return
        }

        setSupplyData((prev) => ({ ...prev, availableDates: dates }))
        botResponse = "Where are you located?"
        nextStep = "supplyLocation"
        break
      case "supplyLocation":
        setSupplyData((prev) => ({ ...prev, location: userInput }))
        showSupplySummary(userInput)
        nextStep = "supplyComplete"
        return
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setCurrentStep(nextStep)
    }, 1000)
  }

  const showDemandSummary = (requiredDate: string) => {
    const finalData = { ...demandData, requiredDate }

    setTimeout(() => {
      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "✅ Demand submitted successfully!",
        sender: "bot",
        timestamp: new Date(),
        isSystemMessage: true,
      }

      const summaryMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: `📦 Product: ${finalData.product}
🔢 Quantity: ${finalData.quantity}
📱 Item Type: ${finalData.itemType}
💰 Budget: ₹${finalData.budget}
📍 Location: ${finalData.location}
📅 Required By: ${finalData.requiredDate}`,
        sender: "bot",
        timestamp: new Date(),
        isSystemMessage: true,
      }

      setMessages((prev) => [...prev, successMessage, summaryMessage])
    }, 1000)
  }

  const showSupplySummary = (location: string) => {
    const finalData = { ...supplyData, location }

    setTimeout(() => {
      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "✅ Supply listing submitted successfully!",
        sender: "bot",
        timestamp: new Date(),
        isSystemMessage: true,
      }

      const summaryMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: `🛠️ Service: ${finalData.service}
⭐ Experience: ${finalData.experience}
💼 Portfolio: ${finalData.portfolio}
💰 Pricing: ${finalData.pricing}
📅 Can Deliver By: ${finalData.availableDates?.join(", ")}
📍 Location: ${finalData.location}`,
        sender: "bot",
        timestamp: new Date(),
        isSystemMessage: true,
      }

      setMessages((prev) => [...prev, successMessage, summaryMessage])
    }, 1000)
  }

  const isComplete = currentStep === "complete" || currentStep === "supplyComplete"
  const quickHelpSuggestions = getQuickHelpSuggestions()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h1 className="text-lg font-semibold">
              {conversationType === "demand" ? "Create Demand" : "Create Supply"}
            </h1>
          </div>
        </div>

        {/* Preview Button - Always visible */}
        <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>

      <div className="flex-1 flex p-4 gap-4">
        {/* Quick Help Box - hidden on mobile */}
        {(conversationType === "demand" || conversationType === "supply") && (
          <div className="w-80 shrink-0 hidden sm:block">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {quickHelpSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-0 hover:bg-transparent hover:underline whitespace-normal"
                    onClick={() => handleQuickHelpClick(suggestion)}
                  >
                    <p className="text-base font-medium break-words">{suggestion}</p>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl break-words ${
                    message.sender === "user"
                      ? message.isHelpMessage
                        ? "bg-green-500 text-white rounded-br-md"
                        : "bg-blue-500 text-white rounded-br-md"
                      : message.isSystemMessage
                        ? "bg-gray-200 text-gray-800 rounded-bl-md"
                        : message.isHelpMessage
                          ? "bg-yellow-100 text-gray-800 rounded-bl-md border border-yellow-300"
                          : "bg-gray-200 text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!isComplete && (
            <div className="mt-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {isComplete && (
            <div className="mt-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push(conversationType === "demand" ? "/demand" : "/supply")}
                  className="flex-1"
                >
                  View {conversationType === "demand" ? "Demands" : "Supplies"}
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                  Create Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle>Preview</DialogTitle>
            <div className={`text-sm font-medium ${getStatusColor(requestStatus)}`}>Status: {requestStatus}</div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {conversationType === "demand" ? "Demand Summary" : "Supply Summary"}
              </h3>

              <div className="relative border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                <p className="text-sm text-gray-700 leading-relaxed">{generateSummary()}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => navigator.clipboard.writeText(generateSummary())}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {requestStatus === "draft" && (
                <>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleStatusAction("save")}>
                      Save for later
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleStatusAction("cancel")}>
                      Cancel
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleStatusAction("submit")}
                  >
                    Submit
                  </Button>
                </>
              )}

              {requestStatus === "active" && (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => handleStatusAction("pause")}>
                    Pause
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleStatusAction("close")}>
                    Close
                  </Button>
                </div>
              )}

              {requestStatus === "paused" && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => handleStatusAction("resume")}
                  >
                    Resume
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleStatusAction("close")}>
                    Close
                  </Button>
                </div>
              )}

              {requestStatus === "closed" && (
                <Button variant="outline" className="w-full" onClick={() => handleStatusAction("cancel")}>
                  Close Preview
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="sm:max-w-sm">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">
              {requestStatus === "paused" ? "Saved" : requestStatus === "closed" ? "Closed" : "Status Updated"}
            </h3>
            <p className="text-sm text-gray-600">{statusDialogMessage}</p>
            <Button className="w-full" onClick={() => setShowStatusDialog(false)}>
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
