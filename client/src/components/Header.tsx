import { Link } from "wouter";
import { MapPin } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MapPin className="h-8 w-8" />
          <h1 className="text-xl md:text-2xl font-bold">LegalLocator</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-200">About</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
