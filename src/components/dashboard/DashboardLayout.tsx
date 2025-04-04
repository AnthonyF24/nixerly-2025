"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  User, 
  Briefcase, 
  FilePlus, 
  Settings, 
  LogOut, 
  Home,
  Mail,
  Bell,
  ChevronRight,
  AlignLeft,
  Phone,
  ExternalLink,
  X,
  ChevronDown,
  Building2,
  FileText,
  LayoutDashboard,
  Search,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser, useUnreadMessages } from "@/lib/mock-data-hooks";

// Define notification type interface
interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "application" | "profile" | string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { 
    isSidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    userType, 
    isAuthenticated,
    logout,
    currentUser
  } = useAppStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  
  // Get current user data from mock data hooks
  const { user, loading: userLoading } = useCurrentUser();
  
  // Set the current user in the app store whenever it changes from the hook
  useEffect(() => {
    if (user && !userLoading) {
      // Update the app state with user data
      useAppStore.getState().setCurrentUser(user);
    }
  }, [user, userLoading]);
  
  // Get unread messages for current user
  const { unreadCount: unreadMessages } = useUnreadMessages(user?.id || '');
  
  const userName = currentUser?.name || '';
  const userEmail = currentUser?.email || '';
  const userInitials = userName ? userName.split(" ").map(n => n[0]).join("") : "U";
  
  // Check if business user has paid subscription - note that verified is stored in business/professional objects, not the User
  const hasBusinessPaidSubscription = isAuthenticated && userType === 'business' && useAppStore.getState().business?.verified;
  
  // Check if professional user has verified account
  const isProfessionalVerified = isAuthenticated && userType === 'professional' && useAppStore.getState().professional?.verified;
  
  const professionalNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: "Profile & Portfolio", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/jobs", label: "Job Board", icon: <Briefcase className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const businessNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: "Business Profile", icon: <Building2 className="w-5 h-5" /> },
    { href: "/dashboard/post-job", label: "Post a Job", icon: <FilePlus className="w-5 h-5" /> },
    { href: "/dashboard/find-professionals", label: "Find Professionals", icon: <Search className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  // Add admin dashboard link if the user is an admin (founder)
  if (currentUser?.email === "admin@nixerly.com") {
    businessNavItems.push({
      href: "/dashboard/admin",
      label: "Admin Panel",
      icon: <Shield className="w-5 h-5" />
    });
  }
  
  // Public navigation links (for non-authenticated users)
  const publicNavItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/jobs", label: "Browse Jobs", icon: <Briefcase className="w-5 h-5" /> },
    { href: "/professionals", label: "Find Professionals", icon: <User className="w-5 h-5" /> },
  ];
  
  // Add conditional navigation items for non-authenticated users
  if (!isAuthenticated) {
    if (hasBusinessPaidSubscription) {
      publicNavItems.push({ href: "/dashboard/find-professionals", label: "Find Professionals", icon: <User className="w-5 h-5" /> });
    }

    if (isProfessionalVerified) {
      publicNavItems.push({ href: "/dashboard/jobs", label: "Job Board", icon: <Briefcase className="w-5 h-5" /> });
    }
  }
  
  const navItems = userType === "professional" ? professionalNavItems : businessNavItems;

  // Function to check if a navigation item is active
  const isNavItemActive = (href: string) => {
    // Exact match - always return true for this
    if (pathname === href) {
      return true;
    }
    
    // For nested routes - check if this is the most specific parent route
    if (href !== '/' && pathname?.startsWith(href + '/')) {
      // Check if there's another more specific parent route from navItems
      const morePreciseMatch = navItems.some(item => 
        item.href !== href && 
        item.href.startsWith(href + '/') && 
        pathname.startsWith(item.href)
      );
      
      // Only return true if this is the most specific parent route
      return !morePreciseMatch;
    }
    
    return false;
  };
  
  // Function to get the nav link class based on active state
  const getNavLinkClass = (href: string) => {
    const isActive = isNavItemActive(href);
    
    return cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-blue-50 text-blue-700 font-medium" 
        : "hover:bg-accent hover:text-accent-foreground"
    );
  };

  // Sample notifications for demo
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "New job application",
      message: "John Smith applied to Senior Electrician position",
      time: "2 hours ago",
      unread: true,
      type: "application"
    },
    {
      id: 2,
      title: "Profile viewed",
      message: "BuildRight Construction viewed your profile",
      time: "Yesterday",
      unread: true,
      type: "profile"
    }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-muted/30 border-r transition-all duration-300 overflow-hidden",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle sidebar"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
          >
            <AlignLeft className="h-5 w-5" />
          </button>
          {isSidebarOpen && (
            <span className="ml-3 text-xl font-bold text-blue-600 tracking-tight">
              Nixerly
            </span>
          )}
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          {isAuthenticated ? (
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={getNavLinkClass(item.href)}
                    tabIndex={0}
                  >
                    {item.icon}
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-1 px-2">
              {publicNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={getNavLinkClass(item.href)}
                    tabIndex={0}
                  >
                    {item.icon}
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        
        <div className="p-2 border-t">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-3 justify-start",
                !isSidebarOpen && "justify-center"
              )}
              onClick={() => logout()}
              tabIndex={0}
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          ) : (
            <div className={cn("space-y-2", !isSidebarOpen && "space-y-4")}>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300",
                  isSidebarOpen ? "justify-start" : "px-0"
                )} 
                asChild
              >
                <Link href="/auth/login">
                  <User className="h-4 w-4 mr-2" />
                  {isSidebarOpen && <span>Login</span>}
                </Link>
              </Button>
              <Button 
                size="sm" 
                className={cn(
                  "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm",
                  isSidebarOpen ? "justify-start" : "px-0"
                )} 
                asChild
              >
                <Link href="/auth/signup">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {isSidebarOpen && <span>Sign Up</span>}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0 border-r-0 sm:max-w-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="text-xl font-bold text-blue-600 tracking-tight">
                Nixerly
              </span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center gap-3 p-4 bg-blue-50/50 border-b">
                <Avatar className="h-11 w-11 border-2 border-blue-200">
                  <AvatarImage 
                    src={userType === "professional" ? "/avatars/business-b2.jpg" : "/avatars/business-b1.jpg"} 
                    alt={userName || ""} 
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{userName}</h3>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
              </div>
            )}
            
            <nav className="flex-1 py-4 overflow-y-auto">
              {isAuthenticated ? (
                <ul className="space-y-2 px-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={getNavLinkClass(item.href)}
                        onClick={() => setMobileMenuOpen(false)}
                        tabIndex={0}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 px-2">
                  {publicNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={getNavLinkClass(item.href)}
                        onClick={() => setMobileMenuOpen(false)}
                        tabIndex={0}
                      >
                        {item.icon}
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
            
            <div className="mt-auto">
              <Separator />
              
              {isAuthenticated ? (
                <div className="p-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    tabIndex={0}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 p-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-blue-200 text-blue-700" 
                    asChild
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button 
                    className="w-full justify-center bg-blue-600" 
                    asChild
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
              
              {/* WhatsApp contact button */}
              <div className="p-4 pt-0">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                  asChild
                >
                  <a 
                    href="https://wa.me/353123456789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="h-5 w-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Contact via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b flex-shrink-0 bg-white">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
            
            {/* Logo for mobile */}
            <span className="flex items-center gap-2">
              <span className="text-xl font-semibold text-blue-600 lg:hidden">Nixerly</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some((n: NotificationItem) => n.unread) && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border border-white shadow-sm animate-pulse"></span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {notifications.filter((n: NotificationItem) => n.unread).length} new
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                        <div className="flex w-full gap-3">
                          <div className={cn(
                            "rounded-full p-2 flex-shrink-0",
                            notification.type === 'application' 
                              ? "bg-gradient-to-br from-blue-50 to-blue-200 text-blue-600 shadow-sm" 
                              : "bg-gradient-to-br from-purple-50 to-purple-200 text-purple-600 shadow-sm"
                          )}>
                            {notification.type === 'application' && <FileText className="h-4 w-4" />}
                            {notification.type === 'profile' && <User className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={cn(
                                "font-medium text-sm leading-tight",
                                notification.unread ? "text-gray-900" : "text-gray-700"
                              )}>
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-gray-500">
                      No notifications yet
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm text-blue-600 font-medium cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* WhatsApp button (only visible on larger screens) */}
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="hidden sm:flex text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <a 
                href="https://wa.me/353123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </Button>
            
            {/* User profile dropdown or auth buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 h-8 px-2 sm:h-10 sm:px-3"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage 
                        src={userType === "professional" ? "/avatars/business-b2.jpg" : "/avatars/business-b1.jpg"} 
                        alt={userName || ""} 
                      />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start leading-none">
                      <span className="text-sm font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground">{userType}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden sm:block text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="hidden sm:flex" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" className="hidden sm:flex" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </header>
        
        {/* Content - Single scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 