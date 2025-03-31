import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { dummyProfessionals } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { locationsList, skillsList } from "@/lib/dummy-data";
import { CheckCircle, MapPin, Search, Filter, Star, UserCheck, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { IProfessional } from "@/lib/store";

export const ProfessionalSearch = () => {
  const { professionalFilters, setProfessionalFilters } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  
  // Apply filters to professionals
  const filteredProfessionals = dummyProfessionals.filter(professional => {
    // Filter by availability
    if (professionalFilters.availability !== null && professional.availability !== professionalFilters.availability) {
      return false;
    }
    
    // Filter by verification status
    if (professionalFilters.verified !== null && professional.verified !== professionalFilters.verified) {
      return false;
    }
    
    // Filter by location
    if (professionalFilters.location && professional.location !== professionalFilters.location) {
      return false;
    }
    
    // Filter by skills
    if (professionalFilters.skills.length > 0 && !professionalFilters.skills.some(skill => professional.skills.includes(skill))) {
      return false;
    }
    
    // Filter by search query (name, bio, or skills)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = professional.name.toLowerCase().includes(query);
      const bioMatch = professional.bio?.toLowerCase().includes(query) || false;
      const skillsMatch = professional.skills.some(skill => skill.toLowerCase().includes(query));
      
      if (!nameMatch && !bioMatch && !skillsMatch) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleSkillToggle = (skill: string) => {
    const updatedSkills = professionalFilters.skills.includes(skill)
      ? professionalFilters.skills.filter(s => s !== skill)
      : [...professionalFilters.skills, skill];
    
    setProfessionalFilters({ skills: updatedSkills });
  };
  
  const handleLocationChange = (location: string) => {
    setProfessionalFilters({ location: location || undefined });
  };
  
  const handleAvailabilityChange = (availability: boolean | null) => {
    setProfessionalFilters({ availability });
  };
  
  const handleVerificationChange = (verified: boolean | null) => {
    setProfessionalFilters({ verified });
  };
  
  const clearFilters = () => {
    setProfessionalFilters({
      skills: [],
      availability: null,
      location: undefined,
      verified: null,
    });
    setSearchQuery("");
  };
  
  const displayedSkills = showMoreSkills ? skillsList : skillsList.slice(0, 10);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Professionals
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-5">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search professionals..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Availability</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={professionalFilters.availability === true ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleAvailabilityChange(professionalFilters.availability === true ? null : true)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleAvailabilityChange(professionalFilters.availability === true ? null : true)}
                >
                  Available Now
                </Badge>
                <Badge 
                  variant={professionalFilters.availability === false ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleAvailabilityChange(professionalFilters.availability === false ? null : false)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleAvailabilityChange(professionalFilters.availability === false ? null : false)}
                >
                  Not Available
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Verification</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={professionalFilters.verified === true ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleVerificationChange(professionalFilters.verified === true ? null : true)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerificationChange(professionalFilters.verified === true ? null : true)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <Select
                value={professionalFilters.location}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Location</SelectItem>
                  {locationsList.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {professionalFilters.skills.map(skill => (
                  <Badge key={skill} className="inline-flex items-center gap-1 py-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSkillToggle(skill)}
                      aria-label={`Remove ${skill} filter`}
                    />
                  </Badge>
                ))}
              </div>
              
              <Separator className="my-3" />
              
              <div className="space-y-2">
                {displayedSkills.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={professionalFilters.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-8 text-xs w-full justify-between"
                onClick={() => setShowMoreSkills(!showMoreSkills)}
              >
                {showMoreSkills ? 'Show Less' : 'Show More'}
                {showMoreSkills ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
              onClick={clearFilters}
              disabled={
                professionalFilters.skills.length === 0 && 
                !professionalFilters.location && 
                professionalFilters.availability === null &&
                professionalFilters.verified === null
              }
            >
              Clear Filters
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-3 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredProfessionals.length} Professionals Found
          </h2>
        </div>
        
        {filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredProfessionals.map(professional => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <UserCheck className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-medium">No Professionals Found</h3>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                We couldn't find any professionals matching your filters. Try adjusting your search criteria or check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const ProfessionalCard: React.FC<{ professional: IProfessional }> = ({ professional }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/images/avatars/placeholder.jpg" alt={professional.name} />
              <AvatarFallback>{professional.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold">
                  {professional.name}
                  {professional.verified && (
                    <CheckCircle className="inline-block h-4 w-4 text-green-500 ml-2" />
                  )}
                </h3>
                
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  {professional.location && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {professional.location}
                    </div>
                  )}
                  
                  <Badge 
                    variant={professional.availability ? "default" : "outline"}
                    className="text-xs ml-2"
                  >
                    {professional.availability ? "Available Now" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button size="sm">
                  Contact
                </Button>
              </div>
            </div>
            
            <p className="mt-3 text-sm line-clamp-2">
              {professional.bio || "No bio provided."}
            </p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {professional.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {professional.certifications.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.certifications.slice(0, 2).map(cert => (
                    <Badge key={cert.id} variant="outline" className="text-xs">
                      {cert.name}
                    </Badge>
                  ))}
                  {professional.certifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{professional.certifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalSearch; 