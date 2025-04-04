"use client";

import React, { useState } from "react";
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
  ArrowDownUp, 
  Building,
  Building2,
  Check,
  Download,
  Filter, 
  Plus, 
  RefreshCw, 
  Search,
  Settings, 
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { users } from "@/data/mock";
import AdminBusinessesList from "@/components/admin/AdminBusinessesList";

// Filter business users and add business-specific properties
const businessUsers = users
  .filter(user => user.role === "business")
  .map(user => ({
    ...user,
    verified: Math.random() > 0.3,
    featured: Math.random() > 0.8,
    subscription: {
      plan: Math.random() > 0.6 ? "enterprise" : Math.random() > 0.3 ? "professional" : "free",
      status: Math.random() > 0.2 ? "active" : "inactive",
      expiryDate: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString()
    },
    jobsPosted: Math.floor(Math.random() * 10),
    totalSpent: Math.floor(Math.random() * 5000),
    status: Math.random() > 0.2 ? "active" : "inactive",
    industry: ["Construction", "Engineering", "Architecture"].slice(0, Math.floor(Math.random() * 3) + 1),
    type: ["contractor", "agency", "company"][Math.floor(Math.random() * 3)]
  }));

const BusinessesAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'all' | 'active' | 'featured' | 'verified'>('all');
  const { toast } = useToast();

  // Mock function for bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedBusinesses.length === 0) {
      toast({
        title: "No businesses selected",
        description: "Please select businesses to perform bulk actions.",
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
        description: `Successfully ${action} ${selectedBusinesses.length} businesses.`,
      });
      setSelectedBusinesses([]);
    }, 1000);
  };

  // Mock function for adding a new business
  const handleAddBusiness = () => {
    toast({
      title: "Feature not implemented",
      description: "Adding a new business is not implemented in this demo.",
    });
  };

  // Mock function for refreshing data
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Business data has been updated.",
      });
    }, 800);
  };

  const activeBusinesses = businessUsers.filter(business => business.status === 'active');
  const featuredBusinesses = businessUsers.filter(business => business.featured);
  const verifiedBusinesses = businessUsers.filter(business => business.verified);
  const enterpriseBusinesses = businessUsers.filter(business => business.subscription.plan === 'enterprise');
  const professionalBusinesses = businessUsers.filter(business => business.subscription.plan === 'professional');
  const freeBusinesses = businessUsers.filter(business => business.subscription.plan === 'free');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-1 md:p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Business Management</h1>
          <p className="text-muted-foreground">
            Manage business accounts, verification, and subscription plans.
          </p>
        </div>

        {/* Business Management Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-blue-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Building2 className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Businesses</p>
                <h3 className="text-2xl font-bold">{businessUsers.length}</h3>
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
                <h3 className="text-2xl font-bold">{verifiedBusinesses.length}</h3>
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
                <h3 className="text-2xl font-bold">{featuredBusinesses.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Settings className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enterprise</p>
                <h3 className="text-2xl font-bold">{enterpriseBusinesses.length}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Plan Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Free Plan</h3>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  {freeBusinesses.length} businesses
                </Badge>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-gray-600 h-2.5 rounded-full" 
                  style={{ width: `${(freeBusinesses.length / businessUsers.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Professional Plan</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {professionalBusinesses.length} businesses
                </Badge>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(professionalBusinesses.length / businessUsers.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Enterprise Plan</h3>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {enterpriseBusinesses.length} businesses
                </Badge>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${(enterpriseBusinesses.length / businessUsers.length) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Management Interface */}
        <Card className="border border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Business Management</CardTitle>
                <CardDescription>
                  Manage all business accounts across the platform
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
                  onClick={handleAddBusiness}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={(value) => setCurrentTab(value as 'all' | 'active' | 'featured' | 'verified')}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Businesses</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
              </TabsList>
              
              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px] pl-9"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select 
                    value={planFilter} 
                    onValueChange={setPlanFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="free">Free Plan</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={industryFilter}
                    onValueChange={setIndustryFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedBusinesses.length > 0 && (
                  <div className="flex items-center ml-auto gap-2">
                    <Badge variant="secondary" className="bg-muted">
                      {selectedBusinesses.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleBulkAction("activated")}>
                          Activate Accounts
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("verified")}>
                          Verify Businesses
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("featured")}>
                          Add to Featured
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("upgraded")}>
                          Upgrade Plan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onSelect={() => handleBulkAction("deleted")}
                          className="text-red-600"
                        >
                          Delete Businesses
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              
              {/* Main Business List Content - Using AdminBusinessesList with different props */}
              <TabsContent value="all" className="m-0">
                <AdminBusinessesList 
                  tabFilter="all"
                  planFilter={planFilter}
                  industryFilter={industryFilter}
                  searchQuery={searchQuery}
                  selectedBusinesses={selectedBusinesses}
                  setSelectedBusinesses={setSelectedBusinesses}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="active" className="m-0">
                <AdminBusinessesList 
                  tabFilter="active"
                  planFilter={planFilter}
                  industryFilter={industryFilter}
                  searchQuery={searchQuery}
                  selectedBusinesses={selectedBusinesses}
                  setSelectedBusinesses={setSelectedBusinesses}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="featured" className="m-0">
                <AdminBusinessesList 
                  tabFilter="featured"
                  planFilter={planFilter}
                  industryFilter={industryFilter}
                  searchQuery={searchQuery}
                  selectedBusinesses={selectedBusinesses}
                  setSelectedBusinesses={setSelectedBusinesses}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="verified" className="m-0">
                <AdminBusinessesList 
                  tabFilter="verified"
                  planFilter={planFilter}
                  industryFilter={industryFilter}
                  searchQuery={searchQuery}
                  selectedBusinesses={selectedBusinesses}
                  setSelectedBusinesses={setSelectedBusinesses}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Business Verification & Featured Settings */}
        <Card className="border border-blue-100">
          <CardHeader>
            <CardTitle>Business Settings & Configuration</CardTitle>
            <CardDescription>
              Configure business verification workflow and featured business requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Verification Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-verify paid businesses</h4>
                    <p className="text-sm text-muted-foreground">Automatically verify businesses on paid plans</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Require business documents</h4>
                    <p className="text-sm text-muted-foreground">Require business registration documents for verification</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-review queue</h4>
                    <p className="text-sm text-muted-foreground">Automatically process verification queue daily</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Featured Business Requirements</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="verified-required" checked />
                  <label htmlFor="verified-required" className="font-medium text-sm">
                    Must be verified business
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="complete-profile" checked />
                  <label htmlFor="complete-profile" className="font-medium text-sm">
                    Must have complete profile
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="active-jobs" />
                  <label htmlFor="active-jobs" className="font-medium text-sm">
                    Must have active job listings
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="premium-plan" checked />
                  <label htmlFor="premium-plan" className="font-medium text-sm">
                    Must be on a premium plan
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BusinessesAdminPage; 