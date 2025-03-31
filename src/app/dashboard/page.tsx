"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfessionalDashboard } from "@/components/professional/ProfessionalDashboard";
import { BusinessDashboard } from "@/components/business/BusinessDashboard";
import { useAppStore } from "@/lib/store";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";
import { useSearchParams } from "next/navigation";

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
  
  // For demo purposes, simulate authentication state and load dummy data
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    // Use URL parameter if provided, otherwise keep existing userType or default to business
    const typeToUse = userTypeParam || userType || 'business';
    
    if (typeToUse === 'professional') {
      setProfessional(dummyProfessionals[0]);
      setUserType("professional");
    } else {
      setBusiness(dummyBusinesses[0]);
      setUserType("business");
    }
  }, [userTypeParam, userType, setProfessional, setBusiness, setUserType, setIsAuthenticated]);

  return (
    <DashboardLayout>
      {userType === "professional" ? <ProfessionalDashboard /> : <BusinessDashboard />}
    </DashboardLayout>
  );
};

export default DashboardPage; 