"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import JobPostForm from "@/components/business/JobPostForm";
import { useAppStore } from "@/lib/store";
import { redirect, useRouter } from "next/navigation";

const PostJobPage = () => {
  const { isAuthenticated, userType, business } = useAppStore();
  const router = useRouter();
  
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