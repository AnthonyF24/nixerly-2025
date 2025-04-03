"use client";

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { dummyJobs, dummyBusinesses } from '@/lib/dummy-data';
import { useAppStore } from '@/lib/store';
import { JobApplicationModal } from '@/components/jobs/JobApplicationModal';
import MainLayout from '@/components/layout/MainLayout';
import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  ScrollText,
  Send,
  Share2,
} from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;
  const { professional, hasAppliedToJob, setIsAuthenticated, setProfessional, setUserType } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any>(null);
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  
  // For demo purposes, set as professional user
  useEffect(() => {
    // In a real app, this would check if the user is authenticated
    if (!professional) {
      const dummyProf = dummyJobs[0];
      setProfessional(dummyProf);
      setUserType('professional');
      setIsAuthenticated(true);
    }
  }, [professional, setProfessional, setUserType, setIsAuthenticated]);
  
  // Fetch job data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundJob = dummyJobs.find(job => job.id === id);
      
      if (foundJob) {
        setJob(foundJob);
        
        // Find related jobs based on skills (max 3)
        const related = dummyJobs
          .filter(j => j.id !== id && j.skills.some(skill => foundJob.skills.includes(skill)))
          .slice(0, 3);
        
        setRelatedJobs(related);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleApplyClick = () => {
    setIsApplicationModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsApplicationModalOpen(false);
  };
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format salary based on type and values
  const formatSalary = () => {
    if (!job?.salaryMin && !job?.salaryMax) return null;
    
    const currency = '€';
    const formatNumber = (num?: number) => num?.toLocaleString();
    
    let prefix = '';
    let suffix = '';
    
    switch(job.salaryType) {
      case 'hourly':
        prefix = `${currency}`;
        suffix = '/hr';
        break;
      case 'daily':
        prefix = `${currency}`;
        suffix = '/day';
        break;
      case 'annual':
        prefix = `${currency}`;
        suffix = '/year';
        break;
      default:
        prefix = `${currency}`;
    }
    
    if (job.salaryMin && job.salaryMax) {
      return `${prefix}${formatNumber(job.salaryMin)} - ${prefix}${formatNumber(job.salaryMax)}${suffix}`;
    } else if (job.salaryMin) {
      return `${prefix}${formatNumber(job.salaryMin)}${suffix}+`;
    } else if (job.salaryMax) {
      return `Up to ${prefix}${formatNumber(job.salaryMax)}${suffix}`;
    }
    
    return null;
  };
  
  // Return not found if job doesn't exist
  if (!loading && !job) {
    return notFound();
  }
  
  // Find associated business
  const business = job ? dummyBusinesses.find(b => b.id === job.businessId) : null;
  const alreadyApplied = professional && job ? hasAppliedToJob(job.id, professional.id) : false;
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="mb-6"
          >
            <Link href="/jobs" className="flex items-center gap-2 text-blue-600">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>
          
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/3 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Job Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 border border-gray-200">
                        <AvatarImage src={business?.logoUrl || `/avatars/business-${job.businessId}.jpg`} alt={job.businessName} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                          {job.businessName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.businessName}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <Badge
                        className={
                          job.status === 'open' 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800/20 dark:text-blue-400' 
                            : 'bg-muted'
                        }
                      >
                        {job.status === 'open' ? 'Open' : job.status === 'closed' ? 'Closed' : job.status === 'applied' ? 'Applied' : 'Draft'}
                      </Badge>
                      
                      {job.location && (
                        <span className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                      )}
                      
                      <span className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted {formatDate(job.datePosted)}
                      </span>
                      
                      {job.deadline && (
                        <span className="flex items-center text-amber-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Apply by {formatDate(job.deadline)}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <Separator className="mb-4" />
                  
                  <CardContent className="space-y-6">
                    {/* Salary Information */}
                    {formatSalary() && (
                      <div className="bg-blue-50/70 p-4 rounded-md">
                        <h3 className="font-semibold flex items-center text-blue-700 mb-1">
                          <DollarSign className="h-5 w-5 mr-1" />
                          Compensation
                        </h3>
                        <p className="text-blue-800 font-medium text-xl">{formatSalary()}</p>
                      </div>
                    )}
                    
                    {/* Job Description */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <ScrollText className="h-5 w-5 mr-2 text-blue-600" />
                        Job Description
                      </h3>
                      <div className="text-gray-700 space-y-4 whitespace-pre-line">
                        <p>{job.description}</p>
                      </div>
                    </div>
                    
                    {/* Required Skills */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-blue-600" />
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill: string) => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className={professional?.skills.includes(skill) 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                          >
                            {professional?.skills.includes(skill) && (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            )}
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Related Jobs */}
                {relatedJobs.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Similar Jobs</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {relatedJobs.map(relatedJob => (
                        <Link href={`/jobs/${relatedJob.id}`} key={relatedJob.id}>
                          <Card className="border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-gray-200">
                                  <AvatarFallback className="bg-blue-100 text-blue-700">
                                    {relatedJob.businessName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{relatedJob.title}</h4>
                                  <p className="text-sm text-gray-500">{relatedJob.businessName} • {relatedJob.location}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {relatedJob.skills.slice(0, 3).map((skill: string) => (
                                      <Badge key={skill} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {relatedJob.skills.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{relatedJob.skills.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Application Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-4 space-y-4">
                  <Card className="border-gray-200 shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg mb-2">Interested in this role?</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Apply now to express your interest and connect with {job.businessName}
                        </p>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          size="lg"
                          disabled={job.status !== 'open' || alreadyApplied}
                          onClick={handleApplyClick}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {alreadyApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">About {job.businessName}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Globe className="h-4 w-4" />
                          <span>{business?.industry?.join(', ') || 'Construction'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{business?.location || job.location || 'Ireland'}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copied to clipboard!');
                          }}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.print()}
                        >
                          Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Job Application Modal */}
      {job && (
        <JobApplicationModal
          isOpen={isApplicationModalOpen}
          job={job}
          onClose={handleCloseModal}
        />
      )}
    </MainLayout>
  );
} 