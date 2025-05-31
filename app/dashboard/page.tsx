"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ShoppingCart, Package, ChevronRight, Plus, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { SimpleDropdown, SimpleDropdownItem } from "@/components/ui/simple-dropdown"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "User"
    setUserName(storedName)
  }, [])

  const handleCreateDemand = () => {
    // Set context for chatbot
    sessionStorage.setItem("chatbot-context", "/demand")
    router.push("/chatbot")
  }

  const handleCreateSupply = () => {
    // Set context for chatbot
    sessionStorage.setItem("chatbot-context", "/supply")
    router.push("/chatbot")
  }

  const projects = [
    {
      id: 1,
      title: "Website Development",
      status: "Draft",
      lastEdited: "Today at 2:30 PM",
      type: "demand",
    },
    {
      id: 2,
      title: "Logo Design Project",
      status: "In Progress",
      matches: "10 matches found",
      type: "supply",
    },
    {
      id: 3,
      title: "Content Writing",
      status: "Paused",
      lastEdited: "Paused on Jan 25, 2025",
      type: "demand",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="p-4 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2 fade-in">
            <h2 className="text-2xl font-bold">Hello {userName}</h2>
            <p className="text-gray-600">What would you like to do today?</p>
          </div>

          <SimpleDropdown
            trigger={
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            }
          >
            <SimpleDropdownItem onClick={handleCreateDemand}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Create Demand
            </SimpleDropdownItem>
            <SimpleDropdownItem onClick={handleCreateSupply}>
              <Package className="mr-2 h-4 w-4" />
              Create Supply
            </SimpleDropdownItem>
          </SimpleDropdown>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="slide-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6 text-center space-y-4">
              <ShoppingCart className="h-12 w-12 mx-auto text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Demand</h3>
                <p className="text-sm text-gray-600 mt-1">Looking for services or products?</p>
                <div className="flex items-center justify-center mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Active 5</span>
                </div>
                <Button variant="link" className="text-blue-600 p-0 h-auto mt-2" onClick={() => router.push("/demand")}>
                  View all
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="slide-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6 text-center space-y-4">
              <Package className="h-12 w-12 mx-auto text-green-600" />
              <div>
                <h3 className="text-xl font-semibold">Supply</h3>
                <p className="text-sm text-gray-600 mt-1">Have services or products to offer?</p>
                <div className="flex items-center justify-center mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Active 10</span>
                </div>
                <Button variant="link" className="text-blue-600 p-0 h-auto mt-2" onClick={() => router.push("/supply")}>
                  View all
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Continue Chat</h3>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="slide-in cursor-pointer hover:shadow-md transition-shadow"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onClick={() => router.push(`/chat/${project.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {project.status === "Draft" && (
                          <Badge variant="secondary" className="text-xs">
                            Draft
                          </Badge>
                        )}
                        {project.status === "In Progress" && (
                          <Badge className="text-xs bg-blue-100 text-blue-700">In Progress</Badge>
                        )}
                        {project.status === "Paused" && (
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-700">
                            Paused
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.matches || `Last edited: ${project.lastEdited}`}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
