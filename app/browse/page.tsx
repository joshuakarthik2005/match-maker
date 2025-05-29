"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { Search, Filter, Star, MapPin, Clock, CheckCircle, MessageSquare, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select"
import { SimpleSlider } from "@/components/ui/simple-slider"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [distance, setDistance] = useState([50])
  const [sortBy, setSortBy] = useState("relevance")

  // Mock data for service providers
  const providers = [
    {
      id: "1",
      name: "John's Plumbing Services",
      rating: 4.8,
      reviews: 124,
      category: "Home Repair",
      subcategory: "Plumbing",
      location: "New York, NY",
      distance: 3.2,
      price: "$80-120/hr",
      description: "Emergency plumbing repairs, installation, and maintenance. Available 24/7 for urgent calls.",
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "TechSolutions Inc.",
      rating: 4.9,
      reviews: 89,
      category: "Technology",
      subcategory: "Web Development",
      location: "Remote",
      distance: null,
      price: "$95-150/hr",
      description: "Custom website development for small businesses. Specializing in e-commerce solutions.",
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "MoveMasters",
      rating: 4.7,
      reviews: 56,
      category: "Moving Services",
      subcategory: "Residential Moving",
      location: "Chicago, IL",
      distance: 5.8,
      price: "$70-100/hr",
      description: "Full-service moving assistance for homes and apartments. Includes packing, loading, and transport.",
      verified: false,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Dr. Sarah Johnson",
      rating: 5.0,
      reviews: 42,
      category: "Healthcare",
      subcategory: "Mental Health",
      location: "Boston, MA",
      distance: 7.1,
      price: "$120-180/session",
      description:
        "Licensed therapist specializing in anxiety, depression, and stress management. Telehealth available.",
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Legal Eagles",
      rating: 4.6,
      reviews: 31,
      category: "Legal Services",
      subcategory: "Business Law",
      location: "Remote",
      distance: null,
      price: "$200-300/hr",
      description: "Business law specialists offering contract review, incorporation services, and legal consultation.",
      verified: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "6",
      name: "Creative Designs",
      rating: 4.9,
      reviews: 78,
      category: "Design",
      subcategory: "Graphic Design",
      location: "Austin, TX",
      distance: 12.3,
      price: "$60-90/hr",
      description: "Professional graphic design for business materials, logos, and branding. Fast turnaround times.",
      verified: false,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Service Providers</h1>
            <p className="text-muted-foreground">Find the perfect service provider for your needs</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </span>
                  <Badge>{showFilters ? "Hide" : "Show"}</Badge>
                </Button>

                {showFilters && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Category</h3>
                      <SimpleSelect defaultValue="all" onValueChange={(value) => console.log(value)}>
                        <SimpleSelectItem value="all">All Categories</SimpleSelectItem>
                        <SimpleSelectItem value="home-repair">Home Repair</SimpleSelectItem>
                        <SimpleSelectItem value="technology">Technology</SimpleSelectItem>
                        <SimpleSelectItem value="moving">Moving Services</SimpleSelectItem>
                        <SimpleSelectItem value="healthcare">Healthcare</SimpleSelectItem>
                        <SimpleSelectItem value="legal">Legal Services</SimpleSelectItem>
                        <SimpleSelectItem value="design">Design</SimpleSelectItem>
                      </SimpleSelect>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        <span className="text-xs text-muted-foreground">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <SimpleSlider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Distance</h3>
                        <span className="text-xs text-muted-foreground">{distance[0]} miles</span>
                      </div>
                      <SimpleSlider
                        defaultValue={[50]}
                        max={100}
                        step={5}
                        value={distance}
                        onValueChange={setDistance}
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Availability</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="immediate" />
                          <label
                            htmlFor="immediate"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Immediate
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="within-24h" />
                          <label
                            htmlFor="within-24h"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Within 24 hours
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="within-week" />
                          <label
                            htmlFor="within-week"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Within a week
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Verification</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified-only" />
                        <label
                          htmlFor="verified-only"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Verified providers only
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <SimpleSelect value={sortBy} onValueChange={setSortBy}>
                  <SimpleSelectItem value="relevance">Relevance</SimpleSelectItem>
                  <SimpleSelectItem value="rating-high">Rating: High to Low</SimpleSelectItem>
                  <SimpleSelectItem value="price-low">Price: Low to High</SimpleSelectItem>
                  <SimpleSelectItem value="price-high">Price: High to Low</SimpleSelectItem>
                  <SimpleSelectItem value="distance">Distance: Nearest</SimpleSelectItem>
                </SimpleSelect>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{providers.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort
                </Button>
                <SimpleSelect value={sortBy} onValueChange={setSortBy} className="h-8 w-[180px]">
                  <SimpleSelectItem value="relevance">Relevance</SimpleSelectItem>
                  <SimpleSelectItem value="rating-high">Rating: High to Low</SimpleSelectItem>
                  <SimpleSelectItem value="price-low">Price: Low to High</SimpleSelectItem>
                  <SimpleSelectItem value="price-high">Price: High to Low</SimpleSelectItem>
                  <SimpleSelectItem value="distance">Distance: Nearest</SimpleSelectItem>
                </SimpleSelect>
              </div>
            </div>

            {providers.map((provider, index) => (
              <Card
                key={provider.id}
                className="overflow-hidden slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-0">
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                        <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{provider.name}</h3>
                            {provider.verified && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" /> Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="font-medium">{provider.rating}</span>
                            <span className="text-muted-foreground text-sm ml-1">({provider.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center text-sm">
                          <Badge variant="secondary">{provider.category}</Badge>
                          <Badge variant="outline">{provider.subcategory}</Badge>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {provider.location}
                            {provider.distance && ` (${provider.distance} miles)`}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Available now
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{provider.description}</p>

                        <div className="flex items-center justify-between pt-2">
                          <p className="font-medium">{provider.price}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/provider/${provider.id}`}>View Profile</Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/messages/new?provider=${provider.id}`}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Contact
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
