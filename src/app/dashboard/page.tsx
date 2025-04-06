"use client";

import React, { useEffect, Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import ProfessionalDashboard from "@/components/professional/ProfessionalDashboard";
import { BusinessDashboard } from "@/components/business/BusinessDashboard";
import { useAppStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/lib/mock-data-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";
import useAccountType from "@/lib/hooks/useAccountType";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <Suspense fallback={
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
    }>
      <DashboardContent />
    </Suspense>
  );
};

const DashboardContent = () => {
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
  const { user: clerkUser, isLoaded: isClerkUserLoaded } = useUser();
  const { accountType, isLoading: isAccountTypeLoading } = useAccountType();
  
  // For demo purposes, set user type based on Clerk metadata, URL params or mock data
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    // If no user type is set, check in this order:
    // 1. Clerk metadata accountType
    // 2. URL parameter
    // 3. Mock user's role
    if (userType === null) {
      if (loading || !user || isAccountTypeLoading) return;
      
      // Priority 1: Clerk metadata
      if (accountType) {
        setUserType(accountType);
      } 
      // Priority 2: URL parameter
      else if (userTypeParam && (userTypeParam === "professional" || userTypeParam === "business")) {
        setUserType(userTypeParam);
      } 
      // Priority 3: Mock user data
      else if (user.role) {
        setUserType(user.role as "professional" | "business");
      }
      
      // Set user data for the appropriate type
      if (userType === "professional" || accountType === "professional" || 
          userTypeParam === "professional" || user.role === "professional") {
        setProfessional(dummyProfessionals[0]);
      } else {
        setBusiness(dummyBusinesses[0]);
      }
    }
  }, [
    loading, 
    user, 
    userTypeParam, 
    setUserType, 
    setIsAuthenticated, 
    userType, 
    setProfessional, 
    setBusiness, 
    accountType, 
    isAccountTypeLoading
  ]);

  if (loading || !user || isAccountTypeLoading) {
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

  // If account type exists in Clerk metadata, use that, otherwise use app store's userType
  const effectiveUserType = accountType || userType;

  return (
    <DashboardLayout>
      {effectiveUserType === "professional" ? <ProfessionalDashboard /> : <BusinessDashboard />}
    </DashboardLayout>
  );
};

export default DashboardPage; 