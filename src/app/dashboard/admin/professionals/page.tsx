"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Activity,
  ArrowDownUp, 
  Check,
  Download,
  Filter, 
  Plus, 
  RefreshCw, 
  Search, 
  Star,
  ThumbsUp,
  Wrench,
  UserPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { professionals } from "@/data/mock";
import AdminProfessionalsList from "@/components/admin/AdminProfessionalsList";

// Initial professionals without randomized data
const initialProfessionals = professionals;

const ProfessionalsAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState("all");
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'all' | 'verified' | 'unverified' | 'featured'>('all');
  const { toast } = useToast();
  
  // Use state for enhancedProfessionals
  const [enhancedProfessionals, setEnhancedProfessionals] = useState([]);
  
  // Generate enhanced professionals data only on the client side
  useEffect(() => {
    const enhancedData = initialProfessionals.map(professional => ({
      ...professional,
      verified: Math.random() > 0.3,
      featured: Math.random() > 0.8,
      profileCompletion: Math.floor(Math.random() * 100),
      status: Math.random() > 0.2 ? "active" : "inactive",
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      skillVerificationLevel: Math.random() > 0.6 ? "expert" : Math.random() > 0.3 ? "intermediate" : "beginner",
      applicationRate: Math.random() > 0.5 ? "high" : Math.random() > 0.3 ? "medium" : "low",
      averageResponseTime: Math.floor(Math.random() * 48) + "h"
    }));
    
    setEnhancedProfessionals(enhancedData);
  }, []);

  // Mock function for bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedProfessionals.length === 0) {
      toast({
        title: "No professionals selected",
        description: "Please select professionals to perform bulk actions.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bulk action completed",
        description: `Successfully ${action} ${selectedProfessionals.length} professionals.`,
      });
      setSelectedProfessionals([]);
    }, 1000);
  };

  // Mock function for adding a new professional
  const handleAddProfessional = () => {
    toast({
      title: "Feature not implemented",
      description: "Adding a new professional is not implemented in this demo.",
    });
  };

  // Mock function for refreshing data
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Professional data has been updated.",
      });
    }, 800);
  };

  // Show skeleton loading state if data isn't ready
  if (enhancedProfessionals.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6 p-1 md:p-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Professional Management</h1>
            <p className="text-muted-foreground">
              Manage professional accounts, verify credentials, and review portfolios.
            </p>
          </div>
          
          {/* Loading skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-blue-100">
                <CardContent className="flex flex-row items-center p-6">
                  <div className="bg-blue-100/50 rounded-full p-3 mr-4 animate-pulse">
                    <div className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-8 bg-muted animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border border-blue-100">
            <CardHeader className="pb-2">
              <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="h-64 bg-muted/20 animate-pulse rounded" />
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-1 md:p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Professional Management</h1>
          <p className="text-muted-foreground">
            Manage professional accounts, verify credentials, and review portfolios.
          </p>
        </div>

        {/* Professional Management Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-blue-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Activity className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Professionals</p>
                <h3 className="text-2xl font-bold">{enhancedProfessionals.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Check className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <h3 className="text-2xl font-bold">{enhancedProfessionals.filter(p => p.verified).length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <Star className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <h3 className="text-2xl font-bold">{enhancedProfessionals.filter(p => p.featured).length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Wrench className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Rated</p>
                <h3 className="text-2xl font-bold">
                  {enhancedProfessionals.filter(p => (p.rating || 0) >= 4.5).length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Management Interface */}
        <Card className="border border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Professional Management</CardTitle>
                <CardDescription>
                  Manage professionals, verify credentials, and feature top talent
                </CardDescription>
              </div>
              <div className="flex flex-row gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="hidden sm:flex"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hidden sm:flex"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAddProfessional}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Professional
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={(value) => setCurrentTab(value as 'all' | 'verified' | 'unverified' | 'featured')}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Professionals</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="unverified">Unverified</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
              
              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search professionals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px] pl-9"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select 
                    value={skillsFilter} 
                    onValueChange={setSkillsFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="nix">Nix/NixOS</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="cloud">Cloud Infrastructure</SelectItem>
                      <SelectItem value="sysadmin">System Administration</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={verificationFilter}
                    onValueChange={setVerificationFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Verification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Verification</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedProfessionals.length > 0 && (
                  <div className="flex items-center ml-auto gap-2">
                    <Badge variant="secondary" className="bg-muted">
                      {selectedProfessionals.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleBulkAction("verified")}>
                          Verify Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("featured")}>
                          Feature Selected
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleBulkAction("removed verification from")}>
                          Remove Verification
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => handleBulkAction("deleted")}
                          className="text-red-600"
                        >
                          Delete Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              
              {/* Professional List */}
              <TabsContent value="all" className="m-0">
                <AdminProfessionalsList 
                  tabFilter="all"
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  skillsFilter={skillsFilter}
                  selectedProfessionals={selectedProfessionals}
                  setSelectedProfessionals={setSelectedProfessionals}
                  showSearch={false}
                  showExport={false}
                  professionals={enhancedProfessionals}
                />
              </TabsContent>
              
              <TabsContent value="verified" className="m-0">
                <AdminProfessionalsList 
                  tabFilter="verified"
                  searchQuery={searchQuery}
                  skillsFilter={skillsFilter}
                  selectedProfessionals={selectedProfessionals}
                  setSelectedProfessionals={setSelectedProfessionals}
                  showSearch={false}
                  showExport={false}
                  professionals={enhancedProfessionals}
                />
              </TabsContent>
              
              <TabsContent value="unverified" className="m-0">
                <AdminProfessionalsList 
                  tabFilter="unverified"
                  searchQuery={searchQuery}
                  skillsFilter={skillsFilter}
                  selectedProfessionals={selectedProfessionals}
                  setSelectedProfessionals={setSelectedProfessionals}
                  showSearch={false}
                  showExport={false}
                  professionals={enhancedProfessionals}
                />
              </TabsContent>
              
              <TabsContent value="featured" className="m-0">
                <AdminProfessionalsList 
                  tabFilter="featured"
                  verificationFilter={verificationFilter}
                  searchQuery={searchQuery}
                  skillsFilter={skillsFilter}
                  selectedProfessionals={selectedProfessionals}
                  setSelectedProfessionals={setSelectedProfessionals}
                  showSearch={false}
                  showExport={false}
                  professionals={enhancedProfessionals}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Verification Settings */}
        <Card className="border border-blue-100">
          <CardHeader>
            <CardTitle>Professional Verification Settings</CardTitle>
            <CardDescription>
              Configure verification requirements and featured professional criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Verification Requirements</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for all professionals</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Identity Verification</h4>
                    <p className="text-sm text-muted-foreground">Require ID verification for verified badge</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Certification Check</h4>
                    <p className="text-sm text-muted-foreground">Verify all uploaded professional certifications</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Featured Professional Criteria</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Minimum Rating</h4>
                    <p className="text-sm text-muted-foreground">Only feature professionals with 4.5+ rating</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Complete Profile</h4>
                    <p className="text-sm text-muted-foreground">Require 90%+ profile completion</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Featuring</h4>
                    <p className="text-sm text-muted-foreground">Automatically feature top professionals</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfessionalsAdminPage; 