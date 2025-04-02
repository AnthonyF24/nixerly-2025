import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  const founder = {
    name: "Anthony Fildes",
    title: "Founder",
    bio: "Visionary entrepreneur with a passion for transforming the construction industry in Ireland. Anthony combines deep expertise in technology and business to create innovative solutions that connect construction professionals with opportunities.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  };

  const companyValues = [
    {
      title: "Transparency",
      description: "We believe in clear communication and honest relationships between professionals and clients.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
    {
      title: "Community",
      description: "Building a supportive network of professionals that helps each other grow and succeed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Excellence",
      description: "Promoting the highest standards in construction practices and professional development.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "Embracing new technologies and methods to improve the construction industry.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-blue-100 border-blue-300 bg-blue-800/30">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Building Ireland's Construction Community</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">Connecting skilled professionals with quality opportunities since 2023.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?q=80&w=2070&auto=format&fit=crop" 
                alt="Construction professionals at work"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <Badge variant="outline" className="mb-2 px-3 py-1 text-blue-700 border-blue-200 bg-blue-50">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Empowering Construction Professionals Across Ireland</h2>
              <Separator className="bg-blue-200 h-0.5 w-24" />
              <p className="text-lg text-gray-700">
                At Nixerly, we're dedicated to transforming how construction professionals find work and how businesses find talent. We're building a community where skilled tradespeople, engineers, and construction professionals can showcase their experience and connect directly with employers.
              </p>
              <p className="text-lg text-gray-700">
                Our platform eliminates traditional barriers, providing transparency, direct connections, and opportunities for professionals at every stage of their career. We believe in strengthening Ireland's construction industry by making quality connections accessible to all.
              </p>
              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg" asChild>
                  <Link href="/professionals">
                    Explore Professionals
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-purple-700 border-purple-200 bg-purple-50">Our Core Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Drives Us Forward</h2>
            <p className="text-lg text-gray-700">
              Our values guide every decision we make and shape how we build our platform and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6 pb-6">
                  <div className="text-blue-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-green-700 border-green-200 bg-green-50">Founder</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Our Founder</h2>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 max-w-3xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{founder.title}</p>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    Nixerly was founded by an ambitious and forward-thinking entrepreneur with a deep understanding of the construction industry and a passion for helping tradespeople succeed. Having run a welding business through both challenging and successful times, our founder knows firsthand the struggles skilled professionals face — from unreliable job leads and inconsistent income to lack of visibility and recognition in a fast-paced, competitive market.
                  </p>
                  <p>
                    Driven by a vision to make the industry more transparent, accessible, and fair, they built Nixerly to be more than just a listings site — it's a professional platform designed to elevate careers, reduce risks, and connect verified talent with businesses that value quality and reliability.
                  </p>
                  <p>
                    Their unique blend of hands-on trade experience and entrepreneurial grit, combined with personal insight into how construction workers build their reputations and livelihoods, ensures that Nixerly stays true to its mission: to empower professionals, modernize hiring, and bring trust and opportunity back to the core of the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Ireland's Leading Construction Network?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you're a skilled professional looking for your next opportunity or a business seeking top talent, Nixerly is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/auth/signup?type=professional">
                  Join as a Professional
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-blue-500/20 hover:bg-blue-500/30 border-2" asChild>
                <Link href="/professionals">
                  Browse Professionals
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 