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
import { CheckCircle, Mail, Phone, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contactFormSchema = z.object({
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
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSettingsPage = () => {
  const { professional, setProfessional, setUserType, setIsAuthenticated } = useAppStore();
  const [isSaved, setIsSaved] = useState(false);
  
  // For demo purposes
  useEffect(() => {
    setIsAuthenticated(true);
    setProfessional(dummyProfessionals[0]);
    setUserType("professional");
  }, [setProfessional, setUserType, setIsAuthenticated]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
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
  });

  const onSubmit = (data: ContactFormValues) => {
    if (!professional) return;
    
    // Update professional with new contact settings
    setProfessional({
      ...professional,
      email: data.email,
      phone: data.phone,
      contactSettings: {
        preferredContact: data.preferredContact,
        contactAvailability: data.contactAvailability,
        responseTime: data.responseTime,
      }
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
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-2">
                Contact Settings
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Contact Methods
              </h1>
              <p className="text-muted-foreground mt-1">
                Set your preferred contact methods and availability for clients to reach you
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="border-blue-200/50 shadow-sm">
                <CardHeader className="bg-blue-50/50">
                  <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your primary contact methods for clients
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
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
                    name="phone"
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
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-800">WhatsApp Number</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-200 bg-blue-50/50 text-green-600">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
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
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-800">Preferred Contact Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
                              <SelectValue placeholder="Select preferred contact method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This will be highlighted to clients as your preferred way to be contacted
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-blue-200/50 shadow-sm">
                <CardHeader className="bg-blue-50/50">
                  <CardTitle className="text-xl flex items-center gap-2 text-blue-700">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    Availability Settings
                  </CardTitle>
                  <CardDescription className="text-base">
                    Set when you're available to be contacted
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-blue-800">Days Available</h3>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="contactAvailability.weekdays"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-blue-800">Weekdays (Mon-Fri)</FormLabel>
                              <FormDescription>
                                Available for contact on weekdays
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
                        name="contactAvailability.weekends"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-blue-800">Weekends (Sat-Sun)</FormLabel>
                              <FormDescription>
                                Available for contact on weekends
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
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="contactAvailability.morning"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-blue-800">Morning (8am - 12pm)</FormLabel>
                              <FormDescription>
                                Available during morning hours
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
                        name="contactAvailability.afternoon"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-blue-800">Afternoon (12pm - 5pm)</FormLabel>
                              <FormDescription>
                                Available during afternoon hours
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
                        name="contactAvailability.evening"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 p-3 hover:bg-blue-50/50 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-blue-800">Evening (5pm - 9pm)</FormLabel>
                              <FormDescription>
                                Available during evening hours
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
                    name="responseTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-800">Expected Response Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-blue-200 focus:ring-blue-300/30">
                              <SelectValue placeholder="Select expected response time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="same_day">Same Day</SelectItem>
                            <SelectItem value="24_hours">Within 24 Hours</SelectItem>
                            <SelectItem value="48_hours">Within 48 Hours</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                    "Save Contact Settings"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactSettingsPage; 