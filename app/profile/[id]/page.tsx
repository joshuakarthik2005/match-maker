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
  Calendar,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch profile data
    setTimeout(() => {
      setProfile({
        id: params.id,
        name: "John's Plumbing Services",
        title: "Professional Plumbing & Emergency Repairs",
        image: "/placeholder.svg?height=120&width=120",
        verified: true,
        rating: 4.9,
        reviewCount: 156,
        location: "San Francisco, CA",
        joinedDate: "March 2020",
        responseTime: "< 1 hour",
        completionRate: 98,
        description:
          "Professional plumbing services with over 15 years of experience. Specializing in emergency repairs, installations, and maintenance for residential and commercial properties.",
        services: [
          "Emergency Plumbing",
          "Pipe Installation",
          "Drain Cleaning",
          "Water Heater Repair",
          "Bathroom Renovation",
          "Kitchen Plumbing",
        ],
        portfolio: [
          {
            id: 1,
            title: "Kitchen Renovation - Modern Plumbing",
            image: "/placeholder.svg?height=200&width=300",
            description: "Complete kitchen plumbing overhaul with modern fixtures",
          },
          {
            id: 2,
            title: "Emergency Pipe Repair",
            image: "/placeholder.svg?height=200&width=300",
            description: "24-hour emergency response for burst pipe repair",
          },
          {
            id: 3,
            title: "Bathroom Installation",
            image: "/placeholder.svg?height=200&width=300",
            description: "Full bathroom plumbing installation and fixtures",
          },
        ],
        reviews: [
          {
            id: 1,
            author: "Sarah M.",
            rating: 5,
            date: "2 weeks ago",
            comment:
              "Excellent service! John responded quickly to our emergency and fixed the issue professionally. Highly recommended!",
          },
          {
            id: 2,
            author: "Mike R.",
            rating: 5,
            date: "1 month ago",
            comment: "Great work on our kitchen renovation. Clean, efficient, and reasonably priced.",
          },
          {
            id: 3,
            author: "Lisa K.",
            rating: 4,
            date: "2 months ago",
            comment: "Professional service and good communication throughout the project.",
          },
        ],
        contact: {
          phone: "+1 (555) 123-4567",
          email: "john@plumbingservices.com",
          website: "www.johnsplumbing.com",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profile not found</h1>
            <p className="text-muted-foreground mt-2">The profile you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Header */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0">
                    <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      {profile.verified && <CheckCircle className="h-6 w-6 text-green-500" />}
                    </div>
                    <p className="text-xl text-muted-foreground mb-4">{profile.title}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{profile.rating}</span>
                        <span className="text-muted-foreground">({profile.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {profile.joinedDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Button className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.portfolio.map((item: any) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=200&width=300"
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({profile.reviewCount})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm text-muted-foreground">{profile.responseTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Completion Rate</p>
                    <p className="text-sm text-muted-foreground">{profile.completionRate}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Total Projects</p>
                    <p className="text-sm text-muted-foreground">{profile.reviewCount}+</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{profile.contact.website}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
