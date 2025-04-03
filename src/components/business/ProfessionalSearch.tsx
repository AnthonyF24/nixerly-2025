"use client"

import React, { useState, useRef } from "react";
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
import { 
  CheckCircle, 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  UserCheck, 
  X, 
  ChevronDown, 
  ChevronUp,
  Mail,
  Phone,
  Calendar,
  Building,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { IProfessional, IPortfolioItem } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";

// Sample placeholder images for portfolio demonstration
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1533337429445-d9d16338f0db?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586681145979-f6f91929bcd0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1568795639825-90e9568172ed?w=800&auto=format&fit=crop&q=80"
];

// Function to get a placeholder image or the actual image
const getImageUrl = (item: IPortfolioItem, index: number): string => {
  // If the item has a valid image URL, use it
  if (item.imageUrl && !item.imageUrl.startsWith('/')) {
    return item.imageUrl;
  }
  
  // Otherwise, use a placeholder image based on the index
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
};

export const ProfessionalSearch = () => {
  const { professionalFilters, setProfessionalFilters, business } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [pendingFilters, setPendingFilters] = useState(professionalFilters);
  const [isSearching, setIsSearching] = useState(false);
  
  // Check if the business has an active subscription
  const hasActiveSubscription = business?.verified === true;

  // If no subscription, show a message to subscribe
  if (!hasActiveSubscription) {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 shadow-md bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800/50">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-lg">
            <CardTitle className="text-amber-800 dark:text-amber-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M10.43 6.13L4.27 12.3a1 1 0 0 0 0 1.4l6.16 6.17c.39.39 1.02.39 1.41 0l12.02-12.02c.39-.39.39-1.02 0-1.41l-6.16-6.16a.996.996 0 0 0-1.41 0L10.43 6.13Z"></path>
                <path d="M15.7 10.7l-3.48 3.48"></path>
              </svg>
              Subscription Required
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-500">
              Access to our professional database requires an active subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">Unlock Our Database</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Subscribe to our Business Plan for €49/month to access our complete database of construction professionals. Find the perfect match for your projects and contact them directly.
                </p>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Subscription Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">Search our entire database of professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">View verified professional profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">Contact professionals directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">Post unlimited job listings</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  asChild
                  className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Link href="/dashboard/profile#subscription">
                    Subscribe Now - €49/month
                  </Link>
                </Button>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative overflow-hidden rounded-lg w-full h-full min-h-[300px] bg-indigo-100 dark:bg-indigo-900/20">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-600 to-purple-600"></div>
                  <div className="p-8 relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                        <path d="M18.1 9.2a4.8 4.8 0 1 0-6.8-6.8l-1.3 1.3 6.8 6.8 1.3-1.3z"></path>
                        <path d="M11.5 3.2 3.2 11.5c-.8.8-.8 2 0 2.8L8.7 20c.8.7 2 .7 2.8 0l8.3-8.3"></path>
                        <path d="m15 9 3 3"></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-medium text-indigo-800 dark:text-indigo-300 mb-2 text-center">Find the Perfect Match</h4>
                    <p className="text-indigo-700 dark:text-indigo-400 text-center">
                      Our database includes hundreds of qualified professionals across various construction trades
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Show a restricted preview of professionals */}
        <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-4 rounded-xl">
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-slate-500">
              <circle cx="18" cy="15" r="3"></circle>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M10 15H6a4 4 0 0 0-4 4v2"></path>
              <path d="m21.7 16.4-.9-.3"></path>
              <path d="m15.2 13.9-.9-.3"></path>
              <path d="m16.6 18.7.3-.9"></path>
              <path d="m19.1 12.2.3-.9"></path>
            </svg>
            Sample Professionals (Subscribe to See More)
          </h2>
          <div className="grid grid-cols-1 gap-5 opacity-70">
            {dummyProfessionals.slice(0, 2).map(professional => (
              <div key={professional.id} className="border rounded-lg p-4 bg-white dark:bg-slate-900 relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-slate-200 dark:border-slate-700">
                    <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg text-slate-800 dark:text-slate-200">{professional.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {professional.location && (
                        <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          {professional.location}
                        </span>
                      )}
                      {professional.verified && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mx-auto mb-3">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                      Access Restricted
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Subscribe to view full professional profiles and contact information.
                    </p>
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all"
                    >
                      <Link href="/dashboard/profile#subscription">
                        Subscribe Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
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
    
    // Filter by skills - check if ANY of the selected skills matches (OR logic)
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
  
  // Add a function to apply all filters at once
  const applyFilters = () => {
    setProfessionalFilters(pendingFilters);
    setIsSearching(true);
    
    // Add a small artificial delay to show loading state
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };
  
  const handleSkillToggle = (skill: string) => {
    const updatedSkills = professionalFilters.skills.includes(skill)
      ? professionalFilters.skills.filter(s => s !== skill)
      : [...professionalFilters.skills, skill];
    
    setProfessionalFilters({ skills: updatedSkills });
  };
  
  const handleLocationChange = (location: string) => {
    setProfessionalFilters({ location: location === "any" ? undefined : location });
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-screen-2xl mx-auto bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-4 rounded-xl">
      <div className="md:col-span-1 relative h-fit">
        <Card className="sticky top-4 z-30 shadow-md border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <CardHeader className="pb-2 space-y-1 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
            <CardTitle className="text-lg font-medium flex items-center text-slate-800 dark:text-slate-200">
              <Filter className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              Filter Professionals
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              {filteredProfessionals.length} professionals found
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 p-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                <Input
                  placeholder="Search professionals..."
                  className="pl-9 h-9 focus-visible:ring-indigo-300 border-slate-200 dark:border-slate-700 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-slate-800 dark:text-slate-200">Availability</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={professionalFilters.availability === true ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${professionalFilters.availability === true ? 'bg-emerald-500 hover:bg-emerald-600' : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
                  onClick={() => handleAvailabilityChange(professionalFilters.availability === true ? null : true)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleAvailabilityChange(professionalFilters.availability === true ? null : true)}
                  aria-label="Filter by available now"
                >
                  Available Now
                </Badge>
                <Badge 
                  variant={professionalFilters.availability === false ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${professionalFilters.availability === false ? 'bg-amber-500 hover:bg-amber-600' : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
                  onClick={() => handleAvailabilityChange(professionalFilters.availability === false ? null : false)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleAvailabilityChange(professionalFilters.availability === false ? null : false)}
                  aria-label="Filter by not available"
                >
                  Not Available
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-slate-800 dark:text-slate-200">Verification</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={professionalFilters.verified === true ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${professionalFilters.verified === true ? 'bg-blue-500 hover:bg-blue-600' : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
                  onClick={() => handleVerificationChange(professionalFilters.verified === true ? null : true)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerificationChange(professionalFilters.verified === true ? null : true)}
                  aria-label="Filter by verified professionals"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-slate-800 dark:text-slate-200">Location</h3>
              <Select
                value={professionalFilters.location || "any"}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="w-full focus-visible:ring-indigo-300 border-slate-200 dark:border-slate-700 transition-all">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 dark:border-slate-700">
                  <SelectItem value="any">Any Location</SelectItem>
                  {locationsList.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">Skills</h3>
                {professionalFilters.skills.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                    onClick={() => setProfessionalFilters({ skills: [] })}
                  >
                    Clear
                  </Button>
                )}
              </div>
              
              {professionalFilters.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {professionalFilters.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="inline-flex items-center gap-1 py-1 pr-1 pl-2 group bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-all">
                      {skill}
                      <span 
                        className="ml-1 p-0.5 rounded-full hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50 cursor-pointer transition-colors"
                        onClick={() => handleSkillToggle(skill)}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleSkillToggle(skill)}
                        aria-label={`Remove ${skill} filter`}
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="relative">
                <Input
                  placeholder="Search skills... (select multiple)"
                  className="h-9 focus-visible:ring-indigo-300 border-slate-200 dark:border-slate-700 transition-all"
                  value={skillSearchQuery}
                  onChange={(e) => {
                    setSkillSearchQuery(e.target.value);
                    setShowSkillSuggestions(true);
                  }}
                  onFocus={() => setShowSkillSuggestions(true)}
                  aria-label="Search for skills to add multiple filters"
                />
                
                {showSkillSuggestions && skillSearchQuery.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white dark:bg-slate-900 rounded-md shadow-md border border-slate-200 dark:border-slate-700">
                    {skillsList
                      .filter(skill => 
                        skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
                        !professionalFilters.skills.includes(skill)
                      )
                      .slice(0, 8)
                      .map(skill => (
                        <div 
                          key={skill} 
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-700 dark:text-slate-300"
                          onClick={() => {
                            handleSkillToggle(skill);
                            setSkillSearchQuery("");
                            setShowSkillSuggestions(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSkillToggle(skill);
                              setSkillSearchQuery("");
                              setShowSkillSuggestions(false);
                            }
                          }}
                          tabIndex={0}
                        >
                          {skill}
                        </div>
                      ))}
                    
                    {skillsList.filter(skill => 
                      skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) &&
                      !professionalFilters.skills.includes(skill)
                    ).length === 0 && (
                      <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                        No matching skills found
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 italic">
                Select multiple skills to find professionals with any of these skills
              </div>
              
              {showSkillSuggestions && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowSkillSuggestions(false)}
                  aria-hidden="true"
                />
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 p-4 flex flex-col gap-3">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center gap-2"
              onClick={applyFilters}
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-20 border-t-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search Professionals
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 border-slate-200 dark:border-slate-700 transition-all"
              onClick={clearFilters}
              disabled={
                professionalFilters.skills.length === 0 && 
                !professionalFilters.location && 
                professionalFilters.availability === null &&
                professionalFilters.verified === null &&
                searchQuery === ""
              }
            >
              Clear All Filters
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-3 space-y-5">
        <div className="bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900/80 p-4 rounded-lg shadow-sm border border-indigo-100/80 dark:border-indigo-800/30">
          <h2 className="text-lg font-medium text-indigo-900 dark:text-indigo-200">
            {filteredProfessionals.length} Professionals Found
          </h2>
        </div>
        
        {isSearching ? (
          <div className="flex items-center justify-center h-40">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-300 border-opacity-30 border-t-indigo-600"></div>
          </div>
        ) : filteredProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {filteredProfessionals.map(professional => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-indigo-200 dark:border-indigo-800/50 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
                <UserCheck className="h-8 w-8 text-indigo-400 dark:text-indigo-500" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">No Professionals Found</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md">
                We couldn't find any professionals matching your filters. Try adjusting your search criteria or check back later.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-6 border-indigo-300 dark:border-indigo-700/70 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const ProfessionalCard: React.FC<{ professional: IProfessional }> = ({ professional }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Add state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  const portfolioItems = professional.portfolio || [];
  const hasPortfolio = portfolioItems.length > 0;
  
  const handlePrevImage = () => {
    if (portfolioItems.length <= 1) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    if (portfolioItems.length <= 1) return;
    setCurrentImageIndex(prev => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };
  
  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (portfolioRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      portfolioRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };
  
  // Add handlers for modal navigation
  const handleModalOpen = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };
  
  const handleModalPrev = () => {
    if (portfolioItems.length <= 1) return;
    setModalImageIndex(prev => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };
  
  const handleModalNext = () => {
    if (portfolioItems.length <= 1) return;
    setModalImageIndex(prev => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };
  
  // Add keyboard navigation for modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleModalPrev();
    } else if (e.key === 'ArrowRight') {
      handleModalNext();
    } else if (e.key === 'Escape') {
      setModalOpen(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800/50 group bg-white dark:bg-slate-900 rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex-shrink-0 sm:mr-5 mb-4 sm:mb-0 flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-28 w-28 border-2 border-white dark:border-slate-800 shadow-md mb-2 sm:mb-2 ring-2 ring-indigo-100 dark:ring-indigo-900/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
                  <AvatarImage src="/images/avatars/placeholder.jpg" alt={professional.name} />
                  <AvatarFallback className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium">
                    {professional.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {professional.verified && (
                  <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-white dark:border-slate-800">
                    <CheckCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-1 w-full -mt-1">
                <Badge 
                  variant={professional.availability ? "default" : "outline"}
                  className={`text-[10px] py-0.5 px-2 ${professional.availability ? "bg-emerald-500 text-white" : "text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800/50"}`}
                >
                  {professional.availability ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 sm:pl-1">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-indigo-800 dark:text-indigo-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {professional.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {professional.location && (
                      <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                        <MapPin className="h-3 w-3 mr-1 text-indigo-500 dark:text-indigo-400" />
                        {professional.location}
                      </div>
                    )}
                    
                    {professional.skills.slice(0, 1).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] py-0 px-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {skill}
                      </Badge>
                    ))}
                    
                    {professional.skills.length > 1 && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">+{professional.skills.length - 1} more</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="h-7 rounded-full px-3 text-xs text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300 transition-colors">
                    View
                  </Button>
                  <Button size="sm" className="h-7 rounded-full px-3 text-xs bg-indigo-600 hover:bg-indigo-700 transition-colors">
                    Contact
                  </Button>
                </div>
              </div>
              
              <p className="mt-2 text-xs line-clamp-2 text-slate-600 dark:text-slate-400">
                {professional.bio || "No bio provided."}
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <div className="px-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20">
              <TabsList className="h-8 bg-transparent p-0 w-full justify-start gap-3">
                <TabsTrigger 
                  value="overview" 
                  className={cn(
                    "px-2 py-1.5 h-full text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 rounded-none border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:font-medium data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-slate-600 dark:text-slate-400",
                  )}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio" 
                  className={cn(
                    "px-2 py-1.5 h-full text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 rounded-none border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:font-medium data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-slate-600 dark:text-slate-400",
                    !hasPortfolio && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!hasPortfolio}
                >
                  Portfolio
                  {portfolioItems.length > 0 && (
                    <span className="ml-1 text-[10px] rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1 py-0.5">
                      {portfolioItems.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="certifications" 
                  className={cn(
                    "px-2 py-1.5 h-full text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 rounded-none border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:font-medium data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 text-slate-600 dark:text-slate-400",
                    (!professional.certifications || professional.certifications.length === 0) && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!professional.certifications || professional.certifications.length === 0}
                >
                  Certifications
                  {professional.certifications && professional.certifications.length > 0 && (
                    <span className="ml-1 text-[10px] rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1 py-0.5">
                      {professional.certifications.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="h-[220px] overflow-hidden">
              <TabsContent value="overview" className="p-4 pt-3 h-full overflow-y-auto focus-visible:outline-none focus-visible:ring-0 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] uppercase font-medium tracking-wide text-indigo-500 dark:text-indigo-400 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {professional.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px] py-0 px-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {professional.certifications && professional.certifications.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase font-medium tracking-wide text-indigo-500 dark:text-indigo-400 mb-2">Certification Highlights</h4>
                      <div className="space-y-1.5">
                        {professional.certifications.slice(0, 2).map(cert => (
                          <div key={cert.id} className="flex items-start gap-2 bg-indigo-50/50 dark:bg-indigo-900/20 p-1.5 rounded-md border border-indigo-100 dark:border-indigo-800/30">
                            <Award className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{cert.name}</div>
                              <div className="text-[10px] text-slate-600 dark:text-slate-400">
                                {cert.issuer} • {new Date(cert.date).getFullYear()}
                                {cert.verified && <span className="text-blue-600 dark:text-blue-400 ml-1">(Verified)</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="h-full overflow-hidden p-0 focus-visible:outline-none focus-visible:ring-0">
                {hasPortfolio && (
                  <div className="h-full overflow-hidden relative group">
                    {portfolioItems.length > 1 && (
                      <>
                        <Button 
                          size="icon"
                          variant="secondary"
                          className="absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 shadow-sm transition-opacity z-10"
                          onClick={() => scrollPortfolio('left')}
                          aria-label="Scroll to previous images"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          size="icon"
                          variant="secondary"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 shadow-sm transition-opacity z-10"
                          onClick={() => scrollPortfolio('right')}
                          aria-label="Scroll to next images"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                    <div 
                      className="h-full overflow-x-auto flex gap-4 p-4 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-indigo-800"
                      ref={portfolioRef}
                    >
                      {portfolioItems.map((item, index) => (
                        <div 
                          key={item.id}
                          className="flex-shrink-0 h-[175px] w-auto rounded-md overflow-hidden border border-indigo-100 dark:border-indigo-800/30 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleModalOpen(index)}
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleModalOpen(index)}
                          aria-label={`View ${item.title || `portfolio image ${index + 1}`} in full size`}
                        >
                          <img 
                            src={getImageUrl(item, index)} 
                            alt={item.altText || item.title || `Portfolio image ${index + 1}`}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="certifications" className="p-4 h-full overflow-y-auto focus-visible:outline-none focus-visible:ring-0 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-indigo-800">
                {professional.certifications && professional.certifications.length > 0 ? (
                  <div className="space-y-3">
                    {professional.certifications.map(cert => (
                      <div key={cert.id} className="flex gap-2 border-b border-indigo-100 dark:border-indigo-800/30 pb-3 last:border-0 last:pb-0">
                        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-md h-fit">
                          <Award className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{cert.name}</div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-400">
                            Issued by {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
                          </div>
                          {cert.validUntil && (
                            <div className="text-[10px] mt-1 flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Calendar className="h-2.5 w-2.5" />
                              Valid until {new Date(cert.validUntil).toLocaleDateString()}
                            </div>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            {cert.verified && (
                              <Badge variant="outline" className="px-1.5 py-0 text-[10px] text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10">
                                <CheckCircle className="h-2 w-2 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {cert.documentUrl && (
                              <Button variant="ghost" size="sm" className="h-6 px-2 gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                                <ExternalLink className="h-2.5 w-2.5" />
                                View Document
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-slate-500 dark:text-slate-400 text-xs">
                    No certifications available.
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CardContent>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent 
          className="max-w-screen-lg w-full p-1 bg-indigo-950/95 backdrop-blur-md border-indigo-900 sm:rounded-lg" 
          onKeyDown={handleModalKeyDown}
        >
          <DialogTitle className="sr-only">
            {portfolioItems[modalImageIndex]?.title || `Portfolio image ${modalImageIndex + 1}`}
          </DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <DialogClose className="absolute right-2 top-2 z-10 rounded-full p-1 bg-indigo-800/80 text-indigo-200 hover:text-white hover:bg-indigo-700 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            <div className="relative max-h-[80vh] max-w-full">
              {portfolioItems[modalImageIndex] && (
                <img 
                  src={getImageUrl(portfolioItems[modalImageIndex], modalImageIndex)} 
                  alt={portfolioItems[modalImageIndex]?.altText || portfolioItems[modalImageIndex]?.title || `Portfolio image ${modalImageIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              )}
            </div>
            
            {portfolioItems.length > 1 && (
              <>
                <Button 
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200 shadow-md"
                  onClick={handleModalPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200 shadow-md"
                  onClick={handleModalNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-800/80 text-indigo-200 px-2 py-1 rounded-full text-xs">
                  {modalImageIndex + 1} / {portfolioItems.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProfessionalSearch; 