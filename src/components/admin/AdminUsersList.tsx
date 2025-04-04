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
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Check, MoreHorizontal, Shield, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

// Enhanced users with additional admin properties
const enhancedUsers = users.map(user => ({
  ...user,
  status: Math.random() > 0.2 ? "active" : "suspended",
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  isAdmin: user.email === "admin@nixerly.com",
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
});

const AdminUsersList = () => {
  const [users, setUsers] = useState(enhancedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

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

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Button size="sm" variant="outline" className="hidden sm:flex">
          Export
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersList; 