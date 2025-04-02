import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { dummyJobs } from '@/lib/dummy-data';
import { Briefcase, MapPin, Calendar, Building } from 'lucide-react';
import Link from 'next/link';
import { IJob } from '@/lib/store';

interface JobListProps {
  limit?: number;
  showFilters?: boolean;
}

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const JobList: React.FC<JobListProps> = ({ limit, showFilters = true }) => {
  const { jobFilters } = useAppStore();
  const [visibleJobs, setVisibleJobs] = useState(limit || 6);
  
  // Apply filters
  const filteredJobs = dummyJobs.filter(job => {
    // Filter by status if specified
    if (jobFilters.status && job.status !== jobFilters.status) {
      return false;
    }
    
    // Filter by location if specified
    if (jobFilters.location && !job.location?.includes(jobFilters.location)) {
      return false;
    }
    
    // Filter by skills if any are selected
    if (jobFilters.skills.length > 0 && !job.skills.some(skill => jobFilters.skills.includes(skill))) {
      return false;
    }
    
    return true;
  });
  
  const displayedJobs = filteredJobs.slice(0, visibleJobs);
  const hasMoreJobs = filteredJobs.length > visibleJobs;
  
  const loadMore = () => {
    setVisibleJobs(prev => prev + 6);
  };
  
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
      <div className="grid grid-cols-1 gap-4">
        {displayedJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      
      {hasMoreJobs && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={loadMore}
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

const JobCard: React.FC<{ job: IJob }> = ({ job }) => {
  return (
    <Card className="border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {job.businessName}
            </CardDescription>
          </div>
          <Badge className={
            job.status === 'open' 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800/20 dark:text-blue-400' 
              : 'bg-muted'
          }>
            {job.status === 'open' ? 'Open' : job.status === 'closed' ? 'Closed' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm line-clamp-3">{job.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {job.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>Posted {formatDate(job.datePosted)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {job.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-blue-50/30 px-6 py-3 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {job.deadline && (
            <span>
              Apply by {formatDate(job.deadline)}
            </span>
          )}
        </div>
        
        <Button 
          size="sm" 
          disabled={job.status !== 'open'} 
          className={job.status === 'open' ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm" : ""}
          asChild
        >
          <Link 
            href={`/jobs/${job.id}`}
            tabIndex={0}
            aria-label={`View details for ${job.title}`}
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobList; 