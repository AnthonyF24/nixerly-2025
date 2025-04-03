"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { IJob, IPortfolioItem } from "@/lib/store";
import { CheckCircle, ChevronRight, Clipboard, SendHorizontal, X, CheckSquare, Upload, Briefcase, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobApplicationModalProps {
  job: IJob;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const { professional, hasAppliedToJob, addJobApplication } = useAppStore();
  const router = useRouter();
  
  const [step, setStep] = useState<number>(1);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [selectedPortfolioItems, setSelectedPortfolioItems] = useState<string[]>([]);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  
  // Check if user has already applied to this job
  const hasApplied = professional && hasAppliedToJob(job.id, professional.id);
  
  const handlePortfolioItemToggle = (portfolioId: string) => {
    if (selectedPortfolioItems.includes(portfolioId)) {
      setSelectedPortfolioItems(selectedPortfolioItems.filter(id => id !== portfolioId));
    } else {
      setSelectedPortfolioItems([...selectedPortfolioItems, portfolioId]);
    }
  };
  
  const handleSubmitApplication = () => {
    if (!professional) return;
    
    // Submit application
    addJobApplication({
      jobId: job.id,
      professionalId: professional.id,
      coverNote: coverLetter,
      status: 'pending'
    });
    
    // Show success state
    setApplicationSubmitted(true);
    
    // Show success toast
    toast.success("Application submitted successfully!", {
      description: "The employer will review your application and contact you if interested.",
      duration: 5000,
    });
    
    // Reset form after submission
    setTimeout(() => {
      setCoverLetter("");
      setSelectedPortfolioItems([]);
      setStep(1);
      setApplicationSubmitted(false);
      onClose();
    }, 3000);
  };
  
  const handleClose = () => {
    // Reset form on close
    setCoverLetter("");
    setSelectedPortfolioItems([]);
    setStep(1);
    setApplicationSubmitted(false);
    onClose();
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!applicationSubmitted ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center w-full">
                <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  {step === 1 ? "Apply to Job" : step === 2 ? "Add Portfolio Items" : "Review & Submit"}
                </DialogTitle>
                
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className={`w-8 h-1.5 rounded-full transition-all ${
                        i === step ? "bg-blue-600" : i < step ? "bg-green-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <DialogDescription className="text-gray-500 mt-2">
                {job.title} - {job.businessName}
              </DialogDescription>
            </DialogHeader>
            
            {/* Step 1: Cover Letter */}
            {step === 1 && (
              <div className="space-y-4 my-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <h3 className="font-medium">Cover Note</h3>
                  </div>
                  <Textarea
                    placeholder="Introduce yourself and explain why you're the perfect fit for this role. Highlight your relevant experience and how your skills match the job requirements."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-32 resize-none border border-gray-200 focus-visible:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A personalized message significantly increases your chances of getting noticed
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="rounded-full bg-blue-100 p-2 h-fit">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-800">Skills match</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Your profile has {professional?.skills.filter(skill => job.skills.includes(skill)).length || 0} of {job.skills.length} skills required for this position.
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.map(skill => (
                          <Badge 
                            key={skill} 
                            variant="outline"
                            className={professional?.skills.includes(skill) 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-gray-50 text-gray-500 border-gray-200"
                            }
                          >
                            {professional?.skills.includes(skill) && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!coverLetter.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add Portfolio Items
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Portfolio Selection */}
            {step === 2 && (
              <div className="space-y-4 my-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-blue-600" />
                      <h3 className="font-medium">Add Portfolio Items</h3>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {selectedPortfolioItems.length} selected
                    </Badge>
                  </div>
                  
                  {professional?.portfolio && professional.portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {professional.portfolio.map((item) => (
                        <div
                          key={item.id}
                          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPortfolioItems.includes(item.id)
                              ? "ring-2 ring-blue-500 border-blue-500"
                              : "hover:border-gray-300"
                          }`}
                          onClick={() => handlePortfolioItemToggle(item.id)}
                        >
                          <div className="relative aspect-video bg-gray-100">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <ImageIcon className="h-8 w-8" />
                              </div>
                            )}
                            {selectedPortfolioItems.includes(item.id) && (
                              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="p-3 bg-white">
                            <h4 className="font-medium text-sm truncate">{item.title}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags && item.tags.length > 2 && (
                                <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                  +{item.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <h4 className="font-medium">No Portfolio Items</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Add items to your portfolio to showcase your work to potential employers.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          handleClose();
                          router.push('/dashboard/profile#portfolio');
                        }}
                      >
                        Add to Portfolio
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Review Application
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-4 my-4">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-700 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Almost Done!</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Review your application details below before submitting.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Job Details</Label>
                    <Card className="mt-1">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {job.businessName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-gray-500">{job.businessName} • {job.location}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {job.skills.slice(0, 3).map(skill => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Your Cover Note</Label>
                    <Card className="mt-1">
                      <CardContent className="p-4">
                        <p className="text-sm whitespace-pre-wrap">{coverLetter}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {selectedPortfolioItems.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Attached Portfolio Items</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {selectedPortfolioItems.map(id => {
                          const item = professional?.portfolio?.find(p => p.id === id);
                          if (!item) return null;
                          
                          return (
                            <div key={id} className="border rounded-md overflow-hidden bg-gray-50">
                              <div className="aspect-video bg-gray-100 relative">
                                {item.imageUrl ? (
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full text-gray-400">
                                    <ImageIcon className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                              <div className="p-2">
                                <p className="text-xs font-medium truncate">{item.title}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <DialogFooter className="flex justify-between gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitApplication}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <SendHorizontal className="h-4 w-4 mr-1.5" />
                    Submit Application
                  </Button>
                </DialogFooter>
              </div>
            )}
          </>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center">Application Submitted!</h3>
            <p className="text-gray-500 text-center mt-2 max-w-md">
              Your application for <span className="font-medium text-gray-700">{job.title}</span> has been submitted successfully. The employer will review your application and contact you if interested.
            </p>
            <Button 
              className="mt-6"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 