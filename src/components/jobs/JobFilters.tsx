import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from '@/lib/store';
import { skillsList, locationsList } from '@/lib/dummy-data';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const JobFilters = () => {
  const { jobFilters, setJobFilters } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  
  const handleSkillToggle = (skill: string) => {
    const updatedSkills = jobFilters.skills.includes(skill)
      ? jobFilters.skills.filter(s => s !== skill)
      : [...jobFilters.skills, skill];
    
    setJobFilters({ skills: updatedSkills });
  };
  
  const handleLocationChange = (location: string) => {
    setJobFilters({ location });
  };
  
  const handleStatusChange = (status: 'open' | 'closed' | 'draft' | null) => {
    setJobFilters({ status });
  };
  
  const clearFilters = () => {
    setJobFilters({
      skills: [],
      location: undefined,
      status: null
    });
    setSearchQuery('');
  };
  
  const displayedSkills = showMoreSkills ? skillsList : skillsList.slice(0, 10);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Jobs
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Job Status</h3>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={jobFilters.status === 'open' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusChange(jobFilters.status === 'open' ? null : 'open')}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'open' ? null : 'open')}
            >
              Open
            </Badge>
            <Badge 
              variant={jobFilters.status === 'closed' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusChange(jobFilters.status === 'closed' ? null : 'closed')}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'closed' ? null : 'closed')}
            >
              Closed
            </Badge>
            <Badge 
              variant={jobFilters.status === 'draft' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleStatusChange(jobFilters.status === 'draft' ? null : 'draft')}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleStatusChange(jobFilters.status === 'draft' ? null : 'draft')}
            >
              Draft
            </Badge>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Location</h3>
          <Select
            value={jobFilters.location}
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
          <div className="flex flex-wrap gap-1 mb-1">
            {jobFilters.skills.map(skill => (
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
          
          <div className="space-y-2">
            {displayedSkills.map(skill => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={jobFilters.skills.includes(skill)}
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
          disabled={jobFilters.skills.length === 0 && !jobFilters.location && !jobFilters.status}
        >
          Clear Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobFilters; 