import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/lib/store";
import { locationsList, skillsList } from "@/lib/dummy-data";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IJob } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

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
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobPostFormProps {
  job?: IJob;
  onSuccess?: () => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ job, onSuccess }) => {
  const { business, addJob, updateJob } = useAppStore();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: job ? {
      title: job.title,
      description: job.description,
      location: job.location,
      skills: job.skills,
      deadline: job.deadline ? new Date(job.deadline) : undefined,
      status: job.status,
      remoteOk: job.location?.toLowerCase().includes('remote') || false,
    } : {
      title: "",
      description: "",
      location: "",
      skills: [],
      deadline: undefined,
      status: "draft",
      remoteOk: false,
    }
  });
  
  const handleSubmit = (data: JobFormValues) => {
    if (!business) return;
    
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
    };
    
    if (job) {
      updateJob(jobData);
    } else {
      addJob(jobData);
    }
    
    if (onSuccess) {
      onSuccess();
    }
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide details about the job position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior React Developer" {...field} />
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
                  <FormLabel>Job Description</FormLabel>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <SelectValue placeholder="Select a location" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Application Deadline (Optional)</FormLabel>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
            <CardDescription>
              Select the skills required for this job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.getValues().skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="py-1 px-2">
                        {skill}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
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
                    <div className="text-sm font-medium mb-2">Popular Skills</div>
                    <div className="flex flex-wrap gap-2">
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
                  
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Publish Settings</CardTitle>
            <CardDescription>
              Control the visibility of your job post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                      <SelectItem value="open">Publish Now (Open)</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value === 'draft' && "Your job post will be saved but not visible to professionals."}
                    {field.value === 'open' && "Your job post will be immediately visible to professionals."}
                    {field.value === 'closed' && "Applications will be closed for this position."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {job ? 'Update Job' : 'Create Job'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobPostForm; 