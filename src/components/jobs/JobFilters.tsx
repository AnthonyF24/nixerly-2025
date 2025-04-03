import React, { useState } from 'react';
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
  RefreshCw 
} from 'lucide-react';

const JobFilters = () => {
  const { jobFilters, setJobFilters } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [showFilters, setShowFilters] = useState({
    status: true,
    location: true,
    salary: true,
    jobType: true,
    datePosted: true,
    skills: true
  });
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState<string | undefined>(undefined);
  
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

  const handleJobTypeToggle = (type: string) => {
    setJobType(current => 
      current.includes(type) 
        ? current.filter(t => t !== type) 
        : [...current, type]
    );
  };

  const handleDatePostedChange = (value: string) => {
    setDatePosted(value === 'any' ? undefined : value);
  };
  
  const clearFilters = () => {
    setJobFilters({
      skills: [],
      location: undefined,
      status: null
    });
    setSearchQuery('');
    setSalaryRange([0, 100000]);
    setJobType([]);
    setDatePosted(undefined);
  };
  
  const displayedSkills = showMoreSkills ? skillsList : skillsList.slice(0, 8);
  
  const toggleFilterSection = (section: keyof typeof showFilters) => {
    setShowFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' }
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
  
  // Count active filters
  const totalActiveFilters = 
    (jobFilters.skills.length) + 
    (jobFilters.location ? 1 : 0) + 
    (jobFilters.status ? 1 : 0) +
    (jobType.length) +
    (datePosted && datePosted !== 'any' ? 1 : 0) +
    (salaryRange[0] > 0 || salaryRange[1] < 100000 ? 1 : 0);
  
  return (
    <Card className="border-gray-200 shadow-sm sticky top-4 overflow-hidden p-0">
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="p-4 pb-3 border-b flex items-center justify-between">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <Filter className="h-5 w-5 mr-2" />
            Filter Jobs
          </CardTitle>
          {totalActiveFilters > 0 && (
            <Badge className="bg-blue-600">{totalActiveFilters}</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="space-y-5 pt-5">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job title, skills..."
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
                defaultValue={salaryRange}
                max={100000}
                step={5000}
                onValueChange={setSalaryRange}
                className="mt-2"
              />
              <div className="flex items-center mt-3 text-sm">
                <Switch
                  checked={salaryRange[0] > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSalaryRange([30000, salaryRange[1]]);
                    } else {
                      setSalaryRange([0, salaryRange[1]]);
                    }
                  }}
                  className="mr-2"
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
      
      <CardFooter className="border-t bg-blue-50/30 px-6 py-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 flex items-center justify-center"
          onClick={clearFilters}
          disabled={totalActiveFilters === 0}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobFilters; 