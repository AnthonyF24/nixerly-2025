"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfessionalDashboard } from "@/components/professional/ProfessionalDashboard";
import { BusinessDashboard } from "@/components/business/BusinessDashboard";
import { useAppStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/lib/mock-data-hooks";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const { 
    userType, 
    setProfessional, 
    setBusiness, 
    setUserType,
    setIsAuthenticated
  } = useAppStore();
  
  const searchParams = useSearchParams();
  const userTypeParam = searchParams.get('type');
  const { user, loading } = useCurrentUser();
  
  // For demo purposes, set user type based on mock data or URL params
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    if (loading || !user) return;
    
    // Use URL parameter if provided, otherwise use mock user's role
    const typeToUse = userTypeParam || user.role;
    
    if (typeToUse === 'professional') {
      setUserType("professional");
    } else {
      setUserType("business");
    }
  }, [loading, user, userTypeParam, setUserType, setIsAuthenticated]);

  if (loading || !user) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {userType === "professional" ? <ProfessionalDashboard /> : <BusinessDashboard />}
    </DashboardLayout>
  );
};

export default DashboardPage; 