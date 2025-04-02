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
  Palette
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

  return (
    <div className="space-y-6">
      {/* Welcome section with brand color customizer */}
      <div className={cn("rounded-xl border p-6 shadow-sm", activeTheme.classes.headerGradient)}>
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className={cn("h-16 w-16 border-2 shadow-md", activeTheme.classes.primaryBorder)}>
              <AvatarImage src={business.logoUrl} alt={business.name} />
              <AvatarFallback className={cn("text-lg", activeTheme.classes.primaryBg, activeTheme.classes.primaryText)}>
                {business.name?.charAt(0) || 'B'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className={cn("text-2xl md:text-3xl font-bold tracking-tight", activeTheme.classes.textGradient)}>
                Welcome, {business.name}
              </h1>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Brand Colors</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <h3 className="font-medium mb-2">Choose Dashboard Theme</h3>
              <div className="grid grid-cols-1 gap-2">
                {businessThemes.map((theme) => (
                  <Button 
                    key={theme.name}
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "justify-start text-sm font-normal h-10",
                      activeTheme.name === theme.name && "ring-2 ring-blue-500"
                    )}
                    onClick={() => setActiveTheme(theme)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className={`w-4 h-4 rounded-full bg-${theme.primaryColor}-500`} />
                        <div className={`w-4 h-4 rounded-full bg-${theme.secondaryColor}-500`} />
                        <div className={`w-4 h-4 rounded-full bg-${theme.accentColor}-500`} />
                      </div>
                      <span>{theme.name} Theme</span>
                    </div>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Choose colors that match your business brand identity.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className={cn("border shadow-sm hover:shadow-md transition-shadow", activeTheme.classes.primaryBorder)}>
            <Link href={action.href} className="block h-full">
              <CardContent className="p-0">
                <div className="flex items-start p-4 h-full">
                  <div className={cn("rounded-full p-3 mr-4", action.colorClass)}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{action.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                  </div>
                  <ArrowRight className={cn("h-5 w-5 self-center", activeTheme.classes.primaryText)} />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Dashboard metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border shadow-sm", activeTheme.classes.primaryBgLight, activeTheme.classes.primaryBorder)}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-2 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Active</Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{activeJobs.length}</h2>
            <p className="text-gray-500 text-sm">Active Job Listings</p>
            <div className="mt-4">
              <Link 
                href="/dashboard/manage-jobs" 
                className={cn("text-sm hover:underline flex items-center gap-1", activeTheme.classes.primaryText)}
              >
                View Jobs <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className={cn("border shadow-sm", activeTheme.classes.accentBg, activeTheme.classes.accentBorder)}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-2 rounded-lg border border-yellow-200">
                <FileEdit className="h-5 w-5 text-yellow-600" />
              </div>
              <Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200">Draft</Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{draftJobs.length}</h2>
            <p className="text-gray-500 text-sm">Job Drafts</p>
            <div className="mt-4">
              <Link 
                href="/dashboard/manage-jobs" 
                className={cn("text-sm hover:underline flex items-center gap-1", activeTheme.classes.primaryText)}
              >
                Edit Drafts <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className={cn("border shadow-sm", activeTheme.classes.secondaryBgLight, activeTheme.classes.secondaryBorder)}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("p-2 rounded-lg", activeTheme.classes.secondaryBg, activeTheme.classes.secondaryBorder)}>
                <Users className={cn("h-5 w-5", activeTheme.classes.secondaryText)} />
              </div>
              <Badge variant="outline" className={cn("", activeTheme.classes.secondaryText, activeTheme.classes.secondaryBg, activeTheme.classes.secondaryBorder)}>
                Matches
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">{matchingProfessionals.length}</h2>
            <p className="text-gray-500 text-sm">Matching Professionals</p>
            <div className="mt-4">
              <Link 
                href="/dashboard/find-professionals" 
                className={cn("text-sm hover:underline flex items-center gap-1", activeTheme.classes.primaryText)}
              >
                Find Professionals <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile completion card - only show if not 100% complete */}
      {completionPercentage < 100 && (
        <Card className={cn("border shadow-sm", activeTheme.classes.primaryBorder)}>
          <CardHeader className={cn("pb-3", activeTheme.classes.primaryBg)}>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className={cn("h-5 w-5", activeTheme.classes.primaryText)} />
              Complete Your Business Profile
            </CardTitle>
            <CardDescription>
              Your profile is <span className={cn("font-medium", activeTheme.classes.primaryText)}>{completionPercentage.toFixed(0)}%</span> complete. 
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
                      "flex items-center gap-3 p-3 rounded-lg transition-colors border",
                      task.completed 
                        ? "bg-green-50 border-green-200" 
                        : `bg-white ${activeTheme.classes.primaryBorder} ${activeTheme.classes.primaryHover}`
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center",
                        task.completed 
                          ? "bg-green-100" 
                          : activeTheme.classes.primaryBg
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          task.completed 
                            ? "text-green-600" 
                            : activeTheme.classes.primaryText
                        )} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={task.href}
                        className={cn(
                          "text-sm font-medium hover:underline flex items-center gap-1",
                          task.completed ? "text-green-700" : activeTheme.classes.primaryText
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
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent job listings */}
      <Card className={cn("border shadow-sm", activeTheme.classes.primaryBorder)}>
        <CardHeader className={cn("pb-4", activeTheme.classes.primaryBgLight)}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BriefcaseBusiness className={cn("h-5 w-5", activeTheme.classes.primaryText)} />
                Recent Job Listings
              </CardTitle>
              <CardDescription>
                Manage your active job postings
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn("text-sm", activeTheme.classes.primaryText, activeTheme.classes.primaryHover, activeTheme.classes.primaryBorder)} 
              asChild
            >
              <Link href="/dashboard/manage-jobs" tabIndex={0} aria-label="View all job listings">
                View All Jobs
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {activeJobs.length > 0 ? (
            <div className="divide-y border-t">
              {activeJobs.slice(0, 3).map(job => (
                <div key={job.id} className={cn("flex items-start justify-between p-4 transition-colors", activeTheme.classes.primaryHover)}>
                  <div>
                    <h3 className="font-medium text-gray-800">{job.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs flex items-center gap-1", activeTheme.classes.primaryBorder, activeTheme.classes.primaryText)}
                      >
                        <MapPin className="h-3 w-3" />
                        {job.location || "Remote"}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Posted on {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.skills.slice(0, 2).map(skill => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className={cn("text-xs", activeTheme.classes.primaryBg, activeTheme.classes.primaryText, activeTheme.classes.primaryBorder)}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          +{job.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className={cn(activeTheme.classes.primaryText, activeTheme.classes.primaryHover)} asChild>
                      <Link 
                        href={`/dashboard/manage-jobs/${job.id}/edit`}
                        aria-label="Edit job"
                        tabIndex={0}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {activeJobs.length > 3 && (
                <div className="p-4 text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(activeTheme.classes.primaryBorder, activeTheme.classes.primaryText)} 
                    asChild
                  >
                    <Link href="/dashboard/manage-jobs">
                      View All {activeJobs.length} Active Jobs
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center border-t">
              <div className={cn("mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4", activeTheme.classes.primaryBg)}>
                <BriefcaseBusiness className={cn("h-7 w-7", activeTheme.classes.primaryText)} />
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">
                No active jobs
              </p>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Post a job to attract talented professionals to your business.
              </p>
              <Button className={cn(activeTheme.classes.primaryButton, activeTheme.classes.primaryButtonHover, "shadow-sm")} asChild>
                <Link href="/dashboard/post-job" tabIndex={0}>
                  Post a Job
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Matching professionals */}
      <Card className={cn("border shadow-sm", activeTheme.classes.secondaryBorder)}>
        <CardHeader className={cn("pb-4", activeTheme.classes.secondaryBgLight)}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className={cn("h-5 w-5", activeTheme.classes.secondaryText)} />
                Matching Professionals
              </CardTitle>
              <CardDescription>
                Professionals that match your job requirements
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "text-sm", 
                activeTheme.classes.secondaryText, 
                activeTheme.classes.secondaryHover, 
                activeTheme.classes.secondaryBorder
              )} 
              asChild
            >
              <Link href="/dashboard/find-professionals" tabIndex={0} aria-label="Find professionals">
                Find More
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {matchingProfessionals.length > 0 ? (
            <div className="divide-y border-t">
              {matchingProfessionals.map(pro => (
                <div key={pro.id} className={cn("flex items-start gap-4 p-4 transition-colors", activeTheme.classes.secondaryHover)}>
                  <Avatar className={cn("h-12 w-12 border", activeTheme.classes.secondaryBorder)}>
                    <AvatarImage src={pro.avatarUrl} alt={pro.name} />
                    <AvatarFallback className={cn(activeTheme.classes.secondaryBg, activeTheme.classes.secondaryText)}>
                      {pro.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">{pro.name}</h3>
                    <p className="text-sm text-gray-600 mt-0.5 truncate">{pro.title}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pro.skills.slice(0, 3).map(skill => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className={cn(
                            "text-xs", 
                            activeTheme.classes.secondaryBorder, 
                            activeTheme.classes.secondaryText, 
                            activeTheme.classes.secondaryBg
                          )}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {pro.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-200 bg-gray-50 text-gray-700">
                          +{pro.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className={cn(
                      activeTheme.classes.secondaryBg, 
                      activeTheme.classes.secondaryText, 
                      activeTheme.classes.secondaryHover, 
                      activeTheme.classes.secondaryBorder
                    )} 
                    asChild
                  >
                    <Link href={`/dashboard/find-professionals/${pro.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border-t">
              <div className={cn("mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4", activeTheme.classes.secondaryBg)}>
                <User className={cn("h-7 w-7", activeTheme.classes.secondaryText)} />
              </div>
              <p className="text-gray-700 text-lg font-medium mb-2">
                No matching professionals
              </p>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Post a job with relevant skills to attract professionals.
              </p>
              <Button 
                className={cn(
                  activeTheme.classes.secondaryButton, 
                  activeTheme.classes.secondaryButtonHover, 
                  "shadow-sm"
                )} 
                asChild
              >
                <Link href="/dashboard/post-job" tabIndex={0}>
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