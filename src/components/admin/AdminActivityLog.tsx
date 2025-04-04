"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle,
  Bell,
  Briefcase,
  CheckCircle, 
  ChevronRight, 
  FileText, 
  MoreHorizontal, 
  RefreshCw, 
  Settings, 
  ShieldCheck, 
  Star,
  User,
  Users,
  XCircle
} from "lucide-react";

// Generate mock activity data
const generateActivityData = () => {
  const types = [
    { type: "user_registered", label: "User Registered", icon: <User className="h-4 w-4" /> },
    { type: "job_posted", label: "Job Posted", icon: <Briefcase className="h-4 w-4" /> },
    { type: "verification", label: "Verification", icon: <ShieldCheck className="h-4 w-4" /> },
    { type: "login", label: "Login", icon: <User className="h-4 w-4" /> },
    { type: "payment", label: "Payment", icon: <FileText className="h-4 w-4" /> },
    { type: "settings_changed", label: "Settings Changed", icon: <Settings className="h-4 w-4" /> },
    { type: "subscription_updated", label: "Subscription Updated", icon: <Star className="h-4 w-4" /> },
    { type: "warning", label: "Warning", icon: <AlertTriangle className="h-4 w-4" /> },
    { type: "notification_sent", label: "Notification Sent", icon: <Bell className="h-4 w-4" /> },
  ];
  
  const users = [
    { name: "Alex Johnson", email: "alex@example.com", role: "business" },
    { name: "Jordan Smith", email: "jordan@example.com", role: "professional" },
    { name: "Sam Rodriguez", email: "sam@example.com", role: "business" },
    { name: "Taylor Greene", email: "taylor@example.com", role: "professional" },
    { name: "Morgan Chen", email: "morgan@example.com", role: "professional" },
    { name: "Admin User", email: "admin@nixerly.com", role: "admin" },
  ];
  
  const statuses = [
    { status: "success", label: "Success", icon: <CheckCircle className="h-4 w-4" /> },
    { status: "pending", label: "Pending", icon: <RefreshCw className="h-4 w-4" /> },
    { status: "failed", label: "Failed", icon: <XCircle className="h-4 w-4" /> },
  ];
  
  const now = new Date();
  const activities = [];
  
  // Generate 30 random activities
  for (let i = 0; i < 30; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Random timestamp within the last 24 hours
    const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    
    // Generate a context-specific message based on activity type
    let message = "";
    switch (type.type) {
      case "user_registered":
        message = `${user.name} registered as a ${user.role}`;
        break;
      case "job_posted":
        message = `${user.name} posted a new job`;
        break;
      case "verification":
        message = `${user.name}'s profile verification ${status.status === "success" ? "completed" : status.status === "pending" ? "in review" : "failed"}`;
        break;
      case "login":
        message = `${user.name} logged in from ${Math.random() > 0.5 ? "new device" : "known device"}`;
        break;
      case "payment":
        message = `${user.name} made a payment of $${Math.floor(Math.random() * 500) + 100}`;
        break;
      case "settings_changed":
        message = `${user.name} updated account settings`;
        break;
      case "subscription_updated":
        message = `${user.name} changed subscription to ${Math.random() > 0.5 ? "professional" : "enterprise"} plan`;
        break;
      case "warning":
        message = `Security alert for ${user.name}'s account`;
        break;
      case "notification_sent":
        message = `System notification sent to ${user.name}`;
        break;
      default:
        message = `${user.name} performed an action`;
    }
    
    activities.push({
      id: `activity-${i}`,
      type,
      user,
      status,
      timestamp,
      message,
    });
  }
  
  // Sort by timestamp (newest first)
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const activityData = generateActivityData();

const AdminActivityLog = () => {
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24))}d ago`;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Activity Log</h3>
        <Button variant="ghost" size="sm" className="text-blue-600">
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {activityData.slice(0, 10).map((activity) => (
          <div
            key={activity.id}
            className="p-3 border rounded-md flex items-start space-x-3 hover:bg-muted/10 transition-colors"
          >
            <div className={`p-2 rounded-full flex-shrink-0 ${
              activity.status.status === "success" ? "bg-green-100 text-green-700" :
              activity.status.status === "pending" ? "bg-amber-100 text-amber-700" :
              "bg-red-100 text-red-700"
            }`}>
              {activity.type.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className={`text-xs mr-2 ${getStatusColor(activity.status.status)}`}>
                  {activity.status.label}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-2">
        <RefreshCw className="h-4 w-4 mr-2" />
        Load More
      </Button>
    </div>
  );
};

export default AdminActivityLog; 