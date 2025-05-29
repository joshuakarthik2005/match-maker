"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Settings, Search, Star, MapPin, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SimpleTabs, SimpleTabsList, SimpleTabsTrigger, SimpleTabsContent } from "@/components/ui/simple-tabs"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("recommended")
  const [isLoading, setIsLoading] = useState(true)
  const [providers, setProviders] = useState<any[]>([])
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // Try to get user name from localStorage
    const storedName = localStorage.getItem("userName") || "User"
    setUserName(storedName)

    // Simulate loading data
    const timer = setTimeout(() => {
      setProviders([
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
        },
        {
          id: 4,
          name: "Creative Designs",
          category: "Design",
          subcategory: "Graphic Design",
          location: "Remote",
          distance: null,
          rating: 4.9,
          reviews: 78,
          availability: "Available immediately",
          verified: true,
          avatar: "/placeholder.svg?height=100&width=100",
          matchScore: 81,
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">MatchMaker</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/search")}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 fade-in">Hello {userName}!</h2>
          <p className="text-muted-foreground fade-in">Find the perfect service providers for your needs</p>
        </div>

        <SimpleTabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <SimpleTabsList className="grid w-full grid-cols-3 mb-6">
            <SimpleTabsTrigger value="recommended">Recommended</SimpleTabsTrigger>
            <SimpleTabsTrigger value="nearby">Nearby</SimpleTabsTrigger>
            <SimpleTabsTrigger value="top-rated">Top Rated</SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="recommended" className="space-y-4">
            {isLoading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                              <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-full bg-muted animate-pulse rounded" />
                            <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              : providers.map((provider, index) => (
                  <Card
                    key={provider.id}
                    className="overflow-hidden slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center space-x-4 mb-3">
                          <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{provider.name}</h3>
                              {provider.verified && <CheckCircle className="h-4 w-4 text-green-500 ml-1" />}
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                {provider.matchScore}% Match
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-3 w-3 text-amber-500 mr-1" />
                              <span>{provider.rating}</span>
                              <span className="mx-1">•</span>
                              <span>{provider.reviews} reviews</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="secondary">{provider.category}</Badge>
                            <Badge variant="outline">{provider.subcategory}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{provider.location}</span>
                            {provider.distance && <span className="ml-1">({provider.distance})</span>}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{provider.availability}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => router.push(`/chat/${provider.id}`)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                          <Button className="flex-1" onClick={() => router.push(`/provider/${provider.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </SimpleTabsContent>

          <SimpleTabsContent value="nearby" className="space-y-4">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Enable location services to see nearby service providers</p>
              <Button onClick={() => router.push("/browse?filter=nearby")}>Enable Location</Button>
            </Card>
          </SimpleTabsContent>

          <SimpleTabsContent value="top-rated" className="space-y-4">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Browse top-rated service providers in your area</p>
              <Button onClick={() => router.push("/browse?filter=top-rated")}>View All Top Rated</Button>
            </Card>
          </SimpleTabsContent>
        </SimpleTabs>
      </main>

      <BottomNavigation />
    </div>
  )
}
