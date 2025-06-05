"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import {
  Users,
  Search,
  MessageCircle,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from "lucide-react"
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
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
      company: "Johnson Marketing Co.",
      joinedDate: "2024-08-15",
      totalProjects: 3,
      bio: "Marketing professional looking for quality web development services for my growing business.",
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
      phone: "+1 (555) 987-6543",
      email: "mike.chen@plumbingpro.com",
      company: "Chen's Plumbing Services",
      joinedDate: "2023-03-10",
      totalProjects: 47,
      bio: "Licensed plumber with 15+ years of experience in residential and commercial plumbing.",
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

      <main className="px-3 py-4 sm:px-4 sm:py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">My Connections</h1>
          <p className="text-base sm:text-xl text-muted-foreground">Manage your client and supplier relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.active}</p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.completed}</p>
                </div>
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
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
              <div className="flex gap-2 overflow-x-auto">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connections List */}
        <div className="space-y-4">
          {filteredConnections.map((connection) => (
            <Card key={connection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                        <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {connection.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500 border-2 border-background" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg">{connection.name}</h3>
                        <Badge variant={connection.type === "Client" ? "default" : "secondary"}>
                          {connection.type}
                        </Badge>
                        <Badge
                          variant={connection.status === "Active" ? "default" : "secondary"}
                          className={
                            connection.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }
                        >
                          {connection.status}
                        </Badge>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground mb-2">{connection.service}</p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{connection.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Project Value: {connection.projectValue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Connected: {new Date(connection.connectedDate).toLocaleDateString()}</span>
                        </div>
                        {connection.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                            <span>{connection.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          <span className="truncate">{connection.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          <span className="truncate">{connection.email}</span>
                        </div>
                      </div>

                      {/* Last Message */}
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-muted-foreground">Last message: </span>
                          <span className="truncate">{connection.lastMessage}</span>
                          <span className="text-muted-foreground"> • {connection.lastMessageTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/messages/${connection.id}`)}
                      className="w-full sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
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
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={() => router.push("/demand")}>Post Request</Button>
                <Button variant="outline" onClick={() => router.push("/supply")}>
                  Browse Suppliers
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
