"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"
import {
  DollarSign,
  Star,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  Edit,
  Share2,
  Eye,
  Users,
  FileText,
  ImageIcon,
  ArrowLeft,
} from "lucide-react"

export default function ListingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const listingId = params.id

  // Mock data for the listing details
  const listing = {
    id: listingId,
    title: "Professional Web Development Services",
    category: "Technology",
    price: "$50-100/hr",
    status: "Active",
    views: 234,
    inquiries: 12,
    rating: 4.9,
    description:
      "Full-stack web development with React, Node.js, and modern frameworks. I specialize in creating responsive, user-friendly websites and web applications that meet your business needs. With over 5 years of experience in the industry, I can help you bring your vision to life with clean, efficient code and modern design principles.",
    dateCreated: "2 weeks ago",
    featured: true,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Web Development", "React", "Node.js", "Frontend", "Backend", "Full Stack"],
    availability: "Available now",
    responseTime: "Usually responds within 2 hours",
    completedProjects: 87,
    reviews: [
      {
        id: 1,
        name: "John Smith",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent work! Delivered the project ahead of schedule and exceeded my expectations.",
      },
      {
        id: 2,
        name: "Emily Johnson",
        rating: 4.5,
        date: "1 month ago",
        comment: "Very professional and responsive. Would definitely work with again.",
      },
      {
        id: 3,
        name: "Michael Brown",
        rating: 5,
        date: "2 months ago",
        comment: "Outstanding service and attention to detail. Highly recommended!",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold tracking-tight">{listing.title}</h1>
                  {listing.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{listing.category}</Badge>
                  <Badge variant={listing.status === "Active" ? "default" : "outline"}>{listing.status}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button onClick={() => router.push(`/create-listing?edit=${listing.id}`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Listing
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {listing.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${listing.title} - Image ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="description">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{listing.description}</p>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {listing.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Client Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {listing.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold">{review.name}</p>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span className="ml-1">{review.rating}</span>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="portfolio" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold">E-commerce Website</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Built a complete e-commerce platform with payment integration and inventory management.
                          </p>
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="h-5 w-5 text-purple-500" />
                            <h3 className="font-semibold">SaaS Dashboard</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Designed and developed a comprehensive analytics dashboard for a SaaS company.
                          </p>
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{listing.price}</span>
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <Button className="w-full">Contact Provider</Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">{listing.dateCreated}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">{listing.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Completed Projects</p>
                      <p className="text-sm text-muted-foreground">{listing.completedProjects}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Views</p>
                      <p className="text-sm text-muted-foreground">{listing.views} views</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Inquiries</p>
                      <p className="text-sm text-muted-foreground">{listing.inquiries} inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-sm text-muted-foreground">{listing.availability}</p>
                    </div>
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
