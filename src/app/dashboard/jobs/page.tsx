"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import { redirect } from "next/navigation";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";

const JobBoardPage = () => {
  const { isAuthenticated, userType } = useAppStore();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }
  
  // If business user, redirect to job management page
  if (userType === "business") {
    return redirect("/dashboard/manage-jobs");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
          <p className="text-muted-foreground">
            Browse and apply for jobs that match your skills and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <JobFilters />
          </div>
          
          <div className="md:col-span-3">
            <JobList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobBoardPage; 