"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Bell,
  ArrowLeft,
  MessageSquare,
  Star,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "message",
      title: "New message from Sarah Johnson",
      description: "Regarding your web development service inquiry",
      time: "2 minutes ago",
      read: false,
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "match",
      title: "New match found!",
      description: "3 suppliers matched your plumbing repair request",
      time: "1 hour ago",
      read: false,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      description: "$150 payment for logo design project",
      time: "3 hours ago",
      read: true,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      id: 4,
      type: "connection",
      title: "New connection request",
      description: "Mike Chen wants to connect for moving services",
      time: "5 hours ago",
      read: false,
      icon: Users,
      color: "text-purple-500",
    },
    {
      id: 5,
      type: "system",
      title: "Profile verification complete",
      description: "Your supplier profile has been verified successfully",
      time: "1 day ago",
      read: true,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 6,
      type: "reminder",
      title: "Credit balance low",
      description: "You have 15 credits remaining. Consider purchasing more.",
      time: "2 days ago",
      read: true,
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ]

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === filter)

  const unreadCount = notifications.filter((n) => !n.read).length

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
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight">Notifications</h1>
                <p className="text-xl text-muted-foreground">Stay updated with your latest activities</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                      <p className="text-2xl font-bold">{notifications.length}</p>
                    </div>
                    <Bell className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Unread</p>
                      <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === "message" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("message")}
              >
                Messages
              </Button>
              <Button variant={filter === "match" ? "default" : "outline"} size="sm" onClick={() => setFilter("match")}>
                Matches
              </Button>
              <Button
                variant={filter === "payment" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("payment")}
              >
                Payments
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
                  <p className="text-muted-foreground">
                    {filter === "all"
                      ? "You're all caught up! No new notifications."
                      : `No ${filter} notifications found.`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    !notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3
                              className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-2 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Badge variant="default" className="bg-primary">
                                New
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Mark All as Read */}
          {unreadCount > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
