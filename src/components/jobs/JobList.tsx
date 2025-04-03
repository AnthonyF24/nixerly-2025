import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from '@/lib/store';
import { dummyJobs, dummyBusinesses } from '@/lib/dummy-data';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building, 
  DollarSign, 
  SendIcon, 
  ExternalLink,
  ArrowUpDown,
  List,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { IJob } from '@/lib/store';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import JobApplicationModal from './JobApplicationModal';

interface JobListProps {
  limit?: number;
  showFilters?: boolean;
}

type ViewMode = 'list' | 'grid';
type SortOption = 'newest' | 'oldest' | 'relevance';

const JobList: React.FC<JobListProps> = ({ limit, showFilters = true }) => {
  const { jobFilters } = useAppStore();
  const [visibleJobs, setVisibleJobs] = useState(limit || 6);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [jobFilters]);
  
  // Apply filters
  const filteredJobs = dummyJobs.filter(job => {
    // Filter by status if specified
    if (jobFilters.status && job.status !== jobFilters.status) {
      return false;
    }
    
    // Filter by location if specified
    if (jobFilters.location && !job.location?.toLowerCase().includes(jobFilters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by skills if any are selected
    if (jobFilters.skills.length > 0 && !job.skills.some(skill => jobFilters.skills.includes(skill))) {
      return false;
    }
    
    return true;
  });
  
  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime();
    } else {
      // Relevance - prioritize jobs with more matching skills
      const aMatchCount = a.skills.filter(skill => jobFilters.skills.includes(skill)).length;
      const bMatchCount = b.skills.filter(skill => jobFilters.skills.includes(skill)).length;
      return bMatchCount - aMatchCount;
    }
  });
  
  const displayedJobs = sortedJobs.slice(0, visibleJobs);
  const hasMoreJobs = sortedJobs.length > visibleJobs;
  
  const loadMore = () => {
    setVisibleJobs(prev => prev + 6);
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
                <div className="flex mt-4 gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (filteredJobs.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-xl font-medium">No Jobs Found</h3>
          <p className="text-muted-foreground text-center max-w-md mt-2">
            We couldn't find any jobs matching your filters. Try adjusting your search criteria or check back later for new opportunities.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-gray-900">{filteredJobs.length}</span> jobs found
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort options */}
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[140px] h-8 text-sm border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* View mode toggle */}
              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button
                  className={`px-2 py-1 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  className={`px-2 py-1 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
        {displayedJobs.map(job => (
          <JobCard key={job.id} job={job} viewMode={viewMode} />
        ))}
      </div>
      
      {hasMoreJobs && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={loadMore}
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

interface JobCardProps {
  job: IJob;
  viewMode: ViewMode;
}

const JobCard: React.FC<JobCardProps> = ({ job, viewMode }) => {
  const { id, title, description, businessId, businessName, location, skills, datePosted, status, salaryMin, salaryMax, salaryType } = job;
  
  const business = dummyBusinesses.find(b => b.id === businessId);
  
  const formatSalary = () => {
    if (!salaryMin && !salaryMax) return null;
    
    const formatValue = (value: number) => `€${value.toLocaleString()}`;
    let salaryText = '';
    
    if (salaryMin && !salaryMax) {
      salaryText = `${formatValue(salaryMin)}+`;
    } else if (!salaryMin && salaryMax) {
      salaryText = `Up to ${formatValue(salaryMax)}`;
    } else if (salaryMin && salaryMax) {
      salaryText = `${formatValue(salaryMin)} - ${formatValue(salaryMax)}`;
    }
    
    if (salaryText && salaryType) {
      salaryText += salaryType === 'hourly' ? ' per hour' : 
                    salaryType === 'daily' ? ' per day' : 
                    ' per year';
    }
    
    return salaryText;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  if (viewMode === 'grid') {
    return (
      <Link href={`/dashboard/jobs/${id}`}>
        <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-300 bg-white flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-10 w-10 rounded border border-gray-200">
              <AvatarImage src={business?.logoUrl} alt={businessName} />
              <AvatarFallback className="bg-blue-100 text-blue-700">{businessName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{businessName}</p>
            </div>
          </div>
          
          <div className="space-y-2 flex-grow mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>{location || 'Remote'}</span>
            </div>
            {formatSalary() && (
              <div className="flex items-center text-sm text-gray-700">
                <DollarSign className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-green-600" />
                <span>{formatSalary()}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>Posted {formatDate(datePosted)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
          
          <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            View Details
          </Button>
        </div>
      </Link>
    );
  }
  
  return (
    <Link href={`/dashboard/jobs/${id}`}>
      <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-300 bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col items-center md:items-start">
            <Avatar className="h-14 w-14 rounded-md border border-gray-200">
              <AvatarImage src={business?.logoUrl} alt={businessName} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">{businessName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
                  <Badge className={
                    status === 'open' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : status === 'draft' 
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                  }>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <Building className="h-3.5 w-3.5" />
                  <span className="text-sm">{businessName}</span>
                </div>
              </div>
              
              {formatSalary() && (
                <div className="inline-flex items-center text-sm font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  {formatSalary()}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{location || 'Remote'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Posted {formatDate(datePosted)}</span>
              </div>
            </div>
            
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">{description}</p>
            
            <div className="flex flex-wrap items-center justify-between mt-4">
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{skills.length - 5}
                  </Badge>
                )}
              </div>
              
              <Button size="sm" className="mt-2 sm:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobList; 