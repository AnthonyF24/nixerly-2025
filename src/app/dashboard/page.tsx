"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfessionalDashboard } from "@/components/professional/ProfessionalDashboard";
import { BusinessDashboard } from "@/components/business/BusinessDashboard";
import { useAppStore } from "@/lib/store";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { 
    isAuthenticated, 
    userType, 
    setProfessional, 
    setBusiness, 
    setUserType,
    setIsAuthenticated
  } = useAppStore();
  
  // For demo purposes, simulate authentication state and load dummy data
  useEffect(() => {
    // In a real app, this would be handled by an auth provider
    // For this demo, we'll simulate a login with a professional user
    if (!isAuthenticated) {
      // Simulate a professional login
      setProfessional(dummyProfessionals[0]);
      setUserType("professional");
      setIsAuthenticated(true);
      
      // You could alternatively simulate a business login:
      // setBusiness(dummyBusinesses[0]);
      // setUserType("business");
      // setIsAuthenticated(true);
    }
  }, [isAuthenticated, setProfessional, setBusiness, setUserType, setIsAuthenticated]);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      {userType === "professional" ? <ProfessionalDashboard /> : <BusinessDashboard />}
    </DashboardLayout>
  );
};

export default DashboardPage; 