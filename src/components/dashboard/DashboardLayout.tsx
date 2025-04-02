import React, { ReactNode, useState } from "react";
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
  ExternalLink
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userType, professional, business, logout, isAuthenticated } = useAppStore();
  const pathname = usePathname();
  
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
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  const businessNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/dashboard/profile", label: "Business Profile", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/post-job", label: "Post a Job", icon: <FilePlus className="w-5 h-5" /> },
    { href: "/dashboard/find-professionals", label: "Find Professionals", icon: <User className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  // Public navigation links (for non-authenticated users)
  const publicNavItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
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

  return (
    <div className="flex h-screen bg-background overflow-hidden">
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
                    className={getNavLinkClass(item.href)}
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
                    className={getNavLinkClass(item.href)}
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
                        className={getNavLinkClass(item.href)}
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
                        className={getNavLinkClass(item.href)}
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
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b flex-shrink-0">
          <h1 className="text-xl font-semibold truncate md:hidden">Nixerly</h1>
          
          <div className="flex items-center ml-auto gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
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
                <span className="sr-only">WhatsApp</span>
              </a>
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
        
        {/* Content - Single scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 