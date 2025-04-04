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
  Download,
  Filter, 
  Plus, 
  RefreshCw, 
  Search, 
  UserPlus, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { users } from "@/data/mock";
import AdminUsersList from "@/components/admin/AdminUsersList";

// Enhanced users with additional admin properties like in AdminUsersList
const enhancedUsers = users.map(user => ({
  ...user,
  status: Math.random() > 0.2 ? "active" : "suspended",
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  isAdmin: user.email === "admin@nixerly.com",
  verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.4 ? "pending" : "unverified",
  accountType: Math.random() > 0.8 ? "premium" : "basic",
  notifications: Math.random() > 0.5,
  lastActivity: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString(),
  registrationSource: Math.random() > 0.6 ? "website" : Math.random() > 0.3 ? "mobile" : "api",
}));

// Add admin user
enhancedUsers.unshift({
  id: "admin-1",
  name: "Admin User",
  email: "admin@nixerly.com",
  avatar: "/avatars/admin.jpg",
  role: "business",
  joinedAt: new Date().toISOString(),
  location: "Dublin, Ireland",
  company: "Nixerly",
  position: "Founder & Admin",
  status: "active",
  lastLogin: new Date().toISOString(),
  isAdmin: true,
  verificationStatus: "verified",
  accountType: "premium",
  notifications: true,
  lastActivity: new Date().toISOString(),
  registrationSource: "website",
});

const UsersAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'all' | 'active' | 'suspended' | 'admins'>('all');
  const { toast } = useToast();

  // Mock function for bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select users to perform bulk actions.",
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
        description: `Successfully ${action} ${selectedUsers.length} users.`,
      });
      setSelectedUsers([]);
    }, 1000);
  };

  // Mock function for adding a new user
  const handleAddUser = () => {
    toast({
      title: "Feature not implemented",
      description: "Adding a new user is not implemented in this demo.",
    });
  };

  // Mock function for refreshing data
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "User data has been updated.",
      });
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-1 md:p-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, view details, and modify permissions.
          </p>
        </div>

        {/* User Management Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-blue-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold">{enhancedUsers.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-bold">{enhancedUsers.filter(u => u.status === "active").length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <h3 className="text-2xl font-bold">{enhancedUsers.filter(u => u.isAdmin).length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="flex flex-row items-center p-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Users (30d)</p>
                <h3 className="text-2xl font-bold">
                  {enhancedUsers.filter(u => {
                    const joinDate = new Date(u.joinedAt);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return joinDate >= thirtyDaysAgo;
                  }).length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Interface */}
        <Card className="border border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all user accounts across the platform
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
                  onClick={handleAddUser}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={(value) => setCurrentTab(value as 'all' | 'active' | 'suspended' | 'admins')}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="suspended">Suspended</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>
              
              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px] pl-9"
                  />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select 
                    value={roleFilter} 
                    onValueChange={setRoleFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedUsers.length > 0 && (
                  <div className="flex items-center ml-auto gap-2">
                    <Badge variant="secondary" className="bg-muted">
                      {selectedUsers.length} selected
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          Bulk Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleBulkAction("activated")}>
                          Activate Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBulkAction("suspended")}>
                          Suspend Selected
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
              
              {/* Main User List Content - Using a single AdminUsersList with different props instead of duplicating */}
              <TabsContent value="all" className="m-0">
                <AdminUsersList 
                  tabFilter="all"
                  statusFilter={statusFilter}
                  roleFilter={roleFilter}
                  searchQuery={searchQuery}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="active" className="m-0">
                <AdminUsersList 
                  tabFilter="active"
                  roleFilter={roleFilter}
                  searchQuery={searchQuery}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="suspended" className="m-0">
                <AdminUsersList 
                  tabFilter="suspended"
                  roleFilter={roleFilter}
                  searchQuery={searchQuery}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
              
              <TabsContent value="admins" className="m-0">
                <AdminUsersList 
                  tabFilter="admins"
                  statusFilter={statusFilter}
                  roleFilter={roleFilter}
                  searchQuery={searchQuery}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  showSearch={false}
                  showExport={false}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* User Settings & Permissions */}
        <Card className="border border-blue-100">
          <CardHeader>
            <CardTitle>User Settings & Permissions</CardTitle>
            <CardDescription>
              Configure global user settings and default permission levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">User Registration</h4>
                    <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">2FA Requirement</h4>
                    <p className="text-sm text-muted-foreground">Require two-factor authentication for all users</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Permissions</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="view-jobs" />
                  <label htmlFor="view-jobs" className="font-medium text-sm">
                    View Jobs
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="apply-jobs" checked />
                  <label htmlFor="apply-jobs" className="font-medium text-sm">
                    Apply to Jobs
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="create-jobs" />
                  <label htmlFor="create-jobs" className="font-medium text-sm">
                    Create Job Listings
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="message-users" checked />
                  <label htmlFor="message-users" className="font-medium text-sm">
                    Message Other Users
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

export default UsersAdminPage; 