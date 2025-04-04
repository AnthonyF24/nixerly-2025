"use client";
import { useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileById } from '@/lib/data/professionals';
import { ContactProfessionalModal } from '@/components/professional/ContactProfessionalModal';
import { NotificationProvider } from '@/components/ui/notification';
import { cn } from '@/lib/utils';

type ProfilePageProps = {
  params: {
    id: string;
  };
};

export default function ProfessionalProfilePage({ params }: ProfilePageProps) {
  const unwrappedParams = use(params);
  const professional = getProfileById(unwrappedParams.id);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  if (!professional) {
    notFound();
  }
  
  const {
    name,
    title,
    location,
    bio,
    contactEmail,
    contactPhone,
    whatsapp,
    experienceYears,
    hourlyRate,
    availability,
    skills,
    certifications,
    portfolio,
    profileImageUrl,
    coverImageUrl,
  } = professional;
  
  const availabilityColors = {
    available: 'bg-green-100 text-green-800',
    employed: 'bg-yellow-100 text-yellow-800',
    freelance: 'bg-blue-100 text-blue-800',
    not_available: 'bg-red-100 text-red-800'
  };
  
  const availabilityLabels = {
    available: 'Available',
    employed: 'Employed',
    freelance: 'Freelance',
    not_available: 'Not Available'
  };
  
  const hasVerifiedCertifications = certifications.some(cert => cert.verified);
  
  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  return (
    <NotificationProvider>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard/find-professionals" className="text-indigo-600 hover:text-indigo-800 flex items-center transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Back to Professionals Search</span>
          </Link>
          <Button variant="outline" className="flex items-center gap-1 rounded-full px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 1 7.92 12.446a9 9 0 1 1 -16.626 0a7.5 7.5 0 0 1 7.92 -12.446c.13 0 .263 0 .393 0z"></path>
              <path d="M12 15l-2 -2"></path>
              <path d="M12 9v2"></path>
            </svg>
            <span>Print Profile</span>
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-48 relative">
            {coverImageUrl ? (
              <Image 
                src={coverImageUrl} 
                alt={`${name}'s cover image`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
          </div>
          
          <div className="px-6 py-6 sm:px-8 sm:py-8 relative">
            <div className="flex flex-col md:flex-row gap-6 -mt-24">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-40 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
                  <Image 
                    src={profileImageUrl || '/images/placeholder-profile.jpg'} 
                    alt={name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  {hasVerifiedCertifications && (
                    <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 shadow-md" title="Verified Professional">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`mt-4 py-1.5 px-4 rounded-full text-sm font-medium shadow-sm ${
                    availability === 'available' 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                      : availability === 'freelance'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : availability === 'employed'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  }`}
                >
                  {availabilityLabels[availability]}
                </div>
                
                <div className="w-full flex flex-col gap-2 mt-4">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    onClick={handleContactClick}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Contact Now
                  </Button>
                  <Button variant="outline" className="w-full rounded-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Save Profile
                  </Button>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 pt-6 md:pt-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="mt-16 md:mt-16">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {name}
                      {hasVerifiedCertifications && (
                        <span className="text-blue-500" title="Verified Professional">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </h1>
                    <h2 className="text-xl text-indigo-700 font-medium mb-2">{title}</h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 md:justify-end">
                    {contactEmail && (
                      <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                        <span className="font-medium">Email</span>
                      </a>
                    )}
                    
                    {contactPhone && (
                      <a href={`tel:${contactPhone}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
                          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Call</span>
                      </a>
                    )}
                    
                    {whatsapp && (
                      <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-200 rounded-lg text-green-700 hover:bg-green-50 hover:border-green-300 shadow-sm transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="font-medium">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-indigo-500">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <span>{location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1 text-indigo-500">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>{experienceYears} years experience</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills.map((skill, index) => (
                      <Badge key={index} className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 px-3 py-1 rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-8">
                    {/* About Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        About
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{bio}</p>
                    </div>
                    
                    {/* Experience & Skills Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Experience & Expertise
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <h4 className="text-sm font-medium text-gray-500">Experience Level</h4>
                            <div className="flex items-center">
                              <div className="bg-indigo-100 rounded-full h-2 w-20 mr-3">
                                <div 
                                  className="bg-indigo-600 rounded-full h-2" 
                                  style={{ width: `${Math.min(100, experienceYears * 5)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{experienceYears} years</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                            <div 
                              className={`text-sm font-medium py-1 px-3 rounded-full ${
                                availability === 'available' 
                                  ? 'bg-green-50 text-green-700' 
                                  : availability === 'freelance'
                                  ? 'bg-blue-50 text-blue-700'
                                  : availability === 'employed'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {availabilityLabels[availability]}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <div key={index} className="flex items-center bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Work History Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Work History
                      </h3>
                      
                      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-indigo-500 before:to-indigo-300 before:h-full before:z-0">
                        <div className="relative z-10">
                          <div className="flex gap-4">
                            <div className="flex-none">
                              <div className="bg-indigo-500 rounded-full h-10 w-10 flex items-center justify-center shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-100 p-4 flex-1 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-800">Senior Construction Manager</h4>
                                  <div className="text-sm text-gray-500">BuildTech Enterprise</div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 sm:mt-0">2020 - Present</div>
                              </div>
                              <div className="mt-3 text-sm text-gray-600">
                                <p>Leading multiple construction projects with a focus on commercial developments. Managing teams of up to 50 professionals across different specialties.</p>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">Project Management</span>
                                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">Team Leadership</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex gap-4">
                            <div className="flex-none">
                              <div className="bg-indigo-400 rounded-full h-10 w-10 flex items-center justify-center shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-100 p-4 flex-1 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-800">Construction Specialist</h4>
                                  <div className="text-sm text-gray-500">Urban Development Co.</div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 sm:mt-0">2016 - 2020</div>
                              </div>
                              <div className="mt-3 text-sm text-gray-600">
                                <p>Specialized in residential construction projects with emphasis on sustainable building practices and energy efficiency.</p>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">Sustainable Building</span>
                                <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">Residential Projects</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex gap-4">
                            <div className="flex-none">
                              <div className="bg-indigo-300 rounded-full h-10 w-10 flex items-center justify-center shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-100 p-4 flex-1 shadow-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-800">Junior Technician</h4>
                                  <div className="text-sm text-gray-500">Foundation Construction Inc.</div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 sm:mt-0">2012 - 2016</div>
                              </div>
                              <div className="mt-3 text-sm text-gray-600">
                                <p>Started career working on fundamental construction projects. Developed core skills in building techniques and project coordination.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Education Section */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        Education
                      </h3>
                      
                      <div className="space-y-5">
                        <div className="flex gap-4">
                          <div className="flex-none">
                            <div className="bg-indigo-100 rounded-lg h-14 w-14 flex items-center justify-center border border-indigo-200">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h4 className="font-medium text-gray-800">Bachelor of Engineering - Civil Engineering</h4>
                                <div className="text-sm text-gray-600">Dublin Institute of Technology</div>
                              </div>
                              <div className="text-sm text-gray-500 mt-1 sm:mt-0 sm:text-right sm:ml-4">2008 - 2012</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Focused on structural engineering and sustainable building techniques. Graduated with honors.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-5 mt-5">
                          <div className="flex gap-4">
                            <div className="flex-none">
                              <div className="bg-indigo-100 rounded-lg h-14 w-14 flex items-center justify-center border border-indigo-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600">
                                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-800">Certificate in Project Management</h4>
                                  <div className="text-sm text-gray-600">Construction Management Institute</div>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 sm:mt-0 sm:text-right sm:ml-4">2014</div>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                <p>Advanced training in construction project management best practices and methodologies.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  {/* Certifications Section */}
                  {certifications.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                          <circle cx="12" cy="8" r="7"></circle>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                        </svg>
                        Certifications & Credentials
                      </h3>
                      
                      <ul className="space-y-4 mt-3">
                        {certifications.map((cert) => (
                          <li key={cert.id} className="relative border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-start">
                              <div className="bg-indigo-100 rounded-full p-1.5 mr-3 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
                                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800">{cert.name}</h4>
                                  {cert.verified && (
                                    <span className="ml-2 text-green-600 flex items-center text-sm font-medium">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-0.5">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                      </svg>
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Issued by {cert.issuer}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1 text-indigo-500">
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                                  </div>
                                  {cert.expiryDate && (
                                    <div className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1 text-amber-500">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                      </svg>
                                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Contact Section */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200 dark:border-indigo-800/30 shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-800 dark:text-indigo-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Get in Touch
                    </h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-5">
                      Interested in working with {name.split(' ')[0]}? Contact now to discuss your project needs.
                    </p>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                      onClick={handleContactClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Portfolio Section */}
            {portfolio.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-indigo-500">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Portfolio
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {portfolio.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[200px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <Image
                        src={item.url || '/images/placeholder-portfolio.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="bg-indigo-600 bg-opacity-80 rounded-full p-3 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-white/80 line-clamp-2 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Contact Professional Modal */}
      <ContactProfessionalModal
        professional={professional}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </NotificationProvider>
  );
} 