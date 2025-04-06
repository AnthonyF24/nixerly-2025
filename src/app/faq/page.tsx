import React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, HelpCircle, Plus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const FAQPage = () => {
  const faqs = [
    {
      category: "Account & Getting Started",
      questions: [
        {
          question: "How do I create an account on Nixerly?",
          answer: "Creating an account is simple. Click the 'Sign Up' button in the top right corner of our homepage. Choose whether you're a professional or a business, then fill out the registration form with your details. You'll receive a confirmation email to verify your account."
        },
        {
          question: "Is Nixerly free to use?",
          answer: "Nixerly offers both free and premium plans. The basic account is free for both professionals and businesses, giving you access to core features. Premium plans offer additional benefits like enhanced visibility, priority matching, and advanced search filters. You can view our pricing details on the pricing page."
        },
        {
          question: "Can I switch between a professional and business account?",
          answer: "Currently, you cannot switch between account types. If you need to change your account type, please contact our support team who can assist with this transition."
        }
      ]
    },
    {
      category: "For Professionals",
      questions: [
        {
          question: "How do I verify my skills and certifications?",
          answer: "To verify your skills and certifications, navigate to your profile dashboard and select 'Verification'. Upload digital copies of your certifications, licenses, or other relevant documentation. Our team will review these documents within 2-3 business days and update your profile with verification badges."
        },
        {
          question: "How does the job matching work?",
          answer: "Our advanced algorithm matches professionals with job opportunities based on skills, experience, industry, location preferences, and availability. The more complete your profile is, the better matches you'll receive. You'll be notified of potential matches and can choose to express interest or pass."
        },
        {
          question: "Can I control who sees my profile?",
          answer: "Yes. In your privacy settings, you can control the visibility of your profile and specific details. You can choose to be visible to all businesses, only to verified businesses, or not searchable at all while still having access to job postings."
        }
      ]
    },
    {
      category: "For Businesses",
      questions: [
        {
          question: "How do I post a job or project?",
          answer: "Log into your business account and navigate to the 'Post a Job' section in your dashboard. Fill out the job details form with information about the position, required skills, timeline, and compensation. You can save drafts before publishing, and edit postings even after they're live."
        },
        {
          question: "Can I verify my business on Nixerly?",
          answer: "Yes, business verification is available and recommended. Go to 'Business Settings' and select 'Verification'. You'll need to provide business registration documents, contact information, and potentially undergo a brief verification call. Verified businesses receive a badge that builds trust with professionals."
        },
        {
          question: "How do I contact professionals I'm interested in hiring?",
          answer: "When you find a professional you'd like to work with, you can send them a connection request directly from their profile. Include a brief message about your interest. Once they accept, you'll be able to communicate through our secure messaging system to discuss details."
        }
      ]
    },
    {
      category: "Payments & Billing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept most major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for some subscription plans. All payments are processed securely through our payment providers."
        },
        {
          question: "How do subscription renewals work?",
          answer: "Subscriptions automatically renew at the end of your billing cycle unless canceled. You'll receive a reminder email three days before renewal. You can manage your subscription settings, including cancellation, through your account dashboard."
        },
        {
          question: "Is there a refund policy?",
          answer: "Yes, we offer prorated refunds for premium subscriptions if canceled within the first 14 days. After this period, you can still cancel but will maintain access until the end of your current billing cycle without a refund. Special circumstances may be considered on a case-by-case basis."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "Nixerly supports all modern browsers including Chrome, Firefox, Safari, and Edge (latest versions). For the best experience, we recommend keeping your browser updated. Internet Explorer is not fully supported."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Currently, we offer a responsive web application that works well on mobile devices. Native mobile apps for iOS and Android are in development and will be released soon. Sign up for our newsletter to be notified when they launch."
        },
        {
          question: "How do I report a technical issue?",
          answer: "If you encounter a technical issue, go to the 'Support' section in your account menu or email support@nixerly.com. Please include details about the problem, steps to reproduce it, your device, and browser information. Screenshots are always helpful."
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="flex justify-center items-center">
        <div className="container max-w-4xl py-12 px-4 sm:px-6 mx-auto">
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
            <Link 
              href="/" 
              className="hover:text-blue-600 hover:underline transition-colors duration-200"
              tabIndex={0}
              aria-label="Go to home page"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Frequently Asked Questions</span>
          </div>
          
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about using Nixerly for professionals and businesses.
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            {faqs.map((section, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 text-center mx-auto overflow-hidden">
                <CardHeader className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-2xl text-blue-700">{section.category}</CardTitle>
                  <CardDescription>{section.questions.length} questions</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {section.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-4 text-left">
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                              <Plus className="h-3 w-3 text-blue-700" />
                            </div>
                            <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          </div>
                        </div>
                        <div className="p-4 text-left">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center mb-12">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Still Have Questions?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, our support team is ready to help. Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center" size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300" size="lg">
                Submit a Request
              </Button>
            </div>
          </div>
          
          <Separator className="my-8 mx-auto max-w-xl" />
          
          <div className="text-center mx-auto max-w-2xl">            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </Link>
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
              <Link 
                href="/terms" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="View Terms of Service"
              >
                Terms of Service
              </Link>
              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
                tabIndex={0}
                aria-label="Contact Us"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage; 