"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Users, Search, MessageCircle, Star, MapPin, Clock, CheckCircle, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConnectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: "Client",
      service: "Website Development",
      status: "Active",
      connectedDate: "2025-01-20",
      lastMessage: "Thanks for the quick turnaround!",
      lastMessageTime: "2 hours ago",
      rating: 5,
      avatar: "/placeholder.svg?height=100&width=100",
      location: "New York, NY",
      projectValue: "$2,500",
      isOnline: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      type: "Supplier",
      service: "Plumbing Repair",
      status: "Completed",
      connectedDate: "2025-01-15",
      lastMessage: "Project completed successfully",
      lastMessageTime: "1 day ago",
      rating: 4.8,
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Brooklyn, NY",
      projectValue: "$350",
      isOnline: false,
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      type: "Client",
      service: "Logo Design",
      status: "In Progress",
      connectedDate: "2025-01-25",
      lastMessage: "Could you send the revised designs?",
      lastMessageTime: "30 minutes ago",
      rating: null,
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Los Angeles, CA",
      projectValue: "$800",
      isOnline: true,
    },
    {
      id: 4,
      name: "David Wilson",
      type: "Supplier",
      service: "Moving Services",
      status: "Pending",
      connectedDate: "2025-01-28",
      lastMessage: "When would you like to schedule?",
      lastMessageTime: "5 hours ago",
      rating: null,
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Chicago, IL",
      projectValue: "$1,200",
      isOnline: false,
    },
  ]

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || connection.status.toLowerCase() === filter
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: connections.length,
    active: connections.filter((c) => c.status === "Active").length,
    completed: connections.filter((c) => c.status === "Completed").length,
    pending: connections.filter((c) => c.status === "Pending").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Connections</h1>
            <p className="text-xl text-muted-foreground">Manage your client and supplier relationships</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Connections</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                    <p className="text-3xl font-bold">{stats.active}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold">{stats.completed}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold">{stats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search connections..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={filter === "active" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("active")}
                      >
                        Active
                      </Button>
                      <Button
                        variant={filter === "completed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("completed")}
                      >
                        Completed
                      </Button>
                      <Button
                        variant={filter === "pending" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("pending")}
                      >
                        Pending
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connections List */}
              <div className="space-y-4">
                {filteredConnections.map((connection) => (
                  <Card key={connection.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                              <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {connection.isOnline && (
                              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{connection.name}</h3>
                              <Badge variant={connection.type === "Client" ? "default" : "secondary"}>
                                {connection.type}
                              </Badge>
                              <Badge
                                variant={
                                  connection.status === "Active"
                                    ? "default"
                                    : connection.status === "Completed"
                                      ? "secondary"
                                      : connection.status === "In Progress"
                                        ? "default"
                                        : "outline"
                                }
                                className={
                                  connection.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : connection.status === "Completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : connection.status === "In Progress"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : ""
                                }
                              >
                                {connection.status}
                              </Badge>
                            </div>

                            <p className="text-muted-foreground mb-2">{connection.service}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {connection.location}
                              </div>
                              <div>
                                Project Value: <span className="font-medium">{connection.projectValue}</span>
                              </div>
                              <div>Connected: {new Date(connection.connectedDate).toLocaleDateString()}</div>
                              {connection.rating && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                  {connection.rating}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center text-sm">
                              <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-muted-foreground">Last message: </span>
                              <span className="ml-1">{connection.lastMessage}</span>
                              <span className="text-muted-foreground ml-2">• {connection.lastMessageTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => router.push(`/messages/${connection.id}`)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredConnections.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No connections found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? "No connections match your search criteria."
                        : "You haven't made any connections yet. Start by posting a request or browsing suppliers."}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => router.push("/demand")}>Post Request</Button>
                      <Button variant="outline" onClick={() => router.push("/supply")}>
                        Browse Suppliers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => router.push("/messages")}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    View All Messages
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/demand")}>
                    <Search className="h-4 w-4 mr-2" />
                    Find New Suppliers
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/profile")}>
                    <Star className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">New message from Sarah</p>
                      <p className="text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Project completed with Mike</p>
                      <p className="text-muted-foreground">1 day ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">New connection with Lisa</p>
                      <p className="text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>💡 Connection Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Stay Active</p>
                    <p className="text-muted-foreground">Regular communication builds trust</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Be Professional</p>
                    <p className="text-muted-foreground">Maintain professional standards</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Leave Reviews</p>
                    <p className="text-muted-foreground">Help others make informed decisions</p>
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
