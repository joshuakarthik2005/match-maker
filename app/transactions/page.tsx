"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, CreditCard, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TransactionsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const transactions = [
    {
      id: 1,
      type: "Purchase",
      credits: 150,
      amount: 60,
      date: "2025-01-28",
      time: "14:30",
      status: "Completed",
      description: "Credit purchase",
      reference: "TXN-001234",
    },
    {
      id: 2,
      type: "Used",
      credits: -5,
      date: "2025-01-27",
      time: "16:45",
      status: "Completed",
      description: "Lead purchase - John's Plumbing Services",
      reference: "LEAD-001",
    },
    {
      id: 3,
      type: "Used",
      credits: -8,
      date: "2025-01-26",
      time: "10:20",
      status: "Completed",
      description: "Lead purchase - TechSolutions Inc.",
      reference: "LEAD-002",
    },
    {
      id: 4,
      type: "Purchase",
      credits: 100,
      amount: 40,
      date: "2025-01-25",
      time: "09:15",
      status: "Completed",
      description: "Credit purchase",
      reference: "TXN-001233",
    },
    {
      id: 5,
      type: "Used",
      credits: -6,
      date: "2025-01-24",
      time: "13:30",
      status: "Completed",
      description: "Lead purchase - MoveMasters",
      reference: "LEAD-003",
    },
    {
      id: 6,
      type: "Purchase",
      credits: 75,
      amount: 30,
      date: "2025-01-20",
      time: "11:45",
      status: "Completed",
      description: "Credit purchase",
      reference: "TXN-001232",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || transaction.type.toLowerCase() === filter
    return matchesSearch && matchesFilter
  })

  const totalCreditsSpent = transactions
    .filter((t) => t.type === "Used")
    .reduce((sum, t) => sum + Math.abs(t.credits), 0)

  const totalCreditsBought = transactions.filter((t) => t.type === "Purchase").reduce((sum, t) => sum + t.credits, 0)

  const totalAmountSpent = transactions
    .filter((t) => t.type === "Purchase" && t.amount)
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Transaction History</h1>
                <p className="text-xl text-muted-foreground">View all your credit purchases and usage</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Credits Purchased</p>
                    <p className="text-3xl font-bold text-green-600">{totalCreditsBought}</p>
                  </div>
                  <Plus className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">${totalAmountSpent} total spent</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Credits Used</p>
                    <p className="text-3xl font-bold text-red-600">{totalCreditsSpent}</p>
                  </div>
                  <Minus className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">For lead purchases</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                    <p className="text-3xl font-bold text-blue-600">150</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Available credits</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                    All
                  </Button>
                  <Button
                    variant={filter === "purchase" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("purchase")}
                  >
                    Purchases
                  </Button>
                  <Button
                    variant={filter === "used" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("used")}
                  >
                    Usage
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "Purchase" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "Purchase" ? (
                          <Plus
                            className={`h-4 w-4 ${transaction.type === "Purchase" ? "text-green-600" : "text-red-600"}`}
                          />
                        ) : (
                          <Minus className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">
                            {transaction.date} at {transaction.time}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {transaction.reference}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold text-lg ${transaction.credits > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.credits > 0 ? "+" : ""}
                        {transaction.credits} credits
                      </p>
                      {transaction.amount && <p className="text-sm text-muted-foreground">${transaction.amount}</p>}
                      <Badge variant={transaction.status === "Completed" ? "default" : "secondary"} className="mt-1">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
