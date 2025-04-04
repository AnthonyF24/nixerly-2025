"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/lib/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, BarChart3, Box, Building2, Clock, DollarSign, LineChart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardStat from "@/components/dashboard/DashboardStats";
import AdminUsersList from "@/components/admin/AdminUsersList";
import AdminJobsList from "@/components/admin/AdminJobsList";
import AdminProfessionalsList from "@/components/admin/AdminProfessionalsList";
import AdminBusinessesList from "@/components/admin/AdminBusinessesList";
import AdminRevenueChart from "@/components/admin/AdminRevenueChart";
import AdminActivityLog from "@/components/admin/AdminActivityLog";
import AdminPlatformStats from "@/components/admin/AdminPlatformStats";

// Mock data for admin dashboard
const mockOverviewStats = {
  totalUsers: 124,
  totalJobs: 56,
  totalProfessionals: 87,
  totalBusinesses: 37,
  activeJobs: 32,
  totalRevenue: 45600,
  userGrowth: 15,
  jobsGrowth: 24,
};

const AdminDashboardPage = () => {
  const { setIsAuthenticated, setUserType, setCurrentUser } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Set admin user for demonstration purposes
  useEffect(() => {
    // Set authenticated state and admin user
    setIsAuthenticated(true);
    setUserType("admin"); // Use a dedicated admin type instead of business
    setCurrentUser({
      id: "admin-1",
      name: "Admin User",
      email: "admin@nixerly.com",
      avatar: "/avatars/admin.jpg",
      role: "admin", // Use admin role instead of business
      joinedAt: new Date().toISOString(),
      location: "Dublin, Ireland",
      company: "Nixerly",
      position: "Founder & Admin"
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [setIsAuthenticated, setUserType, setCurrentUser]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-10 w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-1 md:p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your platform.
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <DashboardStat
            title="Total Users"
            value={mockOverviewStats.totalUsers}
            icon={Users}
            progressValue={mockOverviewStats.userGrowth}
            progressLabel="Growth"
            iconColorClass="bg-blue-100 text-blue-700"
            progressColorClass="bg-blue-100"
            progressIndicatorClass="bg-blue-600"
          />
          <DashboardStat
            title="Total Jobs"
            value={mockOverviewStats.totalJobs}
            icon={Box}
            progressValue={mockOverviewStats.jobsGrowth}
            progressLabel="Growth"
            iconColorClass="bg-purple-100 text-purple-700"
            progressColorClass="bg-purple-100"
            progressIndicatorClass="bg-purple-600"
          />
          <DashboardStat
            title="Professionals"
            value={mockOverviewStats.totalProfessionals}
            icon={Activity}
            iconColorClass="bg-green-100 text-green-700"
          />
          <DashboardStat
            title="Revenue"
            value={mockOverviewStats.totalRevenue}
            icon={DollarSign}
            iconColorClass="bg-amber-100 text-amber-700"
          />
        </div>

        {/* Platform Statistics */}
        <Card className="border border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>
              Overview of platform metrics and growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminPlatformStats />
          </CardContent>
        </Card>

        {/* Tabs for different admin sections */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-4">
            <Card className="border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, view details, and modify permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminUsersList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobs" className="mt-4">
            <Card className="border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>Job Listings</CardTitle>
                <CardDescription>
                  View and manage all job postings across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminJobsList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="professionals" className="mt-4">
            <Card className="border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>Professional Accounts</CardTitle>
                <CardDescription>
                  Manage professional accounts and verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminProfessionalsList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="businesses" className="mt-4">
            <Card className="border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>Business Accounts</CardTitle>
                <CardDescription>
                  Manage business accounts and subscription status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminBusinessesList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-blue-100 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Revenue trends over the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRevenueChart />
            </CardContent>
          </Card>
          
          <Card className="border border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions and events on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminActivityLog />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage; 