"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/lib/store";
import { Check, CreditCard, Shield, FileText, AlertCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { dummyBusinesses } from "@/lib/dummy-data";

const subscriptionSchema = z.object({
  cardName: z.string().min(2, {
    message: "Please enter the name on your card.",
  }),
  cardNumber: z.string().min(16, {
    message: "Please enter a valid card number.",
  }),
  expiry: z.string().min(5, {
    message: "Please enter a valid expiry date (MM/YY).",
  }),
  cvc: z.string().min(3, {
    message: "Please enter a valid CVC code.",
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

const SubscriptionPage = () => {
  const { business, setBusiness, setUserType, setIsAuthenticated } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  
  // Force userType to 'business' since this is a business-only page
  useEffect(() => {
    setIsAuthenticated(true);
    setUserType("business");
    
    // If no business data is set, use demo data
    if (!business) {
      setBusiness(dummyBusinesses[0]);
    }
  }, [setUserType, setIsAuthenticated, business, setBusiness]);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    }
  });

  const handleSubscribe = () => {
    if (!business) return;
    
    setBusiness({
      ...business,
      verified: true,
      subscription: {
        ...(business.subscription || {}),
        plan: selectedPlan === "monthly" ? "professional" : "enterprise",
        status: "active",
        expiryDate: new Date(Date.now() + (selectedPlan === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
      },
    });
    
    // Show toast or notification in a real app
    alert(`Your ${selectedPlan} subscription has been activated successfully! (In a real app, this would process the payment)`);
  };

  const handleCancelSubscription = () => {
    if (!business) return;
    
    if (confirm("Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.")) {
      setBusiness({
        ...business,
        verified: false,
        subscription: {
          ...(business.subscription || {}),
          status: "canceled",
        }
      });
      
      // Show toast or notification
      alert("Your subscription has been canceled. You will have access until the end of your current billing period.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">
            Manage your subscription plan and payment details
          </p>
        </div>

        {/* Current Subscription Status */}
        <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Your active subscription and billing details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Subscription Status</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {business?.verified 
                      ? "You have an active subscription" 
                      : "You don't have an active subscription"}
                  </p>
                </div>
                
                <div>
                  {business?.verified ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {business?.verified && (
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <p className="text-sm text-gray-500">Business Professional</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">€49</p>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Billing Period</h3>
                      <p className="text-sm text-gray-500">Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Button 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                        onClick={handleCancelSubscription}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      <p>
                        If you cancel, your subscription will remain active until the end of your current billing period.
                        You will continue to have full access to all features until then.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <Card className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Choose a plan that works for your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            {/* Interactive Plan Selection */}
            <div className="flex flex-col md:flex-row gap-6 relative">
              {/* Monthly Plan */}
              <div 
                className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-102 flex-1 ${
                  selectedPlan === "monthly" 
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/40 shadow-md" 
                    : "hover:border-blue-300 hover:bg-blue-50/30"
                }`}
                onClick={() => setSelectedPlan("monthly")}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPlan("monthly")}
                aria-label="Select monthly subscription plan"
              >
                {selectedPlan === "monthly" && (
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-blue-900/30">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl text-blue-800 dark:text-blue-300">Monthly Plan</h3>
                    <p className="text-muted-foreground text-sm mt-1">Flexible monthly billing</p>
                  </div>
                  <Badge 
                    variant={selectedPlan === "monthly" ? "default" : "outline"} 
                    className={`transition-all ${selectedPlan === "monthly" ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm" : "border-blue-200 text-blue-700"}`}
                  >
                    Popular
                  </Badge>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">€49</span>
                    <span className="text-muted-foreground pb-1">/month</span>
                  </div>
                  <p className="text-sm text-blue-600/80 mt-1">Billed monthly</p>
                </div>
                
                <div className={`w-full h-1 my-6 rounded-full bg-gradient-to-r ${selectedPlan === "monthly" ? "from-blue-400 to-blue-600" : "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"}`}></div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "monthly" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "monthly" ? "text-blue-800 dark:text-blue-300" : ""}>Access to our database of verified professionals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "monthly" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "monthly" ? "text-blue-800 dark:text-blue-300" : ""}>Advanced search and filtering options</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "monthly" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "monthly" ? "text-blue-800 dark:text-blue-300" : ""}>Direct contact with professionals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "monthly" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "monthly" ? "text-blue-800 dark:text-blue-300" : ""}>Unlimited job postings</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "monthly" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "monthly" ? "text-blue-800 dark:text-blue-300" : ""}>Priority support via WhatsApp</span>
                  </li>
                </ul>
                
                {selectedPlan === "monthly" && (
                  <div className="mt-5 inline-block bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-xs py-1 px-3 font-medium">
                    Currently Selected
                  </div>
                )}
              </div>
              
              {/* Annual Plan */}
              <div 
                className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-102 flex-1 ${
                  selectedPlan === "annual" 
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/40 shadow-md" 
                    : "hover:border-purple-300 hover:bg-purple-50/30"
                }`}
                onClick={() => setSelectedPlan("annual")}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedPlan("annual")}
                aria-label="Select annual subscription plan"
              >
                {selectedPlan === "annual" && (
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-purple-900/30">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl text-purple-800 dark:text-purple-300">Annual Plan</h3>
                    <p className="text-muted-foreground text-sm mt-1">Best value for your business</p>
                  </div>
                  <Badge 
                    variant={selectedPlan === "annual" ? "default" : "outline"} 
                    className={`transition-all ${selectedPlan === "annual" ? "bg-gradient-to-r from-purple-500 to-purple-600 shadow-sm" : "border-purple-200 text-purple-700"}`}
                  >
                    Best Value
                  </Badge>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-purple-700 dark:text-purple-400">€470</span>
                    <span className="text-muted-foreground pb-1">/year</span>
                  </div>
                  <p className="text-sm text-purple-600/80 mt-1">Billed annually</p>
                </div>
                
                <div className={`w-full h-1 my-6 rounded-full bg-gradient-to-r ${selectedPlan === "annual" ? "from-purple-400 to-purple-600" : "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"}`}></div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "annual" ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "annual" ? "text-purple-800 dark:text-purple-300" : ""}>All features from the monthly plan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className={`p-0.5 rounded-full ${selectedPlan === "annual" ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={selectedPlan === "annual" ? "text-purple-800 dark:text-purple-300" : ""}>Annual payment convenience</span>
                  </li>
                </ul>
                
                {selectedPlan === "annual" && (
                  <div className="mt-5 inline-block bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 text-purple-700 dark:text-purple-300 rounded-full text-xs py-1 px-3 font-medium">
                    Currently Selected
                  </div>
                )}
              </div>
            </div>
            
            {!business?.verified && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className={`w-full mt-8 transform hover:scale-102 transition-all shadow-md ${
                      selectedPlan === "monthly" 
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800" 
                        : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                    }`}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {selectedPlan === "monthly" 
                      ? (
                        <span className="flex items-center">
                          Subscribe for <span className="font-bold mx-1">€49</span>/month
                        </span>
                      ) 
                      : (
                        <span className="flex items-center">
                          Subscribe for <span className="font-bold mx-1">€470</span>/year
                        </span>
                      )
                    }
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      {selectedPlan === "monthly" 
                        ? (
                          <span className="flex items-center text-blue-700 dark:text-blue-400">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Monthly Subscription
                          </span>
                        ) 
                        : (
                          <span className="flex items-center text-purple-700 dark:text-purple-400">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Annual Subscription
                          </span>
                        )
                      }
                    </DialogTitle>
                    <DialogDescription>
                      {selectedPlan === "monthly" 
                        ? "Access our database of professionals with a flexible monthly plan"
                        : "Get full access with our best value annual plan - save 20%"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <div className={`mb-6 p-4 rounded-lg shadow-sm ${
                      selectedPlan === "monthly" 
                        ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/40" 
                        : "bg-purple-50 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/40"
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${
                          selectedPlan === "monthly" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"
                        }`}>
                          Plan Details
                        </span>
                        <Badge variant="outline" className={`${
                          selectedPlan === "monthly" 
                            ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/40" 
                            : "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/40"
                        }`}>
                          {selectedPlan === "monthly" ? "Monthly" : "Annual"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{selectedPlan === "monthly" ? "Monthly" : "Annual"} subscription</span>
                          <span className="font-medium">{selectedPlan === "monthly" ? "€49.00" : "€470.00"}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>Tax (19%)</span>
                          <span>{selectedPlan === "monthly" ? "€9.32" : "€89.30"}</span>
                        </div>
                        
                        {selectedPlan === "annual" && (
                          <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 font-medium">
                            <span>Annual discount (20%)</span>
                            <span>-€118.00</span>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between items-center font-medium">
                        <span>Total</span>
                        <span className={`text-lg ${
                          selectedPlan === "monthly" ? "text-blue-700 dark:text-blue-300" : "text-purple-700 dark:text-purple-300"
                        }`}>
                          {selectedPlan === "monthly" ? "€58.32" : "€559.30"}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`mb-6 p-3 rounded-md text-sm ${
                      selectedPlan === "monthly"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/10 dark:text-blue-300"
                        : "bg-purple-50 text-purple-700 dark:bg-purple-900/10 dark:text-purple-300"
                    }`}>
                      <div className="flex gap-2">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p>
                          {selectedPlan === "monthly" 
                            ? "Your subscription will automatically renew each month. You can cancel anytime."
                            : "Your annual subscription provides the best value and will renew in one year."
                          }
                        </p>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form className="space-y-5">
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Details</h3>
                          
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-gray-500 dark:text-gray-400">Name on card</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Smith" 
                                    {...field} 
                                    className={`transition-all border-gray-200 focus:border-${selectedPlan === "monthly" ? "blue" : "purple"}-300 focus:ring-${selectedPlan === "monthly" ? "blue" : "purple"}-200`} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/30 space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between">
                                  <FormLabel className="text-xs text-gray-500 dark:text-gray-400">Card number</FormLabel>
                                  <div className="flex gap-1">
                                    <svg className="h-5 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="24" rx="4" fill="#E8E8E8"/><path d="M10.755 17.1181H8.29102L9.99509 6.96875H12.4591L10.755 17.1181Z" fill="#0655A4"/><path d="M19.4043 7.09326C18.9199 6.91201 18.1504 6.75 17.204 6.75C14.8939 6.75 13.2793 7.94062 13.2793 9.66797C13.2793 10.9922 14.4375 11.7188 15.3164 12.1641C16.2129 12.6094 16.5234 12.9023 16.5234 13.3125C16.5234 13.957 15.8057 14.2676 15.1406 14.2676C14.2266 14.2676 13.7461 14.1387 12.9941 13.8281L12.7363 13.7168L12.4609 15.9141C13.043 16.1484 14.0274 16.3473 15.0469 16.3648C17.5039 16.3648 19.0835 15.1917 19.0835 13.348C19.0835 12.2949 18.5151 11.4902 17.1699 10.8252C16.3477 10.3799 15.8496 10.0869 15.8496 9.65625C15.8496 9.26758 16.2949 8.85986 17.2793 8.85986C18.0938 8.84229 18.7031 9.01172 19.1836 9.17529L19.3653 9.25342L19.4043 7.09326Z" fill="#0655A4"/><path d="M27.0029 6.96875H25.0869C24.5498 6.96875 24.1421 7.12061 23.9084 7.65381L20.5469 17.1181H23.1035C23.1035 17.1181 23.4843 16.0127 23.5762 15.7725C23.835 15.7725 26.1802 15.7725 26.5029 15.7725C26.5752 16.0654 26.7744 17.1181 26.7744 17.1181H29.0186L27.0029 6.96875ZM24.2007 13.7168C24.4343 13.0518 25.2565 10.8545 25.2565 10.8545C25.2565 10.8721 25.4902 10.2598 25.6016 9.875L25.7832 10.7764C25.7832 10.7764 26.2812 13.1221 26.3984 13.7168H24.2007Z" fill="#0655A4"/><path d="M7.78369 6.96875L5.41455 13.8457L5.19526 12.7754C4.83564 11.418 3.54248 9.91992 2.08838 9.17529L4.27759 17.1006H6.85205L10.3755 6.96875H7.78369Z" fill="#0655A4"/><path d="M4.61182 8.19482H2.40479C2.15674 8.21826 1.8376 8.33984 1.76533 8.68359L0 17.1181H2.5569L3.27588 11.8535C3.27588 11.8711 4.61182 8.19482 4.61182 8.19482Z" fill="#0655A4"/><path d="M29.4517 15.7025L30.9609 12.5596C30.9609 12.5771 31.1421 12.1875 31.252 11.9414L31.4161 12.4961L32.252 15.7025H29.4517Z" fill="#FBFBFB"/></svg>
                                    <svg className="h-5 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="24" rx="4" fill="#E8E8E8"/><path d="M22.2773 15.9141H24.252L25.3926 8.05078H23.4004L22.2773 15.9141Z" fill="#F79F1A"/><path d="M19.4922 8.07422C18.9023 7.8457 18.002 7.5 16.875 7.5C14.5195 7.5 12.832 8.7832 12.8145 10.7109C12.7969 12.123 14.0098 12.9141 14.9297 13.377C15.8672 13.8574 16.1777 14.1504 16.1777 14.5547C16.1602 15.1797 15.4219 15.4727 14.7246 15.4727C13.7344 15.4727 13.2012 15.2988 12.334 14.9355L12.0059 14.8145L11.6602 16.7012C12.2852 16.9941 13.3809 17.25 14.5195 17.2676C17.0566 17.2676 18.7266 16.0195 18.7441 14.0039C18.7617 12.9082 18.0996 12.0996 16.7461 11.3789C15.9023 10.916 15.3828 10.6055 15.3828 10.1602C15.4004 9.75391 15.8496 9.33398 16.7871 9.33398C17.5781 9.31641 18.1328 9.53906 18.5723 9.75L18.8125 9.84961L19.4922 8.07422Z" fill="#F79F1A"/><path d="M31.1309 8.05078H29.4961C28.8008 8.05078 28.3027 8.23828 28.0273 8.95312L24.4102 15.9141H26.9473C26.9473 15.9141 27.3691 14.8516 27.4551 14.6426H30.3691C30.4551 14.9355 30.6641 15.9141 30.6641 15.9141H33L31.1309 8.05078ZM28.2188 12.9844C28.4102 12.4688 29.2773 10.2246 29.2773 10.2246C29.2598 10.2422 29.4863 9.64453 29.6074 9.26953L29.8164 10.1719C29.8164 10.1719 30.3691 12.5098 30.4551 12.9844H28.2188Z" fill="#F79F1A"/><path d="M3.53125 15.9141L6.88281 8.05078H9.52734L11.2676 15.9141H8.76562L8.44922 14.5957H5.05078L4.5 15.9141H3.53125ZM6.07031 10.0215L5.36719 12.9316H7.71094L7.00781 10.0215C6.88281 9.57422 6.77344 9.08984 6.68945 8.66992H6.47461C6.39062 9.08984 6.2168 9.57422 6.07031 10.0215Z" fill="#F79F1A"/><path d="M10.7227 8.06738L13.3359 8.08496V15.9141H10.9492V10.2422L9.43359 10.2246L10.7227 8.06738Z" fill="#F79F1A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5273 11.9883C14.5273 9.16992 16.8125 6.86719 19.6309 6.86719C22.4492 6.86719 24.7344 9.16992 24.7344 11.9883C24.7344 14.8066 22.4492 17.1094 19.6309 17.1094C16.8125 17.1094 14.5273 14.8066 14.5273 11.9883ZM14.5977 11.9883C14.5977 14.7539 16.8652 17.0391 19.6309 17.0391C22.3965 17.0391 24.6641 14.7539 24.6641 11.9883C24.6641 9.22266 22.4141 6.9375 19.6309 6.9375C16.8477 6.9375 14.5977 9.22266 14.5977 11.9883Z" fill="#FF5F00"/></svg>
                                  </div>
                                </div>
                                <FormControl>
                                  <Input 
                                    placeholder="1234 5678 9012 3456" 
                                    {...field} 
                                    className={`transition-all border-gray-200 focus:border-${selectedPlan === "monthly" ? "blue" : "purple"}-300 focus:ring-${selectedPlan === "monthly" ? "blue" : "purple"}-200`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-gray-500 dark:text-gray-400">Expiry date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="MM/YY" 
                                      {...field} 
                                      className={`transition-all border-gray-200 focus:border-${selectedPlan === "monthly" ? "blue" : "purple"}-300 focus:ring-${selectedPlan === "monthly" ? "blue" : "purple"}-200`}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs text-gray-500 dark:text-gray-400">CVC</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="123" 
                                      {...field} 
                                      className={`transition-all border-gray-200 focus:border-${selectedPlan === "monthly" ? "blue" : "purple"}-300 focus:ring-${selectedPlan === "monthly" ? "blue" : "purple"}-200`}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                  
                  <DialogFooter>
                    <Button
                      onClick={handleSubscribe}
                      className={`w-full py-6 text-white font-medium text-base transition-all duration-300 transform hover:scale-102 relative overflow-hidden shadow-lg ${
                        selectedPlan === "monthly"
                          ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                          : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {selectedPlan === "monthly" 
                          ? "Subscribe Now - €49/month" 
                          : "Subscribe Now - €470/year"
                        }
                      </span>
                      <span className={`absolute inset-0 w-0 transition-all duration-700 ease-out ${
                        selectedPlan === "monthly" 
                          ? "bg-gradient-to-r from-blue-600 to-blue-800" 
                          : "bg-gradient-to-r from-purple-600 to-purple-800"
                      } group-hover:w-full`}></span>
                    </Button>
                    <p className="w-full text-center text-xs text-gray-500 mt-3">
                      By subscribing, you agree to our 
                      <Link href="/terms" className={`mx-1 ${
                        selectedPlan === "monthly" ? "text-blue-600" : "text-purple-600"
                      }`}>
                        Terms of Service
                      </Link> 
                      and 
                      <Link href="/privacy" className={`ml-1 ${
                        selectedPlan === "monthly" ? "text-blue-600" : "text-purple-600"
                      }`}>
                        Privacy Policy
                      </Link>
                    </p>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
        
        {/* Subscription Benefits */}
        <Card className="border-t-4 border-t-green-500 hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle>Plan Comparison</CardTitle>
            <CardDescription>
              Compare our subscription plans and their benefits
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 border-b-2 border-gray-200 font-medium text-gray-700 dark:text-gray-300">Features</th>
                    <th className="py-4 px-4 border-b-2 border-gray-200 text-center">
                      <div className="inline-block text-center bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-md px-3 py-1 font-medium shadow-sm">
                        Monthly Plan
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 mt-1 font-medium">€49/month</div>
                    </th>
                    <th className="py-4 px-4 border-b-2 border-gray-200 text-center">
                      <div className="inline-block text-center bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-md px-3 py-1 font-medium shadow-sm">
                        Annual Plan
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 mt-1 font-medium">€470/year</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">Professional Database Access</td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">Advanced Search Filters</td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">Direct Contact with Professionals</td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">Unlimited Job Postings</td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-default">
                    <td className="py-4 px-4 border-b border-gray-200 font-medium">Priority Support via WhatsApp</td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/30">
                    <td className="py-4 px-4 font-medium">Select Plan</td>
                    <td className="py-4 px-4 text-center">
                      <Button 
                        variant={selectedPlan === "monthly" ? "default" : "outline"}
                        className={selectedPlan === "monthly" 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "border-blue-300 text-blue-700 hover:bg-blue-50"
                        }
                        onClick={() => setSelectedPlan("monthly")}
                      >
                        {selectedPlan === "monthly" ? "Selected" : "Choose Plan"}
                      </Button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button 
                        variant={selectedPlan === "annual" ? "default" : "outline"}
                        className={selectedPlan === "annual" 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "border-purple-300 text-purple-700 hover:bg-purple-50"
                        }
                        onClick={() => setSelectedPlan("annual")}
                      >
                        {selectedPlan === "annual" ? "Selected" : "Choose Plan"}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Verified Professional Database</h3>
                  <p className="text-muted-foreground text-sm">
                    Access our extensive database of verified construction professionals, filtered by skills, location, and availability.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full text-purple-700">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Unlimited Job Postings</h3>
                  <p className="text-muted-foreground text-sm">
                    Post as many job listings as you need, with detailed descriptions and requirements to find the perfect match.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Can I cancel my subscription at any time?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">How do I get a refund?</h3>
              <p className="text-muted-foreground text-sm">
                If you're not satisfied with your subscription, contact our support team within 14 days of purchase for a full refund.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Can I upgrade from monthly to annual billing?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, you can upgrade to annual billing at any time. We'll prorate your current subscription and apply any remaining credit to your annual plan.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Do you offer enterprise plans for larger businesses?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, we offer custom enterprise plans for larger organizations. <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> to discuss your requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage; 