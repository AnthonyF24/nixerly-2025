import React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, Shield } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
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
            <span>Privacy Policy</span>
          </div>
          
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              At Nixerly, we take your privacy seriously. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
          
          <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-auto">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-blue-700">Information We Collect</CardTitle>
              <CardDescription>Types of data we collect from our users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">We collect several types of information, including:</p>
              <ul className="space-y-3 list-none pl-0">
                <li className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-2">
                    <span className="text-blue-700 text-sm font-medium">1</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-900">Account Information:</span>
                    <span className="text-gray-700"> When you register, we collect your name, email address, password, and user type (professional or business).</span>
                  </div>
                </li>
                <li className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-2">
                    <span className="text-blue-700 text-sm font-medium">2</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-900">Profile Information:</span>
                    <span className="text-gray-700"> For professionals, this includes skills, certifications, portfolio items, and availability. For businesses, this includes company details, industry, and job postings.</span>
                  </div>
                </li>
                <li className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-2">
                    <span className="text-blue-700 text-sm font-medium">3</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-900">Usage Data:</span>
                    <span className="text-gray-700"> Information about how you interact with our platform, including pages visited, features used, and time spent.</span>
                  </div>
                </li>
                <li className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-2">
                    <span className="text-blue-700 text-sm font-medium">4</span>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-900">Device Information:</span>
                    <span className="text-gray-700"> Data about the device you use to access Nixerly, including IP address, browser type, and operating system.</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-auto">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-2xl text-blue-700">How We Use Your Information</CardTitle>
              <CardDescription>The ways we utilize the data we collect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Service Provision</p>
                  <p className="text-gray-700 text-sm">Provide and improve our services</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Job Matching</p>
                  <p className="text-gray-700 text-sm">Match professionals with relevant job opportunities</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Talent Search</p>
                  <p className="text-gray-700 text-sm">Help businesses find qualified professionals</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Verification</p>
                  <p className="text-gray-700 text-sm">Verify credentials and certifications</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Communication</p>
                  <p className="text-gray-700 text-sm">Communicate with you about your account and our services</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">Security</p>
                  <p className="text-gray-700 text-sm">Detect and prevent fraud or other harmful activities</p>
                </div>
                <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center">
                  <p className="font-medium text-blue-800">User Experience</p>
                  <p className="text-gray-700 text-sm">Analyze usage patterns to enhance user experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mx-auto">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full text-center">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl text-blue-700">Information Sharing</CardTitle>
                <CardDescription>Who we share your data with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">We may share your information with:</p>
                <ul className="space-y-2">
                  <li className="flex flex-col items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-1">
                      <span className="text-blue-700 text-xs">•</span>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-900">Other Users:</span>
                      <span className="text-gray-700"> When professionals and businesses connect through our platform.</span>
                    </div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-1">
                      <span className="text-blue-700 text-xs">•</span>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-900">Service Providers:</span>
                      <span className="text-gray-700"> Third-party companies that help us operate.</span>
                    </div>
                  </li>
                  <li className="flex flex-col items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-1">
                      <span className="text-blue-700 text-xs">•</span>
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-900">Legal Requests:</span>
                      <span className="text-gray-700"> If required by law or to protect rights.</span>
                    </div>
                  </li>
                </ul>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-4">
                  <p className="text-amber-800 text-sm font-medium">We do not sell your personal information to third parties.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full text-center">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-2xl text-blue-700">Your Privacy Choices</CardTitle>
                <CardDescription>Options to control your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">You have several options to control your information:</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">Account Settings</p>
                    <p className="text-gray-700 text-sm">Update, modify, or delete information in your profile anytime</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">Communication Preferences</p>
                    <p className="text-gray-700 text-sm">Opt out of marketing communications</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">Visibility Controls</p>
                    <p className="text-gray-700 text-sm">Set availability status and control visible details</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">Account Deletion</p>
                    <p className="text-gray-700 text-sm">Request deletion of your account and associated data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8 mb-12 mx-auto max-w-4xl">
            {[
              {
                title: "Data Security",
                content: "We implement appropriate technical and organizational measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data."
              },
              {
                title: "Data Retention",
                content: "We retain your information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information, unless we need to retain certain information for legitimate business or legal purposes."
              },
              {
                title: "International Data Transfers",
                content: "Nixerly operates globally, which means your information may be transferred to, stored, and processed in countries outside your residence. We take steps to ensure your data is treated securely and in accordance with this Privacy Policy regardless of where it is processed."
              },
              {
                title: "Children's Privacy",
                content: "Nixerly is not intended for children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately."
              },
              {
                title: "Changes to This Policy",
                content: "We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website or by email. Your continued use of Nixerly after such modifications will constitute your acknowledgment and acceptance of the updated policy."
              }
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{index + 5}. {section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
            
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us at privacy@nixerly.com.
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
                href="/terms" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="View Terms of Service"
              >
                Terms of Service
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

export default PrivacyPolicyPage; 