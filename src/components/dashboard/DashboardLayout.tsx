import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
  MessageSquare,
  Bell,
  ChevronRight,
  AlignLeft,
  Phone,
  ExternalLink
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userType, professional, business, logout, isAuthenticated } = useAppStore();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const userName = userType === "professional" ? professional?.name : business?.name;
  const userEmail = userType === "professional" ? professional?.email : business?.email;
  const userInitials = userName ? userName.split(" ").map(n => n[0]).join("") : "U";
  
  // Check if business user has paid subscription
  const hasBusinessPaidSubscription = isAuthenticated && userType === 'business' && business?.verified;
  
  // Check if professional user has verified account
  const isProfessionalVerified = isAuthenticated && userType === 'professional' && professional?.verified;
  
  const professionalNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: "Profile & Portfolio", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/jobs", label: "Job Board", icon: <Briefcase className="w-5 h-5" /> },
    { href: "/dashboard/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const businessNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: "Business Profile", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/post-job", label: "Post a Job", icon: <FilePlus className="w-5 h-5" /> },
    { href: "/dashboard/manage-jobs", label: "Manage Jobs", icon: <Briefcase className="w-5 h-5" /> },
    { href: "/dashboard/find-professionals", label: "Find Professionals", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  // Public navigation links (for non-authenticated users)
  const publicNavItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
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

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-muted/30 border-r transition-all duration-300 overflow-hidden",
          sidebarOpen ? "w-64" : "w-16"
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
          {sidebarOpen && (
            <Link href="/" className="ml-3 text-xl font-bold text-blue-600 tracking-tight">
              Nixerly
            </Link>
          )}
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          {isAuthenticated ? (
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    tabIndex={0}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
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
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    tabIndex={0}
                  >
                    {item.icon}
                    {sidebarOpen && <span>{item.label}</span>}
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
                !sidebarOpen && "justify-center"
              )}
              onClick={() => logout()}
              tabIndex={0}
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          ) : (
            <div className={cn("space-y-2", !sidebarOpen && "space-y-4")}>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300",
                  sidebarOpen ? "justify-start" : "px-0"
                )} 
                asChild
              >
                <Link href="/auth/login">
                  <User className="h-4 w-4 mr-2" />
                  {sidebarOpen && <span>Login</span>}
                </Link>
              </Button>
              <Button 
                size="sm" 
                className={cn(
                  "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm",
                  sidebarOpen ? "justify-start" : "px-0"
                )} 
                asChild
              >
                <Link href="/auth/signup">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {sidebarOpen && <span>Sign Up</span>}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-4 border-b">
              <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
                Nixerly
              </Link>
            </div>
            
            <nav className="flex-1 py-4 overflow-y-auto">
              {isAuthenticated ? (
                <ul className="space-y-1 px-2">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        tabIndex={0}
                      >
                        {item.icon}
                        <span>{item.label}</span>
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
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        tabIndex={0}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
            
            <div className="p-4 border-t">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 justify-start"
                  onClick={() => logout()}
                  tabIndex={0}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300" 
                    asChild
                  >
                    <Link href="/auth/login">
                      <User className="h-4 w-4 mr-2" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm" 
                    asChild
                  >
                    <Link href="/auth/signup">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b">
          <h1 className="text-xl font-semibold truncate md:hidden">Nixerly</h1>
          
          <div className="flex items-center ml-auto gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            
            {isAuthenticated ? (
              <Avatar>
                <AvatarImage src={userType === "professional" ? "/avatars/professional.jpg" : "/avatars/business.jpg"} alt={userName || ""} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
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
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 