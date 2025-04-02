"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import { dummyProfessionals } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const JobBoardPage = () => {
  const { setProfessional, setUserType, setIsAuthenticated, isAuthenticated, userType } = useAppStore();
  const router = useRouter();
  
  // For demo purposes, always set as authenticated professional user
  useEffect(() => {
    // Set authenticated state and professional user type
    setIsAuthenticated(true);
    setProfessional(dummyProfessionals[0]);
    setUserType("professional");
    
    // In a real application, we would check if the user is authenticated and a professional
    // If not, redirect to login or unauthorized page
    // This is commented out since we're using dummy data for demo purposes
    /*
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (userType !== 'professional') {
      router.push('/unauthorized');
      return;
    }
    */
  }, [setProfessional, setUserType, setIsAuthenticated, isAuthenticated, userType, router]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6 rounded-lg border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg text-white">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-2">
                Jobs
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Job Board
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse and apply for jobs that match your skills and preferences
              </p>
            </div>
          </div>
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