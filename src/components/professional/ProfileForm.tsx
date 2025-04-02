import React, { useState, useRef } from "react";
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
import { X, Plus, Upload, Calendar, Eye, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { IPortfolioItem } from "@/lib/store";

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
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewingPortfolioItem, setViewingPortfolioItem] = useState<IPortfolioItem | null>(null);
  const skillInputRef = useRef<HTMLInputElement>(null);
  
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="overflow-visible">
        <div className="space-y-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
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
          
          <Card id="availability" className="border-t-4 border-t-teal-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
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
          
          <Card id="skills" className="border-t-4 border-t-purple-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
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
          
          <Card id="certifications" className="border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
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
          
          <Card id="portfolio" className="border-t-4 border-t-teal-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>
                Showcase your best work with photos and videos to attract more clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {professional?.portfolio && professional.portfolio.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {professional.portfolio.map((item) => (
                      <div 
                        key={item.id}
                        className="group relative flex flex-col rounded-lg border overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setViewingPortfolioItem(item)}
                      >
                        <div className="relative aspect-video bg-slate-100">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.altText || item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">
                              <span>No image</span>
                            </div>
                          )}
                          {/* Video icon for video items */}
                          {item.imageUrl?.endsWith('.mp4') && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="secondary"
                              size="sm"
                              className="h-7 w-7 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingPortfolioItem(item);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {item.tags?.map((tag) => (
                              <span key={tag} className="inline-flex text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!professional) return;
                              const newPortfolio = professional.portfolio?.filter(p => p.id !== item.id) || [];
                              setProfessional({
                                ...professional,
                                portfolio: newPortfolio
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                  <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg">Add Your First Portfolio Item</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                    Showcase your skills and experience with photos of your best work. Construction professionals with portfolios get 3x more job inquiries.
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-4">Add New Portfolio Item</h3>
                <div className="space-y-4">
                  {/* Media Upload Section */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <FormLabel>Photos/Videos</FormLabel>
                      <div 
                        className="mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                        onClick={() => {
                          // In a real implementation, this would trigger a file upload dialog
                          // For the demo, we'll add a dummy portfolio item
                          if (!professional) return;
                          
                          const newItem: IPortfolioItem = {
                            id: `port${Date.now()}`,
                            title: "New Construction Project",
                            description: "A brief description of your project and your role in it.",
                            imageUrl: "/portfolio/construction-default.jpg",
                            tags: ["Residential", "Carpentry"],
                            date: new Date().toISOString()
                          };
                          
                          const newPortfolio = [...(professional.portfolio || []), newItem];
                          setProfessional({
                            ...professional,
                            portfolio: newPortfolio
                          });
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && professional) {
                            const newItem: IPortfolioItem = {
                              id: `port${Date.now()}`,
                              title: "New Construction Project",
                              description: "A brief description of your project and your role in it.",
                              imageUrl: "/portfolio/construction-default.jpg",
                              tags: ["Residential", "Carpentry"],
                              date: new Date().toISOString()
                            };
                            
                            const newPortfolio = [...(professional.portfolio || []), newItem];
                            setProfessional({
                              ...professional,
                              portfolio: newPortfolio
                            });
                          }
                        }}
                        aria-label="Upload portfolio photos or videos"
                      >
                        <Upload className="h-8 w-8 text-blue-500 mb-2" />
                        <div className="space-y-1 text-center">
                          <p className="text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">
                            Support for images (JPG, PNG) and videos (MP4) up to 50MB
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button size="sm" variant="secondary">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                      <FormDescription className="mt-1.5">
                        <span className="font-medium">Pro Tip:</span> Include "before and after" photos to showcase your transformation work
                      </FormDescription>
                    </div>
                    
                    <div>
                      <FormLabel>Project Type</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="repair">Repair</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Project Date</FormLabel>
                      <Input type="date" max={new Date().toISOString().split('T')[0]} />
                    </div>
                    
                    <div className="col-span-2">
                      <FormLabel>Project Title</FormLabel>
                      <Input placeholder="E.g., Kitchen Renovation, Commercial Electrical Installation" />
                    </div>
                    
                    <div className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <Textarea 
                        placeholder="Describe your role, the challenges you solved, and the results. Example: 'Completed full bathroom remodel including plumbing, tiling, and fixture installation for a 1920s home while preserving original features.'"
                        className="min-h-20"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <FormLabel>Skills Used</FormLabel>
                      
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        {/* Selected skills for this portfolio item */}
                        {/* In a real implementation, we would have local state for portfolio item skills */}
                        {["Carpentry", "Residential"].map(skill => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="py-1 px-2 cursor-pointer"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 ml-1"
                              onClick={() => {
                                // Remove skill from portfolio item
                              }}
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && {
                                // Remove skill
                              }}
                              aria-label={`Remove ${skill} skill`}
                            />
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <Input
                          ref={skillInputRef}
                          placeholder="Type to add skills (e.g., Carpentry, Electrical, Plumbing)"
                          value={skillInput}
                          onChange={(e) => {
                            setSkillInput(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => {
                            // Delay hiding suggestions to allow clicks to register
                            setTimeout(() => setShowSuggestions(false), 200);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && skillInput.trim()) {
                              // In a real implementation, add the skill to portfolio item
                              // For now, just clear the input
                              setSkillInput("");
                              e.preventDefault();
                            }
                          }}
                        />
                        
                        {showSuggestions && skillInput.trim() && (
                          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {skillsList
                              .filter(skill => 
                                skill.toLowerCase().includes(skillInput.toLowerCase())
                              )
                              .slice(0, 6)
                              .map(skill => (
                                <div 
                                  key={skill}
                                  className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                                  onClick={() => {
                                    // In a real implementation, add the skill to portfolio item
                                    // For now, just clear the input
                                    setSkillInput("");
                                    setShowSuggestions(false);
                                  }}
                                >
                                  {skill}
                                </div>
                              ))}
                              
                            {skillsList.filter(skill => 
                              skill.toLowerCase().includes(skillInput.toLowerCase())
                            ).length === 0 && (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                No matches found. Press Enter to add as a custom skill.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <FormDescription className="mt-1.5">
                        Add skills relevant to this specific project to highlight your expertise
                      </FormDescription>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    type="button"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Add To Portfolio
                  </Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium flex items-center text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Portfolio Tips for Construction Professionals
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Take photos in good lighting to clearly show your work quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Include before/after comparisons for renovation projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Add short videos (30-60 seconds) showing your techniques or completed projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Highlight safety practices and quality finishes that set your work apart</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <CardFooter className="flex items-center justify-between border-t p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${professional?.profileComplete || 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{professional?.profileComplete || 0}%</span>
            </div>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </CardFooter>
        </div>
      </form>

      {/* Portfolio Item Viewer Dialog */}
      <Dialog open={!!viewingPortfolioItem} onOpenChange={(open) => !open && setViewingPortfolioItem(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden p-0">
          {viewingPortfolioItem && (
            <>
              <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-2">
                <DialogTitle className="text-xl">{viewingPortfolioItem.title}</DialogTitle>
                <DialogDescription className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(viewingPortfolioItem.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="flex-grow overflow-y-auto px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-md overflow-hidden bg-black">
                    {viewingPortfolioItem.imageUrl?.endsWith('.mp4') ? (
                      <video 
                        src={viewingPortfolioItem.imageUrl} 
                        className="w-full h-auto max-h-80 object-contain mx-auto" 
                        controls 
                      />
                    ) : (
                      <img 
                        src={viewingPortfolioItem.imageUrl} 
                        alt={viewingPortfolioItem.altText || viewingPortfolioItem.title}
                        className="w-full h-auto max-h-80 object-contain mx-auto"
                      />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Description</h3>
                      <div className="mt-2 bg-slate-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {viewingPortfolioItem.description}
                        </p>
                      </div>
                      <Textarea
                        value={viewingPortfolioItem.description}
                        className="mt-3 min-h-24"
                        placeholder="Add more details about this project, your specific role, challenges overcome, and results achieved..."
                        onChange={(e) => {
                          if (!professional) return;
                          
                          const updatedPortfolio = professional.portfolio?.map(item => {
                            if (item.id === viewingPortfolioItem.id) {
                              return {
                                ...item,
                                description: e.target.value
                              };
                            }
                            return item;
                          }) || [];
                          
                          setProfessional({
                            ...professional,
                            portfolio: updatedPortfolio
                          });
                          
                          setViewingPortfolioItem({
                            ...viewingPortfolioItem,
                            description: e.target.value
                          });
                        }}
                      />
                      <FormDescription className="mt-1 text-xs">
                        Detailed descriptions help potential clients understand your expertise and the value you brought to the project
                      </FormDescription>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium">Skills Used</h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {viewingPortfolioItem.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="py-1 px-2">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between border-t px-6 pb-6 mt-auto flex-shrink-0">
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    if (!professional) return;
                    const newPortfolio = professional.portfolio?.filter(p => p.id !== viewingPortfolioItem.id) || [];
                    setProfessional({
                      ...professional,
                      portfolio: newPortfolio
                    });
                    setViewingPortfolioItem(null);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Remove Item
                </Button>
                
                <DialogClose asChild>
                  <Button variant="ghost">Close</Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Form>
  );
}; 