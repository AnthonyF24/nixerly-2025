"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import JobPostForm from "@/components/business/JobPostForm";
import { JobPostWizard } from "@/components/business/JobPostWizard";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { dummyBusinesses } from "@/lib/dummy-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileEdit, Archive, Plus, CheckCircle, Trash2, RefreshCw, X, BriefcaseBusiness, Sparkles, Euro, Clock, MapPin } from "lucide-react";
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
    
    // Initialize jobs from dummyJobs
    import("@/lib/dummy-data").then(({ dummyJobs }) => {
      // Update the Zustand store directly by replacing the jobs array
      useAppStore.setState({ jobs: dummyJobs });
    });
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
      <div className="space-y-8">
        <div className={cn(
          "rounded-2xl border p-8 shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden", 
          activeTheme.classes.headerGradient
        )}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <BriefcaseBusiness className={cn("h-7 w-7", activeTheme.classes.primaryText)} />
              <h1 className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight", 
                activeTheme.classes.textGradient
              )}>
                Job Management
              </h1>
            </div>
            <p className="text-gray-600 text-lg mt-2 max-w-3xl">
              Create engaging job listings and manage your opportunities in one place
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/2 right-12 transform -translate-y-1/2 opacity-5">
            <Sparkles className="h-32 w-32 text-current" />
          </div>
        </div>

        <Tabs defaultValue="post" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className={cn("text-xl font-semibold", activeTheme.classes.primaryText)}>
              What would you like to do?
            </h2>
            <TabsList className="flex items-center justify-center p-1 bg-gray-100 rounded-full space-x-1 w-auto">
              <TabsTrigger 
                value="post" 
                className="px-4 py-2 rounded-full text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
              >
                Post New Job
              </TabsTrigger>
              <TabsTrigger 
                value="manage" 
                id="manage-tab"
                className="px-4 py-2 rounded-full text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
              >
                Manage Jobs
              </TabsTrigger>
            </TabsList>
          </div>
      
          <TabsContent value="post" className="mt-6 focus:outline-none">
            <div className="transition-all duration-300 ease-in-out transform">
              <JobPostWizard onSuccess={handleSuccess} />
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-8 focus:outline-none">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className={cn(
                "border shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                activeTheme.classes.primaryBgLight, activeTheme.classes.primaryBorder
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-70"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-lg border border-green-200 shadow-sm">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 font-medium">
                      Active
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-1">{openJobs.length}</h2>
                  <p className="text-gray-500">Active Job Listings</p>
                </CardContent>
              </Card>
              
              <Card className={cn(
                "border shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                activeTheme.classes.accentBg, activeTheme.classes.accentBorder
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-70"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200 shadow-sm">
                      <FileEdit className="h-6 w-6 text-yellow-600" />
                    </div>
                    <Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200 font-medium">
                      Draft
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-1">{draftJobs.length}</h2>
                  <p className="text-gray-500">Job Drafts</p>
                </CardContent>
              </Card>
              
              <Card className={cn(
                "border shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                activeTheme.classes.secondaryBgLight, activeTheme.classes.secondaryBorder
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-70"></div>
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 shadow-sm">
                      <Archive className="h-6 w-6 text-gray-600" />
                    </div>
                    <Badge variant="outline" className="text-gray-600 bg-gray-50 border-gray-200 font-medium">
                      Closed
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-1">{closedJobs.length}</h2>
                  <p className="text-gray-500">Closed Jobs</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className={cn(
              "border shadow-md transition-all duration-300", 
              activeTheme.classes.primaryBorder
            )}>
              <CardHeader className={cn(
                "pb-4 border-b", 
                activeTheme.classes.primaryBgLight
              )}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BriefcaseBusiness className={cn("h-5 w-5", activeTheme.classes.primaryText)} />
                      Job Listings
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Manage your job postings
                    </CardDescription>
                  </div>
                  <Button 
                    className={cn(
                      "transition-all duration-200",
                      activeTheme.classes.primaryButton, 
                      activeTheme.classes.primaryButtonHover
                    )}
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
                        "rounded-none border-b-2 border-transparent transition-all duration-200",
                        "data-[state=active]:border-b-2 data-[state=active]:bg-transparent h-12",
                        "data-[state=active]:", activeTheme.classes.primaryText
                      )}
                    >
                      Active ({openJobs.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="drafts" 
                      className={cn(
                        "rounded-none border-b-2 border-transparent transition-all duration-200",
                        "data-[state=active]:border-b-2 data-[state=active]:bg-transparent h-12",
                        "data-[state=active]:", activeTheme.classes.primaryText
                      )}
                    >
                      Drafts ({draftJobs.length})
                    </TabsTrigger>
                    <TabsTrigger 
                      value="closed" 
                      className={cn(
                        "rounded-none border-b-2 border-transparent transition-all duration-200",
                        "data-[state=active]:border-b-2 data-[state=active]:bg-transparent h-12",
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
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit Job Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Update the details of your job posting
            </DialogDescription>
          </DialogHeader>
          
          {jobToEdit && (
            <div className="max-h-[70vh] overflow-y-auto py-4">
              <JobPostForm job={jobToEdit} onSuccess={handleEditSuccess} />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Action Confirmation Dialog */}
      <ActionDialog
        open={actionDialogOpen}
        onOpenChange={setActionDialogOpen}
        job={selectedJob}
        actionType={actionType}
        onConfirm={handleAction}
        activeTheme={activeTheme}
      />
    </DashboardLayout>
  );
};

export default PostJobPage;

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
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-gray-50 rounded-full p-4 mb-4">
          <BriefcaseBusiness className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 mb-6">{emptyMessage}</p>
        <Button 
          className={cn(activeTheme.classes.primaryButton, activeTheme.classes.primaryButtonHover)} 
          asChild
        >
          <Link href="/dashboard/post-job?tab=post" tabIndex={0} aria-label="Post new job">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {jobs.map((job) => (
        <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 3 && (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-100">
                    +{job.skills.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                )}
                
                {(job.salaryMin || job.salaryMax) && (
                  <div className="flex items-center gap-1">
                    <Euro className="h-3.5 w-3.5" />
                    <span>
                      {job.salaryMin && job.salaryMax
                        ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
                        : job.salaryMin
                        ? `From ${job.salaryMin.toLocaleString()}`
                        : `Up to ${job.salaryMax?.toLocaleString()}`}
                      {job.salaryType === "hourly"
                        ? "/hr"
                        : job.salaryType === "daily"
                        ? "/day"
                        : "/year"}
                    </span>
                  </div>
                )}
                
                {job.datePosted && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 self-end md:self-start mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                onClick={() => onEdit(job)}
              >
                <FileEdit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              
              {onClose && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 hover:text-amber-600 hover:border-amber-200 transition-colors"
                  onClick={() => onClose(job)}
                >
                  <Archive className="h-3.5 w-3.5 mr-1" />
                  Close
                </Button>
              )}
              
              {onPublish && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 hover:text-green-600 hover:border-green-200 transition-colors"
                  onClick={() => onPublish(job)}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Publish
                </Button>
              )}
              
              {onReopen && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                  onClick={() => onReopen(job)}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Reopen
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 hover:text-red-600 hover:border-red-200 transition-colors"
                  onClick={() => onDelete(job)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>
          
          {job.description && (
            <div className="mt-4 text-gray-600 text-sm line-clamp-2">
              {job.description}
            </div>
          )}
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
      default:
        return "Confirm Action";
    }
  };
  
  const getMessage = () => {
    switch (actionType) {
      case "open":
        return "Are you sure you want to publish this job? It will be visible to all professionals.";
      case "close":
        return "Are you sure you want to close this job? It will no longer be visible to professionals.";
      case "delete":
        return "Are you sure you want to delete this job? This action cannot be undone.";
      case "reopen":
        return "Are you sure you want to reopen this job? It will be visible to professionals again.";
      default:
        return "Are you sure you want to perform this action?";
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
      default:
        return "Confirm";
    }
  };
  
  const getActionIcon = () => {
    switch (actionType) {
      case "open":
        return <CheckCircle className="h-4 w-4 mr-2" />;
      case "close":
        return <Archive className="h-4 w-4 mr-2" />;
      case "delete":
        return <Trash2 className="h-4 w-4 mr-2" />;
      case "reopen":
        return <RefreshCw className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };
  
  const getButtonClass = () => {
    switch (actionType) {
      case "open":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "close":
        return "bg-amber-600 hover:bg-amber-700 text-white";
      case "delete":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "reopen":
        return "bg-emerald-600 hover:bg-emerald-700 text-white";
      default:
        return cn(activeTheme.classes.primaryButton, activeTheme.classes.primaryButtonHover);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {getMessage()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-50 p-4 rounded-lg border my-2">
          <h3 className="font-medium text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{job.businessName}</p>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className={cn("w-full sm:w-auto", getButtonClass())}
          >
            {getActionIcon()}
            {getActionText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 