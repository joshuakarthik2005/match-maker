"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Mail, Phone, Check, X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [generatedOTP, setGeneratedOTP] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    pincode: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(checks).filter(Boolean).length
    let strength = "Very Weak"
    let color = "bg-red-500"

    if (score >= 5) {
      strength = "Very Strong"
      color = "bg-green-500"
    } else if (score >= 4) {
      strength = "Strong"
      color = "bg-green-400"
    } else if (score >= 3) {
      strength = "Medium"
      color = "bg-yellow-500"
    } else if (score >= 2) {
      strength = "Weak"
      color = "bg-orange-500"
    }

    return { checks, strength, color, score }
  }

  const passwordStrength = checkPasswordStrength(formData.password)

  // Resend timer effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

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
    } else if (step === 2) {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!")
        return
      }
      if (passwordStrength.score < 3) {
        alert("Please choose a stronger password!")
        return
      }
      // Send OTP
      sendOTP()
      setStep(3)
    }
  }

  const sendOTP = () => {
    // Generate a random 6-digit OTP for demo purposes
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOTP(newOTP)

    // For demo purposes, show the OTP in an alert
    alert(
      `Demo Mode: Your OTP is ${newOTP}\n\nIn production, this would be sent to your ${otpMethod === "email" ? "email" : "phone number"}.`,
    )

    console.log(`Demo OTP: ${newOTP}`)
    console.log(`Would send OTP to ${otpMethod === "email" ? formData.email : formData.phone}`)
    setResendTimer(60) // 1 minute timer
  }

  const resendOTP = () => {
    if (resendTimer === 0) {
      sendOTP()
    }
  }

  const verifyOTP = () => {
    if (otp === generatedOTP) {
      // Store user info and redirect to dashboard
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userName", formData.username || formData.firstName)
      localStorage.setItem("isLoggedIn", "true")
      router.push("/dashboard")
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleBack = () => {
    if (step === 1) {
      router.back()
    } else {
      setStep(step - 1)
    }
  }

  // Skip OTP for demo purposes
  const skipOTP = () => {
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userName", formData.username || formData.firstName)
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-4">
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

                <div>
                  <label className="block text-sm font-medium mb-2">Pincode</label>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    placeholder="Enter your area pincode"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-black hover:bg-gray-800">
                  Continue
                </Button>
              </form>
            </>
          ) : step === 2 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Set Up Your Account</h2>
                <p className="text-gray-600">Create your username and password</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    placeholder="Choose a unique username"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be your unique identifier on the platform</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 rounded-xl pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Password Strength:</span>
                        <span
                          className={`text-sm font-medium ${
                            passwordStrength.score >= 4
                              ? "text-green-600"
                              : passwordStrength.score >= 3
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {passwordStrength.strength}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div
                          className={`flex items-center gap-1 ${passwordStrength.checks.length ? "text-green-600" : "text-gray-400"}`}
                        >
                          {passwordStrength.checks.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          8+ characters
                        </div>
                        <div
                          className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? "text-green-600" : "text-gray-400"}`}
                        >
                          {passwordStrength.checks.uppercase ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          Uppercase
                        </div>
                        <div
                          className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? "text-green-600" : "text-gray-400"}`}
                        >
                          {passwordStrength.checks.lowercase ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          Lowercase
                        </div>
                        <div
                          className={`flex items-center gap-1 ${passwordStrength.checks.number ? "text-green-600" : "text-gray-400"}`}
                        >
                          {passwordStrength.checks.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Number
                        </div>
                        <div
                          className={`flex items-center gap-1 ${passwordStrength.checks.special ? "text-green-600" : "text-gray-400"}`}
                        >
                          {passwordStrength.checks.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Special char
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-12 rounded-xl pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Passwords match
                    </p>
                  )}
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
                  type="submit"
                  disabled={
                    !formData.agreeToTerms ||
                    formData.password !== formData.confirmPassword ||
                    passwordStrength.score < 3
                  }
                  className="w-full h-12 rounded-xl bg-black hover:bg-gray-800"
                >
                  Continue to Verification
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Verify Your Account</h2>
                <p className="text-gray-600">We've sent a verification code to verify your account</p>
              </div>

              {/* Demo Mode Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>Demo Mode:</strong> The OTP will be shown in an alert popup since email/SMS services aren't
                  configured yet.
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={otpMethod === "email" ? "default" : "outline"}
                    onClick={() => setOtpMethod("email")}
                    className="flex-1 h-12 rounded-xl"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant={otpMethod === "phone" ? "default" : "outline"}
                    onClick={() => setOtpMethod("phone")}
                    className="flex-1 h-12 rounded-xl"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Code sent to: {otpMethod === "email" ? formData.email : `+91 ${formData.phone}`}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Enter 6-digit code</label>
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="h-12 rounded-xl text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={verifyOTP}
                  disabled={otp.length !== 6}
                  className="w-full h-12 rounded-xl bg-black hover:bg-gray-800"
                >
                  Verify & Create Account
                </Button>

                <div className="text-center">
                  <Button variant="link" onClick={resendOTP} disabled={resendTimer > 0} className="text-sm">
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => setOtpMethod(otpMethod === "email" ? "phone" : "email")}
                    className="text-sm text-blue-600"
                  >
                    Try {otpMethod === "email" ? "phone number" : "email"} instead
                  </Button>
                </div>

                {/* Demo Skip Option */}
                <div className="border-t pt-4">
                  <Button variant="outline" onClick={skipOTP} className="w-full h-12 rounded-xl border-dashed">
                    Skip Verification (Demo Mode)
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
