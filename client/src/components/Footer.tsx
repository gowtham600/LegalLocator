import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LegalFinder</h3>
            <p className="text-gray-600">
              Connecting you with trusted legal service providers in your area.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-primary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-600 hover:text-primary transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-600 hover:text-primary transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <address className="not-italic text-gray-600">
              <p>42 Tech Street</p>
              <p>Chennai, Tamil Nadu</p>
              <p>India</p>
              <p className="mt-2">Email: info@legalfinder.com</p>
              <p>Phone: (+91) 123-456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LegalFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}