import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            About LegalFinder
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              LegalFinder is a cutting-edge platform designed to connect individuals with qualified legal service providers in their vicinity. Our mission is to make quality legal services more accessible to everyone, regardless of their location or background.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2024, our team of legal experts and technologists created this platform to bridge the gap between those seeking legal assistance and professionals who can provide it. We understand that finding the right legal help can be overwhelming, which is why we've developed an intelligent matching system that considers your specific needs and location.
            </p>
            
            <div className="my-10 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Core Values</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Accessibility</h3>
                    <p className="text-gray-600">We believe everyone deserves access to quality legal services regardless of their location.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Trust</h3>
                    <p className="text-gray-600">We carefully vet all legal service providers on our platform to ensure they meet our high standards.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Innovation</h3>
                    <p className="text-gray-600">Our AI-powered matching algorithm ensures you find the most relevant legal help for your specific situation.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Diversity</h3>
                    <p className="text-gray-600">We embrace and promote diversity among our legal service providers and the communities we serve.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              LegalFinder uses your location and service needs to find the most relevant legal service providers near you. Our intelligent ranking system considers factors such as proximity, expertise, reviews, and experience to present you with the best options.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Whether you need assistance with family law, criminal defense, corporate matters, or any other legal service, our platform helps you find qualified professionals who can address your specific needs efficiently and effectively.
            </p>
            
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-8">
              <h3 className="text-xl font-semibold mb-2 text-primary">Join Our Network</h3>
              <p className="text-gray-700">
                Are you a legal service provider interested in joining our platform? Contact us to learn more about how LegalFinder can help you connect with clients in your area.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}