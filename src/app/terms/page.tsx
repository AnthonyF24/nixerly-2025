import React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, FileText } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const TermsPage = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center">
        <div className="container max-w-4xl py-12 px-4 sm:px-6 mx-auto">
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
            <Link 
              href="/" 
              className="hover:text-blue-600 hover:underline transition-colors duration-200"
              tabIndex={0}
              aria-label="Go to home page"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Terms of Service</span>
          </div>
          
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Terms of Service</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to Nixerly. These terms of service govern your use of our platform, including our website, mobile applications, and all related services.
            </p>
          </div>
          
          <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-auto">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-blue-700">Acceptance of Terms</CardTitle>
              <CardDescription>What you agree to by using Nixerly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                By accessing or using Nixerly, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mx-auto">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full text-center">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl text-blue-700">User Accounts</CardTitle>
                <CardDescription>Account registration and responsibilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  To use certain features of Nixerly, you must register for an account. When you register, you agree to provide accurate and complete information. You are responsible for maintaining the security of your account and password.
                </p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-4">
                  <p className="text-amber-800 text-sm font-medium">Nixerly cannot and will not be liable for any loss or damage resulting from your failure to comply with this security obligation.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full text-center">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl text-blue-700">Profiles & Listings</CardTitle>
                <CardDescription>Professional profiles and business listings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Professionals may create profiles to showcase their skills, certifications, and portfolio items. Businesses may create listings to find suitable professionals. All information provided must be accurate and truthful.
                </p>
                <p className="text-gray-700">
                  You retain ownership of the content you post on Nixerly. However, by posting content, you grant Nixerly a non-exclusive, worldwide license to use, display, and distribute your content in connection with providing our services.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-auto">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-blue-700">Prohibited Conduct</CardTitle>
              <CardDescription>Activities not permitted on our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">Illegal Activities</p>
                  <p className="text-gray-700 text-sm">Use Nixerly for any illegal purpose</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">False Information</p>
                  <p className="text-gray-700 text-sm">Post false or misleading information</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">Impersonation</p>
                  <p className="text-gray-700 text-sm">Impersonate others or misrepresent your affiliation</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">Harassment</p>
                  <p className="text-gray-700 text-sm">Harass, abuse, or harm other users</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">Disruption</p>
                  <p className="text-gray-700 text-sm">Interfere with or disrupt the Nixerly services</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-red-800">Unauthorized Access</p>
                  <p className="text-gray-700 text-sm">Attempt to gain unauthorized access to any part of the platform</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-8 mb-12 mx-auto max-w-4xl">
            {[
              {
                title: "Verification and Certification",
                content: "Nixerly offers verification services for professionals and businesses. While we make efforts to verify credentials, we cannot guarantee the accuracy of all information. Users are encouraged to perform their own due diligence before engaging with others on the platform."
              },
              {
                title: "Fees and Payment",
                content: "Nixerly may charge fees for certain services. All fees are non-refundable unless otherwise specified. You agree to pay all applicable fees for services you use."
              },
              {
                title: "Termination",
                content: "Nixerly reserves the right to terminate or suspend your account at any time for any reason, including violation of these Terms of Service. Upon termination, your right to use Nixerly will immediately cease."
              },
              {
                title: "Disclaimers",
                content: "Nixerly is provided \"as is\" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted or error-free, that defects will be corrected, or that the service or servers are free of viruses or other harmful components."
              },
              {
                title: "Limitation of Liability",
                content: "To the maximum extent permitted by law, Nixerly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service."
              },
              {
                title: "Changes to Terms",
                content: "Nixerly reserves the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting an update on our website or sending you an email. Your continued use of Nixerly after changes constitute your acceptance of the updated terms."
              },
              {
                title: "Governing Law",
                content: "These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions."
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{index + 5}. {section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
            
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us at support@nixerly.com.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white mx-auto" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
          
          <Separator className="my-8 mx-auto max-w-xl" />
          
          <div className="text-center mx-auto max-w-2xl">
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: April 1, 2024
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </Link>
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="Contact Us"
              >
                Contact Us
              </Link>
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
              <Link 
                href="/faq" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="View FAQ"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage; 