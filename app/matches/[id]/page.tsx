"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  Filter,
  SortAsc,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function MatchesPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setMatches([
        {
          id: 1,
          name: "John's Plumbing Services",
          category: "Home Repair",
          subcategory: "Plumbing",
          location: "New York, NY",
          distance: "3.2 miles away",
          rating: 4.8,
          reviews: 124,
          price: "$80-120/hr",
          availability: "Available today",
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 92,
          lastActive: "2 min ago",
          isOnline: true,
          description:
            "Professional plumbing services with 15+ years experience. Emergency repairs, installations, and maintenance.",
          completedJobs: 156,
          responseTime: "< 1 hour",
        },
        {
          id: 2,
          name: "TechSolutions Inc.",
          category: "Technology",
          subcategory: "Web Development",
          location: "Remote",
          distance: null,
          rating: 4.9,
          reviews: 89,
          price: "$50-100/hr",
          availability: "Available within 48 hours",
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 87,
          lastActive: "1 hour ago",
          isOnline: false,
          description: "Full-stack web development team specializing in modern frameworks and e-commerce solutions.",
          completedJobs: 89,
          responseTime: "< 2 hours",
        },
        {
          id: 3,
          name: "MoveMasters",
          category: "Moving Services",
          subcategory: "Residential Moving",
          location: "Chicago, IL",
          distance: "5.8 miles away",
          rating: 4.7,
          reviews: 56,
          price: "$100-150/hr",
          availability: "Available next week",
          verified: false,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 85,
          lastActive: "3 hours ago",
          isOnline: false,
          description:
            "Professional moving services for residential and commercial clients. Fully insured and licensed.",
          completedJobs: 78,
          responseTime: "< 4 hours",
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const requestDetails = {
    title: "Emergency Plumbing Repair",
    category: "Home Services",
    budget: "$200-500",
    urgency: "Urgent",
    location: "New York, NY",
    description: "Need immediate plumbing repair for burst pipe in kitchen.",
    postedDate: "2 hours ago",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Matched Suppliers</h1>
                <p className="text-xl text-muted-foreground">{matches.length} suppliers found for your request</p>
              </div>
            </div>

            {/* Request Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service</p>
                    <p className="font-semibold">{requestDetails.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p className="font-semibold">{requestDetails.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="font-semibold">{requestDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Urgency</p>
                    <Badge variant={requestDetails.urgency === "Urgent" ? "destructive" : "outline"}>
                      {requestDetails.urgency}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort by Match Score
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {matches.length} of {matches.length} matches
              </p>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
                          <div className="space-y-2 flex-1">
                            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-64 bg-muted animate-pulse rounded" />
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-24 h-10 bg-muted animate-pulse rounded" />
                            <div className="w-24 h-10 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : matches.map((match, index) => (
                  <Card
                    key={match.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Supplier Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <div className="relative">
                            <Avatar className="h-20 w-20 border-2 border-primary">
                              <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                              <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {match.isOnline && (
                              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{match.name}</h3>
                              {match.verified && <CheckCircle className="h-5 w-5 text-green-500" />}
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                {match.matchScore}% Match
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-500 mr-1" />
                                <span>{match.rating}</span>
                                <span className="mx-1">•</span>
                                <span>{match.reviews} reviews</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{match.location}</span>
                                {match.distance && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <span>{match.distance}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{match.availability}</span>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4">{match.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span className="font-medium">{match.price}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Completed Jobs: </span>
                                <span className="font-medium">{match.completedJobs}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Response Time: </span>
                                <span className="font-medium">{match.responseTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button className="w-full" onClick={() => router.push(`/messages/${match.id}`)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push(`/profile/${match.id}`)}
                          >
                            View Profile
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="flex-1">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="flex-1">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-center text-xs text-muted-foreground">
                            Last active: {match.lastActive}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* No Matches State */}
          {!isLoading && matches.length === 0 && (
            <Card className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No matches found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any suppliers matching your requirements. Try adjusting your filters or expanding
                  your search criteria.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={() => router.push("/demand")}>
                    Edit Request
                  </Button>
                  <Button onClick={() => router.push("/supply")}>Browse All Suppliers</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
