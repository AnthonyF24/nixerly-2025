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
    image: "/team/founder.jpg"
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
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-blue-50 border-blue-300/50 bg-blue-800/30 shadow-md backdrop-blur-sm">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">Building Ireland's Construction Community</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">Connecting skilled professionals with quality opportunities since 2023.</p>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-2xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-[1.02] group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl"></div>
              <Image 
                src="https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?q=80&w=2070&auto=format&fit=crop" 
                alt="Construction professionals at work"
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
            <div className="space-y-8">
              <Badge variant="outline" className="mb-2 px-4 py-1.5 text-blue-700 border-blue-200 bg-blue-50 shadow-sm">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Empowering Construction Professionals Across Ireland</h2>
              <Separator className="bg-blue-200 h-1 w-24" />
              <p className="text-lg text-gray-700 leading-relaxed">
                At Nixerly, we're dedicated to transforming how construction professionals find work and how businesses find talent. We're building a community where skilled tradespeople, engineers, and construction professionals can showcase their experience and connect directly with employers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform eliminates traditional barriers, providing transparency, direct connections, and opportunities for professionals at every stage of their career. We believe in strengthening Ireland's construction industry by making quality connections accessible to all.
              </p>
              <div className="pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="lg" asChild>
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
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-60 blur-xl -translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-60 blur-xl translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-purple-700 border-purple-200 bg-purple-50/80 shadow-sm">Our Core Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">What Drives Us Forward</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Our values guide every decision we make and shape how we build our platform and community.
            </p>
            <div className="w-20 h-1 bg-purple-200 mx-auto mt-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="border-gray-100 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden group">
                <CardContent className="pt-8 pb-8">
                  <div className="text-blue-600 mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:text-blue-700">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-100 rounded-full opacity-60 blur-xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-green-700 border-green-200 bg-green-50/80 shadow-sm">Founder</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">About Our Founder</h2>
            <div className="w-20 h-1 bg-green-200 mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 max-w-4xl transform hover:scale-[1.01]">
              <div className="p-10">
                <div className="flex flex-col items-center">
                  <div className="relative w-[550px] h-72 md:w-[650px] md:h-80 mb-8 overflow-hidden rounded-xl shadow-lg">
                    <Image 
                      src={founder.image}
                      alt={`${founder.name} - ${founder.title}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                    <p className="text-blue-700 font-medium text-lg">{founder.title}</p>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-28 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-md"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-5 py-1.5 text-white border-white/30 bg-white/10 backdrop-blur-sm shadow-lg">Join Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Ready to Join Ireland's Leading Construction Network?</h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
              Whether you're a skilled professional looking for your next opportunity or a business seeking top talent, Nixerly is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all font-semibold px-8 py-6 text-lg hover:scale-105 duration-300" asChild>
                <Link href="/auth/signup?type=professional">
                  Join as a Professional
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium border-2 px-8 py-6 text-lg hover:shadow-lg transition-all duration-300" asChild>
                <Link href="/professionals">
                  Browse Professionals
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
      </section>
    </MainLayout>
  );
} 