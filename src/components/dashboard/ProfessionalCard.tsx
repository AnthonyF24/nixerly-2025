import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, MapPin, Eye, Star } from "lucide-react";
import Link from "next/link";
import { Professional } from '@/data/mock';

type ProfessionalCardProps = {
  professional: Professional;
  compact?: boolean;
  maxSkills?: number;
};

const ProfessionalCard = ({
  professional,
  compact = false,
  maxSkills = 3
}: ProfessionalCardProps) => {
  const { id, name, avatar, location, skills = [], headline, rating } = professional;
  
  return (
    <div className={`flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all ${compact ? 'py-2' : 'py-3'}`}>
      <Avatar className={`border border-blue-100 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="bg-blue-50 text-blue-700">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className={`font-medium ${compact ? 'text-xs' : 'text-sm'} truncate`}>{name}</h3>
          {professional.rating && professional.rating >= 4.5 && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 h-5 px-1.5">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span className="text-xs">Top Rated</span>
            </Badge>
          )}
          {professional.availability && (
            <Badge variant="secondary" className="bg-green-50 text-green-700 h-5 px-1.5">
              <span className="text-xs">Available</span>
            </Badge>
          )}
        </div>
        
        {headline && !compact && (
          <p className="text-xs text-gray-700 truncate mt-0.5">
            {headline}
          </p>
        )}
        
        {location && (
          <p className="text-xs text-gray-500 truncate mt-0.5">
            <span className="inline-flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </span>
            {rating && (
              <>
                <span className="mx-2">•</span>
                <span className="inline-flex items-center">
                  <Star className="h-3 w-3 mr-1 text-amber-500" />
                  {rating}
                </span>
              </>
            )}
          </p>
        )}
        
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {skills.slice(0, maxSkills).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="h-5 text-xs px-1.5 py-0 bg-white border-gray-200"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > maxSkills && (
              <Badge
                variant="outline"
                className="h-5 text-xs px-1.5 py-0 bg-white border-gray-200"
              >
                +{skills.length - maxSkills} more
              </Badge>
            )}
          </div>
        )}
      </div>
      <Link 
        href={`/professionals/${id}`} 
        passHref 
        className="shrink-0"
        tabIndex={0}
        aria-label={`View ${name}'s profile`}
      >
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </Link>
    </div>
  );
};

export default ProfessionalCard; 