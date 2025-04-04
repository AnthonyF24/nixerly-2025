import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarClock, Briefcase, Clock, DollarSign, Eye } from "lucide-react";
import Link from "next/link";
import { Job } from '@/data/mock';
import { formatDistanceToNow } from 'date-fns';

type JobCardProps = {
  job: Job;
  compact?: boolean;
  showManageButton?: boolean;
  showApplyButton?: boolean;
  maxSkills?: number;
};

const JobCard = ({
  job,
  compact = false,
  showManageButton = false,
  showApplyButton = false,
  maxSkills = 3
}: JobCardProps) => {
  const { id, title, location, skills = [], isRemote, postedAt, type, budget, status } = job;
  
  const formattedDate = formatDistanceToNow(new Date(postedAt), { addSuffix: true });
  
  return (
    <div className={`py-4 first:pt-0 last:pb-0 ${compact ? 'py-3' : 'py-4'} border-b border-gray-100 last:border-0`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className={`font-medium ${compact ? 'text-sm' : 'text-base'}`}>{title}</h3>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-x-2 gap-y-1">
            <span className="inline-flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {isRemote ? 'Remote' : location}
            </span>
            
            <span className="inline-flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Posted {formattedDate}</span>
            </span>
            
            {type && (
              <span className="inline-flex items-center">
                <Briefcase className="h-3.5 w-3.5 mr-1" />
                {type.replace('_', ' ')}
              </span>
            )}
            
            {budget && (
              <span className="inline-flex items-center">
                <DollarSign className="h-3.5 w-3.5 mr-1" />
                {budget.currency} {budget.min.toLocaleString()} - {budget.max.toLocaleString()}
              </span>
            )}
          </div>
          
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.slice(0, maxSkills).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-xs bg-white"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > maxSkills && (
                <Badge variant="outline" className="text-xs bg-white">
                  +{skills.length - maxSkills}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 shrink-0">
          {showManageButton && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8" 
              asChild
            >
              <Link 
                href={`/dashboard/jobs/${id}`}
                tabIndex={0}
                aria-label={`Manage ${title} job`}
              >
                Manage
              </Link>
            </Button>
          )}
          
          {showApplyButton && status === 'open' && (
            <Button 
              size="sm" 
              className="h-8 bg-blue-600 hover:bg-blue-700" 
              asChild
            >
              <Link 
                href={`/jobs/${id}/apply`}
                tabIndex={0}
                aria-label={`Apply for ${title} job`}
              >
                Apply
              </Link>
            </Button>
          )}
          
          {!showManageButton && !showApplyButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              asChild
            >
              <Link 
                href={`/jobs/${id}`}
                tabIndex={0}
                aria-label={`View ${title} job details`}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard; 