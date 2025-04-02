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
  Download,
  AlertTriangle
} from "lucide-react";

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
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const SettingsPage = () => {
  const { professional, setProfessional, setUserType, setIsAuthenticated } = useAppStore();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"security" | "notifications" | "preferences">("security");
  
  // For demo purposes
  useEffect(() => {
    setIsAuthenticated(true);
    setProfessional(dummyProfessionals[0]);
    setUserType("professional");
  }, [setProfessional, setUserType, setIsAuthenticated]);

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
    }
  });

  const onSubmit = (data: SettingsFormValues) => {
    if (!professional) return;
    
    // Update professional with new settings
    setProfessional({
      ...professional,
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="justify-start text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
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
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
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
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
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
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
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
                                  <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD ($)</SelectItem>
                                  <SelectItem value="EUR">EUR (€)</SelectItem>
                                  <SelectItem value="GBP">GBP (£)</SelectItem>
                                  <SelectItem value="CAD">CAD ($)</SelectItem>
                                  <SelectItem value="AUD">AUD ($)</SelectItem>
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

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
                  >
                    {isSaved ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Settings Saved
                      </span>
                    ) : (
                      "Save Settings"
                    )}
                  </Button>
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