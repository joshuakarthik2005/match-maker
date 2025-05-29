"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, ArrowLeft, User, Lock, CreditCard, Bell, Globe, Moon, LogOut, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Account Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <Card className="mb-6 overflow-hidden fade-in">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Profile" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">Sarah Anderson</h2>
                <p className="text-sm text-muted-foreground">sarah.anderson@example.com</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-primary"
                  onClick={() => router.push("/profile")}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-1">Account</h3>

            <Card className="overflow-hidden slide-in">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start py-6 px-4"
                  onClick={() => router.push("/profile")}
                >
                  <User className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 flex justify-between items-center">
                    <span>Personal Information</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Button>

                <div className="border-t" />

                <Button variant="ghost" className="w-full justify-start py-6 px-4">
                  <Lock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 flex justify-between items-center">
                    <span>Password & Security</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Button>

                <div className="border-t" />

                <Button variant="ghost" className="w-full justify-start py-6 px-4">
                  <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 flex justify-between items-center">
                    <span>Payment Methods</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Button>

                <div className="border-t" />

                <Button variant="ghost" className="w-full justify-start py-6 px-4">
                  <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 flex justify-between items-center">
                    <span>Notifications</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-1">Preferences</h3>

            <Card className="overflow-hidden slide-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-0">
                <div className="py-4 px-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Dark Mode</span>
                  </div>
                  <Switch />
                </div>

                <div className="border-t" />

                <Button variant="ghost" className="w-full justify-start py-6 px-4">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 flex justify-between items-center">
                    <span>Language</span>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">English</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground px-1">Other</h3>

            <Card className="overflow-hidden slide-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full justify-start py-6 px-4">
                  <LogOut className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Log Out</span>
                </Button>

                <div className="border-t" />

                <Button
                  variant="ghost"
                  className="w-full justify-start py-6 px-4 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5 mr-3" />
                  <span>Delete Account</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
