"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Heart, MessageCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setTimeout(() => {
      setProfile({
        id: params.id,
        name: "Sophia",
        age: 28,
        location: "New York, NY",
        distance: "5 miles away",
        bio: "Photography enthusiast and avid traveler. Love trying new cuisines and exploring hidden gems in the city. Looking for someone who shares my sense of adventure!",
        job: "Product Designer at Design Co.",
        education: "University of Design, BFA",
        interests: ["Photography", "Travel", "Cooking", "Hiking", "Art", "Music"],
        photos: [
          "/placeholder.svg?height=500&width=400",
          "/placeholder.svg?height=500&width=400",
          "/placeholder.svg?height=500&width=400",
        ],
        compatibility: 92,
      })
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{profile.name}'s Profile</h1>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-muted fade-in">
            <img
              src={profile.photos[0] || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-white/90">{profile.location}</p>
              <p className="text-white/80 text-sm">{profile.distance}</p>

              <Badge className="mt-2 bg-green-500 border-none">{profile.compatibility}% Match</Badge>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => router.push(`/chat/${profile.id}`)}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Message
            </Button>
            <Button size="lg" className="flex-1 bg-rose-500 hover:bg-rose-600">
              <Heart className="mr-2 h-5 w-5" />
              Connect
            </Button>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4 space-y-4 fade-in">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p>{profile.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">Work</h3>
                    <p className="text-muted-foreground">{profile.job}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Education</h3>
                    <p className="text-muted-foreground">{profile.education}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">AI Compatibility Analysis</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Based on your profiles, you both share interests in photography and travel, which suggests a
                      strong foundation for meaningful conversations.
                    </p>
                    <p className="text-sm">
                      Your communication styles appear complementary, and you're likely to enjoy similar activities
                      together.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="mt-4 fade-in">
              <div className="grid grid-cols-2 gap-2">
                {profile.photos.map((photo: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden bg-muted scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`${profile.name} photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interests" className="mt-4 fade-in">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest: string) => (
                      <Badge key={interest} variant="secondary" className="text-sm py-1 px-3">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Shared Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      Photography
                    </Badge>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      Travel
                    </Badge>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      Hiking
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
