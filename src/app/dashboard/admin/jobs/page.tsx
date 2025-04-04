"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  ArrowDownUp, 
  Briefcase,
  CalendarCheck,
  CalendarX,
  Download,
  FilePlus,
  Filter, 
  RefreshCw, 
  Search, 
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { jobs } from "@/data/mock";
import AdminJobsList from "@/components/admin/AdminJobsList";

// Enhanced jobs with additional admin properties
const enhancedJobs = jobs.map(job => ({
  ...job,
  createdBy: job.businessId,
  featured: Math.random() > 0.8,
  verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.5 ? "pending" : "rejected",
  totalApplications: Math.floor(Math.random() * 20),
  lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString(),
  quality: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
}));

const JobsAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'all' | 'open' | 'closed' | 'featured'>('all');
  const { toast } = useToast();

  // Mock function for bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedJobs.length === 0) {
      toast({
        title: "No jobs selected",
        description: "Please select jobs to perform bulk actions.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bulk action completed",
        description: `Successfully ${action} ${selectedJobs.length} jobs.`,
      });
      setSelectedJobs([]);
    }, 1000);
  };

  // Mock function for adding a new job
  const handleAddJob = () => {
    toast({
      title: "Feature not implemented",
      description: "Adding a new job is not implemented in this demo.",
    });
  };

  // Mock function for refreshing data
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Job data has been updated.",
      });
    }, 800);
  };

  const openJobs = enhancedJobs.filter(job => job.status === 'open');
  const closedJobs = enhancedJobs.filter(job => job.status !== 'open');
  const featuredJobs = enhancedJobs.filter(job => job.featured);
  const verifiedJobs = enhancedJobs.filter(job => job.verificationStatus === 'verified');
  const pendingVerificationJobs = enhancedJobs.filter(job => job.verificationStatus === 'pending');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-1 md:p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Job Management</h1>
          <p className="text-muted-foreground">
            Manage job listings, approvals, and promotion status.
          </p>
        </div>

        {/* Job Management Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-blue-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Briefcase className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <h3 className="text-2xl font-bold">{enhancedJobs.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CalendarCheck className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <h3 className="text-2xl font-bold">{openJobs.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <Star className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Featured Jobs</p>
                <h3 className="text-2xl font-bold">{featuredJobs.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <CalendarX className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
                <h3 className="text-2xl font-bold">{pendingVerificationJobs.length}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Management Interface */}
        <Card className="border border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Job Management</CardTitle>
                <CardDescription>
                  Manage all job listings across the platform
                </CardDescription>
              </div>
              <div className="flex flex-row gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="hidden sm:flex"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hidden sm:flex"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAddJob}
                >
                  <FilePlus className="h-4 w-4 mr-2" />
                  Add Job
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={(value) => setCurrentTab(value as 'all' | 'open' | 'closed' | 'featured')}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="open">Active</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
              
              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px] pl-9"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="project_based">Project Based</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={verificationFilter}
                    onValueChange={setVerificationFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Verification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Verification</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedJobs.length > 0 && (
                  <div className="flex items-center ml-auto gap-2">
                    <Badge variant="secondary" className="bg-muted">
                      {selectedJobs.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleBulkAction("activated")}>
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("closed")}>
                          Close Jobs
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("featured")}>
                          Feature Jobs
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("verified")}>
                          Verify Jobs
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onSelect={() => handleBulkAction("deleted")}
                          className="text-red-600"
                        >
                          Delete Jobs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              
              {/* Main Job List Content - Using a single AdminJobsList with different props instead of duplicating */}
              <TabsContent value="all" className="m-0">
                <AdminJobsList 
                  tabFilter="all"
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  selectedJobs={selectedJobs}
                  setSelectedJobs={setSelectedJobs}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="open" className="m-0">
                <AdminJobsList 
                  tabFilter="open"
                  typeFilter={typeFilter}
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  selectedJobs={selectedJobs}
                  setSelectedJobs={setSelectedJobs}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="closed" className="m-0">
                <AdminJobsList 
                  tabFilter="closed"
                  typeFilter={typeFilter}
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  selectedJobs={selectedJobs}
                  setSelectedJobs={setSelectedJobs}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="featured" className="m-0">
                <AdminJobsList 
                  tabFilter="featured"
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  selectedJobs={selectedJobs}
                  setSelectedJobs={setSelectedJobs}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Job Approval & Verification Settings */}
        <Card className="border border-blue-100">
          <CardHeader>
            <CardTitle>Job Approval & Verification Settings</CardTitle>
            <CardDescription>
              Configure job approval workflow and verification requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Approval Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-approve business jobs</h4>
                    <p className="text-sm text-muted-foreground">Automatically approve jobs from verified businesses</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Require admin approval</h4>
                    <p className="text-sm text-muted-foreground">All jobs require admin approval before going live</p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Expired job auto-close</h4>
                    <p className="text-sm text-muted-foreground">Automatically close jobs after deadline</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quality Requirements</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="require-description" checked />
                  <label htmlFor="require-description" className="font-medium text-sm">
                    Require detailed description (min. 100 words)
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="require-skills" checked />
                  <label htmlFor="require-skills" className="font-medium text-sm">
                    Require at least 3 skills
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="require-salary" />
                  <label htmlFor="require-salary" className="font-medium text-sm">
                    Require salary/budget information
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="screen-keywords" checked />
                  <label htmlFor="screen-keywords" className="font-medium text-sm">
                    Screen for prohibited keywords
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JobsAdminPage; 