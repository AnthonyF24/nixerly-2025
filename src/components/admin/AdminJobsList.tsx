"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { jobs } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Check, 
  Eye, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  X 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type JobStatus = 'open' | 'closed' | 'draft';

// Add additional properties to jobs for admin view
const enhancedJobs = jobs.map(job => ({
  ...job,
  createdBy: job.businessId,
  featured: Math.random() > 0.8,
  verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.5 ? "pending" : "rejected",
}));

type AdminJobsListProps = {
  tabFilter?: 'all' | 'open' | 'closed' | 'featured';
  statusFilter?: string;
  typeFilter?: string;
  verificationFilter?: string;
  searchQuery?: string;
  selectedJobs?: string[];
  setSelectedJobs?: (jobs: string[]) => void;
  showSearch?: boolean;
  showExport?: boolean;
};

const AdminJobsList = ({
  tabFilter = 'all',
  statusFilter = 'all',
  typeFilter = 'all',
  verificationFilter = 'all',
  searchQuery = '',
  selectedJobs = [],
  setSelectedJobs = () => {},
  showSearch = true,
  showExport = true,
}: AdminJobsListProps) => {
  const [jobsData, setJobsData] = useState(enhancedJobs);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localStatusFilter, setLocalStatusFilter] = useState(statusFilter);
  const { toast } = useToast();

  // Update local state when props change
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
    setLocalStatusFilter(statusFilter);
  }, [searchQuery, statusFilter]);

  const handleDeleteJob = (jobId: string) => {
    setJobsData(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job deleted",
      description: "The job has been removed from the platform.",
    });
  };

  const handleToggleStatus = (jobId: string, newStatus: JobStatus) => {
    setJobsData(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );

    toast({
      title: "Job status updated",
      description: `The job is now ${newStatus}.`,
    });
  };

  const handleToggleVerification = (jobId: string, status: string) => {
    setJobsData(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, verificationStatus: status } : job
      )
    );

    toast({
      title: "Job verification updated",
      description: `The job is now ${status}.`,
    });
  };

  const handleToggleFeatured = (jobId: string) => {
    setJobsData(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, featured: !job.featured } : job
      )
    );

    const isNowFeatured = jobsData.find(job => job.id === jobId)?.featured;
    
    toast({
      title: `Job ${isNowFeatured ? "unfeatured" : "featured"}`,
      description: `The job has been ${isNowFeatured ? "removed from" : "added to"} featured listings.`,
    });
  };

  const handleSelectJob = (jobId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedJobs(filteredJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  // Apply all filters
  let filteredJobs = jobsData;

  // Tab filter
  if (tabFilter === 'open') {
    filteredJobs = filteredJobs.filter(job => job.status === 'open');
  } else if (tabFilter === 'closed') {
    filteredJobs = filteredJobs.filter(job => job.status !== 'open');
  } else if (tabFilter === 'featured') {
    filteredJobs = filteredJobs.filter(job => job.featured);
  }

  // Status filter (if not already filtered by tab)
  if (tabFilter === 'all' && localStatusFilter !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.status === localStatusFilter);
  }

  // Type filter
  if (typeFilter !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.type === typeFilter);
  }

  // Verification filter
  if (verificationFilter !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.verificationStatus === verificationFilter);
  }

  // Search filter
  const searchTerm = localSearchQuery || searchQuery;
  if (searchTerm) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="w-full sm:w-auto flex-1 sm:max-w-sm">
            <Input
              placeholder="Search jobs..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={localStatusFilter} onValueChange={setLocalStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="open">Open Jobs</SelectItem>
                <SelectItem value="closed">Closed Jobs</SelectItem>
                <SelectItem value="draft">Draft Jobs</SelectItem>
              </SelectContent>
            </Select>
            {showExport && (
              <Button size="sm" variant="outline" className="hidden sm:flex whitespace-nowrap">
                Export Data
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px]">
                <Checkbox 
                  checked={filteredJobs.length > 0 && selectedJobs.length === filteredJobs.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all jobs"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No jobs match the current filters
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job.id} className={job.featured ? "bg-amber-50/30" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedJobs.includes(job.id)}
                      onCheckedChange={(checked) => handleSelectJob(job.id, !!checked)}
                      aria-label={`Select ${job.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {job.title}
                        {job.featured && (
                          <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                        {job.description.substring(0, 100)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        job.status === "open" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : job.status === "closed"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {job.status === "open" ? "Open" : job.status === "closed" ? "Closed" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        job.verificationStatus === "verified" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : job.verificationStatus === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {job.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {job.applicants || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem onSelect={() => {}}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => {}}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Job
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Status toggle */}
                        {job.status === "open" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(job.id, "closed")}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Close Job
                          </DropdownMenuItem>
                        ) : job.status === "closed" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(job.id, "open")}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Reopen Job
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(job.id, "open")}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Publish Job
                          </DropdownMenuItem>
                        )}
                        
                        {/* Verification toggle */}
                        {job.verificationStatus !== "verified" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(job.id, "verified")}
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Verify Job
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(job.id, "pending")}
                            className="text-amber-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Un-verify Job
                          </DropdownMenuItem>
                        )}
                        
                        {/* Featured toggle */}
                        <DropdownMenuItem onSelect={() => handleToggleFeatured(job.id)}>
                          {job.featured ? "Unfeature Job" : "Feature Job"}
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem 
                          onSelect={() => handleDeleteJob(job.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsList; 