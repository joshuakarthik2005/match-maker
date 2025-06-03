"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { CreditCard, ArrowLeft, History, Wallet, Calculator } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BuyCreditsPage() {
  const router = useRouter()
  const [creditAmount, setCreditAmount] = useState("")

  const calculatePrice = (credits: number) => {
    if (credits >= 10 && credits <= 50) {
      return credits * 0.5
    } else if (credits >= 51 && credits <= 100) {
      return credits * 0.4
    } else if (credits > 100) {
      return credits * 0.25
    }
    return 0
  }

  const getPricePerCredit = (credits: number) => {
    if (credits >= 10 && credits <= 50) {
      return 0.5
    } else if (credits >= 51 && credits <= 100) {
      return 0.4
    } else if (credits > 100) {
      return 0.25
    }
    return 0
  }

  const recentTransactions = [
    {
      id: 1,
      type: "Purchase",
      credits: 150,
      amount: 60,
      date: "2025-01-28",
      status: "Completed",
    },
    {
      id: 2,
      type: "Used",
      credits: -25,
      description: "Lead purchase - John's Plumbing",
      date: "2025-01-27",
      status: "Completed",
    },
    {
      id: 3,
      type: "Used",
      credits: -8,
      description: "Lead purchase - TechSolutions Inc.",
      date: "2025-01-26",
      status: "Completed",
    },
    {
      id: 4,
      type: "Purchase",
      credits: 100,
      amount: 40,
      date: "2025-01-25",
      status: "Completed",
    },
  ]

  const handlePurchase = () => {
    const credits = Number.parseInt(creditAmount)
    if (credits >= 10) {
      // In a real app, you would process the payment here
      router.push("/dashboard")
    }
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
                <h1 className="text-4xl font-bold tracking-tight">Buy Credits</h1>
                <p className="text-xl text-muted-foreground">Purchase credits to connect with suppliers</p>
              </div>
            </div>
          </div>

          {/* Current Balance - Full Width */}
          <Card className="border-l-4 border-l-green-500 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                  <p className="text-4xl font-bold text-green-600">150 Credits</p>
                </div>
                <Wallet className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Purchase Credits - Full Width */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Purchase Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Credits</label>
                <Input
                  type="number"
                  placeholder="Enter amount (minimum 10)"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  min="10"
                  max="1000"
                />
              </div>

              {creditAmount && Number.parseInt(creditAmount) >= 10 && (
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Credits:</span>
                    <span className="font-medium">{creditAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per credit:</span>
                    <span className="font-medium">${getPricePerCredit(Number.parseInt(creditAmount)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">
                      ${calculatePrice(Number.parseInt(creditAmount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handlePurchase}
                disabled={!creditAmount || Number.parseInt(creditAmount) < 10}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Purchase Credits
              </Button>

              <p className="text-xs text-muted-foreground text-center">Secure payment with 256-bit SSL encryption</p>
            </CardContent>
          </Card>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Pricing Table */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">10 - 50 Credits</p>
                        <p className="text-sm text-muted-foreground">Best for occasional use</p>
                      </div>
                      <Badge variant="outline">$0.50 per credit</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-blue-50">
                      <div>
                        <p className="font-medium">51 - 100 Credits</p>
                        <p className="text-sm text-muted-foreground">Popular choice</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">$0.40 per credit</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">100+ Credits</p>
                        <p className="text-sm text-muted-foreground">Best value for businesses</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">$0.25 per credit</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Transaction History + How Credits Work */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Transaction History</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => router.push("/transactions")}>
                      <History className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex justify-between items-center py-3 border-b last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-sm">{transaction.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.description || `${Math.abs(transaction.credits)} credits`}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium text-sm ${
                              transaction.credits > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.credits > 0 ? "+" : ""}
                            {transaction.credits}
                          </p>
                          {transaction.amount && <p className="text-xs text-muted-foreground">${transaction.amount}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* How Credits Work */}
              <Card>
                <CardHeader>
                  <CardTitle>How Credits Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calculator className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Connect with Suppliers</p>
                      <p className="text-xs text-muted-foreground">
                        Use credits to purchase leads and contact suppliers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Secure Payments</p>
                      <p className="text-xs text-muted-foreground">All transactions are encrypted and secure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wallet className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">No Expiry</p>
                      <p className="text-xs text-muted-foreground">Credits never expire once purchased</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
