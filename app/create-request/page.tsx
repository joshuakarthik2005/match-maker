"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { Upload, X, FileText, ImageIcon, Mic, Video, Bot, AlertCircle, FileArchive } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function CreateRequestPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    budget: "",
    timeline: "",
  })
  const [completenessScore, setCompletenessScore] = useState(0)
  const [aiSummary, setAiSummary] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update completeness score based on filled fields
    const filledFields = Object.values(formData).filter(Boolean).length + (files.length > 0 ? 1 : 0)
    const totalFields = Object.keys(formData).length + 1 // +1 for files
    const newScore = Math.round((filledFields / totalFields) * 100)
    setCompletenessScore(newScore)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update completeness score
    const filledFields =
      Object.values({ ...formData, [name]: value }).filter(Boolean).length + (files.length > 0 ? 1 : 0)
    const totalFields = Object.keys(formData).length + 1
    const newScore = Math.round((filledFields / totalFields) * 100)
    setCompletenessScore(newScore)
  }

  const analyzeWithAI = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setAiSummary(`Based on your inputs, you're looking for ${formData.category.toLowerCase()} services in ${formData.location}. 
      
Your request involves ${formData.description.substring(0, 100)}${formData.description.length > 100 ? "..." : ""}.

You've specified a budget of ${formData.budget || "unspecified"} and a timeline of ${formData.timeline || "unspecified"}.

I've analyzed your attached files (${files.length} files) and identified key requirements. Your request completeness score is ${completenessScore}%.

To improve matching accuracy, consider adding more details about specific requirements and qualifications needed.`)

      setIsAnalyzing(false)
      setActiveTab("review")
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    router.push("/dashboard")
  }

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "audio":
        return <Mic className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "application":
        if (file.type.includes("pdf")) {
          return <FileText className="h-5 w-5 text-red-500" />
        }
        return <FileArchive className="h-5 w-5 text-amber-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Create New Request</h1>
            <p className="text-muted-foreground">
              Describe what you need and our AI will help match you with the right service providers.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="details">Request Details</TabsTrigger>
              <TabsTrigger value="files">Attach Files</TabsTrigger>
              <TabsTrigger value="review">Review & Submit</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="pt-6">
                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="E.g., Emergency Plumbing Repair Needed"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home-repair">Home Repair</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="moving">Moving Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="legal">Legal Services</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your needs in detail. Include information about urgency, specific requirements, and any other relevant details."
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, State or Remote"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (Optional)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        placeholder="E.g., $500-1000"
                        value={formData.budget}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline (Optional)</Label>
                    <Input
                      id="timeline"
                      name="timeline"
                      placeholder="E.g., Within 48 hours, 1 week, etc."
                      value={formData.timeline}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setActiveTab("files")}>Next: Attach Files</Button>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-1">Drag and drop files</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload images, documents, PDFs, audio, or video files to help describe your request
                      </p>
                      <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                      <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                        Browse Files
                      </Button>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Uploaded Files ({files.length})</h3>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-2">
                                {getFileIcon(file)}
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {(file.size / 1024).toFixed(0)} KB
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      Back
                    </Button>
                    <Button onClick={() => analyzeWithAI()}>Next: Review</Button>
                  </div>
                </TabsContent>

                <TabsContent value="review" className="space-y-6">
                  {isAnalyzing ? (
                    <div className="space-y-4 py-8 text-center">
                      <Bot className="h-12 w-12 mx-auto text-primary animate-pulse" />
                      <h3 className="text-lg font-medium">Analyzing your request...</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI is processing your information to create a summary and find the best matches.
                      </p>
                      <Progress value={45} className="max-w-md mx-auto" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Request Summary</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Completeness:</span>
                            <div className="flex items-center gap-1">
                              <Progress value={completenessScore} className="w-24 h-2" />
                              <span className="text-sm font-medium">{completenessScore}%</span>
                            </div>
                          </div>
                        </div>

                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Bot className="h-5 w-5 text-primary mt-1" />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">AI-Generated Summary</h4>
                                <p className="text-sm whitespace-pre-line">{aiSummary}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {completenessScore < 70 && (
                          <div className="flex items-start gap-2 p-3 border rounded-md bg-amber-50 text-amber-800 border-amber-200">
                            <AlertCircle className="h-5 w-5 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">Improve your request</h4>
                              <p className="text-sm">
                                Adding more details will help us find better matches. Consider adding information about
                                specific requirements, qualifications needed, and your timeline.
                              </p>
                            </div>
                          </div>
                        )}

                        <Separator />

                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Request Details</h4>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Title</p>
                              <p className="font-medium">{formData.title || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium">{formData.category || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Location</p>
                              <p className="font-medium">{formData.location || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Budget</p>
                              <p className="font-medium">{formData.budget || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Timeline</p>
                              <p className="font-medium">{formData.timeline || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Attachments</p>
                              <p className="font-medium">{files.length} files</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-muted-foreground text-sm">Description</p>
                            <p className="text-sm">{formData.description || "Not provided"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab("files")}>
                          Back
                        </Button>
                        <Button onClick={handleSubmit}>Submit Request</Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
