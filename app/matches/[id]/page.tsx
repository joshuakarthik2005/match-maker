"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Filter,
  SortAsc,
  Eye,
  MessageCircle,
  AlertTriangle,
  CreditCard,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function MatchesPage() {
  const router = useRouter()
  const params = useParams()
  const demandId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<any[]>([])
  const [requestDetails, setRequestDetails] = useState<any>(null)
  const [userCredits] = useState(150)
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    rating: 0,
    verified: false,
    available: false,
    maxCredits: 10,
  })
  const [sortBy, setSortBy] = useState("matchScore")
  const [sortOrder, setSortOrder] = useState("desc")

  // Mock data for different demands
  const demandData = {
    "1": {
      request: {
        title: "Emergency Plumbing Repair",
        category: "Home Services",
        budget: "$200-500",
        urgency: "Urgent",
        location: "New York, NY",
        requiredDate: "2025-06-05",
        description:
          "Need immediate plumbing repair for burst pipe in kitchen. Water is leaking and causing damage. Need someone who can come on or before June 5th, 2025. Must be licensed and insured.",
        postedDate: "2 hours ago",
        requirements: ["Licensed plumber", "Emergency service", "Insured", "Available by June 5th"],
      },
      matches: [
        {
          id: 1,
          name: "John's Plumbing Services",
          category: "Home Repair",
          subcategory: "Plumbing",
          location: "New York, NY",
          rating: 4.8,
          reviews: 124,
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 92,
          lastActive: "2 min ago",
          isOnline: true,
          description:
            "Professional plumbing services with 15+ years experience. Emergency repairs, installations, and maintenance.",
          matchTags: ["Emergency Repair", "Plumbing", "Licensed", "Insured"],
          creditCost: 5,
          isPurchased: false,
          availableDates: ["2025-06-05", "2025-06-06", "2025-06-07", "2025-06-10"],
        },
        {
          id: 4,
          name: "Quick Fix Plumbing",
          category: "Home Repair",
          subcategory: "Plumbing",
          location: "New York, NY",
          rating: 4.6,
          reviews: 89,
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 88,
          lastActive: "5 min ago",
          isOnline: true,
          description: "24/7 emergency plumbing services. Fast response time and competitive pricing.",
          matchTags: ["24/7 Service", "Emergency", "Licensed", "Fast Response"],
          creditCost: 4,
          isPurchased: false,
          availableDates: ["2025-06-04", "2025-06-05", "2025-06-06"],
        },
      ],
    },
    "2": {
      request: {
        title: "Website Development",
        category: "Technology",
        budget: "$2000-5000",
        urgency: "1-2 weeks",
        location: "Remote",
        requiredDate: "2025-06-15",
        description:
          "Looking for experienced developer to build e-commerce website. Need modern design with payment integration and inventory management.",
        postedDate: "1 day ago",
        requirements: ["React/Next.js", "E-commerce experience", "Payment integration", "Available by June 15th"],
      },
      matches: [
        {
          id: 2,
          name: "TechSolutions Inc.",
          category: "Technology",
          subcategory: "Web Development",
          location: "Remote",
          rating: 4.9,
          reviews: 89,
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 95,
          lastActive: "1 hour ago",
          isOnline: false,
          description: "Full-stack web development team specializing in modern frameworks and e-commerce solutions.",
          matchTags: ["Web Development", "E-commerce", "React", "Node.js"],
          creditCost: 8,
          isPurchased: true,
          availableDates: ["2025-06-10", "2025-06-12", "2025-06-15"],
        },
        {
          id: 5,
          name: "Digital Craft Studio",
          category: "Technology",
          subcategory: "Web Development",
          location: "Remote",
          rating: 4.7,
          reviews: 156,
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 91,
          lastActive: "30 min ago",
          isOnline: true,
          description: "Creative web development agency with expertise in e-commerce and custom web applications.",
          matchTags: ["E-commerce", "Custom Development", "UI/UX", "Payment Systems"],
          creditCost: 7,
          isPurchased: false,
          availableDates: ["2025-06-12", "2025-06-14", "2025-06-16"],
        },
      ],
    },
    "3": {
      request: {
        title: "Moving Services",
        category: "Transportation",
        budget: "$300-800",
        urgency: "This weekend",
        location: "Chicago, IL",
        requiredDate: "2025-06-07",
        description:
          "Need help moving 2-bedroom apartment across town. Have some heavy furniture and need careful handling of fragile items.",
        postedDate: "3 hours ago",
        requirements: ["Insured movers", "Weekend availability", "Heavy lifting", "Available by June 7th"],
      },
      matches: [
        {
          id: 3,
          name: "MoveMasters",
          category: "Moving Services",
          subcategory: "Residential Moving",
          location: "Chicago, IL",
          rating: 4.7,
          reviews: 56,
          verified: false,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 89,
          lastActive: "3 hours ago",
          isOnline: false,
          description:
            "Professional moving services for residential and commercial clients. Fully insured and licensed.",
          matchTags: ["Residential Moving", "Insured", "Licensed", "Weekend Available"],
          creditCost: 6,
          isPurchased: false,
          availableDates: ["2025-06-06", "2025-06-07", "2025-06-08", "2025-06-11"],
        },
        {
          id: 6,
          name: "Chicago Movers Pro",
          category: "Moving Services",
          subcategory: "Residential Moving",
          location: "Chicago, IL",
          rating: 4.8,
          reviews: 203,
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 93,
          lastActive: "1 hour ago",
          isOnline: true,
          description:
            "Premier moving company in Chicago. Specializing in residential moves with full insurance coverage.",
          matchTags: ["Premium Service", "Fully Insured", "Local Experts", "Fragile Items"],
          creditCost: 7,
          isPurchased: false,
          availableDates: ["2025-06-05", "2025-06-06", "2025-06-07"],
        },
      ],
    },
  }

  useEffect(() => {
    // Simulate loading data based on demand ID
    const timer = setTimeout(() => {
      const data = demandData[demandId as keyof typeof demandData]
      if (data) {
        setRequestDetails(data.request)
        setMatches(data.matches)
      } else {
        // Fallback to emergency plumbing if ID not found
        setRequestDetails(demandData["1"].request)
        setMatches(demandData["1"].matches)
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [demandId])

  const isSupplierAvailable = (supplierDates: string[], requiredDate: string) => {
    return supplierDates.some((date) => new Date(date) <= new Date(requiredDate))
  }

  const handleBuyLead = (match: any) => {
    setSelectedMatch(match)
    setShowBuyDialog(true)
  }

  const confirmPurchase = () => {
    if (selectedMatch) {
      // Update the match as purchased
      setMatches((prev) =>
        prev.map((match) => (match.id === selectedMatch.id ? { ...match, isPurchased: true } : match)),
      )
      setShowBuyDialog(false)
      setSelectedMatch(null)
    }
  }

  // Filter and sort matches
  const filteredAndSortedMatches = useMemo(() => {
    // Return empty array if data hasn't loaded yet
    if (!requestDetails || matches.length === 0) {
      return []
    }

    const filtered = matches.filter((match) => {
      // Rating filter
      if (filters.rating > 0 && match.rating < filters.rating) return false

      // Verified filter
      if (filters.verified && !match.verified) return false

      // Available filter
      if (filters.available && !isSupplierAvailable(match.availableDates, requestDetails.requiredDate)) return false

      // Credits filter
      if (match.creditCost > filters.maxCredits) return false

      return true
    })

    // Sort matches
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "matchScore":
          aValue = a.matchScore
          bValue = b.matchScore
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "reviews":
          aValue = a.reviews
          bValue = b.reviews
          break
        case "creditCost":
          aValue = a.creditCost
          bValue = b.creditCost
          break
        case "lastActive":
          // Convert "X min ago" to minutes for sorting
          aValue = a.lastActive.includes("min")
            ? Number.parseInt(a.lastActive)
            : a.lastActive.includes("hour")
              ? Number.parseInt(a.lastActive) * 60
              : 1440
          bValue = b.lastActive.includes("min")
            ? Number.parseInt(b.lastActive)
            : b.lastActive.includes("hour")
              ? Number.parseInt(b.lastActive) * 60
              : 1440
          break
        default:
          aValue = a.matchScore
          bValue = b.matchScore
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue
    })

    return filtered
  }, [matches, filters, sortBy, sortOrder, requestDetails])

  if (!requestDetails || isLoading) {
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
                <h1 className="text-4xl font-bold tracking-tight">Matched Suppliers</h1>
                <p className="text-xl text-muted-foreground">{matches.length} suppliers found for your request</p>
              </div>
            </div>

            {/* Request Summary */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Request Details</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowRequestDetails(true)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
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
                    <p className="text-sm font-medium text-muted-foreground">Required By</p>
                    <p className="font-semibold">{new Date(requestDetails.requiredDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {(filters.rating > 0 || filters.verified || filters.available || filters.maxCredits < 10) && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                      !
                    </Badge>
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <SortAsc className="h-4 w-4 mr-2" />
                      Sort by{" "}
                      {sortBy === "matchScore"
                        ? "Match Score"
                        : sortBy === "rating"
                          ? "Rating"
                          : sortBy === "reviews"
                            ? "Reviews"
                            : sortBy === "creditCost"
                              ? "Credits"
                              : "Last Active"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("matchScore")
                        setSortOrder("desc")
                      }}
                    >
                      Match Score (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("matchScore")
                        setSortOrder("asc")
                      }}
                    >
                      Match Score (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("rating")
                        setSortOrder("desc")
                      }}
                    >
                      Rating (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("rating")
                        setSortOrder("asc")
                      }}
                    >
                      Rating (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("reviews")
                        setSortOrder("desc")
                      }}
                    >
                      Reviews (Most to Least)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("creditCost")
                        setSortOrder("asc")
                      }}
                    >
                      Credits (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("creditCost")
                        setSortOrder("desc")
                      }}
                    >
                      Credits (High to Low)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedMatches.length} of {matches.length} matches
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
              : filteredAndSortedMatches.map((match, index) => {
                  const isAvailable = isSupplierAvailable(match.availableDates, requestDetails.requiredDate)

                  return (
                    <Card
                      key={match.id}
                      className={`overflow-hidden hover:shadow-lg transition-shadow slide-in ${
                        !isAvailable ? "opacity-60" : ""
                      }`}
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
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {match.creditCost} credits
                                </Badge>
                                {isAvailable ? (
                                  <Badge className="bg-green-100 text-green-800 border-green-300">
                                    Can Deliver On Time
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                                    Cannot Meet Deadline
                                  </Badge>
                                )}
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
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-4">{match.description}</p>

                              {/* Match Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {match.matchTags.map((tag: string, tagIndex: number) => (
                                  <Badge key={tagIndex} variant="secondary" className="bg-primary/10 text-primary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3 lg:w-48">
                            {match.isPurchased ? (
                              <Button className="w-full" onClick={() => router.push(`/messages/${match.id}`)}>
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                            ) : (
                              <Button
                                className="w-full"
                                onClick={() => handleBuyLead(match)}
                                disabled={userCredits < match.creditCost || !isAvailable}
                              >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Buy Lead
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => router.push(`/profile/${match.id}`)}
                            >
                              View Profile
                            </Button>
                            <div className="text-center text-xs text-muted-foreground">
                              Last active: {match.lastActive}
                            </div>
                            {userCredits < match.creditCost && !match.isPurchased && (
                              <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 p-2 rounded">
                                <AlertTriangle className="h-3 w-3" />
                                Insufficient balance
                              </div>
                            )}
                            {!isAvailable && (
                              <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                <AlertTriangle className="h-3 w-3" />
                                Cannot meet your deadline
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
          </div>

          {/* Request Details Dialog */}
          <Dialog open={showRequestDetails} onOpenChange={setShowRequestDetails}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{requestDetails.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{requestDetails.category}</Badge>
                    <Badge variant={requestDetails.urgency === "Urgent" ? "destructive" : "outline"}>
                      {requestDetails.urgency}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p>{requestDetails.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Location</p>
                    <p>{requestDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Required By</p>
                    <p>{new Date(requestDetails.requiredDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{requestDetails.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    {requestDetails.requirements.map((req: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Posted: {requestDetails.postedDate}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Buy Lead Dialog */}
          <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Lead Purchase</DialogTitle>
              </DialogHeader>
              {selectedMatch && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedMatch.avatar || "/placeholder.svg"} alt={selectedMatch.name} />
                      <AvatarFallback>{selectedMatch.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedMatch.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMatch.category}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Lead Cost:</span>
                      <span className="font-semibold">{selectedMatch.creditCost} credits</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Your Balance:</span>
                      <span className="font-semibold">{userCredits} credits</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span>After Purchase:</span>
                      <span className="font-semibold">{userCredits - selectedMatch.creditCost} credits</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    After purchasing this lead, you'll be able to contact {selectedMatch.name} directly and they will
                    appear in your Connects page.
                  </p>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowBuyDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      onClick={confirmPurchase}
                      className="flex-1"
                      disabled={userCredits < selectedMatch.creditCost}
                    >
                      Confirm Purchase
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Filters Dialog */}
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Suppliers</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Rating Filter */}
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[filters.rating]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value[0] }))}
                      max={5}
                      min={0}
                      step={0.5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">
                      {filters.rating === 0 ? "Any" : `${filters.rating}+`}
                    </span>
                  </div>
                </div>

                {/* Verified Filter */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified-filter">Verified suppliers only</Label>
                  <Switch
                    id="verified-filter"
                    checked={filters.verified}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, verified: checked }))}
                  />
                </div>

                {/* Available Filter */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="available-filter">Available on required date</Label>
                  <Switch
                    id="available-filter"
                    checked={filters.available}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, available: checked }))}
                  />
                </div>

                {/* Credits Filter */}
                <div className="space-y-2">
                  <Label>Maximum Credits</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      value={[filters.maxCredits]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, maxCredits: value[0] }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{filters.maxCredits}</span>
                  </div>
                </div>

                {/* Reset and Apply */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({ rating: 0, verified: false, available: false, maxCredits: 10 })}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button onClick={() => setShowFilters(false)} className="flex-1">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
