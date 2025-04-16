import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { GavelIcon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const MenuItems = () => (
    <>
      <Link href="/">
        <Button variant="ghost" onClick={closeMenu}>Home</Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost" onClick={closeMenu}>About</Button>
      </Link>
      <Link href="/contact">
        <Button variant="ghost" onClick={closeMenu}>Contact</Button>
      </Link>
    </>
  );
  
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-primary rounded-md">
            <GavelIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">LegalLocator</span>
        </Link>
        
        {isMobile ? (
          <div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-16 right-0 left-0 bg-background z-50 py-4 px-4 border-b border-border shadow-md">
                <nav className="flex flex-col space-y-2">
                  <MenuItems />
                </nav>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-1">
            <MenuItems />
          </nav>
        )}
      </div>
    </header>
  );
}