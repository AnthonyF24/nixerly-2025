"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Phone, Send, User } from "lucide-react";
import { useNotification } from "@/components/ui/notification";
import { Professional } from "@/lib/data/professionals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Notification } from "@/components/ui/notification";

interface ContactProfessionalModalProps {
  professional: Professional;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  jobDetails: z.boolean().default(false),
});

export const ContactProfessionalModal: React.FC<ContactProfessionalModalProps> = ({
  professional,
  isOpen,
  onClose
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const notification = useNotification();

  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      jobDetails: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSuccess(true);
    
    // Show success notification
    notification.show();
    
    // Reset form
    form.reset();
    
    // Close modal after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (!submitting) {
      form.reset();
      setSuccess(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-xl text-center mb-2">Message Sent!</DialogTitle>
              <DialogDescription className="text-center">
                Your message to {professional.name} has been sent successfully. They will get back to you soon.
              </DialogDescription>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Contact {professional.name}</DialogTitle>
                <DialogDescription>
                  Send a message directly to this professional. They'll respond via email or phone as soon as possible.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input className="pl-10" placeholder="Your name" {...field} />
                          </div>
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
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input className="pl-10" placeholder="Your email" {...field} />
                          </div>
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
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input className="pl-10" placeholder="Your phone number" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project needs or provide details about the job opportunity" 
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="jobDetails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include my job details</FormLabel>
                          <FormDescription>
                            Attach information about your job listing to this message.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleClose}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Notification
        type="success"
        title="Message Sent"
        description={`Your message to ${professional.name} has been sent successfully.`}
        open={notification.open}
        onOpenChange={notification.setOpen}
        duration={5000}
      />
    </>
  );
}; 