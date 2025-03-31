"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import JobPostForm from "@/components/business/JobPostForm";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { dummyBusinesses } from "@/lib/dummy-data";

const PostJobPage = () => {
  const { setBusiness, setUserType, setIsAuthenticated } = useAppStore();
  const router = useRouter();
  
  // For demo purposes, always set as authenticated business user
  useEffect(() => {
    // Set authenticated state and business user type
    setIsAuthenticated(true);
    setBusiness(dummyBusinesses[0]);
    setUserType("business");
  }, [setBusiness, setUserType, setIsAuthenticated]);
  
  const handleSuccess = () => {
    router.push("/dashboard/manage-jobs");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-muted-foreground">
            Create a new job posting to find qualified professionals
          </p>
        </div>
        
        <JobPostForm onSuccess={handleSuccess} />
      </div>
    </DashboardLayout>
  );
};

export default PostJobPage; 