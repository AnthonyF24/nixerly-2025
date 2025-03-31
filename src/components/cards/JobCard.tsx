"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/lib/data/jobs';

type JobCardProps = {
  job: Job;
};

const jobTypeColors = {
  full_time: 'bg-blue-100 text-blue-800',
  part_time: 'bg-purple-100 text-purple-800',
  contract: 'bg-amber-100 text-amber-800',
  temporary: 'bg-gray-100 text-gray-800'
};

const jobTypeLabels = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  temporary: 'Temporary'
};

const JobCard = ({ job }: JobCardProps) => {
  const {
    id,
    title,
    description,
    business,
    location,
    salaryMin,
    salaryMax,
    skills,
    experience,
    type,
    postedDate,
    contactWhatsapp
  } = job;

  const handleCardClick = () => {};
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && !max) return `€${min.toLocaleString()}+`;
    if (!min && max) return `Up to €${max.toLocaleString()}`;
    return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
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

  return (
    <Link href={`/jobs/${id}`}>
      <div
        className="group border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col h-full cursor-pointer"
        tabIndex={0}
        aria-label={`View job: ${title} at ${business?.name || 'Company'}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start space-x-4">
          {business?.logoUrl && (
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={business.logoUrl || '/images/placeholder-company.jpg'}
                alt={business.name}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
            <p className="text-gray-700">{business?.name}</p>
            <p className="text-gray-500 text-sm">{location}</p>
            <div className="mt-1">
              <span className="text-gray-700 font-medium">{formatSalary(salaryMin, salaryMax)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-2">
            <div 
              className={`text-xs px-2 py-1 rounded-full ${jobTypeColors[type]}`}
            >
              {jobTypeLabels[type]}
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
              <span>Posted {formatDate(postedDate)}</span>
            </div>
          </div>
          
          {contactWhatsapp && (
            <div className="mt-3 flex items-center text-sm text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="ml-1">WhatsApp Available</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard; 