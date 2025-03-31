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
  Star
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dummyJobs, dummyProfessionals } from "@/lib/dummy-data";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export const BusinessDashboard = () => {
  const { business } = useAppStore();

  if (!business) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please complete your business profile to see your dashboard.</p>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {business.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/post-job" tabIndex={0}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{draftJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{businessJobs.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BriefcaseBusiness className="mr-2 h-5 w-5" />
              Job Listings
            </CardTitle>
            <CardDescription>
              Manage your job postings
            </CardDescription>
          </CardHeader>
          
          <div className="border-b">
            <Tabs defaultValue="active">
              <div className="px-4">
                <TabsList className="w-full justify-start border-b-0 bg-transparent p-0 h-auto mb-[-1px]">
                  <TabsTrigger 
                    value="active" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Active ({activeJobs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="drafts" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Drafts ({draftJobs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="closed" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Closed ({closedJobs.length})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="active" className="p-0 m-0">
                <div className="divide-y">
                  {activeJobs.length > 0 ? (
                    activeJobs.map(job => (
                      <div key={job.id} className="flex items-start justify-between p-4">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Posted on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/edit`}
                              aria-label="Edit job"
                              tabIndex={0}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
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
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        You don't have any active jobs.
                      </p>
                      <Button className="mt-4" asChild>
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
                      <div key={job.id} className="flex items-start justify-between p-4">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Created on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link 
                              href={`/dashboard/manage-jobs/${job.id}/edit`}
                              aria-label="Edit draft"
                              tabIndex={0}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
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
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        You don't have any draft jobs.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="closed" className="p-0 m-0">
                <div className="divide-y">
                  {closedJobs.length > 0 ? (
                    closedJobs.map(job => (
                      <div key={job.id} className="flex items-start justify-between p-4">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {job.location || "Remote"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Posted on {new Date(job.datePosted).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" asChild>
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
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        You don't have any closed jobs.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Button variant="ghost" className="text-sm" asChild>
              <Link href="/dashboard/manage-jobs" tabIndex={0}>
                View All Jobs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Find Professionals
            </CardTitle>
            <CardDescription>
              Search for professionals by skills and location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search professionals by skills or location..." 
                className="pl-9"
              />
            </div>
            
            <div className="space-y-3">
              {matchingProfessionals.length > 0 ? (
                matchingProfessionals.map(pro => (
                  <div key={pro.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatars/professional.jpg" alt={pro.name} />
                      <AvatarFallback>
                        {pro.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{pro.name}</h3>
                        {pro.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {pro.location || "Remote"}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pro.skills.slice(0, 3).map(skill => 
                          uniqueSkills.includes(skill) ? (
                            <Badge key={skill} className="text-xs">
                              {skill}
                            </Badge>
                          ) : (
                            <Badge key={skill} variant="secondary" className="text-xs">
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
                  <p className="text-muted-foreground">
                    No matching professionals found.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <Button variant="ghost" className="text-sm" asChild>
              <Link href="/dashboard/find-professionals" tabIndex={0}>
                View All Professionals
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
          <CardDescription>
            Professionals who have expressed interest in your jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Star className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No Recent Applicants</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
              When professionals apply to your job listings, they'll appear here.
              Make sure your job descriptions are complete to attract the right candidates.
            </p>
            <Button className="mt-4" asChild>
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