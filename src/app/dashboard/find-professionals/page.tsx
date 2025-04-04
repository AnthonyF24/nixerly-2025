"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import ProfessionalSearch from "@/components/business/ProfessionalSearch";
import { useAppStore } from "@/lib/store";
import { dummyBusinesses } from "@/lib/dummy-data";

const FindProfessionalsPage = () => {
  const { setBusiness, setUserType, setIsAuthenticated, userType } = useAppStore();
  
  // For demo purposes, always set as authenticated business user
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    // Only set business user data if the user is already a business or there's no user type set
    if (userType === "business" || userType === null) {
      setBusiness(dummyBusinesses[0]);
      setUserType("business");
    }
  }, [setBusiness, setUserType, setIsAuthenticated, userType]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Professionals</h1>
          <p className="text-muted-foreground">
            Search for skilled professionals that match your business needs
          </p>
        </div>
        
        <ProfessionalSearch />
      </div>
    </DashboardLayout>
  );
};

export default FindProfessionalsPage; 