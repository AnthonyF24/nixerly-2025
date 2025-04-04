"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { users } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Check, 
  CreditCard, 
  Eye, 
  MoreHorizontal, 
  Star, 
  X 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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

// Add a "demo" business
businessUsers.unshift({
  id: "business-demo",
  name: "Nixerly Construction",
  email: "demo@nixerly.com",
  avatar: "/avatars/business-b1.jpg",
  role: "business",
  joinedAt: new Date().toISOString(),
  location: "Dublin, Ireland",
  company: "Nixerly Construction",
  position: "Demo Account",
  verified: true,
  featured: true,
  subscription: {
    plan: "enterprise",
    status: "active",
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  jobsPosted: 12,
  totalSpent: 4500,
  status: "active",
  industry: ["Construction", "Engineering"],
  type: "contractor"
});

// Props type definition
interface AdminBusinessesListProps {
  tabFilter?: 'all' | 'active' | 'featured' | 'verified';
  planFilter?: string;
  statusFilter?: string;
  industryFilter?: string;
  typeFilter?: string;
  searchQuery?: string;
  selectedBusinesses?: string[];
  setSelectedBusinesses?: React.Dispatch<React.SetStateAction<string[]>>;
  showSearch?: boolean;
  showExport?: boolean;
}

const AdminBusinessesList = ({
  tabFilter = 'all',
  planFilter = 'all',
  statusFilter = 'all',
  industryFilter = 'all',
  typeFilter = 'all',
  searchQuery = '',
  selectedBusinesses = [],
  setSelectedBusinesses = () => {},
  showSearch = true,
  showExport = true
}: AdminBusinessesListProps) => {
  const [businesses, setBusinesses] = useState(businessUsers);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localPlanFilter, setLocalPlanFilter] = useState(planFilter);
  const { toast } = useToast();

  const handleToggleVerification = (id: string) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id ? { ...business, verified: !business.verified } : business
      )
    );

    const business = businesses.find(b => b.id === id);
    
    toast({
      title: business?.verified ? "Verification removed" : "Business verified",
      description: `${business?.name}'s verification status has been updated.`,
    });
  };

  const handleToggleStatus = (id: string, newStatus: string) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id ? { ...business, status: newStatus } : business
      )
    );

    toast({
      title: "Business status updated",
      description: `The business account is now ${newStatus}.`,
    });
  };

  const handleToggleFeatured = (id: string) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id ? { ...business, featured: !business.featured } : business
      )
    );

    const business = businesses.find(b => b.id === id);
    
    toast({
      title: business?.featured ? "Removed from featured" : "Added to featured",
      description: `${business?.name} has been ${business?.featured ? "removed from" : "added to"} featured businesses.`,
    });
  };

  const handleChangePlan = (id: string, plan: string) => {
    setBusinesses(prev => 
      prev.map(business => 
        business.id === id ? { 
          ...business, 
          subscription: { 
            ...business.subscription, 
            plan: plan,
            status: "active",
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          } 
        } : business
      )
    );

    toast({
      title: "Subscription plan updated",
      description: `The business subscription has been updated to ${plan}.`,
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedBusinesses(filteredBusinesses.map(business => business.id));
    } else {
      setSelectedBusinesses([]);
    }
  };

  const handleSelectBusiness = (id: string) => {
    if (selectedBusinesses.includes(id)) {
      setSelectedBusinesses(prev => prev.filter(businessId => businessId !== id));
    } else {
      setSelectedBusinesses(prev => [...prev, id]);
    }
  };

  // Filter businesses based on tab, search query, plan filter, and other filters
  const filteredBusinesses = businesses.filter(business => {
    // Tab filtering
    if (tabFilter === 'active' && business.status !== 'active') return false;
    if (tabFilter === 'featured' && !business.featured) return false;
    if (tabFilter === 'verified' && !business.verified) return false;

    // Search filtering
    const searchTerm = searchQuery || localSearchQuery;
    const matchesSearch = 
      !searchTerm ||
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      business.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.company && business.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Plan filtering
    let matchesPlan = true;
    if (planFilter !== "all" && localPlanFilter !== "all") {
      const effectivePlanFilter = planFilter !== "all" ? planFilter : localPlanFilter;
      matchesPlan = business.subscription.plan === effectivePlanFilter;
    }
    
    // Status filtering
    let matchesStatus = true;
    if (statusFilter !== "all") {
      matchesStatus = business.status === statusFilter;
    }

    // Industry filtering
    let matchesIndustry = true;
    if (industryFilter !== "all") {
      matchesIndustry = business.industry.includes(industryFilter);
    }

    // Type filtering
    let matchesType = true;
    if (typeFilter !== "all") {
      matchesType = business.type === typeFilter;
    }
    
    return matchesSearch && matchesPlan && matchesStatus && matchesIndustry && matchesType;
  });

  const getSubscriptionBadgeClass = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "professional":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="w-full sm:w-auto flex-1 sm:max-w-sm">
            <Input
              placeholder="Search businesses..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={localPlanFilter} onValueChange={setLocalPlanFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free Plan</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            {showExport && (
              <Button size="sm" variant="outline" className="hidden sm:flex whitespace-nowrap">
                Export Data
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[30px]">
                <Checkbox 
                  checked={
                    filteredBusinesses.length > 0 && 
                    selectedBusinesses.length === filteredBusinesses.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all businesses"
                />
              </TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Jobs Posted</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No businesses found matching the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredBusinesses.map((business) => (
                <TableRow key={business.id} className={business.featured ? "bg-amber-50/30" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedBusinesses.includes(business.id)}
                      onCheckedChange={() => handleSelectBusiness(business.id)}
                      aria-label={`Select ${business.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={business.avatar} alt={business.name} />
                        <AvatarFallback>
                          {business.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {business.name}
                          {business.featured && (
                            <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                              Featured
                            </Badge>
                          )}
                          {business.verified && (
                            <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{business.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize ${getSubscriptionBadgeClass(business.subscription.plan)}`}
                      >
                        {business.subscription.plan}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        Expires: {new Date(business.subscription.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {business.jobsPosted}
                  </TableCell>
                  <TableCell className="text-sm">
                    ${business.totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        business.status === "active" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem onSelect={() => {}}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Business
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Verification toggle */}
                        {!business.verified ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(business.id)}
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Verify Business
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(business.id)}
                            className="text-amber-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove Verification
                          </DropdownMenuItem>
                        )}
                        
                        {/* Status toggle */}
                        {business.status === "active" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(business.id, "inactive")}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Deactivate Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(business.id, "active")}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Activate Account
                          </DropdownMenuItem>
                        )}
                        
                        {/* Featured toggle */}
                        <DropdownMenuItem onSelect={() => handleToggleFeatured(business.id)}>
                          <Star className="h-4 w-4 mr-2" />
                          {business.featured ? "Remove from Featured" : "Add to Featured"}
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Change Plan submenu */}
                        <DropdownMenuItem className="font-medium">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Change Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => handleChangePlan(business.id, "free")}
                          className="pl-8 text-sm"
                        >
                          Free Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => handleChangePlan(business.id, "professional")}
                          className="pl-8 text-sm"
                        >
                          Professional Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => handleChangePlan(business.id, "enterprise")}
                          className="pl-8 text-sm"
                        >
                          Enterprise Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBusinessesList; 