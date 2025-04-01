import React from "react";
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
  Activity
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dummyJobs, dummyProfessionals } from "@/lib/dummy-data";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const BusinessDashboard = () => {
  const { business } = useAppStore();

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

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200 shadow-md">
              <AvatarImage src={business.logoUrl} alt={business.name} />
              <AvatarFallback className="bg-blue-50 text-blue-600 text-lg">
                {business.name?.charAt(0) || 'B'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {business.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{business.industry || "Business"}</span>
                {business.location && (
                  <>
                    <span className="mx-1">•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{business.location}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" asChild>
              <Link href="/dashboard/post-job" tabIndex={0}>
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {business.profileComplete < 100 && (
        <Card className="overflow-hidden border-blue-200/50 shadow-md">
          <CardHeader className="pb-3 bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-blue-600" />
              Complete Your Business Profile
            </CardTitle>
            <CardDescription className="text-base">
              Your profile is <span className="font-medium text-blue-600">{completionPercentage.toFixed(0)}%</span> complete. 
              Complete all tasks to improve visibility to professionals.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Progress 
              value={completionPercentage} 
              className="h-2.5 bg-blue-100" 
              aria-label="Profile completion progress"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {tasks.map(task => {
                const Icon = task.icon;
                return (
                  <div 
                    key={task.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      task.completed ? "bg-green-50" : "bg-blue-50/50 hover:bg-blue-50"
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center",
                        task.completed ? "bg-green-100" : "bg-blue-100"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          task.completed ? "text-green-600" : "text-blue-600"
                        )} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={task.href}
                        className={cn(
                          "text-sm font-medium hover:underline flex items-center gap-1",
                          task.completed ? "text-green-700" : "text-blue-700"
                        )}
                        tabIndex={0}
                      >
                        {task.label}
                        {!task.completed && <ArrowRight className="h-3 w-3 ml-1" />}
                      </Link>
                      {task.completed && (
                        <p className="text-xs text-green-600 mt-0.5">Completed</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle 
                        className={cn(
                          "h-5 w-5",
                          task.completed ? "text-green-500" : "text-blue-200 stroke-[0.5]"
                        )} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200/50 shadow-md bg-gradient-to-b from-blue-50 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Active Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs.length}</div>
            <p className="text-muted-foreground text-sm mt-1">Currently accepting applications</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200/50 shadow-md bg-gradient-to-b from-teal-50 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileEdit className="h-5 w-5 text-teal-500" />
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{draftJobs.length}</div>
            <p className="text-muted-foreground text-sm mt-1">Unpublished job posts</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200/50 shadow-md bg-gradient-to-b from-purple-50 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BriefcaseBusiness className="h-5 w-5 text-purple-600" />
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{businessJobs.length}</div>
            <p className="text-muted-foreground text-sm mt-1">All-time job listings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-blue-200/50 shadow-md">
          <CardHeader className="bg-blue-50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                  Job Listings
                </CardTitle>
                <CardDescription className="text-base">
                  Manage your job postings
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-sm text-blue-600 hover:bg-blue-50/70" asChild>
                <Link href="/dashboard/manage-jobs" tabIndex={0} aria-label="View all job listings">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          
          <div className="border-b">
            <Tabs defaultValue="active">
              <div className="px-4">
                <TabsList className="w-full justify-start border-b-0 bg-transparent p-0 h-auto mb-[-1px]">
                  <TabsTrigger 
                    value="active" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent"
                  >
                    Active ({activeJobs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="drafts" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent"
                  >
                    Drafts ({draftJobs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="closed" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent"
                  >
                    Closed ({closedJobs.length})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="active" className="p-0 m-0">
                <div className="divide-y">
                  {activeJobs.length > 0 ? (
                    activeJobs.map(job => (
                      <div key={job.id} className="flex items-start justify-between p-4 hover:bg-blue-50/50 transition-colors">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs flex items-center gap-1 border-blue-200">
                              <MapPin className="h-3 w-3" />
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Posted on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {job.skills.slice(0, 3).map(skill => (
                              <Badge 
                                key={skill} 
                                variant="secondary" 
                                className="text-xs bg-blue-50 text-blue-700 border-blue-100"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                +{job.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/edit`}
                              aria-label="Edit job"
                              tabIndex={0}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/close`}
                              aria-label="Close job"
                              tabIndex={0}
                            >
                              <Archive className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-lg font-medium mb-2">
                        No active jobs
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                        Post a job to attract talented professionals to your business.
                      </p>
                      <Button className="shadow-sm" asChild>
                        <Link href="/dashboard/post-job" tabIndex={0}>
                          Post a Job
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="drafts" className="p-0 m-0">
                <div className="divide-y">
                  {draftJobs.length > 0 ? (
                    draftJobs.map(job => (
                      <div key={job.id} className="flex items-start justify-between p-4 hover:bg-blue-50/50 transition-colors">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs flex items-center gap-1 border-blue-200">
                              <MapPin className="h-3 w-3" />
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Created on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/edit`}
                              aria-label="Edit draft"
                              tabIndex={0}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:bg-green-50" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/publish`}
                              aria-label="Publish job"
                              tabIndex={0}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <FileEdit className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-lg font-medium mb-2">
                        No draft jobs
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Drafts will appear here when you save job posts without publishing.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="closed" className="p-0 m-0">
                <div className="divide-y">
                  {closedJobs.length > 0 ? (
                    closedJobs.map(job => (
                      <div key={job.id} className="flex items-start justify-between p-4 hover:bg-blue-50/50 transition-colors">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs flex items-center gap-1 border-blue-200">
                              <MapPin className="h-3 w-3" />
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Posted on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/repost`}
                              aria-label="Repost job"
                              tabIndex={0}
                            >
                              <Plus className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Archive className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-lg font-medium mb-2">
                        No closed jobs
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Closed or completed jobs will be archived here.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <CardFooter className="border-t bg-blue-50/20 px-6 py-3">
            <Button variant="ghost" className="text-sm text-blue-700 hover:bg-blue-50" asChild>
              <Link href="/dashboard/manage-jobs" tabIndex={0}>
                View All Jobs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-blue-200/50 shadow-md overflow-hidden">
          <CardHeader className="bg-purple-50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-purple-600" />
                  Find Professionals
                </CardTitle>
                <CardDescription className="text-base">
                  Search for professionals by skills and location
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-sm text-purple-600 hover:bg-purple-50/70" asChild>
                <Link href="/dashboard/find-professionals" tabIndex={0} aria-label="View all professionals">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search professionals by skills or location..." 
                className="pl-9 border-blue-200/50"
              />
            </div>
            
            <div className="space-y-3">
              {matchingProfessionals.length > 0 ? (
                matchingProfessionals.map(pro => (
                  <div key={pro.id} className="flex items-start gap-3 p-3 rounded-lg border border-blue-200/50 bg-blue-50/20 hover:bg-blue-50/40 transition-colors">
                    <Avatar className="h-10 w-10 border border-blue-200">
                      <AvatarImage src={pro.avatarUrl} alt={pro.name} />
                      <AvatarFallback className="bg-blue-50 text-blue-600">
                        {pro.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{pro.name}</h3>
                        {pro.verified && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {pro.location || "Remote"}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {pro.skills.slice(0, 3).map(skill => 
                          uniqueSkills.includes(skill) ? (
                            <Badge 
                              key={skill} 
                              className="text-xs bg-blue-50 text-blue-700 border-blue-100"
                            >
                              {skill}
                            </Badge>
                          ) : (
                            <Badge 
                              key={skill} 
                              variant="secondary" 
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          )
                        )}
                        {pro.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{pro.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg font-medium mb-2">
                    No matching professionals
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Post a job with relevant skills to attract professionals.
                  </p>
                  <Button className="shadow-sm" asChild>
                    <Link href="/dashboard/post-job" tabIndex={0}>
                      Post a Job
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-purple-50/20 px-6 py-3">
            <Button variant="ghost" className="text-sm text-purple-700 hover:bg-purple-50" asChild>
              <Link href="/dashboard/find-professionals" tabIndex={0}>
                View All Professionals
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="border-blue-200/50 shadow-md overflow-hidden">
        <CardHeader className="bg-teal-50 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart className="h-5 w-5 text-teal-600" />
                Business Insights
              </CardTitle>
              <CardDescription className="text-base">
                Data to help you improve your hiring process
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="text-center py-8">
            <TrendingUp className="h-10 w-10 text-teal-500/30 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No Analytics Available</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
              Post jobs and receive applications to see analytics and insights about your hiring process.
            </p>
            <Button className="mt-4 shadow-sm bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <Link href="/dashboard/post-job" tabIndex={0}>
                Post a New Job
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 