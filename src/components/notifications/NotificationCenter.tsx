"use client";

import React, { useState } from 'react';
import { Bell, X, CheckCheck, FileText, User, MessageSquare, Clock, Building2, AlertCircle, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job' | 'profile' | 'message' | 'system' | 'application';
}

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'New job match found',
    message: 'A new Electrical Installation job has been posted',
    time: '10 minutes ago',
    read: false,
    type: 'job',
  },
  {
    id: '2',
    title: 'Your profile has been viewed',
    message: 'BuildRight Construction viewed your profile',
    time: '2 hours ago',
    read: false,
    type: 'profile',
  },
  {
    id: '3',
    title: 'New message received',
    message: 'You have a new message from Modern Renovations Ltd',
    time: '1 day ago',
    read: true,
    type: 'message',
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  
  // Filter by read/unread
  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifications.length;
  
  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job':
        return <FileText className="h-5 w-5" />;
      case 'profile':
        return <User className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'system':
        return <AlertCircle className="h-5 w-5" />;
      case 'application':
        return <FileText className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };
  
  // Get background color based on notification type
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'job':
        return "bg-blue-100 text-blue-600";
      case 'profile':
        return "bg-purple-100 text-purple-600";
      case 'message':
        return "bg-green-100 text-green-600";
      case 'system':
        return "bg-amber-100 text-amber-600";
      case 'application':
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-[10px] font-medium items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px] p-0 rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="font-medium">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="ml-1.5 bg-red-100 text-red-700 hover:bg-red-100 px-3 rounded-full font-normal">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={handleMarkAllAsRead}
              >
                <CheckCheck className="h-4 w-4" />
                <span className="sr-only">Mark all as read</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear all</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex border-b rounded-none bg-transparent h-12 p-0">
            <TabsTrigger value="all" className="flex-1 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0 p-0 flex flex-col">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-3">
                  <Bell className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">No notifications</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">
                  You're all caught up! No notifications to display.
                </p>
              </div>
            ) : (
              <div className="relative flex-grow overflow-hidden">
                <ScrollArea className="h-[320px]">
                  <div className="py-1">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                            getNotificationColor(notification.type)
                          )}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 ml-2"></span>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            
                            <p className="text-xs text-gray-400 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="m-0 p-0 flex flex-col">
            {unreadNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-3">
                  <CheckCheck className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">All caught up!</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">
                  You don't have any unread notifications.
                </p>
              </div>
            ) : (
              <div className="relative flex-grow overflow-hidden">
                <ScrollArea className="h-[320px]">
                  <div className="py-1">
                    {unreadNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                            getNotificationColor(notification.type)
                          )}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 ml-2"></span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            
                            <p className="text-xs text-gray-400 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator />
        <div className="p-3 flex items-center justify-between border-t">
          <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900 font-normal">
            <Settings className="h-4 w-4 mr-1.5" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
            View All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter; 