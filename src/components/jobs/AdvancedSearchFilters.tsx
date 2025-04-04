"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAppStore } from '@/lib/store';
import { skillsList, locationsList } from '@/lib/dummy-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Star,
  Clock,
  RefreshCw,
  BookmarkPlus,
  Bookmark,
  Award,
  CloudLightning,
  Home,
  SlidersHorizontal,
  Save,
  Settings,
  Check,
  RotateCw,
  AlertCircle,
  BookmarkCheck,
  Trash2
} from 'lucide-react';

export interface SavedFilter {
  id: string;
  name: string;
  filter: any;
  createdAt: Date;
}

const AdvancedSearchFilters = () => {
  const { jobFilters, setJobFilters } = useAppStore();
  const [searchQuery, setSearchQuery] = useState(jobFilters.searchQuery || '');
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [showMoreCertifications, setShowMoreCertifications] = useState(false);
  const [isCreateFilterDialogOpen, setIsCreateFilterDialogOpen] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState('');
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [isSavedFiltersDialogOpen, setIsSavedFiltersDialogOpen] = useState(false);
  const { toast } = useToast();

  // Extended filter sections
  const [showFilters, setShowFilters] = useState({
    status: true,
    location: true,
    salary: true,
    jobType: true,
    datePosted: true,
    skills: true,
    experience: false,
    certifications: false,
    remote: false,
    savedFilters: false,
  });

  // Advanced filter states
  const [experienceLevel, setExperienceLevel] = useState<string[]>(jobFilters.experienceLevel || []);
  const [certifications, setCertifications] = useState<string[]>(jobFilters.certifications || []);
  const [remoteOnly, setRemoteOnly] = useState<boolean>(jobFilters.remoteOnly || false);
  const [salaryRange, setSalaryRange] = useState<number[]>([
    jobFilters.salaryMin || 0,
    jobFilters.salaryMax || 100000
  ]);
  const [jobType, setJobType] = useState<string[]>(jobFilters.jobType || []);
  const [datePosted, setDatePosted] = useState<string | undefined>(jobFilters.datePosted);

  // Apply filter changes to the global state
  useEffect(() => {
    if (searchQuery !== jobFilters.searchQuery) {
      setJobFilters({ searchQuery });
    }
  }, [searchQuery, jobFilters.searchQuery, setJobFilters]);

  // Basic filter handlers
  const handleSkillToggle = (skill: string) => {
    const updatedSkills = jobFilters.skills.includes(skill)
      ? jobFilters.skills.filter(s => s !== skill)
      : [...jobFilters.skills, skill];
    
    setJobFilters({ skills: updatedSkills });
  };
  
  const handleLocationChange = (location: string) => {
    setJobFilters({ location: location === 'any' ? undefined : location });
  };
  
  const handleStatusChange = (status: 'open' | 'closed' | 'draft' | null) => {
    setJobFilters({ status });
  };

  // Advanced filter handlers
  const handleJobTypeToggle = (type: string) => {
    const updatedJobType = jobType.includes(type)
      ? jobType.filter(t => t !== type)
      : [...jobType, type];
    
    setJobType(updatedJobType);
    setJobFilters({ jobType: updatedJobType });
  };

  const handleExperienceLevelToggle = (level: string) => {
    const updatedLevels = experienceLevel.includes(level)
      ? experienceLevel.filter(l => l !== level)
      : [...experienceLevel, level];
    
    setExperienceLevel(updatedLevels);
    setJobFilters({ experienceLevel: updatedLevels });
  };

  const handleCertificationToggle = (cert: string) => {
    const updatedCerts = certifications.includes(cert)
      ? certifications.filter(c => c !== cert)
      : [...certifications, cert];
    
    setCertifications(updatedCerts);
    setJobFilters({ certifications: updatedCerts });
  };

  const handleRemoteOnlyChange = (checked: boolean) => {
    setRemoteOnly(checked);
    setJobFilters({ remoteOnly: checked });
  };

  const handleDatePostedChange = (value: string) => {
    const newValue = value === 'any' ? undefined : value;
    setDatePosted(newValue);
    setJobFilters({ datePosted: newValue });
  };

  const handleSalaryRangeChange = (values: number[]) => {
    setSalaryRange(values);
    setJobFilters({ 
      salaryMin: values[0] > 0 ? values[0] : undefined,
      salaryMax: values[1] < 100000 ? values[1] : undefined
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setJobFilters({
      skills: [],
      location: undefined,
      status: null,
      searchQuery: '',
      jobType: [],
      salaryMin: undefined,
      salaryMax: undefined,
      datePosted: undefined,
      experienceLevel: [],
      certifications: [],
      remoteOnly: false,
      savedFilters: false,
    });
    setSearchQuery('');
    setSalaryRange([0, 100000]);
    setJobType([]);
    setExperienceLevel([]);
    setCertifications([]);
    setRemoteOnly(false);
    setDatePosted(undefined);
  };
  
  // Save current filter
  const saveCurrentFilter = () => {
    if (!savedFilterName.trim()) {
      toast({
        title: "Filter name required",
        description: "Please provide a name for your saved filter",
        variant: "destructive"
      });
      return;
    }

    const newFilter: SavedFilter = {
      id: Math.random().toString(36).substring(2, 9),
      name: savedFilterName.trim(),
      filter: { ...jobFilters },
      createdAt: new Date()
    };

    setSavedFilters([...savedFilters, newFilter]);
    setSavedFilterName('');
    setIsCreateFilterDialogOpen(false);

    toast({
      title: "Filter saved",
      description: `"${newFilter.name}" has been saved to your filters`,
      action: (
        <ToastAction altText="Undo">
          <Button variant="outline" size="sm" onClick={() => {
            setSavedFilters(savedFilters);
          }}>
            Undo
          </Button>
        </ToastAction>
      ),
    });
  };

  // Apply saved filter
  const applySavedFilter = (filter: SavedFilter) => {
    setJobFilters(filter.filter);
    setSearchQuery(filter.filter.searchQuery || '');
    setSalaryRange([
      filter.filter.salaryMin || 0,
      filter.filter.salaryMax || 100000
    ]);
    setJobType(filter.filter.jobType || []);
    setExperienceLevel(filter.filter.experienceLevel || []);
    setCertifications(filter.filter.certifications || []);
    setRemoteOnly(filter.filter.remoteOnly || false);
    setDatePosted(filter.filter.datePosted);
    setIsSavedFiltersDialogOpen(false);

    toast({
      title: "Filter applied",
      description: `Applied "${filter.name}" filter`,
    });
  };

  // Delete saved filter
  const deleteSavedFilter = (filterId: string) => {
    setSavedFilters(savedFilters.filter(f => f.id !== filterId));
    
    toast({
      title: "Filter deleted",
      variant: "destructive"
    });
  };
  
  // Section toggle handler
  const toggleFilterSection = (section: keyof typeof showFilters) => {
    setShowFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter options
  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'expert', label: 'Expert' },
    { value: 'lead', label: 'Lead/Senior' }
  ];

  const certificationOptions = [
    "Master Electrician License",
    "OSHA 30-Hour Construction Safety",
    "NATE HVAC Certification",
    "Master Plumber License",
    "Carpentry Certification",
    "AWS Certified Solutions Architect",
    "Professional Engineer (PE)",
    "Project Management Professional (PMP)",
    "LEED Accredited Professional",
    "Certified Construction Manager (CCM)",
    "First Aid & CPR",
    "Forklift Operator Certification",
    "Confined Space Training",
    "Fall Protection Certification",
    "Electrical Safety Training"
  ];

  const dateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: 'three_months', label: 'Past 3 months' }
  ];

  const formatSalary = (value: number): string => {
    return `€${value.toLocaleString()}`;
  };
  
  // Calculate displayed skills and certifications
  const displayedSkills = showMoreSkills ? skillsList : skillsList.slice(0, 8);
  const displayedCertifications = showMoreCertifications ? certificationOptions : certificationOptions.slice(0, 5);
  
  // Count active filters
  const totalActiveFilters = 
    (jobFilters.skills.length) + 
    (jobFilters.location ? 1 : 0) + 
    (jobFilters.status ? 1 : 0) +
    (jobType.length) +
    (experienceLevel.length) +
    (certifications.length) +
    (remoteOnly ? 1 : 0) +
    (datePosted && datePosted !== 'any' ? 1 : 0) +
    (salaryRange[0] > 0 || salaryRange[1] < 100000 ? 1 : 0) +
    (searchQuery ? 1 : 0);
  
  return (
    <>
      <Card className="border-gray-200 shadow-sm sticky top-4 overflow-hidden p-0">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <CardTitle className="text-lg flex items-center text-blue-700">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Advanced Filters
            </CardTitle>
            <div className="flex items-center gap-2">
              {totalActiveFilters > 0 && (
                <Badge className="bg-blue-600">{totalActiveFilters}</Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-blue-600"
                onClick={() => setIsSavedFiltersDialogOpen(true)}
                aria-label="Saved Filters"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-blue-600" 
                onClick={() => setIsCreateFilterDialogOpen(true)}
                aria-label="Save Current Filter"
              >
                <BookmarkPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="space-y-5 pt-5">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job title, skills, description..."
                className="pl-9 border-blue-200 focus-visible:ring-blue-300/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Job Status Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('status')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Star className="h-4 w-4 mr-1.5 text-blue-600" />
                Job Status
              </h3>
              {showFilters.status ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.status && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge 
                  variant={jobFilters.status === 'open' ? 'default' : 'outline'}
                  className={jobFilters.status === 'open' 
                    ? "cursor-pointer bg-green-600 hover:bg-green-700" 
                    : "cursor-pointer border-green-300 text-green-700 hover:border-green-400"}
                  onClick={() => handleStatusChange(jobFilters.status === 'open' ? null : 'open')}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'open' ? null : 'open')}
                >
                  Open
                </Badge>
                <Badge 
                  variant={jobFilters.status === 'closed' ? 'default' : 'outline'}
                  className={jobFilters.status === 'closed' 
                    ? "cursor-pointer bg-gray-600 hover:bg-gray-700" 
                    : "cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400"}
                  onClick={() => handleStatusChange(jobFilters.status === 'closed' ? null : 'closed')}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'closed' ? null : 'closed')}
                >
                  Closed
                </Badge>
                <Badge 
                  variant={jobFilters.status === 'draft' ? 'default' : 'outline'}
                  className={jobFilters.status === 'draft' 
                    ? "cursor-pointer bg-amber-600 hover:bg-amber-700" 
                    : "cursor-pointer border-amber-300 text-amber-700 hover:border-amber-400"}
                  onClick={() => handleStatusChange(jobFilters.status === 'draft' ? null : 'draft')}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'draft' ? null : 'draft')}
                >
                  Draft
                </Badge>
              </div>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Location Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('location')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                Location
              </h3>
              {showFilters.location ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.location && (
              <Select
                value={jobFilters.location || "any"}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Location</SelectItem>
                  <SelectItem value="Remote">Remote Only</SelectItem>
                  {locationsList.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Remote Only */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('remote')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Home className="h-4 w-4 mr-1.5 text-blue-600" />
                Remote Work
              </h3>
              {showFilters.remote ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.remote && (
              <div className="flex items-center space-x-3 mt-1">
                <Switch
                  id="remote-only"
                  checked={remoteOnly}
                  onCheckedChange={handleRemoteOnlyChange}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="remote-only" className="text-sm text-gray-700">
                  Show remote positions only
                </Label>
              </div>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Salary Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('salary')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <DollarSign className="h-4 w-4 mr-1.5 text-blue-600" />
                Salary Range
              </h3>
              {showFilters.salary ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.salary && (
              <div className="px-1 pt-3 pb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div>{formatSalary(salaryRange[0])}</div>
                  <div>{formatSalary(salaryRange[1])}</div>
                </div>
                <Slider
                  value={salaryRange}
                  max={100000}
                  step={5000}
                  onValueChange={handleSalaryRangeChange}
                  className="mt-2"
                />
                <div className="flex items-center mt-3 text-sm">
                  <Switch
                    checked={salaryRange[0] > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleSalaryRangeChange([30000, salaryRange[1]]);
                      } else {
                        handleSalaryRangeChange([0, salaryRange[1]]);
                      }
                    }}
                    className="mr-2 data-[state=checked]:bg-blue-600"
                  />
                  <span>Show jobs with salary only</span>
                </div>
              </div>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Job Type Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('jobType')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Briefcase className="h-4 w-4 mr-1.5 text-blue-600" />
                Job Type
              </h3>
              {showFilters.jobType ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.jobType && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                {jobTypes.map(type => (
                  <div 
                    key={type.value}
                    className={`flex items-center justify-center border rounded-md p-2 cursor-pointer ${
                      jobType.includes(type.value) 
                        ? 'bg-blue-50 border-blue-300 text-blue-700' 
                        : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                    onClick={() => handleJobTypeToggle(type.value)}
                  >
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Experience Level Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('experience')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Award className="h-4 w-4 mr-1.5 text-blue-600" />
                Experience Level
              </h3>
              {showFilters.experience ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.experience && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                {experienceLevels.map(level => (
                  <div 
                    key={level.value}
                    className={`flex items-center justify-center border rounded-md p-2 cursor-pointer ${
                      experienceLevel.includes(level.value) 
                        ? 'bg-blue-50 border-blue-300 text-blue-700' 
                        : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                    onClick={() => handleExperienceLevelToggle(level.value)}
                  >
                    <span className="text-sm font-medium">{level.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Date Posted Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('datePosted')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-blue-600" />
                Date Posted
              </h3>
              {showFilters.datePosted ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.datePosted && (
              <Select
                value={datePosted || "any"}
                onValueChange={handleDatePostedChange}
              >
                <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  {dateOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Required Certifications */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('certifications')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <CloudLightning className="h-4 w-4 mr-1.5 text-blue-600" />
                Required Certifications
              </h3>
              {showFilters.certifications ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.certifications && (
              <>
                <div className="flex flex-wrap gap-1 mb-2">
                  {certifications.map(cert => (
                    <Badge key={cert} className="inline-flex items-center gap-1 py-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {cert}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleCertificationToggle(cert)}
                        aria-label={`Remove ${cert} filter`}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {displayedCertifications.map(cert => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cert-${cert}`}
                        checked={certifications.includes(cert)}
                        onCheckedChange={() => handleCertificationToggle(cert)}
                        className="border-purple-300 text-purple-600 focus:ring-purple-300/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <label
                        htmlFor={`cert-${cert}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {cert}
                      </label>
                    </div>
                  ))}
                </div>
                
                {certificationOptions.length > 5 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 h-8 text-xs w-full justify-center text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                    onClick={() => setShowMoreCertifications(!showMoreCertifications)}
                  >
                    {showMoreCertifications ? 'Show Less' : 'Show More'}
                    {showMoreCertifications ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
          
          <Separator className="bg-gray-100" />
          
          {/* Skills Filter */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleFilterSection('skills')}
            >
              <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center">
                <Star className="h-4 w-4 mr-1.5 text-blue-600" />
                Skills
              </h3>
              {showFilters.skills ? (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              )}
            </div>
            
            {showFilters.skills && (
              <>
                <div className="flex flex-wrap gap-1 mb-2">
                  {jobFilters.skills.map(skill => (
                    <Badge key={skill} className="inline-flex items-center gap-1 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                        aria-label={`Remove ${skill} filter`}
                      />
                    </Badge>
                  ))}
                </div>
                
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {displayedSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={jobFilters.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                        className="border-blue-300 text-blue-600 focus:ring-blue-300/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
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
                  className="mt-2 h-8 text-xs w-full justify-center text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                  onClick={() => setShowMoreSkills(!showMoreSkills)}
                >
                  {showMoreSkills ? 'Show Less' : 'Show More'}
                  {showMoreSkills ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 border-t bg-blue-50/30 px-6 py-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 flex items-center justify-center"
            onClick={clearFilters}
            disabled={totalActiveFilters === 0}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Reset Filters
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            onClick={() => setIsCreateFilterDialogOpen(true)}
          >
            <BookmarkPlus className="h-3.5 w-3.5 mr-1.5" />
            Save Filter
          </Button>
        </CardFooter>
      </Card>

      {/* Save Filter Dialog */}
      <Dialog open={isCreateFilterDialogOpen} onOpenChange={setIsCreateFilterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-700">
              <BookmarkPlus className="h-5 w-5 mr-2" />
              Save Current Filter
            </DialogTitle>
            <DialogDescription>
              Give your filter a name to save it for future use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filter-name" className="text-sm font-medium">
                Filter Name
              </Label>
              <Input
                id="filter-name"
                placeholder="e.g., Recent Remote Jobs"
                value={savedFilterName}
                onChange={(e) => setSavedFilterName(e.target.value)}
                className="border-blue-200 focus-visible:ring-blue-300/30"
              />
            </div>
            <div className="bg-blue-50 rounded-md p-3 text-sm">
              <h4 className="font-medium text-blue-700 flex items-center mb-2">
                <Filter className="h-4 w-4 mr-1.5" />
                Current Filters
              </h4>
              <ul className="space-y-1 text-blue-600">
                {jobFilters.searchQuery && <li>Search: "{jobFilters.searchQuery}"</li>}
                {jobFilters.status && <li>Status: {jobFilters.status}</li>}
                {jobFilters.location && <li>Location: {jobFilters.location}</li>}
                {jobFilters.remoteOnly && <li>Remote Only: Yes</li>}
                {jobFilters.skills.length > 0 && <li>Skills: {jobFilters.skills.length} selected</li>}
                {jobFilters.jobType?.length > 0 && <li>Job Types: {jobFilters.jobType.length} selected</li>}
                {jobFilters.experienceLevel?.length > 0 && <li>Experience Levels: {jobFilters.experienceLevel.length} selected</li>}
                {jobFilters.certifications?.length > 0 && <li>Certifications: {jobFilters.certifications.length} selected</li>}
                {jobFilters.salaryMin && <li>Min Salary: {formatSalary(jobFilters.salaryMin)}</li>}
                {jobFilters.salaryMax && <li>Max Salary: {formatSalary(jobFilters.salaryMax)}</li>}
                {jobFilters.datePosted && <li>Date Posted: {jobFilters.datePosted}</li>}
              </ul>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateFilterDialogOpen(false)}
              className="border-blue-200 text-blue-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={saveCurrentFilter}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!savedFilterName.trim()}
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Saved Filters Dialog */}
      <Dialog open={isSavedFiltersDialogOpen} onOpenChange={setIsSavedFiltersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-700">
              <Bookmark className="h-5 w-5 mr-2" />
              Saved Filters
            </DialogTitle>
            <DialogDescription>
              Apply or manage your saved job search filters
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {savedFilters.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-gray-700 font-medium mb-1">No saved filters</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Save your current search to access it quickly later
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mx-auto"
                  onClick={() => {
                    setIsSavedFiltersDialogOpen(false);
                    setIsCreateFilterDialogOpen(true);
                  }}
                >
                  <BookmarkPlus className="h-4 w-4 mr-1.5" />
                  Create New Filter
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {savedFilters.map((filter) => (
                  <div 
                    key={filter.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h4 className="font-medium text-blue-700">{filter.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">
                        {filter.createdAt.toLocaleDateString()} • {totalActiveFilters > 0 ? `${totalActiveFilters} filters` : 'No active filters'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600"
                        onClick={() => applySavedFilter(filter)}
                        aria-label={`Apply ${filter.name} filter`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600"
                        onClick={() => deleteSavedFilter(filter.id)}
                        aria-label={`Delete ${filter.name} filter`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Missing ToastAction component
const ToastAction = React.forwardRef<
  HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement> & { altText: string }
>(({ className, children, altText, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", className)}
    {...props}
  >
    <span className="sr-only">{altText}</span>
    {children}
  </button>
));

ToastAction.displayName = "ToastAction";

import { cn } from "@/lib/utils";
export default AdvancedSearchFilters; 