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
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-blue-100 border-blue-300 bg-blue-800/30">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Have questions or need assistance? We're here to help! Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link 
            href="/" 
            className="hover:underline"
            tabIndex={0}
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>Contact Us</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <Input id="firstName" required placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name*
                  </label>
                  <Input id="lastName" required placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <Input id="email" type="email" required placeholder="name@example.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+353 87 123 4567" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject*
                </label>
                <Input id="subject" required placeholder="How can we help you?" />
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
                />
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Message</Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+353 1 234 5678</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"></path>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contact@nixerly.com</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">123 Business Centre<br />Dublin, D01 ABC1<br />Ireland</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium text-gray-900">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            Want to learn more about how we handle your data? Read our <Link href="/privacy" className="font-medium underline" tabIndex={0}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 