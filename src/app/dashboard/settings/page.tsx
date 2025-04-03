"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import { dummyProfessionals } from "@/lib/dummy-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  Bell, 
  User, 
  Settings, 
  Key, 
  EyeOff, 
  Clock, 
  Globe, 
  Languages, 
  LogOut, 
  Trash2, 
  CheckCircle, 
  Mail,
  Smartphone,
  AlertTriangle,
  Phone
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const settingsFormSchema = z.object({
  security: z.object({
    twoFactorEnabled: z.boolean().default(false),
    passwordLastChanged: z.string().optional(),
    loginNotifications: z.boolean().default(true),
    showOnlineStatus: z.boolean().default(true),
  }),
  notifications: z.object({
    emailNotifications: z.boolean().default(true),
    jobAlerts: z.boolean().default(true),
    messageNotifications: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
  }),
  preferences: z.object({
    language: z.enum(["en", "es", "fr", "de", "it"]).default("en"),
    timezone: z.string().default("UTC"),
    theme: z.enum(["light", "dark", "system"]).default("system"),
    currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]).default("USD"),
  }),
  contact: z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    preferredContact: z.enum(["email", "phone", "whatsapp"]),
    contactAvailability: z.object({
      weekdays: z.boolean().default(true),
      weekends: z.boolean().default(false),
      morning: z.boolean().default(true),
      afternoon: z.boolean().default(true),
      evening: z.boolean().default(false),
    }),
    responseTime: z.enum(["same_day", "24_hours", "48_hours", "other"]),
  })
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const SettingsPage = () => {
  const { professional, setProfessional, setUserType, setIsAuthenticated } = useAppStore();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"security" | "notifications" | "preferences" | "contact">("security");
  
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // For demo purposes
  useEffect(() => {
    setIsAuthenticated(true);
    setProfessional(dummyProfessionals[0]);
    setUserType("professional");
    
    // Set active tab from URL parameter if valid
    if (tabParam && ['security', 'notifications', 'preferences', 'contact'].includes(tabParam)) {
      setActiveTab(tabParam as "security" | "notifications" | "preferences" | "contact");
    }
  }, [setProfessional, setUserType, setIsAuthenticated, tabParam]);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      security: {
        twoFactorEnabled: false,
        passwordLastChanged: "2023-12-15",
        loginNotifications: true,
        showOnlineStatus: true,
      },
      notifications: {
        emailNotifications: true,
        jobAlerts: true,
        messageNotifications: true,
        marketingEmails: false,
      },
      preferences: {
        language: "en",
        timezone: "UTC",
        theme: "system",
        currency: "USD",
      },
      contact: {
        email: professional?.email || "",
        phone: professional?.phone || "",
        whatsapp: professional?.phone || "",
        preferredContact: "email",
        contactAvailability: {
          weekdays: true,
          weekends: false,
          morning: true,
          afternoon: true,
          evening: false,
        },
        responseTime: "24_hours",
      }
    }
  });

  const onSubmit = (data: SettingsFormValues) => {
    if (!professional) return;
    
    // Update professional with new settings
    setProfessional({
      ...professional,
      email: data.contact.email,
      phone: data.contact.phone,
      contactSettings: {
        preferredContact: data.contact.preferredContact,
        contactAvailability: data.contact.contactAvailability,
        responseTime: data.contact.responseTime,
      }
      // In a real app, we would store these settings
      // This is just for demo purposes
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6 rounded-lg border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg text-white">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-2">
                Account Settings
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional Settings
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your account settings, security preferences, and notification options
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="md:col-span-1">
            <Card className="border-blue-200/50 shadow-sm">
              <CardContent className="p-0">
                <nav className="flex flex-col py-2">
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "security"
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700"
                    }`}
                    aria-label="Security settings"
                    tabIndex={0}
                  >
                    <Shield className="h-5 w-5" />
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "notifications"
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700"
                    }`}
                    aria-label="Notification settings"
                    tabIndex={0}
                  >
                    <Bell className="h-5 w-5" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab("preferences")}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "preferences"
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700"
                    }`}
                    aria-label="Account preferences"
                    tabIndex={0}
                  >
                    <User className="h-5 w-5" />
                    Preferences
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "contact"
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-700"
                    }`}
                    aria-label="Contact settings"
                    tabIndex={0}
                  >
                    <Phone className="h-5 w-5" />
                    Contact
                  </button>
                </nav>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 px-4 py-6 border-t border-blue-100">
                <div className="flex flex-col space-y-2 w-full">
                  <h3 className="text-sm font-medium text-gray-700">Account Actions</h3>
                  <Separator className="my-1" />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {activeTab === "security" && (
                  <Card className="border-blue-200/50 shadow-sm">
                    <CardHeader className="bg-blue-50/50">
                      <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                        <Shield className="h-5 w-5 text-blue-600" />
                        Security Settings
                      </CardTitle>
                      <CardDescription className="text-base">
                        Manage your account security and privacy settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-blue-800">Security</h3>
                        
                        <FormField
                          control={form.control}
                          name="security.twoFactorEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <div className="flex items-center">
                                  <FormLabel className="text-blue-800">Two-Factor Authentication</FormLabel>
                                  <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Recommended</Badge>
                                </div>
                                <FormDescription>
                                  Add an extra layer of security to your account with 2FA
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="px-3">
                          <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Change Password
                          </Button>
                          <p className="text-sm text-gray-500 mt-2">
                            Password last changed: {form.getValues().security.passwordLastChanged || "Never"}
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="security.loginNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Login Notifications</FormLabel>
                                <FormDescription>
                                  Receive email alerts when your account is accessed from a new device
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-blue-800">Privacy</h3>
                        
                        <FormField
                          control={form.control}
                          name="security.showOnlineStatus"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Show Online Status</FormLabel>
                                <FormDescription>
                                  Allow others to see when you're online and available
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "notifications" && (
                  <Card className="border-blue-200/50 shadow-sm">
                    <CardHeader className="bg-blue-50/50">
                      <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                        <Bell className="h-5 w-5 text-blue-600" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription className="text-base">
                        Control how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-blue-800">Email Notifications</h3>
                        
                        <FormField
                          control={form.control}
                          name="notifications.emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Enable Email Notifications</FormLabel>
                                <FormDescription>
                                  Receive important account notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notifications.jobAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Job Alerts</FormLabel>
                                <FormDescription>
                                  Get notified when new jobs matching your skills are posted
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notifications.messageNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Message Notifications</FormLabel>
                                <FormDescription>
                                  Receive notifications when you get new messages
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notifications.marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                              <div className="space-y-0.5">
                                <FormLabel className="text-blue-800">Marketing Emails</FormLabel>
                                <FormDescription>
                                  Receive promotional content, tips and updates
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="rounded-lg border border-blue-200 p-4 bg-blue-50/30">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-blue-600 mr-2" />
                          <p className="text-sm font-medium text-blue-800">Contact Methods for Notifications</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Your primary email address for notifications: <span className="font-medium">{professional?.email}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          To update your contact email address, visit your <a href="/dashboard/contact-settings" className="text-blue-600 hover:underline">Contact Settings</a>.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "preferences" && (
                  <Card className="border-blue-200/50 shadow-sm">
                    <CardHeader className="bg-blue-50/50">
                      <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                        <User className="h-5 w-5 text-blue-600" />
                        Account Preferences
                      </CardTitle>
                      <CardDescription className="text-base">
                        Customize your account experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="preferences.language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Language</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Spanish</SelectItem>
                                  <SelectItem value="fr">French</SelectItem>
                                  <SelectItem value="de">German</SelectItem>
                                  <SelectItem value="it">Italian</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your preferred language for the platform
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferences.timezone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Timezone</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                    <SelectValue placeholder="Select timezone" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="UTC">UTC</SelectItem>
                                  <SelectItem value="GMT">GMT (London)</SelectItem>
                                  <SelectItem value="EST">EST (New York)</SelectItem>
                                  <SelectItem value="PST">PST (Los Angeles)</SelectItem>
                                  <SelectItem value="IST">IST (Dublin)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your local timezone for scheduling and notifications
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferences.theme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Theme</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                    <SelectValue placeholder="Select theme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="system">System Default</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Choose your preferred color theme
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferences.currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Currency</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">USD</span>
                                      <span className="text-gray-500">- US Dollar ($)</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="EUR">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">EUR</span>
                                      <span className="text-gray-500">- Euro (€)</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="GBP">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">GBP</span>
                                      <span className="text-gray-500">- British Pound (£)</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="CAD">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">CAD</span>
                                      <span className="text-gray-500">- Canadian Dollar ($)</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="AUD">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">AUD</span>
                                      <span className="text-gray-500">- Australian Dollar ($)</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Your preferred currency for payments and invoices
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="rounded-lg border border-yellow-200 p-4 bg-yellow-50/30 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Data Privacy Notice</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Your preferences are stored securely and used to personalize your experience. 
                            We never share your personal settings with third parties.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "contact" && (
                  <Card className="border-blue-200/50 shadow-sm">
                    <CardHeader className="bg-blue-50/50">
                      <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                        <Phone className="h-5 w-5 text-blue-600" />
                        Contact Settings
                      </CardTitle>
                      <CardDescription className="text-base">
                        Set your preferred contact methods and availability for clients to reach you
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <FormField
                        control={form.control}
                        name="contact.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Email Address</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-200 bg-blue-50/50 text-blue-600">
                                  <Mail className="h-4 w-4" />
                                </span>
                                <Input 
                                  placeholder="your.email@example.com" 
                                  className="rounded-l-none border-blue-200 focus-visible:ring-blue-300/30" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              This will be visible to clients and businesses
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-200 bg-blue-50/50 text-blue-600">
                                  <Phone className="h-4 w-4" />
                                </span>
                                <Input 
                                  placeholder="+353 87 123 4567" 
                                  className="rounded-l-none border-blue-200 focus-visible:ring-blue-300/30" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Add your phone number to receive calls from clients
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">WhatsApp Number</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-200 bg-blue-50/50 text-green-600">
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="#25D366" 
                                    className="h-4 w-4"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                  </svg>
                                </span>
                                <Input 
                                  placeholder="+353 87 123 4567" 
                                  className="rounded-l-none border-blue-200 focus-visible:ring-blue-300/30" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Can be the same as your phone number if you use WhatsApp
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contact.preferredContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Preferred Contact Method</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                  <SelectValue placeholder="Select preferred contact method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="email">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">Email</span>
                                    <span className="text-gray-500">- Professional & detailed</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="phone">
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">Phone Call</span>
                                    <span className="text-gray-500">- Direct & immediate</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="whatsapp">
                                  <div className="flex items-center gap-2">
                                    <svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 24 24" 
                                      fill="#25D366" 
                                      className="h-4 w-4"
                                    >
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="font-medium">WhatsApp</span>
                                    <span className="text-gray-500">- Quick & convenient</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This will be highlighted to clients as your preferred way to be contacted
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-blue-800">Days Available</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormField
                            control={form.control}
                            name="contact.contactAvailability.weekdays"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base text-blue-800">Weekdays</FormLabel>
                                  <FormDescription>
                                    Monday through Friday
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="contact.contactAvailability.weekends"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base text-blue-800">Weekends</FormLabel>
                                  <FormDescription>
                                    Saturday and Sunday
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-blue-800">Time of Day</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name="contact.contactAvailability.morning"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base text-blue-800">Morning</FormLabel>
                                  <FormDescription>
                                    8am - 12pm
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="contact.contactAvailability.afternoon"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base text-blue-800">Afternoon</FormLabel>
                                  <FormDescription>
                                    12pm - 5pm
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="contact.contactAvailability.evening"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base text-blue-800">Evening</FormLabel>
                                  <FormDescription>
                                    5pm - 9pm
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-600"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="contact.responseTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Expected Response Time</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-blue-200 focus:ring-blue-300/30 w-full">
                                  <SelectValue placeholder="Select response time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="same_day">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-green-500" />
                                    <span className="font-medium">Same Day</span>
                                    <span className="text-gray-500">- Within hours</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="24_hours">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium">Within 24 Hours</span>
                                    <span className="text-gray-500">- Next day</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="48_hours">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-orange-500" />
                                    <span className="font-medium">Within 48 Hours</span>
                                    <span className="text-gray-500">- Two days</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="other">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">More than 48 Hours</span>
                                    <span className="text-gray-500">- Slower response</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Let clients know how quickly you typically respond
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-4 mt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                  >
                    Save Settings
                  </Button>
                  
                  {isSaved && (
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Settings saved
                    </div>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage; 