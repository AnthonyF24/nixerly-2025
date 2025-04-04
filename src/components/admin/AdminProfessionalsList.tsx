"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Check, 
  Eye, 
  MoreHorizontal, 
  Star, 
  ThumbsUp, 
  Trash2, 
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

type AdminProfessionalsListProps = {
  tabFilter?: 'all' | 'verified' | 'unverified' | 'featured';
  verificationFilter?: string;
  skillsFilter?: string;
  searchQuery?: string;
  selectedProfessionals?: string[];
  setSelectedProfessionals?: React.Dispatch<React.SetStateAction<string[]>>;
  showSearch?: boolean;
  showExport?: boolean;
  professionals?: any[]; // Professionals data passed from parent
};

const AdminProfessionalsList = ({
  tabFilter = 'all',
  verificationFilter = 'all',
  skillsFilter = 'all',
  searchQuery = '',
  selectedProfessionals = [],
  setSelectedProfessionals,
  showSearch = true,
  showExport = true,
  professionals = []
}: AdminProfessionalsListProps) => {
  const [professionalsData, setProfessionalsData] = useState<any[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localVerificationFilter, setLocalVerificationFilter] = useState(verificationFilter);
  const { toast } = useToast();
  const [isClientSide, setIsClientSide] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClientSide(true);
    
    // Use the professionals data passed from parent
    if (professionals.length > 0) {
      setProfessionalsData(professionals);
    }
  }, [professionals]);

  // Update local state when props change
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
    setLocalVerificationFilter(verificationFilter);
  }, [searchQuery, verificationFilter]);

  const handleToggleVerification = (id: string) => {
    setProfessionalsData(prev => 
      prev.map(prof => 
        prof.id === id ? { ...prof, verified: !prof.verified } : prof
      )
    );

    const professional = professionalsData.find(p => p.id === id);
    
    toast({
      title: professional?.verified ? "Verification removed" : "Professional verified",
      description: `${professional?.name}'s verification status has been updated.`,
    });
  };

  const handleToggleStatus = (id: string, newStatus: string) => {
    setProfessionalsData(prev => 
      prev.map(prof => 
        prof.id === id ? { ...prof, status: newStatus } : prof
      )
    );

    toast({
      title: "Professional status updated",
      description: `The professional is now ${newStatus}.`,
    });
  };

  const handleToggleFeatured = (id: string) => {
    setProfessionalsData(prev => 
      prev.map(prof => 
        prof.id === id ? { ...prof, featured: !prof.featured } : prof
      )
    );

    const professional = professionalsData.find(p => p.id === id);
    
    toast({
      title: professional?.featured ? "Removed from featured" : "Added to featured",
      description: `${professional?.name} has been ${professional?.featured ? "removed from" : "added to"} featured professionals.`,
    });
  };

  const handleSelectProfessional = (id: string, checked: boolean) => {
    if (!setSelectedProfessionals) return;
    
    if (checked) {
      setSelectedProfessionals(prev => [...prev, id]);
    } else {
      setSelectedProfessionals(prev => prev.filter(profId => profId !== id));
    }
  };

  const handleSelectAllProfessionals = (checked: boolean) => {
    if (!setSelectedProfessionals) return;
    
    if (checked) {
      setSelectedProfessionals(filteredProfessionals.map(prof => prof.id));
    } else {
      setSelectedProfessionals([]);
    }
  };

  // Filter professionals based on search query and filters
  const filteredProfessionals = professionalsData.filter(prof => {
    // Search filtering
    const matchesSearch = searchQuery === '' || 
      prof.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (prof.headline && prof.headline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prof.skills && prof.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
    
    // Tab filtering
    let matchesTab = true;
    if (tabFilter === 'verified') {
      matchesTab = prof.verified;
    } else if (tabFilter === 'unverified') {
      matchesTab = !prof.verified;
    } else if (tabFilter === 'featured') {
      matchesTab = prof.featured;
    }
    
    // Verification filtering
    let matchesVerification = true;
    if (verificationFilter === "verified") {
      matchesVerification = prof.verified;
    } else if (verificationFilter === "unverified") {
      matchesVerification = !prof.verified;
    }
    
    // Skills filtering
    let matchesSkill = true;
    if (skillsFilter !== 'all') {
      matchesSkill = prof.skills?.some(skill => 
        skill.toLowerCase().includes(skillsFilter.toLowerCase())
      ) || false;
    }
    
    return matchesSearch && matchesTab && matchesVerification && matchesSkill;
  });

  // Show a loading indicator if data isn't ready
  if (!isClientSide || professionalsData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="w-full sm:w-auto flex-1 sm:max-w-sm">
            <Input
              placeholder="Search by name or skills..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={localVerificationFilter} onValueChange={setLocalVerificationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Professionals</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="unverified">Unverified Only</SelectItem>
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
              {setSelectedProfessionals && (
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={
                      filteredProfessionals.length > 0 && 
                      selectedProfessionals.length === filteredProfessionals.length
                    } 
                    onCheckedChange={handleSelectAllProfessionals}
                    aria-label="Select all professionals"
                  />
                </TableHead>
              )}
              <TableHead>Professional</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfessionals.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={setSelectedProfessionals ? 7 : 6} 
                  className="h-24 text-center text-muted-foreground"
                >
                  No professionals found matching the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProfessionals.map((prof) => (
                <TableRow key={prof.id} className={prof.featured ? "bg-amber-50/30" : ""}>
                  {setSelectedProfessionals && (
                    <TableCell>
                      <Checkbox 
                        checked={selectedProfessionals.includes(prof.id)} 
                        onCheckedChange={(checked) => handleSelectProfessional(prof.id, checked as boolean)}
                        aria-label={`Select ${prof.name}`}
                      />
                    </TableCell>
                  )}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={prof.avatar} alt={prof.name} />
                        <AvatarFallback>
                          {prof.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {prof.name}
                          {prof.featured && (
                            <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{prof.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {prof.skills?.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {prof.skills && prof.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">
                          +{prof.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        prof.verified 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {prof.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-200">
                        <div 
                          className="h-full rounded-full bg-blue-500" 
                          style={{ width: `${prof.profileCompletion}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{prof.profileCompletion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{prof.rating}</span>
                    </div>
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
                          View Profile
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Verification toggle */}
                        {!prof.verified ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(prof.id)}
                            className="text-green-600"
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Verify Professional
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleVerification(prof.id)}
                            className="text-amber-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove Verification
                          </DropdownMenuItem>
                        )}
                        
                        {/* Status toggle */}
                        {prof.status === "active" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(prof.id, "inactive")}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Deactivate Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleToggleStatus(prof.id, "active")}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Activate Account
                          </DropdownMenuItem>
                        )}
                        
                        {/* Featured toggle */}
                        <DropdownMenuItem onSelect={() => handleToggleFeatured(prof.id)}>
                          <Star className="h-4 w-4 mr-2" />
                          {prof.featured ? "Remove from Featured" : "Add to Featured"}
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

export default AdminProfessionalsList; 