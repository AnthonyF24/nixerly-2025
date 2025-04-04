"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { users } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, Shield, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Enhanced users with additional admin properties
const enhancedUsers = users.map(user => ({
  ...user,
  status: Math.random() > 0.2 ? "active" : "suspended",
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  isAdmin: user.email === "admin@nixerly.com",
  verificationStatus: Math.random() > 0.7 ? "verified" : Math.random() > 0.4 ? "pending" : "unverified",
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
});

type AdminUsersListProps = {
  tabFilter?: 'all' | 'active' | 'suspended' | 'admins';
  statusFilter?: string;
  roleFilter?: string;
  searchQuery?: string;
  selectedUsers?: string[];
  setSelectedUsers?: (users: string[]) => void;
  showSearch?: boolean;
  showExport?: boolean;
};

const AdminUsersList = ({
  tabFilter = 'all',
  statusFilter = 'all',
  roleFilter = 'all',
  searchQuery = '',
  selectedUsers = [],
  setSelectedUsers = () => {},
  showSearch = true,
  showExport = true,
}: AdminUsersListProps) => {
  const [users, setUsers] = useState(enhancedUsers);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const { toast } = useToast();

  // Update local search query when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    toast({
      title: `User status updated`,
      description: `User has been ${newStatus === "active" ? "activated" : "suspended"}.`,
    });
  };

  const handleMakeAdmin = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isAdmin: true } : user
      )
    );

    toast({
      title: "Admin privileges granted",
      description: "This user now has admin access to the platform.",
    });
  };

  const handleRemoveAdmin = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, isAdmin: false } : user
      )
    );

    toast({
      title: "Admin privileges revoked",
      description: "This user's admin access has been removed.",
    });
  };

  const handleSelectUser = (userId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Apply all filters
  let filteredUsers = users;

  // Tab filter
  if (tabFilter === 'active') {
    filteredUsers = filteredUsers.filter(user => user.status === 'active');
  } else if (tabFilter === 'suspended') {
    filteredUsers = filteredUsers.filter(user => user.status === 'suspended');
  } else if (tabFilter === 'admins') {
    filteredUsers = filteredUsers.filter(user => user.isAdmin);
  }

  // Status filter (if not already filtered by tab)
  if (tabFilter === 'all' && statusFilter !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
  }

  // Role filter
  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
  }

  // Search filter
  const searchTerm = localSearchQuery || searchQuery;
  if (searchTerm) {
    filteredUsers = filteredUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search users..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {showExport && (
            <Button size="sm" variant="outline" className="hidden sm:flex">
              Export
            </Button>
          )}
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px]">
                <Checkbox 
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users match the current filters
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {user.name}
                          {user.isAdmin && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                          {user.verificationStatus === "verified" && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "professional" ? "outline" : "secondary"} className="text-xs">
                      {user.role === "professional" ? "Professional" : "Business"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        user.status === "active" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Suspended"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onSelect={() => {}}>
                          View Profile
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem 
                            onSelect={() => handleStatusChange(user.id, "suspended")}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleStatusChange(user.id, "active")}
                            className="text-green-600"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        {!user.isAdmin ? (
                          <DropdownMenuItem onSelect={() => handleMakeAdmin(user.id)}>
                            <Shield className="h-4 w-4 mr-2" />
                            Make Admin
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onSelect={() => handleRemoveAdmin(user.id)}
                            className="text-amber-600"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Remove Admin
                          </DropdownMenuItem>
                        )}
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

export default AdminUsersList; 