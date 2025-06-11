"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { useParams } from "next/navigation"

export default function EditDemandPage() {
  const router = useRouter()
  const params = useParams()
  const demandId = params.id

  // Mock data for existing demands
  const demandData = {
    1: {
      title: "Emergency Plumbing Repair",
      category: "home-services",
      subcategory: "plumbing",
      description: "Need immediate plumbing repair for burst pipe in kitchen.",
      budget: "200-500",
      budgetType: "fixed",
      location: "New York, NY",
      urgency: "urgent",
      requiredDate: "2024-12-15",
      itemType: "Emergency Service",
      quantity: "1",
      specifications: ["24/7 availability", "Licensed plumber", "Emergency response"],
      attachments: [] as File[],
      featured: false,
    },
    2: {
      title: "Website Development",
      category: "technology",
      subcategory: "web-development",
      description: "Looking for experienced developer to build e-commerce website.",
      budget: "2000-5000",
      budgetType: "project",
      location: "Remote",
      urgency: "within-month",
      requiredDate: "2025-01-30",
      itemType: "Web Development",
      quantity: "1",
      specifications: ["React/Next.js", "Payment integration", "Mobile responsive", "SEO optimized"],
      attachments: [] as File[],
      featured: true,
    },
    3: {
      title: "Moving Services",
      category: "transportation",
      subcategory: "moving",
      description: "Need help moving 2-bedroom apartment across town.",
      budget: "300-800",
      budgetType: "fixed",
      location: "Chicago, IL",
      urgency: "this-week",
      requiredDate: "2024-12-20",
      itemType: "Residential Moving",
      quantity: "1",
      specifications: ["Packing service", "Insurance coverage", "Weekend availability"],
      attachments: [] as File[],
      featured: false,
    },
  }

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    budget: "",
    budgetType: "fixed",
    location: "",
    urgency: "",
    requiredDate: "",
    itemType: "",
    quantity: "",
    specifications: [] as string[],
    attachments: [] as File[],
    featured: false,
  })

  const [currentSpec, setCurrentSpec] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load the demand data
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      const id = Array.isArray(demandId) ? demandId[0] : demandId
      const numericId = Number(id)
      if (numericId && demandData[numericId as keyof typeof demandData]) {
        setFormData(demandData[numericId as keyof typeof demandData])
      }
      setIsLoading(false)
    }, 500)
  }, [demandId])

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecification = () => {
    if (currentSpec.trim() && !formData.specifications.includes(currentSpec.trim())) {
      setFormData((prev) => ({
        ...prev,
        specifications: [...prev.specifications, currentSpec.trim()],
      }))
      setCurrentSpec("")
    }
  }

  const removeSpecification = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((s) => s !== spec),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - update the demand
    console.log("Updating demand:", formData)
    // Show success message
    alert("Demand updated successfully!")
    router.push("/demand")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-lg">Loading demand data...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
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
              <h1 className="text-3xl font-bold tracking-tight">Edit Demand</h1>
              <p className="text-muted-foreground">Update your demand request information</p>
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
                  <Label htmlFor="title">Request Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Emergency Plumbing Repair"
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
                      <SimpleSelectItem value="transportation">Transportation</SimpleSelectItem>
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
                      <SimpleSelectItem value="moving">Moving Services</SimpleSelectItem>
                    </SimpleSelect>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you need in detail. Be specific about your requirements."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget & Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Budget & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetType">Budget Type *</Label>
                    <SimpleSelect
                      value={formData.budgetType}
                      onValueChange={(value) => handleInputChange("budgetType", value)}
                    >
                      <SimpleSelectItem value="fixed">Fixed Budget</SimpleSelectItem>
                      <SimpleSelectItem value="hourly">Hourly Rate</SimpleSelectItem>
                      <SimpleSelectItem value="project">Per Project</SimpleSelectItem>
                      <SimpleSelectItem value="negotiable">Negotiable</SimpleSelectItem>
                    </SimpleSelect>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 200-500 or 1000"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemType">Item/Service Type *</Label>
                    <Input
                      id="itemType"
                      placeholder="e.g., Emergency Service, Web Development"
                      value={formData.itemType}
                      onChange={(e) => handleInputChange("itemType", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      placeholder="e.g., 1, 5, 100"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, NY or Remote"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency *</Label>
                    <SimpleSelect
                      value={formData.urgency}
                      onValueChange={(value) => handleInputChange("urgency", value)}
                    >
                      <SimpleSelectItem value="urgent">Urgent (ASAP)</SimpleSelectItem>
                      <SimpleSelectItem value="this-week">This Week</SimpleSelectItem>
                      <SimpleSelectItem value="within-month">Within a Month</SimpleSelectItem>
                      <SimpleSelectItem value="flexible">Flexible Timeline</SimpleSelectItem>
                    </SimpleSelect>
                  </div>
                </div>

                <div>
                  <Label htmlFor="requiredDate">Required By Date</Label>
                  <Input
                    id="requiredDate"
                    type="date"
                    value={formData.requiredDate}
                    onChange={(e) => handleInputChange("requiredDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="specifications">Specific Requirements</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a requirement (e.g., Licensed professional, 24/7 availability)"
                      value={currentSpec}
                      onChange={(e) => setCurrentSpec(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecification())}
                    />
                    <Button type="button" onClick={addSpecification}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications.map((spec) => (
                      <div key={spec} className="flex items-center bg-secondary px-3 py-1 rounded-full">
                        <span className="text-sm">{spec}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2"
                          onClick={() => removeSpecification(spec)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload any relevant documents, images, or specifications
                    </p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Request */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked === true)}
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Make this a featured request (+$5/month for better visibility)
                    </Label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Update Demand
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
