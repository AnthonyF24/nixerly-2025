import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { dummyJobs } from "@/lib/dummy-data";
import { CheckCircle, Clock, Lightbulb, Star, Award } from "lucide-react";
import Link from "next/link";

export const ProfessionalDashboard = () => {
  const { professional } = useAppStore();

  if (!professional) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please complete your profile to see your dashboard.</p>
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
      href: "/dashboard/profile"
    },
    { 
      id: "certifications", 
      label: "Upload certifications", 
      completed: professional.certifications.length > 0,
      href: "/dashboard/profile#certifications"
    },
    { 
      id: "portfolio", 
      label: "Add portfolio items", 
      completed: professional.portfolio.length > 0,
      href: "/dashboard/portfolio"
    },
    { 
      id: "location", 
      label: "Set your location", 
      completed: professional.location !== undefined,
      href: "/dashboard/profile"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {professional.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={professional.availability ? "default" : "outline"}
            className="text-sm py-1"
          >
            {professional.availability ? "Available for Work" : "Unavailable"}
          </Badge>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/profile#availability" tabIndex={0}>
              Update Status
            </Link>
          </Button>
        </div>
      </div>

      {professional.profileComplete < 100 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Your profile is {professional.profileComplete}% complete. 
              Finish the remaining tasks to increase visibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={professional.profileComplete} 
              className="h-2" 
              aria-label="Profile completion progress"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center gap-2"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle 
                      className={`h-5 w-5 ${
                        task.completed ? "text-green-500" : "text-muted-foreground"
                      }`} 
                    />
                  </div>
                  <Link 
                    href={task.href}
                    className="text-sm hover:underline"
                    tabIndex={0}
                  >
                    {task.label}
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Job Matches</CardTitle>
            <CardDescription>
              Jobs that match your skills and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {matchingJobs.length > 0 ? (
                matchingJobs.map(job => (
                  <div key={job.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.businessName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(job.datePosted).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Button size="sm" asChild>
                        <Link 
                          href={`/dashboard/jobs/${job.id}`}
                          tabIndex={0}
                        >
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">
                    No matching jobs found. Update your skills to see more opportunities.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/jobs" className="text-sm" tabIndex={0}>
                View All Jobs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>AI Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Skill Recommendations</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Based on job market trends:
                </p>
                <div className="flex flex-wrap gap-1">
                  {suggestedSkills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs bg-yellow-50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Profile Optimization</h3>
                <ul className="text-xs space-y-1 mt-1">
                  <li className="flex items-start gap-1">
                    <Star className="h-3 w-3 text-yellow-500 mt-0.5" />
                    <span>Add more detail to your project descriptions</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <Star className="h-3 w-3 text-yellow-500 mt-0.5" />
                    <span>Include metrics and results in your portfolio</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium">Recommended Certifications</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span className="text-xs">AWS Solutions Architect</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/improve-profile" tabIndex={0}>
                Improve Your Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="portfolio">Recent Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Your Certifications</CardTitle>
              <CardDescription>
                Showcase your credentials to potential employers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {professional.certifications.length > 0 ? (
                <div className="space-y-4">
                  {professional.certifications.map(cert => (
                    <div key={cert.id} className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • Issued {new Date(cert.date).toLocaleDateString()}
                        </p>
                        {cert.validUntil && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Valid until {new Date(cert.validUntil).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {cert.verified && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    You haven't added any certifications yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/profile#certifications" tabIndex={0}>
                      Add Certification
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Items</CardTitle>
              <CardDescription>
                Your most recent work samples
              </CardDescription>
            </CardHeader>
            <CardContent>
              {professional.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {professional.portfolio.map(item => (
                    <div key={item.id} className="overflow-hidden rounded-lg border">
                      <div className="relative aspect-video bg-muted">
                        <img 
                          src={item.imageUrl} 
                          alt={item.altText} 
                          className="object-cover w-full h-full" 
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
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
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    You haven't added any portfolio items yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/portfolio" tabIndex={0}>
                      Add Portfolio Item
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button variant="ghost" className="text-sm" asChild>
                <Link href="/dashboard/portfolio" tabIndex={0}>
                  Manage Portfolio
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 