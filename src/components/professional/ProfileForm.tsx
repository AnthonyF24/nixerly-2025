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
import { X, Plus, Upload, Calendar, Eye, XCircle, Award, CheckCircle, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { IPortfolioItem } from "@/lib/store";
import { Label } from "@/components/ui/label";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  town: z.string().optional(),
  country: z.string().optional(),
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
      town: professional?.town || "",
      country: professional?.country || "",
      availability: professional?.availability || false,
      skills: professional?.skills || [],
    }
  });
  
  const handleSubmit = (data: ProfileFormValues) => {
    if (!professional) return;
    
    // Calculate profile completion percentage
    let completionItems = 0;
    let totalItems = 6; // name, email, bio, town, country, skills
    
    if (data.name) completionItems++;
    if (data.email) completionItems++;
    if (data.bio) completionItems++;
    if (data.town) completionItems++;
    if (data.country) completionItems++;
    if (data.skills.length > 0) completionItems++;
    
    // Add certifications and portfolio to calculation
    totalItems += 2;
    if (professional.certifications.length > 0) completionItems++;
    if (professional.portfolio.length > 0) completionItems++;

    // Create formatted location from town and country
    const location = data.town && data.country 
      ? `${data.town}, ${data.country}` 
      : data.town || data.country || '';
    
    const profileComplete = Math.round((completionItems / totalItems) * 100);
    
    // Update professional data
    setProfessional({
      ...professional,
      ...data,
      location,
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
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mb-6">
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
                        className={field.value ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Cover Image Upload Section */}
              <div className="mb-6">
                <FormLabel className="text-base block mb-2">Profile Cover Image</FormLabel>
                <div className="relative h-40 rounded-lg overflow-hidden border-2 border-dashed hover:border-blue-300 transition-colors">
                  {professional?.coverImageUrl ? (
                    <div className="relative h-full w-full">
                      <img 
                        src={professional.coverImageUrl} 
                        alt="Cover image" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 border border-white/20"
                          onClick={() => {
                            if (!professional) return;
                            const updatedProfessional = { ...professional };
                            delete updatedProfessional.coverImageUrl;
                            setProfessional(updatedProfessional);
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                      onClick={() => {
                        // In a real app, this would trigger the file upload dialog
                        if (!professional) return;
                        
                        // For demo, we'll use a sample cover image
                        const sampleCovers = [
                          '/images/covers/construction-cover.jpg',
                          '/images/covers/engineering-cover.jpg',
                          '/images/covers/electrical-cover.jpg',
                          '/images/covers/plumbing-cover.jpg',
                          '/images/covers/professional-cover.jpg'
                        ];
                        
                        const randomCover = sampleCovers[Math.floor(Math.random() * sampleCovers.length)];
                        
                        setProfessional({
                          ...professional,
                          coverImageUrl: randomCover
                        });
                      }}
                    >
                      <Upload className="h-6 w-6 text-blue-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload cover image</p>
                      <p className="text-xs text-gray-400 mt-1">Recommended size: 1600×400 (Max 5MB)</p>
                    </div>
                  )}
                </div>
                <FormDescription className="mt-2">
                  Your cover image appears at the top of your profile and dashboard. Choose an image that represents your professional work.
                </FormDescription>
              </div>

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
                      This helps match you with nearby job opportunities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setViewingPortfolioItem(item)}
                        aria-label={`View portfolio item: ${item.title}`}
                      >
                        <div className="relative aspect-video bg-slate-100">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.altText || item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="font-medium text-white line-clamp-1">{item.title}</h3>
                              <p className="text-xs text-white/80 mt-1 line-clamp-1">
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-7 w-7 bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 border border-white/20"
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
                        <div className="bg-white p-3">
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.tags?.slice(0, 2).map((tag) => (
                              <span key={tag} className="inline-flex text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {item.tags && item.tags.length > 2 && (
                              <span className="inline-flex text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full py-8 border-dashed bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Portfolio Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Portfolio Item</DialogTitle>
                      <DialogDescription>
                        Showcase your work with images and details about your projects
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-title">Project Title</Label>
                        <Input id="portfolio-title" placeholder="e.g. Commercial Building Electrical Installation" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-description">Description</Label>
                        <Textarea 
                          id="portfolio-description" 
                          placeholder="Describe the project, your role, challenges overcome, and results achieved..."
                          className="min-h-20"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-image">Project Photo/Video</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                          <Upload className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG, MP4 (Max 10MB)</p>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-date">Project Date</Label>
                        <Input id="portfolio-date" type="date" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="portfolio-tags">Skills Used (comma-separated)</Label>
                        <Input id="portfolio-tags" placeholder="e.g. Electrical, Commercial, Wiring" />
                        <p className="text-xs text-gray-500">
                          Add tags to help potential clients understand what skills you used
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button 
                        type="button"
                        onClick={() => {
                          if (!professional) return;
                          
                          // In a real app, this would submit the form values
                          // For demo purposes, we'll add a mock portfolio item
                          const titleInput = document.getElementById('portfolio-title') as HTMLInputElement;
                          const descriptionInput = document.getElementById('portfolio-description') as HTMLTextAreaElement;
                          const dateInput = document.getElementById('portfolio-date') as HTMLInputElement;
                          const tagsInput = document.getElementById('portfolio-tags') as HTMLInputElement;
                          
                          const title = titleInput?.value || 'New Construction Project';
                          const description = descriptionInput?.value || 'A detailed description of the project, highlighting your contributions and skills applied.';
                          const date = dateInput?.value ? new Date(dateInput.value).toISOString() : new Date().toISOString();
                          const tags = tagsInput?.value 
                            ? tagsInput.value.split(',').map(tag => tag.trim())
                            : ['Construction', 'Renovation'];
                          
                          // Sample portfolio images for demo purposes
                          const sampleImages = [
                            '/portfolio/construction-1.jpg',
                            '/portfolio/construction-2.jpg',
                            '/portfolio/electrical-work.jpg',
                            '/portfolio/smarthome.jpg',
                            '/portfolio/construction-default.jpg'
                          ];
                          
                          const imageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
                          
                          const newItem: IPortfolioItem = {
                            id: `port-${Date.now()}`,
                            title,
                            description,
                            imageUrl,
                            tags,
                            date
                          };
                          
                          const newPortfolio = [...(professional.portfolio || []), newItem];
                          setProfessional({
                            ...professional,
                            portfolio: newPortfolio
                          });
                          
                          // Reset form
                          if (titleInput) titleInput.value = '';
                          if (descriptionInput) descriptionInput.value = '';
                          if (dateInput) dateInput.value = '';
                          if (tagsInput) tagsInput.value = '';
                        }}
                      >
                        Add to Portfolio
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          {/* Verification Section */}
          <Card id="verification" className="border-t-4 border-t-green-500 hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Verification
              </CardTitle>
              <CardDescription>
                Get verified to increase trust and visibility with potential employers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">Benefits of Verification</h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Appear higher in search results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Display a "Verified" badge on your profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Improve trust with potential employers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Get more job inquiries and better opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Verification Status</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {professional?.verified 
                        ? "Your profile is verified" 
                        : "Your profile is not yet verified"}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    {professional?.verified ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Not Verified
                      </Badge>
                    )}
                  </div>
                </div>
                
                {!professional?.verified && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Get verified for a one-time fee of <span className="font-semibold">€10</span>. Verification increases your visibility to potential employers and shows that you're committed to building trust.
                    </p>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                          Request Verification
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Verify Your Professional Profile</DialogTitle>
                          <DialogDescription>
                            Complete verification to improve your visibility and credibility
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4 space-y-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800">Verification Process</h4>
                            <ol className="mt-2 space-y-2 text-sm text-blue-700">
                              <li className="flex items-start gap-2">
                                <div className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                                <span>Pay the one-time verification fee of €10</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                                <span>Submit copies of your certifications and ID</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                                <span>Our team will review your documents (1-2 business days)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="bg-blue-200 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                                <span>Once approved, your profile will display a verification badge</span>
                              </li>
                            </ol>
                          </div>
                          
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="upload-id">Upload ID Document</Label>
                              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                <Upload className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                                <p className="text-sm text-gray-500">Upload a valid government ID</p>
                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                              </div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="upload-certs">Upload Certifications</Label>
                              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                <FileText className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                                <p className="text-sm text-gray-500">Upload certification documents</p>
                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF (Max 10MB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={() => {
                              if (!professional) return;
                              
                              setProfessional({
                                ...professional,
                                verified: true,
                              });
                              
                              // Show toast or notification
                              alert("Your profile has been verified successfully! (In a real app, this would process payment and start the review process)");
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Pay €10 and Submit
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
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
                {professional?.certifications && professional.certifications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {professional.certifications.map(cert => (
                      <div key={cert.id} className="flex items-start gap-4 p-4 rounded-lg border hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-md">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{cert.name}</h3>
                            {cert.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {cert.issuer} • Issued {new Date(cert.date).toLocaleDateString()}
                          </p>
                          {cert.validUntil && (
                            <p className="text-xs text-muted-foreground mt-1">
                              <span className={`${
                                new Date(cert.validUntil) < new Date() 
                                  ? "text-red-500 font-medium" 
                                  : "text-green-600"
                              }`}>
                                {new Date(cert.validUntil) < new Date() 
                                  ? "Expired" 
                                  : "Valid until"} {new Date(cert.validUntil).toLocaleDateString()}
                              </span>
                            </p>
                          )}
                          {cert.documentUrl && (
                            <div className="mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => window.open(cert.documentUrl, '_blank')}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                View Document
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => {
                            if (!professional) return;
                            
                            const updatedCertifications = professional.certifications?.filter(
                              c => c.id !== cert.id
                            ) || [];
                            
                            setProfessional({
                              ...professional,
                              certifications: updatedCertifications
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 mb-4">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-lg">No Certifications Added</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      Showcase your professional qualifications by adding certifications. Professionals with verified certifications get 2x more job opportunities.
                    </p>
                  </div>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full py-8 border-dashed flex items-center justify-center gap-2"
                    >
                      <Upload className="h-5 w-5" />
                      Add Certification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Certification</DialogTitle>
                      <DialogDescription>
                        Add details of your professional certifications, licenses, or qualifications.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cert-name">Certification Name</Label>
                        <Input id="cert-name" placeholder="e.g. Master Electrician License" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cert-issuer">Issuing Organization</Label>
                        <Input id="cert-issuer" placeholder="e.g. State Electrical Board" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cert-date">Issue Date</Label>
                          <Input id="cert-date" type="date" />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="cert-expiry">Expiry Date (Optional)</Label>
                          <Input id="cert-expiry" type="date" />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cert-document">Upload Document (Optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                          <Upload className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button 
                        type="button"
                        onClick={() => {
                          if (!professional) return;
                          
                          // In a real app, this would submit the form values
                          // For demo purposes, we'll add a mock certification
                          const nameInput = document.getElementById('cert-name') as HTMLInputElement;
                          const issuerInput = document.getElementById('cert-issuer') as HTMLInputElement;
                          const dateInput = document.getElementById('cert-date') as HTMLInputElement;
                          const expiryInput = document.getElementById('cert-expiry') as HTMLInputElement;
                          
                          const name = nameInput?.value || 'OSHA Safety Certification';
                          const issuer = issuerInput?.value || 'Occupational Safety and Health Administration';
                          const date = dateInput?.value ? new Date(dateInput.value).toISOString() : new Date().toISOString();
                          const validUntil = expiryInput?.value ? new Date(expiryInput.value).toISOString() : undefined;
                          
                          const newCertification: ICertification = {
                            id: `cert-${Date.now()}`,
                            name,
                            issuer,
                            date,
                            validUntil,
                            verified: false,
                            documentUrl: '/certs/sample-certification.pdf'
                          };
                          
                          const updatedCertifications = [
                            ...(professional.certifications || []),
                            newCertification
                          ];
                          
                          setProfessional({
                            ...professional,
                            certifications: updatedCertifications
                          });
                          
                          // Reset form
                          if (nameInput) nameInput.value = '';
                          if (issuerInput) issuerInput.value = '';
                          if (dateInput) dateInput.value = '';
                          if (expiryInput) expiryInput.value = '';
                        }}
                      >
                        Add Certification
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
                    <div className="flex flex-wrap gap-2 mb-4 min-h-12 border p-2 rounded-md">
                      {form.getValues().skills.map(skill => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="py-1.5 px-3 cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          {skill}
                          <X
                            className="h-3.5 w-3.5 ml-1.5"
                            onClick={() => removeSkill(skill)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && removeSkill(skill)}
                            aria-label={`Remove ${skill} skill`}
                          />
                        </Badge>
                      ))}
                      {form.getValues().skills.length === 0 && (
                        <div className="text-sm text-muted-foreground py-1.5 px-2">
                          No skills added yet. Select from suggestions or search below.
                        </div>
                      )}
                    </div>
                    
                    <div className="relative mb-6">
                      <Input
                        placeholder="Search for a skill or type to add custom skill..."
                        value={skillInput}
                        onChange={(e) => {
                          setSkillInput(e.target.value);
                          setShowSuggestions(e.target.value.length > 0);
                        }}
                        onFocus={() => setShowSuggestions(skillInput.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        ref={skillInputRef}
                        className="pr-24"
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="absolute right-1 top-1 h-8"
                        disabled={!skillInput.trim()}
                        onClick={() => {
                          if (skillInput.trim()) {
                            addSkill(skillInput.trim());
                            setSkillInput("");
                            setShowSuggestions(false);
                          }
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                      
                      {/* Skill search suggestions */}
                      {showSuggestions && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                          {skillsList
                            .filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase()))
                            .slice(0, 6)
                            .map(skill => (
                              <div
                                key={skill}
                                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                onClick={() => {
                                  addSkill(skill);
                                  setSkillInput("");
                                  setShowSuggestions(false);
                                  skillInputRef.current?.focus();
                                }}
                              >
                                {skill}
                              </div>
                            ))}
                          {skillsList.filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase())).length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-500 italic">
                              No matching skills found. Press "Add" to create a custom skill.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <FormLabel>Popular Construction Skills</FormLabel>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-7"
                            onClick={() => setShowAllSkills(!showAllSkills)}
                          >
                            {showAllSkills ? "Show Less" : "Show More"}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skillsList.slice(0, showAllSkills ? 30 : 15).map(skill => (
                            <Badge 
                              key={skill} 
                              variant="outline" 
                              className={`
                                cursor-pointer transition-colors
                                ${form.getValues().skills.includes(skill) 
                                  ? 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200' 
                                  : 'hover:bg-slate-100'}
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
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                              <path d="M21.64 3.64a1.35 1.35 0 0 0-1.2-.38L2.27 7.62a1.35 1.35 0 0 0-.92 1.69a1.35 1.35 0 0 0 1.2.73L6 10.3l.28 4.78a1.86 1.86 0 0 0 .68 1.26a1.8 1.8 0 0 0 2.25.26L12 14.86l4.2 4.7a1.35 1.35 0 0 0 2.28-.97l2.8-13.03a1.35 1.35 0 0 0-.28-1.31" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">AI-Powered Skill Suggestions</h4>
                            <p className="text-xs text-blue-700/70 mt-1">Based on your profile, you might want to add these skills:</p>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {professional?.certifications?.map(cert => cert.name.split(' '))
                                .flat()
                                .filter(word => word.length > 3 && !skillsList.some(skill => skill.includes(word)))
                                .slice(0, 3)
                                .map((skill, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="outline" 
                                    className="cursor-pointer border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                                    onClick={() => form.getValues().skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    {skill}
                                  </Badge>
                                ))}
                              
                              {/* Add some reasonable construction-related skills as suggestions */}
                              {['Project Management', 'Safety Compliance', 'Team Leadership', 'Client Communication'].map((skill, idx) => (
                                <Badge 
                                  key={`sugg-${idx}`} 
                                  variant="outline" 
                                  className="cursor-pointer border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                                  onClick={() => form.getValues().skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end border-t">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Save Profile
              </Button>
            </CardFooter>
          </Card>

          {/* Portfolio Item Viewer Dialog */}
          <Dialog open={!!viewingPortfolioItem} onOpenChange={(open) => !open && setViewingPortfolioItem(null)}>
            <DialogContent className="max-w-4xl max-h-screen flex flex-col overflow-hidden">
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

        </div>

        <Button 
          type="submit" 
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}; 