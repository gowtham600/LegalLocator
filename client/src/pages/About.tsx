import { Check, Shield, Scale, PieChart, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              About LegalLocator
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connecting people with the legal help they need, when they need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700">Data-driven matching</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700">Location-based results</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700">AI-powered ranking</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700">Verified providers</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At LegalLocator, we believe everyone deserves access to quality legal services. Finding the right legal help shouldn't be complicated or stressful, especially during difficult times.
                </p>
                <p className="text-gray-600 mb-4">
                  Our mission is to simplify this process by connecting individuals with legal service providers who are not only qualified but also conveniently located and well-suited to their specific needs.
                </p>
                <p className="text-gray-600">
                  Through innovative technology and a commitment to service excellence, we strive to make legal help more accessible to all.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-72 h-72 bg-primary/10 rounded-full flex items-center justify-center">
                  <Scale className="w-32 h-32 text-primary/70" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Separator className="max-w-5xl mx-auto" />
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LegalLocator</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced technology to ensure you find the right legal help quickly and efficiently.
            </p>
          </div>
          
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Trusted Providers</CardTitle>
                  <CardDescription>
                    All legal service providers undergo a verification process before joining our platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We verify credentials, experience, and client reviews to ensure you're connected with qualified professionals.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <PieChart className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Smart Matching</CardTitle>
                  <CardDescription>
                    Our AI-powered algorithm finds the best match for your specific legal needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    By analyzing multiple factors including expertise, location, and availability, we provide personalized recommendations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Community Focused</CardTitle>
                  <CardDescription>
                    We're committed to improving access to legal services in all communities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our platform is designed to bridge gaps in legal service availability, especially in underserved areas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Values Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    We are committed to excellence in every aspect of our service, from the technology we develop to the support we provide.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We maintain the highest standards of integrity in our operations and relationships with users and service providers.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Inclusion</h3>
                  <p className="text-gray-600">
                    We believe in creating an inclusive platform that serves diverse communities and needs equally.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Justice</h3>
                  <p className="text-gray-600">
                    We are dedicated to improving access to justice by making legal services more accessible to all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}