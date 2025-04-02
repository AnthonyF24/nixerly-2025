"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import JobPostForm from "@/components/business/JobPostForm";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { dummyBusinesses } from "@/lib/dummy-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileEdit, Archive, Plus, CheckCircle, Trash2, RefreshCw, X, BriefcaseBusiness } from "lucide-react";
import { IJob } from "@/lib/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ColorTheme, businessThemes } from "@/lib/theme-utils";

const PostJobPage = () => {
  const { setBusiness, setUserType, setIsAuthenticated, business, jobs, updateJob } = useAppStore();
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"open" | "close" | "delete" | "reopen">("close");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<IJob | null>(null);
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(businessThemes[0]);
  
  // For demo purposes, always set as authenticated business user
  useEffect(() => {
    // Set authenticated state and business user type
    setIsAuthenticated(true);
    setBusiness(dummyBusinesses[0]);
    setUserType("business");
  }, [setBusiness, setUserType, setIsAuthenticated]);
  
  const handleSuccess = () => {
    // Stay on the same page, but switch to the "manage" tab
    document.getElementById("manage-tab")?.click();
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setJobToEdit(null);
  };

  // Filter jobs for this business
  const businessJobs = jobs.filter(job => job.businessId === (business?.id || 'b1'));
  const openJobs = businessJobs.filter(job => job.status === "open");
  const draftJobs = businessJobs.filter(job => job.status === "draft");
  const closedJobs = businessJobs.filter(job => job.status === "closed");
  
  const handleAction = () => {
    if (!selectedJob) return;
    
    const updatedJob = { ...selectedJob };
    
    if (actionType === "close") {
      updatedJob.status = "closed";
    } else if (actionType === "open" || actionType === "reopen") {
      updatedJob.status = "open";
    } else if (actionType === "delete") {
      // In a real app, we would make an API call to delete the job
      // For now, we'll just close the job
      updatedJob.status = "closed";
    }
    
    updateJob(updatedJob);
    setActionDialogOpen(false);
    setSelectedJob(null);
  };
  
  const openActionDialog = (job: IJob, type: "open" | "close" | "delete" | "reopen") => {
    setSelectedJob(job);
    setActionType(type);
    setActionDialogOpen(true);
  };

  const handleEdit = (job: IJob) => {
    setJobToEdit(job);
    setEditDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className={cn("rounded-xl border p-6 shadow-sm mb-6", activeTheme.classes.headerGradient)}>
          <div>
            <h1 className={cn("text-2xl md:text-3xl font-bold tracking-tight", activeTheme.classes.textGradient)}>
              Job Management
            </h1>
            <p className="text-gray-500 mt-1">
              Post new jobs and manage your existing listings
            </p>
          </div>
        </div>

        <Tabs defaultValue="post" className="w-full">
          <div className="flex justify-end mb-6">
            <TabsList className={cn("border", activeTheme.classes.primaryBorder)}>
              <TabsTrigger 
                value="post" 
                className={cn("data-[state=active]:", activeTheme.classes.primaryBg, activeTheme.classes.primaryText)}
              >
                Post New Job
              </TabsTrigger>
              <TabsTrigger 
                value="manage" 
                id="manage-tab"
                className={cn("data-[state=active]:", activeTheme.classes.primaryBg, activeTheme.classes.primaryText)}
              >
                Manage Jobs
              </TabsTrigger>
            </TabsList>
          </div>
      
          <TabsContent value="post">
            <JobPostForm onSuccess={handleSuccess} />
          </TabsContent>
          
          <TabsContent value="manage">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className={cn("border shadow-sm", activeTheme.classes.primaryBgLight, activeTheme.classes.primaryBorder)}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-green-100 p-2 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Active</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">{openJobs.length}</h2>
                    <p className="text-gray-500 text-sm">Active Job Listings</p>
                  </CardContent>
                </Card>
                
                <Card className={cn("border shadow-sm", activeTheme.classes.accentBg, activeTheme.classes.accentBorder)}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-yellow-100 p-2 rounded-lg border border-yellow-200">
                        <FileEdit className="h-5 w-5 text-yellow-600" />
                      </div>
                      <Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200">Draft</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">{draftJobs.length}</h2>
                    <p className="text-gray-500 text-sm">Job Drafts</p>
                  </CardContent>
                </Card>
                
                <Card className={cn("border shadow-sm", activeTheme.classes.secondaryBgLight, activeTheme.classes.secondaryBorder)}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-gray-100 p-2 rounded-lg border border-gray-200">
                        <Archive className="h-5 w-5 text-gray-600" />
                      </div>
                      <Badge variant="outline" className="text-gray-600 bg-gray-50 border-gray-200">Closed</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">{closedJobs.length}</h2>
                    <p className="text-gray-500 text-sm">Closed Jobs</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className={cn("border shadow-sm", activeTheme.classes.primaryBorder)}>
                <CardHeader className={cn("pb-4 border-b", activeTheme.classes.primaryBgLight)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BriefcaseBusiness className={cn("h-5 w-5", activeTheme.classes.primaryText)} />
                        Job Listings
                      </CardTitle>
                      <CardDescription>
                        Manage your job postings
                      </CardDescription>
                    </div>
                    <Button 
                      className={cn(activeTheme.classes.primaryButton, activeTheme.classes.primaryButtonHover)} 
                      size="sm" 
                      asChild
                    >
                      <Link href="/dashboard/post-job?tab=post" tabIndex={0} aria-label="Post new job">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                
                <Tabs defaultValue="active" className="w-full">
                  <div className="px-6 border-b">
                    <TabsList className="w-full justify-start bg-transparent p-0 h-12">
                      <TabsTrigger 
                        value="active" 
                        className={cn(
                          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12",
                          "data-[state=active]:", activeTheme.classes.primaryText
                        )}
                      >
                        Active ({openJobs.length})
                      </TabsTrigger>
                      <TabsTrigger 
                        value="drafts" 
                        className={cn(
                          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12",
                          "data-[state=active]:", activeTheme.classes.primaryText
                        )}
                      >
                        Drafts ({draftJobs.length})
                      </TabsTrigger>
                      <TabsTrigger 
                        value="closed" 
                        className={cn(
                          "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12",
                          "data-[state=active]:", activeTheme.classes.primaryText
                        )}
                      >
                        Closed ({closedJobs.length})
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="active" className="p-0 m-0">
                    <JobsList 
                      jobs={openJobs} 
                      onEdit={handleEdit}
                      onClose={(job) => openActionDialog(job, "close")}
                      emptyMessage="You don't have any active jobs."
                      activeTheme={activeTheme}
                    />
                  </TabsContent>
                  
                  <TabsContent value="drafts" className="p-0 m-0">
                    <JobsList 
                      jobs={draftJobs}
                      onEdit={handleEdit}
                      onPublish={(job) => openActionDialog(job, "open")}
                      emptyMessage="You don't have any draft jobs."
                      activeTheme={activeTheme}
                    />
                  </TabsContent>
                  
                  <TabsContent value="closed" className="p-0 m-0">
                    <JobsList 
                      jobs={closedJobs}
                      onEdit={handleEdit}
                      onReopen={(job) => openActionDialog(job, "reopen")}
                      onDelete={(job) => openActionDialog(job, "delete")}
                      emptyMessage="You don't have any closed jobs."
                      activeTheme={activeTheme}
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <ActionDialog 
        open={actionDialogOpen}
        onOpenChange={setActionDialogOpen}
        job={selectedJob}
        actionType={actionType}
        onConfirm={handleAction}
        activeTheme={activeTheme}
      />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Edit Job</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setEditDialogOpen(false)}
              tabIndex={0}
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {jobToEdit && (
            <JobPostForm job={jobToEdit} onSuccess={handleEditSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

interface JobsListProps {
  jobs: IJob[];
  onEdit: (job: IJob) => void;
  onClose?: (job: IJob) => void;
  onPublish?: (job: IJob) => void;
  onReopen?: (job: IJob) => void;
  onDelete?: (job: IJob) => void;
  emptyMessage: string;
  activeTheme: ColorTheme;
}

const JobsList: React.FC<JobsListProps> = ({ 
  jobs, 
  onEdit, 
  onClose, 
  onPublish, 
  onReopen, 
  onDelete,
  emptyMessage,
  activeTheme
}) => {
  if (jobs.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {jobs.map(job => (
        <div key={job.id} className={cn(
          "p-6 transition-colors hover:bg-opacity-50", 
          activeTheme.classes.primaryHover
        )}>
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Left section - Job details */}
            <div className="flex-1 min-w-0">
              {/* Header with title and badges */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                <div className="flex gap-1.5">
                  <Badge 
                    className={cn(
                      "uppercase text-xs font-medium",
                      job.status === "open" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                      job.status === "draft" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                      "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    )}
                  >
                    {job.status}
                  </Badge>
                </div>
              </div>
              
              {/* Location and dates */}
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                {job.location && (
                  <div className="flex items-center mr-3">
                    <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", activeTheme.classes.primaryBg)}></div>
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center mr-3">
                  <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", activeTheme.classes.secondaryBg)}></div>
                  <span>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center">
                    <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5", activeTheme.classes.accentBg)}></div>
                    <span>Closes {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {/* Job description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>
              
              {/* Skills section */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className={cn(
                      "text-xs rounded-md py-0.5 px-2", 
                      activeTheme.classes.primaryBg, 
                      activeTheme.classes.primaryText
                    )}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              {/* Salary if available */}
              {(job.salaryMin || job.salaryMax) && (
                <div className="mt-3 text-sm">
                  <span className={cn("font-medium", activeTheme.classes.primaryText)}>
                    {job.salaryMin && job.salaryMax 
                      ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}` 
                      : job.salaryMin 
                        ? `From $${job.salaryMin.toLocaleString()}` 
                        : `Up to $${job.salaryMax?.toLocaleString()}`
                    }
                    {job.salaryType && ` (${job.salaryType})`}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right section - Actions */}
            <div className="flex-shrink-0 flex flex-row sm:flex-col gap-2 self-start sm:self-start mt-3 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(job)} 
                tabIndex={0} 
                aria-label="Edit job"
                className={cn(
                  "min-w-[100px] justify-center sm:justify-start",
                  activeTheme.classes.primaryBorder, 
                  activeTheme.classes.primaryText
                )}
              >
                <FileEdit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              
              {onClose && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onClose(job)} 
                  tabIndex={0} 
                  aria-label="Close job"
                  className="min-w-[100px] justify-center sm:justify-start"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Close
                </Button>
              )}
              
              {onPublish && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onPublish(job)} 
                  tabIndex={0} 
                  aria-label="Publish job"
                  className="text-green-600 border-green-200 hover:bg-green-50 min-w-[100px] justify-center sm:justify-start"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              )}
              
              {onReopen && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onReopen(job)} 
                  tabIndex={0} 
                  aria-label="Reopen job"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 min-w-[100px] justify-center sm:justify-start"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reopen
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onDelete(job)} 
                  tabIndex={0} 
                  aria-label="Delete job"
                  className="text-red-600 border-red-200 hover:bg-red-50 min-w-[100px] justify-center sm:justify-start"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: IJob | null;
  actionType: "open" | "close" | "delete" | "reopen";
  onConfirm: () => void;
  activeTheme: ColorTheme;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  open,
  onOpenChange,
  job,
  actionType,
  onConfirm,
  activeTheme
}) => {
  if (!job) return null;
  
  const getTitle = () => {
    switch (actionType) {
      case "open":
        return "Publish Job";
      case "close":
        return "Close Job";
      case "delete":
        return "Delete Job";
      case "reopen":
        return "Reopen Job";
    }
  };
  
  const getMessage = () => {
    switch (actionType) {
      case "open":
        return `Are you sure you want to publish "${job.title}"? This will make it visible to professionals.`;
      case "close":
        return `Are you sure you want to close "${job.title}"? This will hide it from search results.`;
      case "delete":
        return `Are you sure you want to delete "${job.title}"? This action cannot be undone.`;
      case "reopen":
        return `Are you sure you want to reopen "${job.title}"? This will make it visible to professionals again.`;
    }
  };
  
  const getActionText = () => {
    switch (actionType) {
      case "open":
        return "Publish";
      case "close":
        return "Close";
      case "delete":
        return "Delete";
      case "reopen":
        return "Reopen";
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getMessage()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={actionType === "delete" ? "destructive" : "default"}
            onClick={onConfirm}
            className={actionType !== "delete" ? cn(activeTheme.classes.primaryButton, activeTheme.classes.primaryButtonHover) : ""}
          >
            {getActionText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostJobPage; 