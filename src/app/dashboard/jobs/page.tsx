"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import AdvancedSearchFilters from "@/components/jobs/AdvancedSearchFilters";
import JobList from "@/components/jobs/JobList";
import { dummyProfessionals } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Search, 
  Building2, 
  Users, 
  Bell, 
  Star, 
  Filter, 
  PanelTop, 
  Map,
  CalendarCheck,
  Globe2,
  Clock,
  SlidersHorizontal
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const JobBoardPage = () => {
  const { setProfessional, setUserType, setIsAuthenticated, isAuthenticated, userType, professional, jobFilters, setJobFilters } = useAppStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // For demo purposes, always set as authenticated professional user
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    // Only set professional user data if the user is already a professional or there's no user type set
    if (userType === "professional" || userType === null) {
      setProfessional(dummyProfessionals[0]);
      setUserType("professional");
    }
    
    // In a real application, we would check if the user is authenticated and a professional
    // If not, redirect to login or unauthorized page
    // This is commented out since we're using dummy data for demo purposes
    /*
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (userType !== 'professional') {
      router.push('/unauthorized');
      return;
    }
    */
  }, [setProfessional, setUserType, setIsAuthenticated, isAuthenticated, userType, router]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    // Handle search query
    console.log('Search query:', searchQuery);
    setSearchQuery(searchQuery);
  };

  const renderJobStats = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-blue-100 hover:border-blue-200 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-2.5">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Jobs</p>
              <p className="text-2xl font-semibold text-gray-900">136</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-blue-100 hover:border-blue-200 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-2.5">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Companies</p>
              <p className="text-2xl font-semibold text-gray-900">28</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-blue-100 hover:border-blue-200 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-amber-100 p-2.5">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Skill Matches</p>
              <p className="text-2xl font-semibold text-gray-900">{professional?.skills.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-blue-100 hover:border-blue-200 transition-colors">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-2.5">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recent Views</p>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderQuickActions = () => {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-800">
          <Star className="mr-1.5 h-4 w-4" />
          Save Search
        </Button>
        <Button variant="outline" size="sm" className="text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100 hover:text-purple-800">
          <Bell className="mr-1.5 h-4 w-4" />
          Create Alert
        </Button>
        <Button variant="outline" size="sm" className="text-green-700 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-800">
          <CalendarCheck className="mr-1.5 h-4 w-4" />
          Schedule Search
        </Button>
        <Button variant="outline" size="sm" className="text-amber-700 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-800">
          <Globe2 className="mr-1.5 h-4 w-4" />
          Explore Areas
        </Button>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-2">
              Jobs Board
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Find Your Perfect Construction Job
            </h1>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Browse and apply for jobs that match your skills and preferences. We have {136} open positions from {28} companies.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    name="search"
                    placeholder="Search jobs by title, skill, or location..."
                    className="pl-10 h-12 border-transparent focus-visible:ring-blue-400/30 bg-white/95 text-gray-900 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white h-12 px-6"
                >
                  Find Jobs
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8">
          {renderQuickActions()}
          {renderJobStats()}
          
          <Tabs defaultValue="all" className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="bg-muted/30 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">All Jobs</TabsTrigger>
                <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">Recommended</TabsTrigger>
                <TabsTrigger value="applied" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">Applied</TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">Saved</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  <span>Job Map</span>
                </Button>
                <Button variant="outline" size="sm" className="text-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Job Alerts</span>
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0 space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 order-2 lg:order-1 h-full">
                  <div className="sticky top-4">
                    <AdvancedSearchFilters />
                  </div>
                </div>
                
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <JobList />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="mt-0 space-y-0">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center p-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full mb-6">
                    <Star className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Personalized Job Recommendations</h3>
                  <p className="text-gray-600 max-w-lg mt-3 mb-6">
                    We'll analyze your skills and experience to find the perfect construction jobs that match your unique profile.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Update Your Skills
                    </Button>
                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      View Profile Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applied" className="mt-0 space-y-0">
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center p-8">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full mb-6">
                    <PanelTop className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Track Your Job Applications</h3>
                  <p className="text-gray-600 max-w-lg mt-3 mb-6">
                    Keep track of all the construction jobs you've applied to and monitor their current status in one convenient dashboard.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                      See Your Applications
                    </Button>
                    <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      Application Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0 space-y-0">
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center p-8">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-full mb-6">
                    <Filter className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Save Jobs for Later</h3>
                  <p className="text-gray-600 max-w-lg mt-3 mb-6">
                    Bookmark interesting construction jobs to apply for later and organize them by categories that work for you.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                      Start Saving Jobs
                    </Button>
                    <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                      Job Search Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobBoardPage; 