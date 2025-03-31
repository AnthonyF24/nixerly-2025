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

const businessProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
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
      location: business?.location || "",
      website: "",
      industry: business?.industry || [],
    }
  });
  
  const handleSubmit = (data: BusinessProfileFormValues) => {
    if (!business) return;
    
    // Update business data
    setBusiness({
      ...business,
      ...data,
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
          <Card>
            <CardHeader>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationsList.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This helps match you with local professionals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="industry">
            <CardHeader>
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
                            className={`
                              cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors
                              ${form.getValues().industry.includes(ind) ? 'bg-primary text-primary-foreground' : ''}
                            `}
                            onClick={() => form.getValues().industry.includes(ind) ? removeIndustry(ind) : addIndustry(ind)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && (form.getValues().industry.includes(ind) ? removeIndustry(ind) : addIndustry(ind))}
                          >
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="verification">
            <CardHeader>
              <CardTitle>Business Verification</CardTitle>
              <CardDescription>
                Verify your business to build trust with professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Verification Status</h3>
                <div className="mt-2 flex items-center">
                  <Badge variant={business?.verified ? "default" : "outline"}>
                    {business?.verified ? "Verified" : "Not Verified"}
                  </Badge>
                  
                  {!business?.verified && (
                    <Button variant="link" className="ml-4" size="sm">
                      Request Verification
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Verified businesses appear higher in search results and enjoy greater trust from professionals.
                </p>
                
                {!business?.verified && (
                  <div className="mt-4">
                    <Button variant="outline" className="w-full py-6 border-dashed">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Business Documents
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}; 