"use client";

import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import ProfessionalSearch from "@/components/business/ProfessionalSearch";
import { useAppStore } from "@/lib/store";
import { redirect } from "next/navigation";

const FindProfessionalsPage = () => {
  const { isAuthenticated, userType, business } = useAppStore();
  
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