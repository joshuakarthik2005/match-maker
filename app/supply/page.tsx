"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Plus,
  DollarSign,
  Eye,
  MessageSquare,
  Star,
  Package,
  Briefcase,
  Home,
  Wrench,
  Laptop,
  Heart,
  Scale,
  Edit,
  MoreHorizontal,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select"
import { useRouter } from "next/navigation"

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

  const categories = [
    { name: "Home Services", icon: Home, demand: "High", color: "bg-blue-500" },
    { name: "Technology", icon: Laptop, demand: "Very High", color: "bg-purple-500" },
    { name: "Professional Services", icon: Briefcase, demand: "Medium", color: "bg-green-500" },
    { name: "Repair & Maintenance", icon: Wrench, demand: "High", color: "bg-orange-500" },
    { name: "Healthcare", icon: Heart, demand: "Medium", color: "bg-red-500" },
    { name: "Legal Services", icon: Scale, demand: "Low", color: "bg-indigo-500" },
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
                  onClick={() => router.push("/create-listing")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Listing
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">2 pending approval</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                    <p className="text-3xl font-bold">1,234</p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+15% this week</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold">96%</p>
                  </div>
                  <Star className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">4.9/5 avg rating</p>
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
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
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
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
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
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => router.push(`/create-listing?category=${category.name.toLowerCase()}`)}
                      >
                        <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{category.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Demand:</span>
                            <Badge
                              variant={
                                category.demand === "Very High"
                                  ? "default"
                                  : category.demand === "High"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {category.demand}
                            </Badge>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
                    <Button variant="outline" size="sm">
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
                          <Button size="sm" variant="outline">
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

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => router.push("/create-listing")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Listing
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/profile")}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/messages")}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Messages
                  </Button>
                </CardContent>
              </Card>

              {/* Tips for Success */}
              <Card>
                <CardHeader>
                  <CardTitle>💡 Success Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Complete Your Profile</p>
                    <p className="text-muted-foreground">Detailed profiles get 3x more inquiries</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Respond Quickly</p>
                    <p className="text-muted-foreground">Fast responses improve your ranking</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Showcase Your Work</p>
                    <p className="text-muted-foreground">Add portfolio items and testimonials</p>
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
