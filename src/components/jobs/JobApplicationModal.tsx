"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from '@/lib/store';
import { IJob, IProfessional } from '@/lib/store';
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, FileText, User, Phone, Mail, MapPin, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobApplicationModalProps {
  isOpen: boolean;
  job: IJob;
  onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, job, onClose }) => {
  const { professional, addJobApplication, hasAppliedToJob } = useAppStore();
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!professional) return;
    
    setIsSubmitting(true);
    
    try {
      // Add application to store
      addJobApplication({
        jobId: job.id,
        professionalId: professional.id,
        coverNote: coverNote,
      });
      
      // Show success toast
      toast({
        title: "Application Submitted",
        description: "Your application has been sent to the employer.",
        duration: 5000,
      });
      
      // Close modal
      onClose();
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const alreadyApplied = professional ? hasAppliedToJob(job.id, professional.id) : false;
  
  if (!professional) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Submit your application to {job.businessName} using your professional profile.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          {/* Professional profile summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12 border border-blue-200">
                <AvatarImage src="/avatars/professional.jpg" alt={professional.name} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {professional.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg flex items-center gap-2">
                  {professional.name}
                  {professional.verified && (
                    <BadgeCheck className="h-4 w-4 text-blue-600" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{professional.bio?.substring(0, 60)}...</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{professional.email}</span>
              </div>
              
              {professional.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{professional.phone}</span>
                </div>
              )}
              
              {professional.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{professional.location}</span>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Skills:</div>
              <div className="flex flex-wrap gap-1">
                {professional.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Cover note */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Note (Optional)</label>
            <Textarea
              placeholder="Add a personal note to your application. Explain why you're a great fit for this job..."
              className="min-h-[120px]"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              disabled={isSubmitting || alreadyApplied}
            />
          </div>
          
          {alreadyApplied && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <p className="text-sm">You have already applied to this job.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || alreadyApplied}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal; 