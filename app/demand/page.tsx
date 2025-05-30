"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Search, Plus, Clock, DollarSign, MapPin, Filter, TrendingUp, Users, Star, MessageCircle } from "lucide-react"
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select"
import { useRouter } from "next/navigation"

export default function DemandPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for active demands
  const activeDemands = [
    {
      id: 1,
      title: "Emergency Plumbing Repair",
      category: "Home Services",
      budget: "$200-500",
      urgency: "Urgent",
      location: "New York, NY",
      description: "Need immediate plumbing repair for burst pipe in kitchen.",
      responses: 12,
      timePosted: "2 hours ago",
      status: "Active",
    },
    {
      id: 2,
      title: "Website Development",
      category: "Technology",
      budget: "$2000-5000",
      urgency: "1-2 weeks",
      location: "Remote",
      description: "Looking for experienced developer to build e-commerce website.",
      responses: 8,
      timePosted: "1 day ago",
      status: "Active",
    },
    {
      id: 3,
      title: "Moving Services",
      category: "Transportation",
      budget: "$300-800",
      urgency: "This weekend",
      location: "Chicago, IL",
      description: "Need help moving 2-bedroom apartment across town.",
      responses: 15,
      timePosted: "3 hours ago",
      status: "Active",
    },
  ]

  const trendingDemands = [
    "Web Development",
    "Plumbing Services",
    "Graphic Design",
    "Moving Help",
    "Tutoring",
    "House Cleaning",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Find Services & Products</h1>
                <p className="text-xl text-muted-foreground">
                  Post your requirements and connect with verified suppliers
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20"
                  onClick={() => router.push("/chatbot")}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat Assistant
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => router.push("/create-request")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Request
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
                    <p className="text-3xl font-bold">1,234</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                    <p className="text-3xl font-bold">2.4h</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">-15% faster than average</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold">94%</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Successful matches</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                    <p className="text-3xl font-bold">5,678</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Ready to help</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search for services, products, or suppliers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <SimpleSelect defaultValue="all">
                        <SimpleSelectItem value="all">All Categories</SimpleSelectItem>
                        <SimpleSelectItem value="home">Home Services</SimpleSelectItem>
                        <SimpleSelectItem value="tech">Technology</SimpleSelectItem>
                        <SimpleSelectItem value="professional">Professional</SimpleSelectItem>
                      </SimpleSelect>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Active Requests */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Your Active Requests</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeDemands.map((demand) => (
                      <div key={demand.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{demand.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{demand.category}</Badge>
                              <Badge variant={demand.urgency === "Urgent" ? "destructive" : "outline"}>
                                {demand.urgency}
                              </Badge>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{demand.status}</Badge>
                        </div>

                        <p className="text-muted-foreground mb-3">{demand.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {demand.budget}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {demand.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {demand.timePosted}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-600">
                            {demand.responses} responses received
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => router.push(`/matches/${demand.id}`)}>
                              View Matches
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => router.push("/create-request")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Request
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/supply")}>
                    <Search className="h-4 w-4 mr-2" />
                    Browse Suppliers
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/messages")}>
                    <Users className="h-4 w-4 mr-2" />
                    View Messages
                  </Button>
                </CardContent>
              </Card>

              {/* Trending Demands */}
              <Card>
                <CardHeader>
                  <CardTitle>Trending This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingDemands.map((trend, index) => (
                      <div
                        key={trend}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer"
                      >
                        <span className="text-sm">{trend}</span>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>💡 Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Be Specific</p>
                    <p className="text-muted-foreground">Detailed requirements get better responses</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Set Clear Budget</p>
                    <p className="text-muted-foreground">Transparent pricing attracts quality suppliers</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Respond Quickly</p>
                    <p className="text-muted-foreground">Fast responses improve your success rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
