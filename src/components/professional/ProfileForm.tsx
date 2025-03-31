import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locationsList, skillsList } from "@/lib/dummy-data";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Upload } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  availability: z.boolean().default(false),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfileForm = () => {
  const { professional, setProfessional } = useAppStore();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: professional?.name || "",
      email: professional?.email || "",
      phone: professional?.phone || "",
      bio: professional?.bio || "",
      location: professional?.location || "",
      availability: professional?.availability || false,
      skills: professional?.skills || [],
    }
  });
  
  const handleSubmit = (data: ProfileFormValues) => {
    if (!professional) return;
    
    // Calculate profile completion percentage
    let completionItems = 0;
    let totalItems = 5; // name, email, bio, location, skills
    
    if (data.name) completionItems++;
    if (data.email) completionItems++;
    if (data.bio) completionItems++;
    if (data.location) completionItems++;
    if (data.skills.length > 0) completionItems++;
    
    // Add certifications and portfolio to calculation
    totalItems += 2;
    if (professional.certifications.length > 0) completionItems++;
    if (professional.portfolio.length > 0) completionItems++;
    
    const profileComplete = Math.round((completionItems / totalItems) * 100);
    
    // Update professional data
    setProfessional({
      ...professional,
      ...data,
      profileComplete,
    });
  };
  
  const addSkill = (skill: string) => {
    if (!form.getValues().skills.includes(skill)) {
      const updatedSkills = [...form.getValues().skills, skill];
      form.setValue("skills", updatedSkills, { shouldValidate: true });
    }
  };
  
  const removeSkill = (skill: string) => {
    const updatedSkills = form.getValues().skills.filter(s => s !== skill);
    form.setValue("skills", updatedSkills, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (234) 567-8901" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell potential clients about your professional background, expertise, and what makes you unique..."
                        {...field}
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Write a clear, concise summary of your professional experience and skills.
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
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location" />
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
                      This helps match you with nearby job opportunities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="availability">
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>
                Let potential clients know if you're currently available for work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Available for Work</FormLabel>
                      <FormDescription>
                        When enabled, you'll appear in search results for available professionals.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="skills">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>
                Add the skills that best represent your professional abilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {form.getValues().skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="py-1 px-2 cursor-pointer">
                          {skill}
                          <X
                            className="h-3 w-3 ml-1"
                            onClick={() => removeSkill(skill)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && removeSkill(skill)}
                            aria-label={`Remove ${skill} skill`}
                          />
                        </Badge>
                      ))}
                      {form.getValues().skills.length === 0 && (
                        <div className="text-sm text-muted-foreground py-1">
                          No skills added yet. Select from the list below.
                        </div>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <FormLabel>Popular Skills</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skillsList.slice(0, 20).map(skill => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className={`
                              cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors
                              ${form.getValues().skills.includes(skill) ? 'bg-primary text-primary-foreground' : ''}
                            `}
                            onClick={() => form.getValues().skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && (form.getValues().skills.includes(skill) ? removeSkill(skill) : addSkill(skill))}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card id="certifications">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Upload professional certifications to enhance your credibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professional?.certifications.map(cert => (
                  <div key={cert.id} className="flex items-start gap-4 p-3 rounded-lg border">
                    <div className="flex-1">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • Issued {new Date(cert.date).toLocaleDateString()}
                      </p>
                      {cert.validUntil && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Valid until {new Date(cert.validUntil).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {cert.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full py-8 border-dashed">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Certification
                </Button>
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