"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, professional, business } = useAppStore();
  
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  // Check if business user has paid subscription
  const hasBusinessPaidSubscription = isAuthenticated && userType === 'business' && business?.verified;
  
  // Check if professional user has verified account
  const isProfessionalVerified = isAuthenticated && userType === 'professional' && professional?.verified;
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center py-2">
              <span className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">Nixerly</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              {/* Only show Find Professionals to business users with paid subscription */}
              {hasBusinessPaidSubscription && (
                <Link 
                  href="/dashboard/find-professionals" 
                  className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Find Professionals
                </Link>
              )}
              
              {/* Only show Job Board to verified professionals */}
              {isProfessionalVerified && (
                <Link 
                  href="/dashboard/jobs" 
                  className="text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Job Board
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              onClick={handleToggleMenu}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
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
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
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
      
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white pb-3 px-4 shadow-lg`}>
        <div className="space-y-1 pt-2 pb-3">
          <Link 
            href="/" 
            className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {/* Only show Find Professionals to business users with paid subscription */}
          {hasBusinessPaidSubscription && (
            <Link 
              href="/dashboard/find-professionals" 
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Professionals
            </Link>
          )}
          
          {/* Only show Job Board to verified professionals */}
          {isProfessionalVerified && (
            <Link 
              href="/dashboard/jobs" 
              className="block text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Job Board
            </Link>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 