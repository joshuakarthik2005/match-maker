"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Bell, Shield, User, Mail, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PreferencesPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    // Notification preferences
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    newMatches: true,
    messages: true,
    projectUpdates: true,

    // Privacy preferences
    profileVisibility: true,
    showLocation: true,
    showContactInfo: false,
    allowDirectContact: true,

    // Account preferences
    language: "en",
    timezone: "UTC-5",
    currency: "USD",

    // Communication preferences
    autoReply: false,
    businessHours: true,
    weekendAvailability: false,
  })

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    // Save preferences logic here
    console.log("Saving preferences:", preferences)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Preferences</h1>
                <p className="text-xl text-muted-foreground">Customize your experience and privacy settings</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={preferences.pushNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={preferences.smsNotifications}
                          onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-matches">New Matches</Label>
                        <Switch
                          id="new-matches"
                          checked={preferences.newMatches}
                          onCheckedChange={(checked) => handlePreferenceChange("newMatches", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="messages">Messages</Label>
                        <Switch
                          id="messages"
                          checked={preferences.messages}
                          onCheckedChange={(checked) => handlePreferenceChange("messages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="project-updates">Project Updates</Label>
                        <Switch
                          id="project-updates"
                          checked={preferences.projectUpdates}
                          onCheckedChange={(checked) => handlePreferenceChange("projectUpdates", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <Switch
                          id="marketing-emails"
                          checked={preferences.marketingEmails}
                          onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                      </div>
                      <Switch
                        id="profile-visibility"
                        checked={preferences.profileVisibility}
                        onCheckedChange={(checked) => handlePreferenceChange("profileVisibility", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-location">Show Location</Label>
                        <p className="text-sm text-muted-foreground">Display your city and state</p>
                      </div>
                      <Switch
                        id="show-location"
                        checked={preferences.showLocation}
                        onCheckedChange={(checked) => handlePreferenceChange("showLocation", checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-contact">Show Contact Info</Label>
                        <p className="text-sm text-muted-foreground">Display email and phone publicly</p>
                      </div>
                      <Switch
                        id="show-contact"
                        checked={preferences.showContactInfo}
                        onCheckedChange={(checked) => handlePreferenceChange("showContactInfo", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="direct-contact">Allow Direct Contact</Label>
                        <p className="text-sm text-muted-foreground">Let others contact you directly</p>
                      </div>
                      <Switch
                        id="direct-contact"
                        checked={preferences.allowDirectContact}
                        onCheckedChange={(checked) => handlePreferenceChange("allowDirectContact", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange("language", e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-reply">Auto-Reply Messages</Label>
                      <p className="text-sm text-muted-foreground">Send automatic replies when unavailable</p>
                    </div>
                    <Switch
                      id="auto-reply"
                      checked={preferences.autoReply}
                      onCheckedChange={(checked) => handlePreferenceChange("autoReply", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="business-hours">Business Hours Only</Label>
                      <p className="text-sm text-muted-foreground">Only receive messages during business hours</p>
                    </div>
                    <Switch
                      id="business-hours"
                      checked={preferences.businessHours}
                      onCheckedChange={(checked) => handlePreferenceChange("businessHours", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekend-availability">Weekend Availability</Label>
                      <p className="text-sm text-muted-foreground">Show as available on weekends</p>
                    </div>
                    <Switch
                      id="weekend-availability"
                      checked={preferences.weekendAvailability}
                      onCheckedChange={(checked) => handlePreferenceChange("weekendAvailability", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Preferences</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
