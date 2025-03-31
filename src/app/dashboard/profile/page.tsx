"use client";

import React, { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileForm } from "@/components/professional/ProfileForm";
import { BusinessProfileForm } from "@/components/business/BusinessProfileForm";
import { useAppStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";

const ProfilePage = () => {
  const { userType, setProfessional, setBusiness, setUserType, setIsAuthenticated } = useAppStore();
  
  const searchParams = useSearchParams();
  const userTypeParam = searchParams.get('type');
  
  // For demo purposes, set authentication and user type
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your {userType === "professional" ? "professional" : "business"} profile
          </p>
        </div>
        
        {userType === "professional" ? <ProfileForm /> : <BusinessProfileForm />}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 