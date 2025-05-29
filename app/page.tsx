import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BrainCircuit, Users, Zap, FileText, Building, Heart, MessageSquare } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">MatchMaker</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4 fade-in">
            <h1 className="text-4xl font-bold text-gray-900">Supply & Demand</h1>
            <p className="text-lg text-gray-600">Connect suppliers with buyers through AI-powered matching</p>
          </div>

          <div className="grid gap-4 mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg slide-in" style={{ animationDelay: "0.1s" }}>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600 text-sm">AI-powered algorithm connects the right suppliers with buyers</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg slide-in" style={{ animationDelay: "0.2s" }}>
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
              <p className="text-gray-600 text-sm">Instant communication between suppliers and buyers</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg slide-in" style={{ animationDelay: "0.3s" }}>
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-600 text-sm">Quick transactions with verified users and secure payments</p>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <Button
              asChild
              className="w-full h-14 text-lg rounded-2xl bg-black hover:bg-gray-800 scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI-Powered Service Matching</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with the perfect service providers based on your specific needs. Our AI analyzes your requirements
              to find the best matches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your requirements from text, images, documents, and more to find the perfect match.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Connections</h3>
              <p className="text-muted-foreground">
                Get connected with service providers quickly, whether for emergency supplies, gig work, or business
                needs.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-muted-foreground">
                Connect with verified service providers who have been vetted and reviewed by other users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Gig Work Matching</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connect workers with urgent gig opportunities based on skills, location, and availability.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Fast matching for immediate income needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Deduplication ensures accurate worker profiles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Prioritizes proximity and urgency</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Emergency Relief</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Match emergency supplies to disaster-affected communities quickly and accurately.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Rapid matching of supplies to specific needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Prevents duplicate aid listings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Near-instant results for critical situations</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Business Supply Chain</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Connect small businesses with local suppliers during supply chain disruptions.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Matches business demands with local suppliers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Cleans duplicate supplier listings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Supports local economies and reduces delays</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border slide-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Housing Matches</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Help renters find affordable housing that matches their budget and location needs.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Pairs renter requirements with available listings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Eliminates duplicate property listings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Supports stable housing placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-primary mb-4 md:mb-0">MatchMaker</div>
            <div className="flex gap-8">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MatchMaker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
