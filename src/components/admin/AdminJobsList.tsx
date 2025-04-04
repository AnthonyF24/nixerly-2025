"use client";

import React, { useState } from "react";
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

// Add additional properties to jobs for admin view
const enhancedJobs = jobs.map(job => ({
  ...job,
  createdBy: job.businessId,
  featured: Math.random() > 0.8,
  verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.5 ? "pending" : "rejected",
}));

const AdminJobsList = () => {
  const [jobsData, setJobsData] = useState(enhancedJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

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

  // Filter jobs based on search query and status filter
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ? true : job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="w-full sm:w-auto flex-1 sm:max-w-sm">
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <Button size="sm" variant="outline" className="hidden sm:flex whitespace-nowrap">
            Export Data
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} className={job.featured ? "bg-amber-50/30" : ""}>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsList; 