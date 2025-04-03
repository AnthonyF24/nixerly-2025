"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/lib/store";
import { locationsList, skillsList } from "@/lib/dummy-data";
import { Calendar as CalendarIcon, X, Plus, ArrowRight, ArrowLeft, Check, Search, MapPin, Briefcase, Euro, BadgeCheck, Save, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IJob } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

// Define form schema
const jobFormSchema = z.object({
  title: z.string().min(5, {
    message: "Job title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  location: z.string().optional(),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one required skill.",
  }),
  deadline: z.date().optional(),
  status: z.enum(["draft", "open", "closed"]),
  remoteOk: z.boolean().default(false),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryType: z.enum(["hourly", "daily", "annual"]).default("annual"),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobPostWizardProps {
  job?: IJob;
  onSuccess?: () => void;
}

export const JobPostWizard: React.FC<JobPostWizardProps> = ({ job, onSuccess }) => {
  const { business, addJob, updateJob } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form setup
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: job
      ? {
          title: job.title,
          description: job.description,
          location: job.location,
          skills: job.skills,
          deadline: job.deadline ? new Date(job.deadline) : undefined,
          status: job.status,
          remoteOk: job.location?.toLowerCase().includes("remote") || false,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          salaryType: job.salaryType || "annual",
        }
      : {
          title: "",
          description: "",
          location: "",
          skills: [],
          deadline: undefined,
          status: "draft",
          remoteOk: false,
          salaryMin: undefined,
          salaryMax: undefined,
          salaryType: "annual",
        },
  });

  // Validation check for different steps
  const canAdvanceToStep2 = form.getValues().title.length >= 5 && form.getValues().description.length >= 20;
  const canAdvanceToStep3 = form.getValues().skills.length >= 1;

  // Skills management
  const addSkill = (skill: string) => {
    if (!form.getValues().skills.includes(skill) && skill.trim() !== "") {
      const updatedSkills = [...form.getValues().skills, skill.trim()];
      form.setValue("skills", updatedSkills, { shouldValidate: true });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = form.getValues().skills.filter((s) => s !== skill);
    form.setValue("skills", updatedSkills, { shouldValidate: true });
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep === 1 && !canAdvanceToStep2) {
      form.trigger(["title", "description"]);
      return;
    }
    
    if (currentStep === 2 && !canAdvanceToStep3) {
      form.trigger(["skills"]);
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Save function handlers
  const handleSaveDraft = () => {
    form.setValue("status", "draft");
    form.handleSubmit(submitJob)();
  };

  const handlePublish = () => {
    form.setValue("status", "open");
    form.handleSubmit(submitJob)();
  };

  const submitJob = (data: JobFormValues) => {
    if (!business) return;
    
    setIsSubmitting(true);
    
    try {
      const jobData: IJob = {
        id: job?.id || uuidv4(),
        title: data.title,
        description: data.description,
        location: data.remoteOk
          ? data.location
            ? `${data.location} (Remote OK)`
            : "Remote"
          : data.location,
        skills: data.skills,
        datePosted: job?.datePosted || new Date().toISOString(),
        deadline: data.deadline?.toISOString(),
        status: data.status,
        businessId: business.id,
        businessName: business.name,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        salaryType: data.salaryType,
      };

      if (job) {
        updateJob(jobData);
      } else {
        addJob(jobData);
      }

      toast({
        title: data.status === "draft" ? "Draft saved" : "Job posted successfully",
        description: data.status === "draft" 
          ? "Your job has been saved as a draft." 
          : "Your job posting is now live and visible to professionals.",
        variant: "success"
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter skills based on search
  const filteredSkills = skillsList.filter(
    (skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && 
    !form.getValues().skills.includes(skill)
  );

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Wizard header with progress */}
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
              {job ? "Edit Job" : "Post New Job"}
            </h2>
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />

          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <div className={cn("flex flex-col items-center", currentStep >= 1 ? "text-blue-600 font-medium" : "")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mb-1", 
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              )}>
                {currentStep > 1 ? <Check className="h-3 w-3" /> : "1"}
              </div>
              <span>Basics</span>
            </div>

            <div className={cn("flex flex-col items-center", currentStep >= 2 ? "text-blue-600 font-medium" : "")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mb-1", 
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
              )}>
                {currentStep > 2 ? <Check className="h-3 w-3" /> : "2"}
              </div>
              <span>Skills</span>
            </div>

            <div className={cn("flex flex-col items-center", currentStep >= 3 ? "text-blue-600 font-medium" : "")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mb-1", 
                currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
              )}>
                3
              </div>
              <span>Details</span>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                        Job Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Electrician" {...field} />
                      </FormControl>
                      <FormDescription>
                        Be specific to attract the right candidates.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <BadgeCheck className="h-4 w-4 mr-2 text-blue-600" />
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, responsibilities, qualifications, and any other important details..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include information about the project, team, and required experience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={!form.formState.isValid || isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={nextStep} disabled={!canAdvanceToStep2}>
                Next: Skills
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <BadgeCheck className="h-4 w-4 mr-2 text-blue-600" />
                        Required Skills
                      </FormLabel>
                      
                      <div className="relative">
                        <div className="flex items-center">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            className="pl-9 pr-12"
                            placeholder="Search for skills or add your own..."
                            value={skillInput}
                            onChange={(e) => {
                              setSkillInput(e.target.value);
                              setShowSkillSuggestions(true);
                            }}
                            onFocus={() => setShowSkillSuggestions(true)}
                          />
                          <Button
                            type="button"
                            size="sm"
                            className="absolute right-1 top-1 h-8"
                            disabled={!skillInput.trim()}
                            onClick={() => addSkill(skillInput)}
                          >
                            Add
                          </Button>
                        </div>

                        {showSkillSuggestions && skillInput && (
                          <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white rounded-md shadow-lg border">
                            {filteredSkills.length > 0 ? (
                              filteredSkills.slice(0, 5).map((skill) => (
                                <div
                                  key={skill}
                                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                                  onClick={() => {
                                    addSkill(skill);
                                    setShowSkillSuggestions(false);
                                  }}
                                >
                                  {skill}
                                </div>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-sm text-gray-500">
                                No matching skills found. Press "Add" to create a custom skill.
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 min-h-12 p-3 border rounded-md">
                        {form.getValues().skills.map((skill) => (
                          <Badge key={skill} className="py-1.5 px-2 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                            {skill}
                            <X
                              className="h-3 w-3 ml-1.5 cursor-pointer"
                              onClick={() => removeSkill(skill)}
                              tabIndex={0}
                              onKeyDown={(e) => e.key === "Enter" && removeSkill(skill)}
                              aria-label={`Remove ${skill} skill`}
                            />
                          </Badge>
                        ))}
                        {form.getValues().skills.length === 0 && (
                          <div className="text-sm text-gray-500 py-1">
                            No skills added yet. Search and add skills above.
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <h3 className="text-sm font-medium mb-3">Popular Skills in Construction</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.slice(0, 15).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className={`cursor-pointer transition-colors ${
                          form.getValues().skills.includes(skill)
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : ""
                        }`}
                        onClick={() =>
                          form.getValues().skills.includes(skill)
                            ? removeSkill(skill)
                            : addSkill(skill)
                        }
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          (form.getValues().skills.includes(skill)
                            ? removeSkill(skill)
                            : addSkill(skill))
                        }
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={nextStep} disabled={!canAdvanceToStep3}>
                Next: Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Additional Details */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                          Location
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locationsList.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-600" />
                          Application Deadline
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="remoteOk"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remote Work Available</FormLabel>
                        <FormDescription>
                          Check this if candidates can work remotely for this position.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-base font-medium flex items-center">
                    <Euro className="h-4 w-4 mr-2 text-blue-600" />
                    Compensation Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="salaryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly Rate (€/hr)</SelectItem>
                              <SelectItem value="daily">Daily Rate (€/day)</SelectItem>
                              <SelectItem value="annual">Annual Salary (€/year)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salaryMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Minimum {
                              form.getValues().salaryType === "hourly" 
                                ? "Rate" 
                                : form.getValues().salaryType === "daily" 
                                  ? "Rate" 
                                  : "Salary"
                            }
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={
                                form.getValues().salaryType === "hourly" 
                                  ? "e.g. 15" 
                                  : form.getValues().salaryType === "daily" 
                                    ? "e.g. 150" 
                                    : "e.g. 30000"
                              }
                              value={field.value?.toString() || ""}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salaryMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Maximum {
                              form.getValues().salaryType === "hourly" 
                                ? "Rate" 
                                : form.getValues().salaryType === "daily" 
                                  ? "Rate" 
                                  : "Salary"
                            }
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={
                                form.getValues().salaryType === "hourly" 
                                  ? "e.g. 25" 
                                  : form.getValues().salaryType === "daily" 
                                    ? "e.g. 250" 
                                    : "e.g. 50000"
                              }
                              value={field.value?.toString() || ""}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={handlePublish}
                disabled={isSubmitting}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                {isSubmitting ? "Publishing..." : "Publish Job"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
}; 