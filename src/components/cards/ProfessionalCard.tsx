"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Professional } from '@/lib/data/professionals';

type ProfessionalCardProps = {
  professional: Professional;
};

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

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const {
    id,
    name,
    title,
    location,
    skills,
    experienceYears,
    availability,
    profileImageUrl,
    hourlyRate,
    profileUrl
  } = professional;

  const handleCardClick = () => {};
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const hasCertifications = professional.certifications && professional.certifications.length > 0;
  const verifiedCertifications = professional.certifications.filter(cert => cert.verified);
  const isVerified = verifiedCertifications.length > 0;

  return (
    <Link href={profileUrl}>
      <div
        className="group border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col h-full cursor-pointer"
        tabIndex={0}
        aria-label={`View profile of ${name}, ${title}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start space-x-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={profileImageUrl || '/images/placeholder-profile.jpg'}
              alt={name}
              fill
              className="object-cover rounded-full"
            />
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1" title="Verified Professional">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300">{name}</h3>
            <p className="text-gray-700">{title}</p>
            <p className="text-gray-500 text-sm">{location}</p>
            <div className="mt-1 flex items-center">
              <span className="text-gray-600 text-sm">{experienceYears} years experience</span>
              {hourlyRate && (
                <>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-700 font-medium">€{hourlyRate}/hr</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
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
              className={`text-xs px-2 py-1 rounded-full ${availabilityColors[availability]}`}
            >
              {availabilityLabels[availability]}
            </div>
            
            {hasCertifications && (
              <div className="flex items-center text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <span>{professional.certifications.length} Certifications</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfessionalCard; 