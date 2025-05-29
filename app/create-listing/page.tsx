"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { SimpleSelect, SimpleSelectItem } from "@/components/ui/simple-select"
import { useRouter } from "next/navigation"

export default function CreateListingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    pricing: "",
    pricingType: "hourly",
    location: "",
    availability: "",
    experience: "",
    skills: [] as string[],
    portfolio: [] as File[],
    certifications: [] as File[],
  })

  const [currentSkill, setCurrentSkill] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }))
      setCurrentSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    router.push("/supply")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Listing</h1>
              <p className="text-muted-foreground">Showcase your services to potential buyers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Service Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Professional Web Development Services"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <SimpleSelect
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SimpleSelectItem value="technology">Technology</SimpleSelectItem>
                      <SimpleSelectItem value="home-services">Home Services</SimpleSelectItem>
                      <SimpleSelectItem value="professional">Professional Services</SimpleSelectItem>
                      <SimpleSelectItem value="creative">Creative Services</SimpleSelectItem>
                      <SimpleSelectItem value="healthcare">Healthcare</SimpleSelectItem>
                      <SimpleSelectItem value="education">Education</SimpleSelectItem>
                    </SimpleSelect>
                  </div>

                  <div>
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <SimpleSelect
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                    >
                      <SimpleSelectItem value="web-development">Web Development</SimpleSelectItem>
                      <SimpleSelectItem value="mobile-apps">Mobile Apps</SimpleSelectItem>
                      <SimpleSelectItem value="graphic-design">Graphic Design</SimpleSelectItem>
                      <SimpleSelectItem value="plumbing">Plumbing</SimpleSelectItem>
                      <SimpleSelectItem value="electrical">Electrical</SimpleSelectItem>
                    </SimpleSelect>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your service in detail. What makes you unique? What can clients expect?"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricingType">Pricing Type *</Label>
                    <SimpleSelect
                      value={formData.pricingType}
                      onValueChange={(value) => handleInputChange("pricingType", value)}
                    >
                      <SimpleSelectItem value="hourly">Hourly Rate</SimpleSelectItem>
                      <SimpleSelectItem value="fixed">Fixed Price</SimpleSelectItem>
                      <SimpleSelectItem value="project">Per Project</SimpleSelectItem>
                      <SimpleSelectItem value="consultation">Consultation</SimpleSelectItem>
                    </SimpleSelect>
                  </div>

                  <div>
                    <Label htmlFor="pricing">Price Range *</Label>
                    <Input
                      id="pricing"
                      placeholder="e.g., $50-100 or $500"
                      value={formData.pricing}
                      onChange={(e) => handleInputChange("pricing", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Service Location *</Label>
                    <SimpleSelect
                      value={formData.location}
                      onValueChange={(value) => handleInputChange("location", value)}
                    >
                      <SimpleSelectItem value="remote">Remote</SimpleSelectItem>
                      <SimpleSelectItem value="on-site">On-site</SimpleSelectItem>
                      <SimpleSelectItem value="hybrid">Hybrid</SimpleSelectItem>
                      <SimpleSelectItem value="local">Local Area Only</SimpleSelectItem>
                    </SimpleSelect>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <SimpleSelect
                      value={formData.availability}
                      onValueChange={(value) => handleInputChange("availability", value)}
                    >
                      <SimpleSelectItem value="immediate">Available Immediately</SimpleSelectItem>
                      <SimpleSelectItem value="within-week">Within a Week</SimpleSelectItem>
                      <SimpleSelectItem value="within-month">Within a Month</SimpleSelectItem>
                      <SimpleSelectItem value="by-appointment">By Appointment</SimpleSelectItem>
                    </SimpleSelect>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <SimpleSelect
                    value={formData.experience}
                    onValueChange={(value) => handleInputChange("experience", value)}
                  >
                    <SimpleSelectItem value="0-1">0-1 years</SimpleSelectItem>
                    <SimpleSelectItem value="2-5">2-5 years</SimpleSelectItem>
                    <SimpleSelectItem value="6-10">6-10 years</SimpleSelectItem>
                    <SimpleSelectItem value="10+">10+ years</SimpleSelectItem>
                  </SimpleSelect>
                </div>

                <div>
                  <Label htmlFor="skills">Skills & Technologies</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a skill (e.g., React, Plumbing, Photography)"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <div key={skill} className="flex items-center bg-secondary px-3 py-1 rounded-full">
                        <span className="text-sm">{skill}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Portfolio Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload images of your work (max 5 files, 10MB each)
                    </p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Certifications</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload certificates, licenses, or qualifications
                    </p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured" className="text-sm">
                      Make this a featured listing (+$10/month for better visibility)
                    </Label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button type="submit" className="flex-1">
                      Publish Listing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
