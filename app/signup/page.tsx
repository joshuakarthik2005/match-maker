"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    pincode: "",
    password: "",
    code: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user info and redirect to dashboard
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userName", formData.firstName)
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (step === 1 ? router.back() : setStep(1))}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Create Account</h1>
        </div>

        <Card className="p-6 space-y-6 scale-in">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Create An Account</h2>
                <p className="text-gray-600">Sign Up to continue</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-xl">
                      <span className="text-gray-600">+91</span>
                    </div>
                    <Input
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 rounded-l-none rounded-r-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-black hover:bg-gray-800">
                  Continue
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode</label>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Code</label>
                  <Input
                    name="code"
                    placeholder="Enter Code"
                    value={formData.code}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    required
                  />
                  <p className="text-blue-600 text-sm mt-2">Resend After 51s</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <label htmlFor="terms" className="text-sm">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms}
                  className="w-full h-12 rounded-xl bg-black hover:bg-gray-800"
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
