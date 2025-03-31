"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import { dummyProfessionals } from "@/lib/dummy-data";

const JobBoardPage = () => {
  const { setProfessional, setUserType, setIsAuthenticated } = useAppStore();
  
  // For demo purposes, always set as authenticated professional user
  useEffect(() => {
    // Set authenticated state and professional user type
    setIsAuthenticated(true);
    setProfessional(dummyProfessionals[0]);
    setUserType("professional");
  }, [setProfessional, setUserType, setIsAuthenticated]);

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