"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight, 
  Filter,
  Search,
  Eye,
  ArrowUpRight,
  Calendar,
  BarChart,
  TrendingUp,
  PlusCircle,
  FileText,
  MailOpen,
  Phone,
  Building2,
  User,
  CheckCircle,
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import DashboardStat from "@/components/dashboard/DashboardStats";
import JobCard from "@/components/jobs/JobCard";
import { useCurrentUser, useJobs } from "@/lib/mock-data-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from 'date-fns';

export const ProfessionalDashboard = () => {
  const { currentUser } = useAppStore();
  const { user: professional, loading: userLoading } = useCurrentUser();
  const { jobs: allJobs, loading: jobsLoading } = useJobs();
  
  if (userLoading || !professional) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-80 w-full lg:col-span-2" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }
  
  // Filter jobs that match professional's skills
  const matchingJobs = allJobs.filter(job => 
    job.status === 'open' && 
    job.skills.some(skill => professional.skills?.includes(skill))
  ).slice(0, 5);
  
  // Recent activity data (mockup for demo)
  const recentActivity = [
    { 
      type: 'view', 
      title: 'Profile Viewed',
      description: 'TechInnovate viewed your profile',
      date: '2 hours ago',
      icon: Eye,
      iconColorClass: 'bg-blue-100 text-blue-700'
    },
    { 
      type: 'job_view', 
      title: 'Job Viewed',
      description: 'You viewed NixOS System Configuration Expert',
      date: '1 day ago',
      icon: Briefcase,
      iconColorClass: 'bg-green-100 text-green-700'
    },
    { 
      type: 'application', 
      title: 'Application Sent',
      description: 'You applied for DevOps Engineer position',
      date: '2 days ago',
      icon: FileText,
      iconColorClass: 'bg-purple-100 text-purple-700'
    },
    { 
      type: 'profile_update', 
      title: 'Profile Updated',
      description: 'You updated your skills and experience',
      date: '3 days ago',
      icon: User,
      iconColorClass: 'bg-amber-100 text-amber-700'
    },
  ];

  // Calculate stats
  const profileViews = 48;
  const profileCompleteness = professional.bio && professional.skills?.length && professional.experiences?.length ? 100 : 70;
  const jobMatches = matchingJobs.length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {professional.name}</h1>
              <p className="text-purple-100 mt-1">
                {profileCompleteness < 100 
                  ? 'Complete your profile to get noticed by more businesses'
                  : 'Your profile is looking great! Here's your activity'}
              </p>
                </div>
            <Button className="bg-white text-purple-700 hover:bg-purple-50" asChild>
              <Link href="/dashboard/profile">
                {profileCompleteness < 100 ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Profile
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    View Profile
                  </>
                )}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStat
          title="Profile Visits"
          value={profileViews}
          icon={Eye}
          progressValue={12}
          progressLabel="Up from last week"
          progressValueLabel="+12%"
          iconColorClass="bg-purple-100 text-purple-700"
          progressColorClass="bg-purple-100"
          progressIndicatorClass="bg-purple-600"
        />
        
        <DashboardStat
          title="Profile Completeness"
          value={profileCompleteness}
          icon={User}
          progressValue={profileCompleteness}
          progressLabel="Progress"
          iconColorClass="bg-emerald-100 text-emerald-700"
          progressColorClass="bg-emerald-100"
          progressIndicatorClass="bg-emerald-600"
        />
        
        <DashboardStat
          title="Job Matches"
          value={jobMatches}
          icon={Briefcase}
          progressValue={jobMatches > 0 ? Math.min(100, jobMatches * 10) : 0}
          progressLabel="Match quality"
          iconColorClass="bg-blue-100 text-blue-700"
          progressColorClass="bg-blue-100"
          progressIndicatorClass="bg-blue-600"
        />
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matching Jobs */}
        <Card className="lg:col-span-2 border border-purple-100">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100 pb-4">
            <CardTitle className="text-xl flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
              Jobs Matching Your Skills
            </CardTitle>
            <CardDescription>
              Personalized job recommendations based on your skills and experience
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {matchingJobs.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {matchingJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    showApplyButton 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Briefcase className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-600">No matching jobs found</h3>
                <p className="text-sm text-gray-500 mt-1">Update your skills to improve job matching or browse all jobs</p>
                <Button asChild className="mt-4 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800" variant="outline">
                  <Link href="/dashboard/jobs">
                    Browse All Jobs
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-slate-50 to-purple-50 border-t border-purple-100 p-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <Filter className="h-4 w-4 inline mr-1" />
              <span>Showing jobs matching your skills</span>
            </div>
            <Button variant="link" asChild className="text-purple-600 hover:text-purple-800">
              <Link href="/dashboard/jobs">
                View All Jobs
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-purple-100">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-purple-50 border-b border-purple-100">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3 items-start p-2 rounded-lg hover:bg-purple-50 transition-colors">
                  <div className={`shrink-0 p-2 rounded-lg ${activity.iconColorClass}`}>
                    <activity.icon className="h-4 w-4" />
              </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {activity.title}
                      </p>
                      <span className="text-xs text-gray-500">{activity.date}</span>
            </div>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all">
                  <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Update Profile</h3>
                    <p className="text-xs text-gray-500">Keep your skills and experience up-to-date</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                </Link>
                
                <Link href="/dashboard/jobs" className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Browse Jobs</h3>
                    <p className="text-xs text-gray-500">Discover new job opportunities</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                </Link>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}; 