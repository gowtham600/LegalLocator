import { Link } from "wouter";
import { GavelIcon, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary rounded-md">
                <GavelIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LegalLocator</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting people with the legal help they need, when they need it most.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-primary text-sm">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-primary text-sm">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-600 hover:text-primary text-sm">Cookie Policy</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <address className="not-italic">
              <p className="text-gray-600 text-sm mb-2">
                42 Tech Street<br />
                Chennai, Tamil Nadu<br />
                India
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-medium">Email:</span> info@legallocator.com
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Phone:</span> (+91) 123-456-7890
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} LegalLocator. All rights reserved.
          </p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-primary" />
            <span>for legal accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}