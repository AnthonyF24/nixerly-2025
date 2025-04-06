import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/lib/store";
import { locationsList, industriesList } from "@/lib/dummy-data";
import { X, Upload, Building, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

const businessProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  description: z.string().optional(),
  town: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.array(z.string()).min(1, {
    message: "Please select at least one industry.",
  }),
});

type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>;

export const BusinessProfileForm = () => {
  const { business, setBusiness } = useAppStore();
  
  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      name: business?.name || "",
      email: business?.email || "",
      phone: business?.phone || "",
      description: business?.description || "",
      town: business?.town || "",
      country: business?.country || "",
      website: "",
      industry: business?.industry || [],
    }
  });
  
  const handleSubmit = (data: BusinessProfileFormValues) => {
    if (!business) return;
    
    // Calculate profile completion percentage
    let completionItems = 0;
    let totalItems = 6; // name, email, description, town, country, industry
    
    if (data.name) completionItems++;
    if (data.email) completionItems++;
    if (data.description) completionItems++;
    if (data.town) completionItems++;
    if (data.country) completionItems++;
    if (data.industry.length > 0) completionItems++;
    
    // Add phone and website to calculation if provided
    if (data.phone) {
      completionItems++;
      totalItems++;
    }
    
    if (data.website) {
      completionItems++;
      totalItems++;
    }

    // Create formatted location from town and country
    const location = data.town && data.country 
      ? `${data.town}, ${data.country}` 
      : data.town || data.country || '';
    
    const profileComplete = Math.round((completionItems / totalItems) * 100);
    
    // Update business data
    setBusiness({
      ...business,
      ...data,
      location,
      profileComplete,
    });
  };
  
  const addIndustry = (industry: string) => {
    if (!form.getValues().industry.includes(industry)) {
      const updatedIndustries = [...form.getValues().industry, industry];
      form.setValue("industry", updatedIndustries, { shouldValidate: true });
    }
  };
  
  const removeIndustry = (industry: string) => {
    const updatedIndustries = form.getValues().industry.filter(i => i !== industry);
    form.setValue("industry", updatedIndustries, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-auto flex-shrink-0">
                  <div className="w-32 h-32 rounded-lg border flex items-center justify-center bg-muted">
                    <Building className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Upload Logo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@acme.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (234) 567-8901" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://www.example.com" className="pl-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your business, what you do, and the kind of professionals you're looking for..."
                        {...field}
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Include information about your company culture, mission, and values.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Location</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="town"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Town/City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormDescription>
                      This helps match you with local professionals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="industry" className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle>Business Industry</CardTitle>
              <CardDescription>
                Select the industries that best describe your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="industry"
                render={() => (
                  <FormItem>
                    <FormLabel>Your Industries</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.getValues().industry.map(ind => (
                        <Badge key={ind} variant="secondary" className="py-1 px-2 cursor-pointer">
                          {ind}
                          <X
                            className="h-3 w-3 ml-1"
                            onClick={() => removeIndustry(ind)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && removeIndustry(ind)}
                            aria-label={`Remove ${ind} industry`}
                          />
                        </Badge>
                      ))}
                      {form.getValues().industry.length === 0 && (
                        <div className="text-sm text-muted-foreground py-1">
                          No industries added yet. Select from the list below.
                        </div>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <FormLabel>Available Industries</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {industriesList.map(ind => (
                          <Badge 
                            key={ind} 
                            variant="outline" 
                            className="py-1 px-2 cursor-pointer hover:bg-blue-50"
                            onClick={() => addIndustry(ind)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && addIndustry(ind)}
                            aria-label={`Add ${ind} industry`}
                          >
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <FormMessage className="mt-4" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="jobs" className="border-t-4 border-t-green-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle>Job Listings</CardTitle>
              <CardDescription>
                Manage your current job listings
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="text-center p-6 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground mb-4">Post your first job to start finding professionals</p>
                <Button asChild>
                  <a href="/dashboard/post-job" tabIndex={0}>Post a Job</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Subscription Section with Link */}
          <Card id="subscription" className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Access our database of professionals with a subscription
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
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
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-center">
                <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-3">Manage Your Subscription</h3>
                <p className="text-indigo-700 dark:text-indigo-400 mb-4">
                  View subscription plans, update billing information, and manage your subscription settings.
                </p>
                <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Link href="/dashboard/subscription">
                    Go to Subscription Management
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}; 