"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Phone, Send, User, MessageSquare } from "lucide-react";
import { useNotification } from "@/components/ui/notification";
import { Professional } from "@/lib/data/professionals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Notification } from "@/components/ui/notification";
import { Separator } from "@/components/ui/separator";

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
                  
                  <Separator className="my-4" />
                  
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="text-sm font-medium text-blue-700 mb-2">Quick Contact Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {professional.contactEmail && (
                        <a
                          href={`mailto:${professional.contactEmail}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-md text-blue-700 hover:bg-blue-50 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-sm font-medium">Email Directly</span>
                        </a>
                      )}
                      
                      {professional.contactPhone && (
                        <a
                          href={`tel:${professional.contactPhone}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-md text-blue-700 hover:bg-blue-50 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Phone className="h-4 w-4" />
                          <span className="text-sm font-medium">Call Now</span>
                        </a>
                      )}
                      
                      {professional.whatsapp && (
                        <a
                          href={`https://wa.me/${professional.whatsapp.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-green-200 rounded-md text-green-700 hover:bg-green-50 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <span className="text-sm font-medium">WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
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