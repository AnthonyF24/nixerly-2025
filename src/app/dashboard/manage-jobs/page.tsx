"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit, Archive, Plus, CheckCircle, Trash2, RefreshCw } from "lucide-react";
import { IJob } from "@/lib/store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

const ManageJobsPage = () => {
  const { isAuthenticated, userType, business, jobs, updateJob } = useAppStore();
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"open" | "close" | "delete" | "reopen">("close");
  
  // Redirect if not authenticated or not a business
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }
  
  if (userType !== "business") {
    return redirect("/dashboard");
  }
  
  if (!business) {
    return redirect("/dashboard/profile");
  }
  
  // Filter jobs for this business
  const businessJobs = jobs.filter(job => job.businessId === business.id);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
            <p className="text-muted-foreground">
              View and manage your job postings
            </p>
          </div>
          
          <Button asChild>
            <Link href="/dashboard/post-job" tabIndex={0}>
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{openJobs.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Draft Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{draftJobs.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Closed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{closedJobs.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Listings</CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="active" className="w-full">
            <div className="px-6 border-b">
              <TabsList className="w-full justify-start bg-transparent p-0 h-12">
                <TabsTrigger 
                  value="active" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12"
                >
                  Active ({openJobs.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="drafts" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12"
                >
                  Drafts ({draftJobs.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="closed" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-12"
                >
                  Closed ({closedJobs.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="active" className="p-0 m-0">
              <JobsList 
                jobs={openJobs} 
                onEdit={(job) => {}} 
                onClose={(job) => openActionDialog(job, "close")}
                emptyMessage="You don't have any active jobs."
              />
            </TabsContent>
            
            <TabsContent value="drafts" className="p-0 m-0">
              <JobsList 
                jobs={draftJobs}
                onEdit={(job) => {}}
                onPublish={(job) => openActionDialog(job, "open")}
                emptyMessage="You don't have any draft jobs."
              />
            </TabsContent>
            
            <TabsContent value="closed" className="p-0 m-0">
              <JobsList 
                jobs={closedJobs}
                onEdit={(job) => {}}
                onReopen={(job) => openActionDialog(job, "reopen")}
                onDelete={(job) => openActionDialog(job, "delete")}
                emptyMessage="You don't have any closed jobs."
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <ActionDialog 
        open={actionDialogOpen}
        onOpenChange={setActionDialogOpen}
        job={selectedJob}
        actionType={actionType}
        onConfirm={handleAction}
      />
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
}

const JobsList: React.FC<JobsListProps> = ({ 
  jobs, 
  onEdit, 
  onClose, 
  onPublish, 
  onReopen, 
  onDelete,
  emptyMessage 
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
        <div key={job.id} className="p-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {job.location && (
                <Badge variant="outline" className="text-xs">
                  {job.location}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                Posted on {new Date(job.datePosted).toLocaleDateString()}
              </span>
              {job.deadline && (
                <span className="text-xs text-muted-foreground">
                  • Closes on {new Date(job.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
            
            <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {job.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex flex-row sm:flex-col gap-2 self-end sm:self-center">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/manage-jobs/${job.id}/edit`} tabIndex={0}>
                <FileEdit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
            
            {onClose && (
              <Button variant="outline" size="sm" onClick={() => onClose(job)}>
                <Archive className="h-4 w-4 mr-2" />
                Close
              </Button>
            )}
            
            {onPublish && (
              <Button variant="outline" size="sm" onClick={() => onPublish(job)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
            
            {onReopen && (
              <Button variant="outline" size="sm" onClick={() => onReopen(job)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reopen
              </Button>
            )}
            
            {onDelete && (
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => onDelete(job)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
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
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  open,
  onOpenChange,
  job,
  actionType,
  onConfirm
}) => {
  if (!job) return null;
  
  const titles = {
    open: "Publish Job",
    close: "Close Job",
    delete: "Delete Job",
    reopen: "Reopen Job"
  };
  
  const descriptions = {
    open: "Are you sure you want to publish this job? It will be visible to professionals immediately.",
    close: "Are you sure you want to close this job? Professionals will no longer be able to apply.",
    delete: "Are you sure you want to delete this job? This action cannot be undone.",
    reopen: "Are you sure you want to reopen this job? It will be visible to professionals again."
  };
  
  const buttonTexts = {
    open: "Publish",
    close: "Close Job",
    delete: "Delete Job",
    reopen: "Reopen Job"
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titles[actionType]}</DialogTitle>
          <DialogDescription>
            {descriptions[actionType]}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium">{job.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {job.location || "No location specified"}
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={actionType === "delete" ? "destructive" : "default"}
            onClick={onConfirm}
          >
            {buttonTexts[actionType]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageJobsPage; 