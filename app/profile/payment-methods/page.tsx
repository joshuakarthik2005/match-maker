"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Plus, Trash2, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentMethodsPage() {
  const router = useRouter()

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Payment Methods</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Saved Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {method.type} •••• {method.last4}
                      </p>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Add New Payment Method
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Premium Credits - 100 Credits</p>
                <p className="text-sm text-muted-foreground">Dec 15, 2024</p>
              </div>
              <p className="font-medium">$49.99</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Basic Credits - 50 Credits</p>
                <p className="text-sm text-muted-foreground">Nov 28, 2024</p>
              </div>
              <p className="font-medium">$29.99</p>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Starter Pack - 25 Credits</p>
                <p className="text-sm text-muted-foreground">Nov 10, 2024</p>
              </div>
              <p className="font-medium">$19.99</p>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full">
          Download All Receipts
        </Button>
      </main>
    </div>
  )
}
