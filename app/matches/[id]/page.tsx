"use client"

import { useState, useEffect } from "react"
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
  Clock,
  CheckCircle,
  Filter,
  SortAsc,
  Eye,
  MessageCircle,
  AlertTriangle,
  CreditCard,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export default function MatchesPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<any[]>([])
  const [userCredits] = useState(150)
  const [showRequestDetails, setShowRequestDetails] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const [showBuyDialog, setShowBuyDialog] = useState(false)

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
          availability: "Available today",
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
          availability: "Available within 48 hours",
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 87,
          lastActive: "1 hour ago",
          isOnline: false,
          description: "Full-stack web development team specializing in modern frameworks and e-commerce solutions.",
          matchTags: ["Web Development", "E-commerce", "React", "Node.js"],
          creditCost: 8,
          isPurchased: true,
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
          availability: "Available next week",
          verified: false,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 85,
          lastActive: "3 hours ago",
          isOnline: false,
          description:
            "Professional moving services for residential and commercial clients. Fully insured and licensed.",
          matchTags: ["Residential Moving", "Insured", "Licensed", "Weekend Available"],
          creditCost: 6,
          isPurchased: false,
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
    description:
      "Need immediate plumbing repair for burst pipe in kitchen. Water is leaking and causing damage. Need someone who can come today and fix this issue. Must be licensed and insured.",
    postedDate: "2 hours ago",
    requirements: ["Licensed plumber", "Emergency service", "Insured", "Available today"],
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
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {match.creditCost} credits
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
                              disabled={userCredits < match.creditCost}
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{requestDetails.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    {requestDetails.requirements.map((req, index) => (
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
        </div>
      </main>
    </div>
  )
}
