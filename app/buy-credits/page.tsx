"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { CreditCard, Star, Check, ArrowLeft, Clock, Zap, Gift, History, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BuyCreditsPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(2)
  const [customAmount, setCustomAmount] = useState("")

  const creditPlans = [
    {
      id: 1,
      name: "Starter Pack",
      credits: 50,
      price: 25,
      pricePerCredit: 0.5,
      popular: false,
      savings: 0,
      features: ["Basic matching", "Standard support", "30-day validity"],
    },
    {
      id: 2,
      name: "Professional",
      credits: 150,
      price: 60,
      pricePerCredit: 0.4,
      popular: true,
      savings: 15,
      features: ["Priority matching", "Premium support", "60-day validity", "Featured listings"],
    },
    {
      id: 3,
      name: "Business",
      credits: 300,
      price: 105,
      pricePerCredit: 0.35,
      popular: false,
      savings: 30,
      features: ["Instant matching", "24/7 support", "90-day validity", "Featured listings", "Analytics dashboard"],
    },
    {
      id: 4,
      name: "Enterprise",
      credits: 500,
      price: 150,
      pricePerCredit: 0.3,
      popular: false,
      savings: 40,
      features: [
        "Unlimited matching",
        "Dedicated support",
        "1-year validity",
        "All premium features",
        "Custom integrations",
      ],
    },
  ]

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
      description: "Premium listing boost",
      date: "2025-01-27",
      status: "Completed",
    },
    {
      id: 3,
      type: "Bonus",
      credits: 10,
      description: "Referral bonus",
      date: "2025-01-25",
      status: "Completed",
    },
  ]

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
                <h1 className="text-4xl font-bold tracking-tight">Manage Credits</h1>
                <p className="text-xl text-muted-foreground">Buy credits and manage your transactions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Balance */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                      <p className="text-4xl font-bold text-green-600">150 Credits</p>
                      <p className="text-sm text-muted-foreground mt-1">Valid until March 15, 2025</p>
                    </div>
                    <Wallet className="h-12 w-12 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              {/* Credit Plans */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Choose Your Credit Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creditPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                      } ${plan.popular ? "border-primary" : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader className="relative">
                        {plan.popular && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        )}
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">{plan.credits}</span>
                            <span className="text-muted-foreground"> credits</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-2xl font-bold">${plan.price}</span>
                            <span className="text-sm text-muted-foreground"> (${plan.pricePerCredit}/credit)</span>
                          </div>
                          {plan.savings > 0 && (
                            <Badge variant="secondary" className="mt-2">
                              Save {plan.savings}%
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <Card>
                <CardHeader>
                  <CardTitle>Custom Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Enter custom credit amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="10"
                        max="1000"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {customAmount && <p>Cost: ${(Number.parseInt(customAmount) * 0.45).toFixed(2)}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purchase Button */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {customAmount
                          ? `${customAmount} Credits`
                          : `${creditPlans.find((p) => p.id === selectedPlan)?.name}`}
                      </h3>
                      <p className="text-muted-foreground">
                        {customAmount
                          ? `$${(Number.parseInt(customAmount) * 0.45).toFixed(2)}`
                          : `$${creditPlans.find((p) => p.id === selectedPlan)?.price}`}
                      </p>
                    </div>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Purchase Credits
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Secure payment with 256-bit SSL encryption
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How Credits Work */}
              <Card>
                <CardHeader>
                  <CardTitle>How Credits Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Connect with Suppliers</p>
                      <p className="text-xs text-muted-foreground">Use 1 credit per connection</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Featured Listings</p>
                      <p className="text-xs text-muted-foreground">Boost visibility for 5 credits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Priority Support</p>
                      <p className="text-xs text-muted-foreground">Get faster responses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm">
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
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
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

              {/* Special Offers */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Offers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="h-4 w-4 text-yellow-600" />
                      <p className="font-medium text-sm">Referral Bonus</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Get 10 free credits for each friend you refer!</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-blue-600" />
                      <p className="font-medium text-sm">First Purchase</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Get 20% extra credits on your first purchase!</p>
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
