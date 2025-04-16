import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/">
              <a className="text-2xl font-bold tracking-tight hover:text-white/90 transition-colors">
                Legal<span className="text-white">Finder</span>
              </a>
            </Link>
          </div>
          
          <nav className="flex space-x-6">
            <Link href="/">
              <a className="font-medium hover:text-white/90 transition-colors">Home</a>
            </Link>
            <Link href="/about">
              <a className="font-medium hover:text-white/90 transition-colors">About</a>
            </Link>
            <Link href="/contact">
              <a className="font-medium hover:text-white/90 transition-colors">Contact</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}