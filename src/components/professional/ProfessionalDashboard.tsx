"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Wrench, Award, Briefcase, Clock, ArrowRight, TrendingUp, AlertCircle, Activity } from "lucide-react";
import { useProfessionalData } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProfessionalDashboard() {
  const { professional, jobs, certifications, portfolio } = useProfessionalData();
  const router = useRouter();
  const [activeView, setActiveView] = useState<"jobs" | "certifications" | "portfolio">("jobs");

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 6; // Total number of profile sections

    if (professional.name) completed++;
    if (professional.bio && professional.bio.length > 10) completed++;
    if (professional.skills && professional.skills.length > 0) completed++;
    if (professional.location) completed++;
    if (certifications && certifications.length > 0) completed++;
    if (portfolio && portfolio.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Get remaining profile tasks
  const getProfileTasks = () => {
    const tasks = [];
    
    if (!professional.bio || professional.bio.length <= 10) {
      tasks.push({ id: "bio", title: "Add a professional bio", completed: false });
    } else {
      tasks.push({ id: "bio", title: "Add a professional bio", completed: true });
    }
    
    if (!professional.skills || professional.skills.length === 0) {
      tasks.push({ id: "skills", title: "Add your construction skills", completed: false });
    } else {
      tasks.push({ id: "skills", title: "Add your construction skills", completed: true });
    }
    
    if (!professional.location) {
      tasks.push({ id: "location", title: "Add your location", completed: false });
    } else {
      tasks.push({ id: "location", title: "Add your location", completed: true });
    }
    
    if (!certifications || certifications.length === 0) {
      tasks.push({ id: "certifications", title: "Add certifications", completed: false });
    } else {
      tasks.push({ id: "certifications", title: "Add certifications", completed: true });
    }
    
    if (!portfolio || portfolio.length === 0) {
      tasks.push({ id: "portfolio", title: "Add portfolio items", completed: false });
    } else {
      tasks.push({ id: "portfolio", title: "Add portfolio items", completed: true });
    }
    
    return tasks;
  };

  const profileTasks = getProfileTasks();

  // Filter jobs relevant to professional based on skills
  const relevantJobs = jobs.filter((job) => {
    if (!professional.skills || professional.skills.length === 0) return false;
    return job.skills.some((skill) => professional.skills.includes(skill));
  });

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header with color gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 rounded-lg p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-white">
              <AvatarImage src="/avatars/professional.png" alt={professional.name} />
              <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {getInitials(professional.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {professional.name || "Professional"}
              </h1>
              {professional.location && (
                <div className="flex items-center text-white/90 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{professional.location}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {professional.skills && professional.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} className="bg-white/20 hover:bg-white/30 text-white">
                    {skill}
                  </Badge>
                ))}
                {professional.skills && professional.skills.length > 3 && (
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    +{professional.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            className="bg-white hover:bg-white/90 text-blue-700"
            onClick={() => router.push("/professional/profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Completion Card */}
        <Card className="md:col-span-1 border border-slate-200 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Profile Completion</CardTitle>
            <CardDescription>Complete your profile to attract more job opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Status</span>
                <span className="font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2 bg-slate-200" indicatorClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500" />
            </div>
            
            <div className="space-y-3">
              {profileTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center",
                    task.completed 
                      ? "bg-gradient-to-r from-blue-500 to-teal-500" 
                      : "border border-slate-300"
                  )}>
                    {task.completed && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className={cn(
                    "text-sm", 
                    task.completed ? "text-slate-500 line-through" : "text-slate-900"
                  )}>
                    {task.title}
                  </span>
                  {!task.completed && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto h-7 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => router.push("/professional/profile")}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          {profileCompletion < 100 && (
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                onClick={() => router.push("/professional/profile")}
              >
                Complete Your Profile
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Main Dashboard Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Construction Job Matches */}
          <Card className="border border-slate-200 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                  Matching Jobs
                </CardTitle>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 h-8 px-2 text-sm hover:bg-blue-50 hover:text-blue-800"
                  onClick={() => router.push("/jobs")}
                >
                  View All Jobs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Jobs matching your construction skills</CardDescription>
            </CardHeader>
            <CardContent>
              {relevantJobs.length === 0 ? (
                <div className="text-center py-6 space-y-3">
                  <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="h-6 w-6 text-slate-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">No matching jobs found</p>
                    <p className="text-sm text-slate-500">Add more skills to your profile to find matching construction jobs</p>
                  </div>
                  <Button 
                    className="mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                    onClick={() => router.push("/professional/profile")}
                  >
                    Update Skills
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {relevantJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-slate-900">{job.title}</h3>
                          <p className="text-sm text-slate-500">{job.businessName}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          {job.status === "open" ? "Open" : job.status === "closed" ? "Closed" : "Draft"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-slate-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs py-0 font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs py-0 font-normal">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Posted {job.datePosted}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="h-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                          onClick={() => router.push(`/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {relevantJobs.length > 3 && (
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
                      onClick={() => router.push("/jobs")}
                    >
                      Show All {relevantJobs.length} Matching Jobs
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Card className="border border-slate-200 shadow-md">
            <CardHeader className="pb-2 border-b">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveView("jobs")}
                  className={cn(
                    "pb-2 text-sm font-medium relative",
                    activeView === "jobs" 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Applied Jobs
                  </div>
                  {activeView === "jobs" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveView("certifications")}
                  className={cn(
                    "pb-2 text-sm font-medium relative",
                    activeView === "certifications" 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Certifications
                  </div>
                  {activeView === "certifications" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveView("portfolio")}
                  className={cn(
                    "pb-2 text-sm font-medium relative",
                    activeView === "portfolio" 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    Portfolio
                  </div>
                  {activeView === "portfolio" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500" />
                  )}
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {activeView === "jobs" && (
                <div className="space-y-4">
                  {jobs.filter(job => job.status === "applied").length === 0 ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <Briefcase className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">No job applications yet</p>
                        <p className="text-sm text-slate-500">Start applying to construction jobs that match your skills</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        onClick={() => router.push("/jobs")}
                      >
                        Browse Jobs
                      </Button>
                    </div>
                  ) : (
                    <div>Applied jobs will appear here</div>
                  )}
                </div>
              )}

              {activeView === "certifications" && (
                <div className="space-y-4">
                  {!certifications || certifications.length === 0 ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <Award className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">No certifications added</p>
                        <p className="text-sm text-slate-500">Add your construction certifications to stand out to employers</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        onClick={() => router.push("/professional/certifications")}
                      >
                        Add Certifications
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900">{cert.name}</h3>
                              <p className="text-sm text-slate-500">{cert.issuer}</p>
                            </div>
                            {cert.verified && (
                              <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Verified</Badge>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-slate-500">
                            <span>Issued: {cert.date}</span>
                            {cert.validUntil && (
                              <span className="ml-3">Valid until: {cert.validUntil}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeView === "portfolio" && (
                <div className="space-y-4">
                  {!portfolio || portfolio.length === 0 ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                        <Activity className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">No portfolio items</p>
                        <p className="text-sm text-slate-500">Showcase your best construction work to attract clients</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                        onClick={() => router.push("/professional/portfolio")}
                      >
                        Add Portfolio
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {portfolio.map((item) => (
                        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
                          <div className="aspect-video bg-slate-100 relative">
                            {item.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img 
                                src={item.imageUrl} 
                                alt={item.altText || item.title} 
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Activity className="h-8 w-8 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {item.tags && item.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs py-0 font-normal">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags && item.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs py-0 font-normal">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional Insights Card */}
          <Card className="border border-slate-200 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <h3 className="font-semibold text-white">Professional Insights</h3>
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="text-center py-6 space-y-3">
                <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-6 w-6 text-slate-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">No insights available yet</p>
                  <p className="text-sm text-slate-500">Complete your profile and apply to jobs to see performance insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 