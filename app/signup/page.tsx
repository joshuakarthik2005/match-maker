"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Mail, Phone, Check, X, AlertCircle, FileText, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [generatedOTP, setGeneratedOTP] = useState("")
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [emailValidated, setEmailValidated] = useState(false)
  const [phoneValidated, setPhoneValidated] = useState(false)
  const [validatingEmail, setValidatingEmail] = useState(false)
  const [validatingPhone, setValidatingPhone] = useState(false)

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

  const validateEmail = async () => {
    setValidatingEmail(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setEmailValidated(true)
    setValidatingEmail(false)
    alert("Email validated successfully!")
  }

  const validatePhone = async () => {
    setValidatingPhone(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPhoneValidated(true)
    setValidatingPhone(false)
    alert("Phone number validated successfully!")
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
                  <label className="block text-sm font-medium mb-2">Last Name (Optional)</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
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
                  {formData.email && !emailValidated && (
                    <div className="flex justify-end mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={validateEmail}
                        disabled={validatingEmail}
                        className="text-xs"
                      >
                        {validatingEmail ? "Validating..." : "Validate Email"}
                      </Button>
                    </div>
                  )}
                  {emailValidated && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      Email validated
                    </div>
                  )}
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
                  {formData.phone && !phoneValidated && (
                    <div className="flex justify-end mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={validatePhone}
                        disabled={validatingPhone}
                        className="text-xs"
                      >
                        {validatingPhone ? "Validating..." : "Validate Phone"}
                      </Button>
                    </div>
                  )}
                  {phoneValidated && (
                    <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      Phone validated
                    </div>
                  )}
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
                  <label className="block text-sm font-medium mb-2">Address Line 1</label>
                  <Input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    placeholder="Street address, building name, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address Line 2</label>
                  <Input
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="h-12 rounded-xl"
                    placeholder="Apartment, suite, floor (optional)"
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

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setTermsDialogOpen(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => setPrivacyDialogOpen(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-black hover:bg-gray-800"
                  disabled={!formData.agreeToTerms}
                >
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

                <Button
                  type="submit"
                  disabled={formData.password !== formData.confirmPassword || passwordStrength.score < 3}
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

      {/* Terms of Service Dialog */}
      <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Terms of Service
            </DialogTitle>
            <DialogDescription>Please read our terms of service carefully</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-base">1. Acceptance of Terms</h3>
              <p>
                By accessing or using our matchmaking platform, you agree to be bound by these Terms of Service. If you
                do not agree to these terms, please do not use our services.
              </p>

              <h3 className="font-semibold text-base">2. Eligibility</h3>
              <p>
                You must be at least 18 years old to use our services. By using our platform, you represent and warrant
                that you are at least 18 years old and have the legal capacity to enter into these terms.
              </p>

              <h3 className="font-semibold text-base">3. User Accounts</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account. You agree to notify us immediately of any unauthorized use of
                your account.
              </p>

              <h3 className="font-semibold text-base">4. User Content</h3>
              <p>
                You retain ownership of any content you submit to our platform. However, by submitting content, you
                grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish,
                translate, and distribute your content.
              </p>

              <h3 className="font-semibold text-base">5. Prohibited Conduct</h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use our services for any illegal purpose</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Post false, misleading, or deceptive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated scripts to access our platform</li>
                <li>Interfere with the proper functioning of our services</li>
              </ul>

              <h3 className="font-semibold text-base">6. Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account at our sole discretion, without notice, for
                conduct that we believe violates these Terms of Service or is harmful to other users, us, or third
                parties, or for any other reason.
              </p>

              <h3 className="font-semibold text-base">7. Disclaimer of Warranties</h3>
              <p>
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not
                guarantee that our services will be uninterrupted, secure, or error-free.
              </p>

              <h3 className="font-semibold text-base">8. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or revenues.
              </p>

              <h3 className="font-semibold text-base">9. Changes to Terms</h3>
              <p>
                We may modify these Terms of Service at any time. Your continued use of our services after any changes
                indicates your acceptance of the modified terms.
              </p>

              <h3 className="font-semibold text-base">10. Governing Law</h3>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of [Your
                Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setTermsDialogOpen(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyDialogOpen} onOpenChange={setPrivacyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy Policy
            </DialogTitle>
            <DialogDescription>How we collect, use, and protect your data</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-base">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, update your
                profile, or communicate with other users. This may include:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact information (name, email address, phone number)</li>
                <li>Profile information (photo, bio, preferences)</li>
                <li>Communications you send through our platform</li>
                <li>Transaction information when you make purchases</li>
                <li>Location information when you use location-based features</li>
              </ul>

              <h3 className="font-semibold text-base">2. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>

              <h3 className="font-semibold text-base">3. Information Sharing</h3>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Other users as part of the normal operation of our services</li>
                <li>Service providers who perform services on our behalf</li>
                <li>Law enforcement or other parties when required by law or to protect rights</li>
                <li>In connection with a business transaction such as a merger or acquisition</li>
              </ul>

              <h3 className="font-semibold text-base">4. Data Security</h3>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or
                electronic storage is 100% secure.
              </p>

              <h3 className="font-semibold text-base">5. Your Choices</h3>
              <p>
                You can access and update certain information through your account settings. You may also opt out of
                receiving promotional communications from us by following the instructions in those communications.
              </p>

              <h3 className="font-semibold text-base">6. Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar technologies to collect information about your browsing activities and to
                distinguish you from other users. You can set your browser to refuse all or some cookies or to alert you
                when cookies are being sent.
              </p>

              <h3 className="font-semibold text-base">7. Children's Privacy</h3>
              <p>
                Our services are not intended for individuals under the age of 18, and we do not knowingly collect
                personal information from children under 18.
              </p>

              <h3 className="font-semibold text-base">8. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the effective date.
              </p>

              <h3 className="font-semibold text-base">9. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@matchmakingapp.com.
              </p>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setPrivacyDialogOpen(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
