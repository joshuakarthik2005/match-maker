"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { User, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user info and redirect to dashboard
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 scale-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
          <p className="text-gray-600">Login in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              name="email"
              type="email"
              placeholder="Email/Phone number"
              value={formData.email}
              onChange={handleChange}
              className="pl-12 h-14 rounded-2xl border-gray-200 bg-gray-50"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-12 h-14 rounded-2xl border-gray-200 bg-gray-50"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-14 text-lg rounded-2xl bg-black hover:bg-gray-800">
            Login
          </Button>
        </form>
      </Card>
    </div>
  )
}
