import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { dummyJobs } from "@/lib/dummy-data";
import { 
  CheckCircle, 
  Clock, 
  Lightbulb, 
  Star, 
  Award, 
  CalendarDays, 
  GraduationCap, 
  Briefcase, 
  Activity, 
  TrendingUp, 
  BarChart,
  ArrowRight,
  MapPin,
  User,
  Users,
  ExternalLink 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const ProfessionalDashboard = () => {
  const { professional } = useAppStore();

  if (!professional) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-muted/30 rounded-lg border border-dashed">
        <User className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg font-medium">Please complete your profile to see your dashboard.</p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/profile" tabIndex={0}>Create Profile</Link>
        </Button>
      </div>
    );
  }

  // Filter jobs that match the professional's skills
  const matchingJobs = dummyJobs
    .filter(job => job.status === "open")
    .filter(job => job.skills.some(skill => professional.skills.includes(skill)))
    .slice(0, 3);

  // Suggested skills based on job market demand
  const suggestedSkills = ["TypeScript", "Docker", "AWS Lambda", "React Native"];

  // Profile completion tasks
  const tasks = [
    { 
      id: "profile", 
      label: "Complete your profile", 
      completed: professional.bio !== undefined,
      href: "/dashboard/profile",
      icon: User
    },
    { 
      id: "certifications", 
      label: "Upload certifications", 
      completed: professional.certifications.length > 0,
      href: "/dashboard/profile#certifications",
      icon: GraduationCap
    },
    { 
      id: "portfolio", 
      label: "Add portfolio items", 
      completed: professional.portfolio.length > 0,
      href: "/dashboard/portfolio",
      icon: Briefcase
    },
    { 
      id: "location", 
      label: "Set your location", 
      completed: professional.location !== undefined,
      href: "/dashboard/profile",
      icon: MapPin
    }
  ];

  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-md">
              <AvatarImage src={professional.avatarUrl} alt={professional.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-lg">
                {professional.name?.charAt(0) || 'P'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {professional.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{professional.title || "Professional"}</span>
                {professional.location && (
                  <>
                    <span className="mx-1">•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{professional.location}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Badge 
              variant={professional.availability ? "default" : "outline"}
              className={cn(
                "text-sm py-1.5 px-3 rounded-full flex items-center gap-1.5",
                professional.availability 
                  ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                professional.availability ? "bg-green-500" : "bg-gray-500"
              )} />
              {professional.availability ? "Available for Work" : "Unavailable"}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="shadow-sm border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link 
                href="/dashboard/profile#availability" 
                tabIndex={0}
                className="flex items-center gap-1"
                aria-label="Update availability status"
              >
                Update Status
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {professional.profileComplete < 100 && (
        <Card className="overflow-hidden border-primary/10 shadow-md">
          <CardHeader className="pb-3 bg-primary/5">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-primary" />
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-base">
              Your profile is <span className="font-medium text-primary">{completionPercentage.toFixed(0)}%</span> complete. 
              Complete all tasks to increase your visibility to potential clients.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Progress 
              value={completionPercentage} 
              className="h-2.5 bg-primary/10" 
              aria-label="Profile completion progress"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {tasks.map(task => {
                const Icon = task.icon;
                return (
                  <div 
                    key={task.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      task.completed ? "bg-green-50" : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center",
                        task.completed ? "bg-green-100" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          task.completed ? "text-green-600" : "text-muted-foreground"
                        )} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={task.href}
                        className={cn(
                          "text-sm font-medium hover:underline flex items-center gap-1",
                          task.completed ? "text-green-700" : "text-muted-foreground"
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
                          task.completed ? "text-green-500" : "text-muted stroke-[0.5]"
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
        <Card className="md:col-span-2 border-primary/10 shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Job Matches
                </CardTitle>
                <CardDescription className="text-base">
                  Opportunities that match your skills and preferences
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-sm" asChild>
                <Link href="/dashboard/jobs" tabIndex={0} aria-label="View all job matches">
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {matchingJobs.length > 0 ? (
                matchingJobs.map(job => (
                  <div key={job.id} className="p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs bg-muted">
                              {job.businessName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground">
                            {job.businessName}
                          </p>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location || "Remote"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            {new Date(job.datePosted).toLocaleDateString()}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm mt-3 line-clamp-2 text-muted-foreground">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skills.map(skill => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="text-xs bg-primary/5 text-primary border-primary/10"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <Button size="sm" className="shadow-sm" asChild>
                        <Link 
                          href={`/dashboard/jobs/${job.id}`}
                          tabIndex={0}
                          aria-label={`View details for ${job.title}`}
                        >
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="shadow-sm border-primary/20" asChild>
                        <Link 
                          href={`/dashboard/jobs/${job.id}/apply`}
                          tabIndex={0}
                          aria-label={`Apply for ${job.title}`}
                        >
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg font-medium mb-2">
                    No matching jobs found
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Update your skills to see more opportunities or check back later for new listings.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/profile#skills" tabIndex={0}>
                      Update Skills
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/10 shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-5">
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                <h3 className="text-sm font-medium flex items-center gap-2 text-amber-700">
                  <TrendingUp className="h-4 w-4" />
                  Market Trends
                </h3>
                <p className="text-xs text-amber-600 mb-3">
                  Skills in high demand right now:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedSkills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs bg-amber-50 border-amber-200 text-amber-700"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="link" size="sm" className="text-xs text-amber-700 p-0 h-auto mt-2" asChild>
                  <Link href="/dashboard/market-insights" tabIndex={0}>
                    View Market Report
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <BarChart className="h-4 w-4 text-primary" />
                  <span>Profile Optimization</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                    <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Add more detail to your project descriptions</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                    <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Include metrics and results in your portfolio</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>Recommended Certifications</span>
                </h3>
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/dashboard/learning/aws-architect" 
                    tabIndex={0}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted transition-colors"
                  >
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">AWS Solutions Architect</span>
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </Link>
                  <Link 
                    href="/dashboard/learning/azure-devops" 
                    tabIndex={0}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted transition-colors"
                  >
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Azure DevOps Engineer</span>
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4">
            <Button variant="default" size="sm" className="w-full shadow-sm" asChild>
              <Link href="/dashboard/improve-profile" tabIndex={0} aria-label="Get personalized recommendations for improving your profile">
                Get Personalized Recommendations
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/40">
          <TabsTrigger 
            value="certifications"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Certifications
          </TabsTrigger>
          <TabsTrigger 
            value="portfolio"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Portfolio
          </TabsTrigger>
        </TabsList>
        <TabsContent value="certifications">
          <Card className="border-primary/10 shadow-md overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Your Certifications
                  </CardTitle>
                  <CardDescription className="text-base">
                    Showcase your credentials to potential employers
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="shadow-sm border-primary/20" asChild>
                  <Link href="/dashboard/profile#certifications" tabIndex={0} aria-label="Add new certification">
                    Add New
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {professional.certifications.length > 0 ? (
                <div className="space-y-4">
                  {professional.certifications.map(cert => (
                    <div 
                      key={cert.id} 
                      className="flex items-start gap-4 p-4 rounded-lg border border-primary/10 bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-base">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                          <span>{cert.issuer}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                          <CalendarDays className="h-3 w-3" />
                          <span>Issued {new Date(cert.date).toLocaleDateString()}</span>
                        </p>
                        {cert.validUntil && (
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            Valid until {new Date(cert.validUntil).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-2">
                        {cert.verified && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg font-medium mb-2">
                    You haven't added any certifications yet
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Showcase your skills and expertise by adding professional certifications to your profile.
                  </p>
                  <Button className="shadow-md" asChild>
                    <Link href="/dashboard/profile#certifications" tabIndex={0}>
                      Add Your First Certification
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio">
          <Card className="border-primary/10 shadow-md overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Portfolio Items
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your most recent work samples
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="shadow-sm border-primary/20" asChild>
                  <Link href="/dashboard/portfolio/add" tabIndex={0} aria-label="Add new portfolio item">
                    Add New
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              {professional.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {professional.portfolio.map(item => (
                    <div 
                      key={item.id} 
                      className="overflow-hidden rounded-lg border border-primary/10 bg-muted/20 hover:bg-muted/30 transition-colors shadow-sm"
                    >
                      <div className="relative aspect-video bg-muted overflow-hidden group">
                        <img 
                          src={item.imageUrl} 
                          alt={item.altText} 
                          className="object-cover w-full h-full transition-transform group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                          <Button variant="secondary" size="sm" className="shadow-md" asChild>
                            <Link href={`/dashboard/portfolio/${item.id}`} tabIndex={0}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-base">{item.title}</h3>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {new Date(item.date).getFullYear()}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-xs bg-primary/5 text-primary border-primary/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg font-medium mb-2">
                    You haven't added any portfolio items yet
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Showcase your best work to potential clients by adding portfolio items to your profile.
                  </p>
                  <Button className="shadow-md" asChild>
                    <Link href="/dashboard/portfolio" tabIndex={0}>
                      Add Your First Portfolio Item
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <Button variant="ghost" className="text-sm w-full" asChild>
                <Link href="/dashboard/portfolio" tabIndex={0} aria-label="Manage all portfolio items">
                  Manage All Portfolio Items
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 