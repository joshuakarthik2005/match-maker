"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, MapPin, Clock, DollarSign, MessageCircle, Eye, Calendar, SortAsc, Users } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SupplyMatchesPage() {
  const router = useRouter()
  const params = useParams()
  const supplyId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<any[]>([])
  const [supplyDetails, setSupplyDetails] = useState<any>(null)
  const [sortBy, setSortBy] = useState("matchScore")

  // Mock data for different supply listings
  const supplyData = {
    "1": {
      supply: {
        title: "Professional Web Development Services",
        category: "Technology",
        price: "$50-100/hr",
        location: "Remote",
        description: "Full-stack web development with React, Node.js, and modern frameworks.",
      },
      matches: [
        {
          id: 1,
          name: "Sarah Johnson",
          title: "E-commerce Website Development",
          budget: "$2000-5000",
          urgency: "1-2 weeks",
          location: "Remote",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 95,
          postedDate: "2 days ago",
          description: "Looking for experienced developer to build e-commerce website with payment integration.",
          requirements: ["React/Next.js", "E-commerce experience", "Payment integration"],
          deadline: "2025-06-15",
          verified: true,
        },
        {
          id: 2,
          name: "Michael Chen",
          title: "Business Website Redesign",
          budget: "$1500-3000",
          urgency: "3-4 weeks",
          location: "Remote",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 88,
          postedDate: "1 week ago",
          description: "Need to redesign our company website with modern design and better user experience.",
          requirements: ["Web Design", "React", "Responsive Design"],
          deadline: "2025-06-25",
          verified: false,
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          title: "Portfolio Website Creation",
          budget: "$800-1500",
          urgency: "2-3 weeks",
          location: "Remote",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 82,
          postedDate: "3 days ago",
          description: "Artist looking for a creative portfolio website to showcase artwork and sell prints.",
          requirements: ["Portfolio Design", "Gallery Features", "E-commerce"],
          deadline: "2025-06-20",
          verified: true,
        },
      ],
    },
    "2": {
      supply: {
        title: "Emergency Plumbing Repairs",
        category: "Home Services",
        price: "$80-120/hr",
        location: "New York, NY",
        description: "24/7 emergency plumbing services for residential and commercial properties.",
      },
      matches: [
        {
          id: 4,
          name: "John Smith",
          title: "Kitchen Pipe Burst Repair",
          budget: "$200-500",
          urgency: "Urgent",
          location: "New York, NY",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 98,
          postedDate: "2 hours ago",
          description: "Emergency plumbing repair needed for burst pipe in kitchen causing water damage.",
          requirements: ["Licensed plumber", "Emergency service", "Available today"],
          deadline: "2025-06-05",
          verified: true,
        },
        {
          id: 5,
          name: "Lisa Wilson",
          title: "Bathroom Renovation Plumbing",
          budget: "$1000-2000",
          urgency: "1-2 weeks",
          location: "New York, NY",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 91,
          postedDate: "1 day ago",
          description: "Complete bathroom renovation requiring new plumbing installation and fixtures.",
          requirements: ["Renovation experience", "Licensed", "Fixture installation"],
          deadline: "2025-06-12",
          verified: false,
        },
      ],
    },
    "3": {
      supply: {
        title: "Graphic Design & Branding",
        category: "Creative Services",
        price: "$40-80/hr",
        location: "Remote",
        description: "Logo design, branding, and marketing materials for small businesses.",
      },
      matches: [
        {
          id: 6,
          name: "David Park",
          title: "Startup Logo and Brand Identity",
          budget: "$500-1200",
          urgency: "1 week",
          location: "Remote",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 93,
          postedDate: "1 day ago",
          description: "New tech startup needs complete brand identity including logo, colors, and style guide.",
          requirements: ["Logo Design", "Brand Identity", "Style Guide"],
          deadline: "2025-06-10",
          verified: true,
        },
        {
          id: 7,
          name: "Amanda Foster",
          title: "Restaurant Menu Design",
          budget: "$300-600",
          urgency: "2 weeks",
          location: "Remote",
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 87,
          postedDate: "3 days ago",
          description: "Local restaurant needs new menu design with modern layout and food photography integration.",
          requirements: ["Menu Design", "Print Design", "Food Industry Experience"],
          deadline: "2025-06-15",
          verified: false,
        },
      ],
    },
  }

  useEffect(() => {
    // Simulate loading data based on supply ID
    const timer = setTimeout(() => {
      const data = supplyData[supplyId as keyof typeof supplyData]
      if (data) {
        setSupplyDetails(data.supply)
        setMatches(data.matches)
      } else {
        // Fallback to web development if ID not found
        setSupplyDetails(supplyData["1"].supply)
        setMatches(supplyData["1"].matches)
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [supplyId])

  const sortedMatches = [...matches].sort((a, b) => {
    switch (sortBy) {
      case "matchScore":
        return b.matchScore - a.matchScore
      case "budget":
        // Extract max budget for sorting
        const aMax = Number.parseInt(a.budget.split("-")[1].replace(/[^0-9]/g, ""))
        const bMax = Number.parseInt(b.budget.split("-")[1].replace(/[^0-9]/g, ""))
        return bMax - aMax
      case "urgency":
        const urgencyOrder = { Urgent: 4, "1 week": 3, "1-2 weeks": 2, "2-3 weeks": 1, "3-4 weeks": 0 }
        return (
          (urgencyOrder[b.urgency as keyof typeof urgencyOrder] || 0) -
          (urgencyOrder[a.urgency as keyof typeof urgencyOrder] || 0)
        )
      case "posted":
        // Simple date sorting based on posted text
        return a.postedDate.localeCompare(b.postedDate)
      default:
        return b.matchScore - a.matchScore
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading matches...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
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
                <h1 className="text-4xl font-bold tracking-tight">Demand Matches</h1>
                <p className="text-xl text-muted-foreground">{matches.length} potential clients found</p>
              </div>
            </div>

            {/* Supply Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service</p>
                    <p className="font-semibold">{supplyDetails?.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p className="font-semibold">{supplyDetails?.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p className="font-semibold">{supplyDetails?.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p className="font-semibold">{supplyDetails?.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sort Options */}
            <div className="flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sort by{" "}
                    {sortBy === "matchScore"
                      ? "Match Score"
                      : sortBy === "budget"
                        ? "Budget"
                        : sortBy === "urgency"
                          ? "Urgency"
                          : "Posted Date"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("matchScore")}>Match Score (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("budget")}>Budget (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("urgency")}>Urgency (Most Urgent)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("posted")}>Recently Posted</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm text-muted-foreground">Showing {matches.length} matches</p>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {sortedMatches.map((match, index) => (
              <Card
                key={match.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Demander Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{match.name}</h3>
                          {match.verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">Verified</Badge>
                          )}
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">{match.matchScore}% Match</Badge>
                        </div>

                        <h4 className="text-lg font-medium text-primary mb-2">{match.title}</h4>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{match.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{match.urgency}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{match.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Deadline: {new Date(match.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{match.description}</p>

                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {match.requirements.map((req: string, reqIndex: number) => (
                            <Badge key={reqIndex} variant="secondary" className="bg-primary/10 text-primary">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Button className="w-full" onClick={() => router.push(`/messages/${match.id}`)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send Proposal
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => router.push(`/demand/${match.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <div className="text-center text-xs text-muted-foreground">Posted: {match.postedDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {matches.length === 0 && !isLoading && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No matches found</h3>
                  <p>There are currently no demand requests matching your service.</p>
                </div>
                <Button variant="outline" onClick={() => router.push("/demand")}>
                  Browse All Demands
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
