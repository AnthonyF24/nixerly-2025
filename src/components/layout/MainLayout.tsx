"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, professional, business } = useAppStore();
  const pathname = usePathname();
  
  // Enable scrolling when the component mounts
  useEffect(() => {
    // Force enable scrolling
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // Cleanup when component unmounts
    return () => {
      // We don't reset because we always want scrolling enabled
    };
  }, []);
  
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMenu();
    }
  };
  
  // Check if business user has paid subscription
  const hasBusinessPaidSubscription = 
    isAuthenticated && userType === "business" && business?.verified;
  
  // Check if professional user has verified account
  const isProfessionalVerified = 
    isAuthenticated && userType === "professional" && professional?.verified;

  // Function to get nav link class based on current path
  const getLinkClass = (href: string) => {
    const isActive = pathname === href || 
                    (href !== '/' && pathname?.startsWith(href));
    
    return isActive
      ? "text-blue-700 font-medium relative px-3 py-2 rounded-md text-sm transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full"
      : "text-gray-700 hover:text-blue-700 font-medium relative px-3 py-2 rounded-md text-sm transition-all duration-300 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-blue-400 hover:after:rounded-full";
  };
  
  // Function to get mobile nav link class based on current path
  const getMobileLinkClass = (href: string) => {
    const isActive = pathname === href || 
                    (href !== '/' && pathname?.startsWith(href));
    
    return isActive
      ? "block text-blue-700 bg-blue-50/70 border-l-4 border-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors duration-300"
      : "block text-gray-700 hover:text-blue-700 hover:bg-blue-50/50 px-3 py-3 rounded-md text-base font-medium transition-colors duration-300";
  };
  
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      {/* Navbar */}
      <nav className="bg-white backdrop-blur-sm bg-opacity-90 border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center py-2 group transition-all duration-300">
                <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 tracking-tight group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">Nixerly</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link 
                  href="/" 
                  className={getLinkClass("/")}
                >
                  Home
                </Link>
                
                <Link 
                  href="/about" 
                  className={getLinkClass("/about")}
                >
                  About
                </Link>
                
                {/* Only show Find Professionals to business users with paid subscription */}
                {hasBusinessPaidSubscription && (
                  <Link 
                    href="/dashboard/find-professionals" 
                    className={getLinkClass("/dashboard/find-professionals")}
                  >
                    Find Professionals
                  </Link>
                )}
                
                {/* Only show Job Board to verified professionals */}
                {isProfessionalVerified && (
                  <Link 
                    href="/dashboard/jobs" 
                    className={getLinkClass("/dashboard/jobs")}
                  >
                    Job Board
                  </Link>
                )}
                
                <Link 
                  href="/contact" 
                  className={getLinkClass("/contact")}
                >
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <SignedIn>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 shadow-sm transition-all duration-300"
                    onClick={() => useAppStore.getState().logout()}
                  >
                    Logout
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="redirect" path="/auth/login">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 shadow-sm transition-all duration-300">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect" path="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-300">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
            
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
                onClick={handleToggleMenu}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className={`${isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"} md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out shadow-lg`}>
          <div className="space-y-1 pt-2 pb-3 px-4">
            <Link 
              href="/" 
              className={getMobileLinkClass("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/about" 
              className={getMobileLinkClass("/about")}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {/* Only show Find Professionals to business users with paid subscription */}
            {hasBusinessPaidSubscription && (
              <Link 
                href="/dashboard/find-professionals" 
                className={getMobileLinkClass("/dashboard/find-professionals")}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Professionals
              </Link>
            )}
            
            {/* Only show Job Board to verified professionals */}
            {isProfessionalVerified && (
              <Link 
                href="/dashboard/jobs" 
                className={getMobileLinkClass("/dashboard/jobs")}
                onClick={() => setIsMenuOpen(false)}
              >
                Job Board
              </Link>
            )}
            
            <Link 
              href="/contact" 
              className={getMobileLinkClass("/contact")}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200 px-4">
            <div className="flex items-center space-x-3">
              <SignedIn>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 shadow-sm transition-all duration-300"
                  onClick={() => {
                    useAppStore.getState().logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="redirect" path="/auth/login">
                  <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 shadow-sm transition-all duration-300">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="redirect" path="/auth/signup">
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-300">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 