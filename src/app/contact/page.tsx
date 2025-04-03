"use client"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-purple-800 text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-blue-50 border-blue-300/50 bg-blue-800/30 shadow-md backdrop-blur-sm">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Have questions or need assistance? We're here to help! Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center text-sm text-muted-foreground mb-10">
          <Link 
            href="/" 
            className="hover:underline hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
            tabIndex={0}
            aria-label="Go to home page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-600 font-medium">Contact Us</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <Input 
                    id="firstName" 
                    required 
                    placeholder="John" 
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name*
                  </label>
                  <Input 
                    id="lastName" 
                    required 
                    placeholder="Doe" 
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder="name@example.com" 
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+353 87 123 4567" 
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject*
                </label>
                <Input 
                  id="subject" 
                  required 
                  placeholder="How can we help you?" 
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message*
                </label>
                <Textarea 
                  id="message" 
                  required 
                  rows={5} 
                  placeholder="Please provide details about your inquiry..." 
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 font-medium py-6 text-lg"
                tabIndex={0}
              >
                Submit Message
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-8 transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">
                      <a 
                        href="tel:+35312345678" 
                        className="hover:text-blue-600 transition-colors duration-200"
                        tabIndex={0}
                        aria-label="Call our phone number"
                      >
                        +353 1 234 5678
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"></path>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">
                      <a 
                        href="mailto:contact@nixerly.com" 
                        className="hover:text-blue-600 transition-colors duration-200"
                        tabIndex={0}
                        aria-label="Email us"
                      >
                        contact@nixerly.com
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900 mb-1">Address</p>
                    <p className="text-gray-600">
                      <a 
                        href="https://maps.google.com/?q=123+Business+Centre+Dublin+Ireland" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-blue-600 transition-colors duration-200"
                        tabIndex={0}
                        aria-label="View our address on Google Maps"
                      >
                        123 Business Centre<br />Dublin, D01 ABC1<br />Ireland
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Business Hours</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Monday - Friday:</span>
                  <span className="font-semibold text-gray-900 bg-gray-50 py-1 px-3 rounded-full">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Saturday:</span>
                  <span className="font-semibold text-gray-900 bg-gray-50 py-1 px-3 rounded-full">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Sunday:</span>
                  <span className="font-semibold text-red-500 bg-red-50 py-1 px-3 rounded-full">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Want to learn more about how we handle your data? Read our{' '}
            <Link 
              href="/privacy" 
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 underline"
              tabIndex={0}
              aria-label="Read our privacy policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 