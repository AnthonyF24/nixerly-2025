"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileForm } from "@/components/professional/ProfileForm";
import { BusinessProfileForm } from "@/components/business/BusinessProfileForm";
import { useAppStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  ScrollText, 
  FileText, 
  Award, 
  Image, 
  Building, 
  Globe, 
  Newspaper
} from "lucide-react";

const ProfilePage = () => {
  const { userType, professional, business, setProfessional, setBusiness, setUserType, setIsAuthenticated } = useAppStore();
  const [activeSection, setActiveSection] = useState("info");
  
  const searchParams = useSearchParams();
  const userTypeParam = searchParams.get('type');
  
  // For demo purposes, set authentication and user type
  useEffect(() => {
    // Set authenticated state
    setIsAuthenticated(true);
    
    // Use URL parameter if provided, otherwise keep existing userType or default to business
    const typeToUse = userTypeParam || userType || 'business';
    
    if (typeToUse === 'professional') {
      setProfessional(dummyProfessionals[0]);
      setUserType("professional");
    } else {
      setBusiness(dummyBusinesses[0]);
      setUserType("business");
    }
  }, [userTypeParam, userType, setProfessional, setBusiness, setUserType, setIsAuthenticated]);

  // Get profile completion percentage
  const profileCompletionPercentage = userType === "professional" 
    ? professional?.profileComplete || 0
    : business?.profileComplete || 0;

  // Define sections based on user type
  const professionalSections = [
    { id: "info", label: "Personal Info", icon: <User className="h-5 w-5 mr-2" /> },
    { id: "portfolio", label: "Portfolio", icon: <Image className="h-5 w-5 mr-2" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="h-5 w-5 mr-2" /> },
    { id: "skills", label: "Skills", icon: <FileText className="h-5 w-5 mr-2" /> },
  ];
  
  const businessSections = [
    { id: "info", label: "Business Info", icon: <Building className="h-5 w-5 mr-2" /> },
    { id: "industry", label: "Industry", icon: <Globe className="h-5 w-5 mr-2" /> },
    { id: "jobs", label: "Job Listings", icon: <Newspaper className="h-5 w-5 mr-2" /> },
  ];
  
  const sections = userType === "professional" ? professionalSections : businessSections;

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Profile</h1>
          <p className="text-blue-100">
            Manage your {userType === "professional" ? "professional" : "business"} profile
          </p>
          
          {/* Profile Completion Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white mb-2">
              <span>Profile completion</span>
              <span>{profileCompletionPercentage}%</span>
            </div>
            <Progress value={profileCompletionPercentage} className="h-2 bg-blue-400/30" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Jump to Section</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label={`Go to ${section.label} section`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToSection(section.id)}
                  >
                    {section.icon}
                    {section.label}
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Need Help?</p>
                <a 
                  href="/help/profile" 
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  tabIndex={0}
                >
                  View profile tips
                </a>
              </div>
            </div>
          </div>
          
          {/* Profile Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="bg-white rounded-lg shadow-sm border border-blue-100">
              <TabsList className="w-full border-b rounded-t-lg rounded-b-none p-0 bg-gradient-to-r from-blue-50 to-purple-50">
                <TabsTrigger 
                  value="profile" 
                  className="rounded-tl-lg border-r py-3 flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                  aria-label="View profile"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="rounded-tr-lg py-3 flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700"
                  aria-label="Preview your profile"
                >
                  <ScrollText className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="p-0 m-0">
                {userType === "professional" ? <ProfileForm /> : <BusinessProfileForm />}
              </TabsContent>
              
              <TabsContent value="preview" className="p-6 m-0">
                <div className="rounded-lg border border-blue-100 p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Profile Preview</h3>
                  <p className="text-gray-500 mb-4">This is how your profile appears to {userType === "professional" ? "businesses" : "professionals"}.</p>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Preview your profile as seen by others. Make sure all information is accurate and showcases your {userType === "professional" ? "skills" : "business"} effectively.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 