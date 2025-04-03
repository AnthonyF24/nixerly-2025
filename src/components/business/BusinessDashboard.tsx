"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  X, 
  Plus, 
  FileEdit, 
  Archive,
  BriefcaseBusiness,
  User,
  Star,
  MapPin,
  Building2,
  ArrowRight,
  TrendingUp,
  BarChart,
  Activity,
  Users,
  Palette,
  Eye,
  PlusCircle,
  FileText,
  MailOpen,
  Phone,
  CircleUser,
  UserCheck,
  Briefcase,
  CalendarClock
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dummyJobs, dummyProfessionals } from "@/lib/dummy-data";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColorTheme, businessThemes } from "@/lib/theme-utils";

export const BusinessDashboard = () => {
  const { business } = useAppStore();
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(businessThemes[0]);
  const [searchQuery, setSearchQuery] = useState("");

  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-muted/30 rounded-lg border border-dashed">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg font-medium">Please complete your business profile to see your dashboard.</p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/profile" tabIndex={0}>Create Profile</Link>
        </Button>
      </div>
    );
  }

  // Get jobs for this business
  const businessJobs = dummyJobs.filter(job => job.businessId === business.id);
  const activeJobs = businessJobs.filter(job => job.status === "open");
  const draftJobs = businessJobs.filter(job => job.status === "draft");
  const closedJobs = businessJobs.filter(job => job.status === "closed");
  
  // Get matching professionals based on job skills
  const businessJobSkills = businessJobs.flatMap(job => job.skills);
  const uniqueSkills = [...new Set(businessJobSkills)];
  const matchingProfessionals = dummyProfessionals
    .filter(pro => pro.availability)
    .filter(pro => pro.skills.some(skill => uniqueSkills.includes(skill)))
    .slice(0, 3);
  
  // Profile completion tasks
  const tasks = [
    { 
      id: "profile", 
      label: "Complete your business profile", 
      completed: business.description !== undefined,
      href: "/dashboard/profile",
      icon: Building2
    },
    { 
      id: "location", 
      label: "Set business location", 
      completed: business.location !== undefined,
      href: "/dashboard/profile",
      icon: MapPin
    },
    { 
      id: "jobs", 
      label: "Post your first job", 
      completed: businessJobs.length > 0,
      href: "/dashboard/post-job",
      icon: BriefcaseBusiness
    }
  ];

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  // Quick action links
  const quickActions = [
    { 
      title: "Post a New Job", 
      description: "Create a job listing to attract professionals", 
      href: "/dashboard/post-job", 
      icon: <Plus className="h-5 w-5 text-white" />,
      colorClass: "bg-blue-600 hover:bg-blue-700 text-white" 
    },
    { 
      title: "Find Professionals", 
      description: "Search for skilled professionals by expertise", 
      href: "/dashboard/find-professionals", 
      icon: <Users className="h-5 w-5 text-purple-700" />,
      colorClass: "bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-200" 
    },
    { 
      title: "Edit Business Profile", 
      description: "Update your business information", 
      href: "/dashboard/profile", 
      icon: <Building2 className="h-5 w-5 text-teal-700" />,
      colorClass: "bg-teal-100 hover:bg-teal-200 text-teal-700 border border-teal-200" 
    }
  ];

  // Filter professionals based on search
  const filteredProfessionals = dummyProfessionals.filter(pro => {
    if (!searchQuery) return false; // Only show results when user searches
    
    const query = searchQuery.toLowerCase();
    const nameMatch = pro.name.toLowerCase().includes(query);
    const skillsMatch = pro.skills.some(skill => skill.toLowerCase().includes(query));
    const locationMatch = pro.location?.toLowerCase().includes(query) || false;
    
    return nameMatch || skillsMatch || locationMatch;
  });

  // Calculate some metrics for the dashboard
  const totalApplications = 12; // Mockup number for demo
  const recentlyViewedProfiles = 8; // Mockup number for demo
  
  // Recent activity data (mockup for demo)
  const recentActivity = [
    { 
      type: 'view', 
      professional: dummyProfessionals[0], 
      date: '2 hours ago',
      description: 'You viewed this profile'
    },
    { 
      type: 'job_post', 
      job: businessJobs[0], 
      date: '1 day ago',
      description: 'You posted a new job'
    },
    { 
      type: 'application', 
      professional: dummyProfessionals[1], 
      job: businessJobs[0],
      date: '2 days ago',
      description: 'New application received'
    },
    { 
      type: 'view', 
      professional: dummyProfessionals[2], 
      date: '3 days ago',
      description: 'You viewed this profile'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-none shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {business?.name}</h1>
              <p className="text-blue-100 mt-1">
                Here's what's happening with your business today
              </p>
            </div>
            <Button className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/dashboard/post-job">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all bg-white/70">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <h3 className="text-3xl font-bold mt-1">{activeJobs.length}</h3>
              </div>
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs flex justify-between font-medium text-muted-foreground mb-1">
                <span>Engagement rate</span>
                <span className="text-blue-700">87%</span>
              </div>
              <Progress value={87} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all bg-white/70">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <h3 className="text-3xl font-bold mt-1">{totalApplications}</h3>
              </div>
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs flex justify-between font-medium text-muted-foreground mb-1">
                <span>New this week</span>
                <span className="text-purple-700">+4</span>
              </div>
              <Progress value={40} className="h-1.5 bg-purple-100" indicatorClassName="bg-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all bg-white/70">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Viewed Profiles</p>
                <h3 className="text-3xl font-bold mt-1">{recentlyViewedProfiles}</h3>
              </div>
              <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs flex justify-between font-medium text-muted-foreground mb-1">
                <span>Conversion rate</span>
                <span className="text-teal-700">23%</span>
              </div>
              <Progress value={23} className="h-1.5 bg-teal-100" indicatorClassName="bg-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Search for Professionals */}
        <Card className="lg:col-span-2 border border-blue-100">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-blue-100 pb-4">
            <CardTitle className="text-xl flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Quick Professional Search
            </CardTitle>
            <CardDescription>
              Find skilled professionals based on skills or location
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by skill, name, or location..."
                  className="pl-10 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 transition-colors">
                <Link href="/dashboard/find-professionals">Advanced Search</Link>
              </Button>
            </div>

            {searchQuery ? (
              filteredProfessionals.length > 0 ? (
                <div className="space-y-3">
                  {filteredProfessionals.slice(0, 3).map((pro) => (
                    <div key={pro.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                      <Avatar className="h-10 w-10 border border-blue-100">
                        <AvatarFallback className="bg-blue-50 text-blue-700">
                          {pro.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-sm truncate">{pro.name}</h3>
                          {pro.verified && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 h-5 px-1.5">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              <span className="text-xs">Verified</span>
                            </Badge>
                          )}
                          {pro.availability && (
                            <Badge variant="secondary" className="bg-green-50 text-green-700 h-5 px-1.5">
                              <span className="text-xs">Available</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {pro.location && (
                            <span className="inline-flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {pro.location}
                            </span>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {pro.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="h-5 text-xs px-1.5 py-0 bg-white border-gray-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {pro.skills.length > 3 && (
                            <Badge
                              variant="outline"
                              className="h-5 text-xs px-1.5 py-0 bg-white border-gray-200"
                            >
                              +{pro.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Link href={`/professionals/${pro.id}`} passHref className="shrink-0">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                  
                  {filteredProfessionals.length > 3 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" asChild className="text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <Link href="/dashboard/find-professionals">
                          View All Results ({filteredProfessionals.length})
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <UserCheck className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-600">No professionals found</h3>
                  <p className="text-sm text-gray-500 mt-1">Try different search terms or check out our advanced search</p>
                  <Button asChild className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800" variant="outline">
                    <Link href="/dashboard/find-professionals">
                      Advanced Search
                    </Link>
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                <Search className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-600">Search for professionals</h3>
                <p className="text-sm text-gray-500 mt-1">Enter skills, name, or location to find the right professionals</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-blue-100 p-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <Users className="h-4 w-4 inline mr-1" />
              <span>{dummyProfessionals.length} professionals available</span>
            </div>
            <Button variant="link" asChild className="text-blue-600 hover:text-blue-800">
              <Link href="/dashboard/find-professionals">
                Advanced Search Options
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity & Quick Actions */}
        <Card className="border border-blue-100">
          <Tabs defaultValue="activity">
            <CardHeader className="border-b border-blue-100 pb-0">
              <TabsList className="grid grid-cols-2 bg-blue-50 p-0.5">
                <TabsTrigger value="activity" className="rounded data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  <CalendarClock className="h-4 w-4 mr-1.5" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="actions" className="rounded data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  Actions
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-4">
              <TabsContent value="activity" className="space-y-4 mt-0">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3 items-start p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className={`shrink-0 p-2 rounded-lg ${
                      activity.type === 'view' 
                        ? 'bg-blue-100 text-blue-700' 
                        : activity.type === 'job_post' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-purple-100 text-purple-700'
                    }`}>
                      {activity.type === 'view' && <Eye className="h-4 w-4" />}
                      {activity.type === 'job_post' && <Briefcase className="h-4 w-4" />}
                      {activity.type === 'application' && <FileText className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {activity.type === 'view' && activity.professional?.name}
                          {activity.type === 'job_post' && activity.job?.title}
                          {activity.type === 'application' && activity.professional?.name}
                        </p>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                      
                      {activity.type === 'application' && (
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <MailOpen className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-3 mt-0">
                <div className="space-y-3">
                  <Link href="/dashboard/post-job" className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                      <PlusCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Post a New Job</h3>
                      <p className="text-xs text-gray-500">Create job listings to attract professionals</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                  </Link>
                  
                  <Link href="/dashboard/find-professionals" className="flex items-center gap-3 p-3 rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all">
                    <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                      <Search className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Find Professionals</h3>
                      <p className="text-xs text-gray-500">Search and discover skilled workers</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-purple-500" />
                  </Link>
                  
                  <Link href="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-lg border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all">
                    <div className="bg-teal-100 text-teal-700 p-2 rounded-full">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Update Business Profile</h3>
                      <p className="text-xs text-gray-500">Improve your company profile to attract talent</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-teal-500" />
                  </Link>
                  
                  <Link href="/dashboard/jobs" className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 hover:border-amber-300 hover:bg-amber-50 transition-all">
                    <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                      <BarChart className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Manage Job Listings</h3>
                      <p className="text-xs text-gray-500">View and edit your current job postings</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-500" />
                  </Link>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Active Jobs Section */}
      <Card className="border border-blue-100">
        <CardHeader className="pb-4 border-b border-blue-100 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Your Active Job Listings
            </CardTitle>
            <Button variant="outline" className="h-8 border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/dashboard/jobs">
                View All Jobs
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {activeJobs.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {activeJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{job.location || 'Remote'}</span>
                        <span className="mx-2">•</span>
                        <span className="inline-flex items-center">
                          Posted {new Date(job.datePosted).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs bg-white"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-white">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8" asChild>
                        <Link href={`/dashboard/jobs/${job.id}`}>
                          Manage
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Briefcase className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-600">No active job listings</h3>
              <p className="text-sm text-gray-500 mt-1">Start attracting professionals by posting a job</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/dashboard/post-job">
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  Post a Job
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 