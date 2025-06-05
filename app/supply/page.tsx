"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { DollarSign, Eye, MessageSquare, Star, MoreHorizontal, Users } from "lucide-react"
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplyPage() {
  const router = useRouter()

  // Mock data for user's listings
  const myListings = [
    {
      id: 1,
      title: "Professional Web Development Services",
      category: "Technology",
      price: "$50-100/hr",
      status: "Active",
      views: 234,
      inquiries: 12,
      rating: 4.9,
      description: "Full-stack web development with React, Node.js, and modern frameworks.",
      dateCreated: "2 weeks ago",
      featured: true,
    },
    {
      id: 2,
      title: "Emergency Plumbing Repairs",
      category: "Home Services",
      price: "$80-120/hr",
      status: "Active",
      views: 189,
      inquiries: 8,
      rating: 4.8,
      description: "24/7 emergency plumbing services for residential and commercial properties.",
      dateCreated: "1 month ago",
      featured: false,
    },
    {
      id: 3,
      title: "Graphic Design & Branding",
      category: "Creative Services",
      price: "$40-80/hr",
      status: "Paused",
      views: 156,
      inquiries: 5,
      rating: 4.7,
      description: "Logo design, branding, and marketing materials for small businesses.",
      dateCreated: "3 weeks ago",
      featured: false,
    },
  ]

  const recentInquiries = [
    {
      id: 1,
      buyer: "Sarah Johnson",
      service: "Web Development",
      message: "Hi, I need a website for my bakery business...",
      time: "2 hours ago",
      budget: "$2000-3000",
    },
    {
      id: 2,
      buyer: "Mike Chen",
      service: "Plumbing Repair",
      message: "Emergency leak in my kitchen, can you help?",
      time: "4 hours ago",
      budget: "$200-500",
    },
    {
      id: 3,
      buyer: "Lisa Rodriguez",
      service: "Logo Design",
      message: "Looking for a modern logo for my startup...",
      time: "1 day ago",
      budget: "$300-600",
    },
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
                <h1 className="text-4xl font-bold tracking-tight mb-2">Supplier Dashboard</h1>
                <p className="text-xl text-muted-foreground">Manage your services and connect with buyers</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                    <p className="text-3xl font-bold">$12,450</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+23% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Connections</p>
                    <p className="text-3xl font-bold">234</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Active connections</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Listings */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Listings</CardTitle>
                    <div className="flex gap-2">
                      <SimpleSelect defaultValue="all">
                        <SimpleSelectItem value="all">All Status</SimpleSelectItem>
                        <SimpleSelectItem value="active">Active</SimpleSelectItem>
                        <SimpleSelectItem value="paused">Paused</SimpleSelectItem>
                        <SimpleSelectItem value="draft">Draft</SimpleSelectItem>
                      </SimpleSelect>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myListings.map((listing) => (
                      <div key={listing.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              {listing.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{listing.category}</Badge>
                              <Badge variant={listing.status === "Active" ? "default" : "outline"}>
                                {listing.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{listing.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/create-listing?duplicate=${listing.id}`)}>
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log("Promote listing:", listing.id)}>
                                Promote
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => console.log("Archive listing:", listing.id)}>
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => console.log("Delete listing:", listing.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {listing.price}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {listing.views} views
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {listing.inquiries} inquiries
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {listing.rating}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Created {listing.dateCreated}</span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/supply/${listing.id}/matches`)}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              View Matches
                            </Button>
                            <Button size="sm" onClick={() => router.push(`/supply/${listing.id}`)}>
                              View Details
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
              {/* Recent Inquiries */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Inquiries</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => router.push("/connects")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{inquiry.buyer}</p>
                            <p className="text-xs text-muted-foreground">{inquiry.service}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{inquiry.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{inquiry.message}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            {inquiry.budget}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => router.push(`/messages`)}>
                            Reply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Response Time</span>
                    <span className="font-semibold">2.3h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Projects Completed</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Client Satisfaction</span>
                    <span className="font-semibold">4.9/5</span>
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
