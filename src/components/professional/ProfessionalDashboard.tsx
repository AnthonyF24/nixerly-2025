"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Wrench, Award, Briefcase, Clock, ArrowRight, TrendingUp, AlertCircle, Activity, Users, Star, Calendar, Check } from "lucide-react";
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
    <div className="container mx-auto py-6 space-y-8 max-w-7xl">
      {/* Header with modern glass-morphism effect */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="flex items-start justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/30 shadow-lg">
              <AvatarImage src="/avatars/professional.png" alt={professional.name} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {getInitials(professional.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {professional.name || "Professional"}
              </h1>
              {professional.location && (
                <div className="flex items-center text-white/90 font-medium">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span>{professional.location}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {professional.skills && professional.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} className="bg-white/20 hover:bg-white/30 text-white border-0 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </Badge>
                ))}
                {professional.skills && professional.skills.length > 4 && (
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 px-3 py-1 rounded-full text-sm">
                    +{professional.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            className="bg-white text-indigo-700 hover:bg-white/90 shadow-md transition-all"
            onClick={() => router.push("/professional/profile")}
            size="lg"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Applied Jobs</p>
                <h3 className="text-2xl font-bold text-slate-900">{jobs.filter(job => job.status === "applied").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Certifications</p>
                <h3 className="text-2xl font-bold text-slate-900">{certifications ? certifications.length : 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-0 bg-gradient-to-br from-teal-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-teal-600 font-medium">Portfolio Items</p>
                <h3 className="text-2xl font-bold text-slate-900">{portfolio ? portfolio.length : 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Completion Card */}
        <Card className="md:col-span-1 border-0 shadow-md">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Profile Completion
            </CardTitle>
            <CardDescription>Enhance your visibility to employers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Profile Status</span>
                <span className="text-blue-600">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2.5 bg-slate-100" 
                indicatorClassName={cn(
                  "transition-all duration-500",
                  profileCompletion < 33 ? "bg-amber-500" : 
                  profileCompletion < 66 ? "bg-blue-500" : 
                  "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                )} 
              />
            </div>
            
            <div className="space-y-3.5">
              {profileTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 group">
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    task.completed 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                      : "border-2 border-slate-200 group-hover:border-blue-300"
                  )}>
                    {task.completed && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm flex-1", 
                    task.completed ? "text-slate-500 line-through" : "text-slate-700 font-medium"
                  )}>
                    {task.title}
                  </span>
                  {!task.completed && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto h-8 px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"
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
            <CardFooter className="pt-2 pb-6">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow transition-all"
                onClick={() => router.push("/professional/profile")}
              >
                Complete Your Profile
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Main Dashboard Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Construction Job Matches */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="pb-2 border-b bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                  Matching Jobs
                </CardTitle>
                <Button 
                  variant="ghost" 
                  className="text-blue-600 h-8 px-3 text-sm hover:bg-blue-50 hover:text-blue-800"
                  onClick={() => router.push("/jobs")}
                >
                  View All Jobs
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Jobs matching your construction skills</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {relevantJobs.length === 0 ? (
                <div className="text-center py-10 space-y-4">
                  <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="space-y-2 px-4">
                    <p className="text-base font-medium text-slate-900">No matching jobs found</p>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">Add more skills to your profile to find matching construction jobs</p>
                  </div>
                  <Button 
                    className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
                    onClick={() => router.push("/professional/profile")}
                  >
                    Update Skills
                  </Button>
                </div>
              ) : (
                <div>
                  {relevantJobs.slice(0, 3).map((job, index) => (
                    <div 
                      key={job.id} 
                      className={cn(
                        "p-5 hover:bg-blue-50/50 transition-colors group",
                        index !== relevantJobs.slice(0, 3).length - 1 && "border-b border-slate-100"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                          <p className="text-sm text-slate-500">{job.businessName}</p>
                        </div>
                        <Badge className={cn(
                          "rounded-full px-2.5 text-xs font-medium",
                          job.status === "open" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : job.status === "closed" 
                              ? "bg-red-100 text-red-800 hover:bg-red-200" 
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        )}>
                          {job.status === "open" ? "Open" : job.status === "closed" ? "Closed" : "Draft"}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        <span>{job.location}</span>
                        <span className="mx-2 text-slate-300">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        <span>Posted {job.datePosted}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs py-0.5 px-2 font-normal bg-slate-50 border-slate-200">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs py-0.5 px-2 font-normal bg-slate-50 border-slate-200">
                            +{job.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          size="sm" 
                          className="h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
                          onClick={() => router.push(`/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {relevantJobs.length > 3 && (
                    <div className="p-4 border-t border-slate-100">
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 shadow-sm"
                        onClick={() => router.push("/jobs")}
                      >
                        Show All {relevantJobs.length} Matching Jobs
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="pb-0 px-0 pt-0">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveView("jobs")}
                  className={cn(
                    "flex-1 py-4 px-6 text-sm font-medium relative transition-colors",
                    activeView === "jobs" 
                      ? "text-blue-700 bg-blue-50/50" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Applied Jobs
                  </div>
                  {activeView === "jobs" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveView("certifications")}
                  className={cn(
                    "flex-1 py-4 px-6 text-sm font-medium relative transition-colors",
                    activeView === "certifications" 
                      ? "text-blue-700 bg-blue-50/50" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <Award className="h-4 w-4 mr-2" />
                    Certifications
                  </div>
                  {activeView === "certifications" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveView("portfolio")}
                  className={cn(
                    "flex-1 py-4 px-6 text-sm font-medium relative transition-colors",
                    activeView === "portfolio" 
                      ? "text-blue-700 bg-blue-50/50" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Portfolio
                  </div>
                  {activeView === "portfolio" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  )}
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {activeView === "jobs" && (
                <div className="space-y-4">
                  {jobs.filter(job => job.status === "applied").length === 0 ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                        <Briefcase className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-slate-900">No job applications yet</p>
                        <p className="text-sm text-slate-500 max-w-md mx-auto">Start applying to construction jobs that match your skills</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
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
                    <div className="text-center py-8 space-y-4">
                      <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                        <Award className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-slate-900">No certifications added</p>
                        <p className="text-sm text-slate-500 max-w-md mx-auto">Add your construction certifications to stand out to employers</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
                        onClick={() => router.push("/professional/certifications")}
                      >
                        Add Certifications
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900">{cert.name}</h3>
                              <p className="text-sm text-slate-500">{cert.issuer}</p>
                            </div>
                            {cert.verified && (
                              <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 rounded-full px-2.5">Verified</Badge>
                            )}
                          </div>
                          <div className="mt-3 flex items-center text-xs text-slate-500">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                            <span>Issued: {cert.date}</span>
                            {cert.validUntil && (
                              <>
                                <span className="mx-2 text-slate-300">•</span>
                                <span>Valid until: {cert.validUntil}</span>
                              </>
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
                    <div className="text-center py-8 space-y-4">
                      <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                        <Activity className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-medium text-slate-900">No portfolio items</p>
                        <p className="text-sm text-slate-500 max-w-md mx-auto">Showcase your best construction work to attract clients</p>
                      </div>
                      <Button 
                        className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow"
                        onClick={() => router.push("/professional/portfolio")}
                      >
                        Add Portfolio
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {portfolio.map((item) => (
                        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors shadow-sm group">
                          <div className="aspect-video bg-slate-100 relative">
                            {item.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img 
                                src={item.imageUrl} 
                                alt={item.altText || item.title} 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {item.tags && item.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs py-0.5 px-2 font-normal bg-slate-50 border-slate-200">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags && item.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs py-0.5 px-2 font-normal bg-slate-50 border-slate-200">
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
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                  <h3 className="font-semibold text-white">Professional Insights</h3>
                </div>
              </div>
            </div>
            <CardContent className="pt-5">
              <div className="text-center py-8 space-y-4">
                <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-900">No insights available yet</p>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">Complete your profile and apply to jobs to see performance insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 