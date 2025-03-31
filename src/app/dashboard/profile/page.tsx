"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileForm } from "@/components/professional/ProfileForm";
import { BusinessProfileForm } from "@/components/business/BusinessProfileForm";
import { useAppStore } from "@/lib/store";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { isAuthenticated, userType } = useAppStore();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return redirect("/auth/login");
  }

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