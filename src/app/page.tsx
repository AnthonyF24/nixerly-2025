import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section - Enhanced with better spacing and background */}
      <section className="relative bg-gradient-to-r from-blue-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Build Your Construction <span className="text-blue-200">Career</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-50/90 max-w-xl">
                Connect with top employers or find skilled professionals in the construction industry across Ireland.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-medium shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/auth/signup?type=professional">
                    Sign Up as a Professional
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white bg-blue-600/30 text-white hover:bg-blue-500/50 font-medium border-2" asChild>
                  <Link href="/professionals">
                    Hire Professionals
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative h-96 w-full">
              <div className="absolute inset-0 bg-blue-600/10 rounded-2xl backdrop-blur-sm"></div>
              <div className="absolute inset-0">
                <Image 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                  alt="Construction site with cranes and structural framework"
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-800/40 to-transparent"></div>
      </section>

      {/* How It Works Section - Modernized with cards and icons */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-600 border-blue-200 bg-blue-50">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Nixerly Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, efficient way to connect construction professionals with companies across Ireland.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <CardTitle className="text-xl text-center">For Professionals</CardTitle>
              </CardHeader>
              <CardContent className="pb-6 text-center px-6">
                <p className="text-gray-600">Create your profile, showcase your skills, certifications and portfolio to stand out to employers.</p>
              </CardContent>
              <CardFooter className="pt-4 flex justify-center">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/auth/signup?type=professional">Create Profile</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <CardTitle className="text-xl text-center">For Businesses</CardTitle>
              </CardHeader>
              <CardContent className="pb-6 text-center px-6">
                <p className="text-gray-600">Post jobs, search for professionals, and directly contact candidates that match your needs.</p>
              </CardContent>
              <CardFooter className="pt-4 flex justify-center">
                <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/auth/signup?type=business">Post Jobs</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <CardTitle className="text-xl text-center">Connect Directly</CardTitle>
              </CardHeader>
              <CardContent className="pb-6 text-center px-6">
                <p className="text-gray-600">No middleman. Connect via WhatsApp or email directly with the people you want to work with.</p>
              </CardContent>
              <CardFooter className="pt-4 flex justify-center">
                <Button variant="default" className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/professionals">Browse Professionals</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with better gradients and spacing */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-blue-800/40 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-white border-white/30 bg-white/10">Get Started Today</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-10 text-blue-50/90">
              Join Nixerly today and connect with the right professionals or find your next construction job opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all font-medium" asChild>
                <Link href="/auth/signup?type=professional">
                  Sign Up as a Professional
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/20 font-medium" asChild>
                <Link href="/auth/signup?type=business">
                  Sign Up as a Business
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
