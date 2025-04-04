"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppStore } from '@/lib/store';

// Define the form validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'professional' | 'business'>('professional');
  const router = useRouter();
  
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 flex justify-center">Loading...</div>}>
      <SignupContent initialUserType={userType} setInitialUserType={setUserType} loading={loading} setLoading={setLoading} router={router} />
    </Suspense>
  );
}

function SignupContent({ 
  initialUserType, 
  setInitialUserType, 
  loading, 
  setLoading, 
  router 
}: { 
  initialUserType: 'professional' | 'business'; 
  setInitialUserType: (type: 'professional' | 'business') => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  router: ReturnType<typeof useRouter>;
}) {
  const [userType, setUserType] = useState<'professional' | 'business'>(initialUserType);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Get the type from query parameters if available
  const typeParam = searchParams.get('type');
  
  // Get store actions
  const { 
    setIsAuthenticated, 
    setProfessional, 
    setBusiness, 
    setUserType: setStoreUserType,
  } = useAppStore();
  
  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  // Handle tab change
  const handleTypeChange = (value: string) => {
    setUserType(value as 'professional' | 'business');
    setInitialUserType(value as 'professional' | 'business');
  };
  
  // Set initial user type from URL param if available
  useState(() => {
    if (typeParam === 'professional' || typeParam === 'business') {
      setUserType(typeParam);
      setInitialUserType(typeParam);
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userId = uuidv4();
      
      if (userType === 'professional') {
        // Create a new professional
        const newProfessional = {
          id: userId,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          skills: [],
          certifications: [],
          portfolio: [],
          availability: true,
          profileComplete: 20,
          verified: false,
        };
        
        setProfessional(newProfessional);
        setStoreUserType('professional');
      } else {
        // Create a new business
        const newBusiness = {
          id: userId,
          name: `${data.firstName} ${data.lastName}'s Business`,
          email: data.email,
          industry: [],
          profileComplete: 20,
          verified: false,
        };
        
        setBusiness(newBusiness);
        setStoreUserType('business');
      }
      
      // Set authenticated state
      setIsAuthenticated(true);
      
      // Show success message
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Complete your profile to get started.",
      });
      
      // Redirect to dashboard
      router.push('/dashboard/profile');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Something went wrong",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md border-blue-100 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Create an Account</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Choose your account type and enter your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={userType} onValueChange={handleTypeChange} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-blue-50">
              <TabsTrigger value="professional" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Professional</TabsTrigger>
              <TabsTrigger value="business" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Business</TabsTrigger>
            </TabsList>
            <TabsContent value="professional" className="mt-4">
              <p className="text-sm text-gray-600 mb-4">
                Create a professional profile to showcase your skills and find work opportunities.
              </p>
            </TabsContent>
            <TabsContent value="business" className="mt-4">
              <p className="text-sm text-gray-600 mb-4">
                Create a business account to post jobs and find skilled professionals.
              </p>
            </TabsContent>
          </Tabs>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          className="border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
                          className="border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="name@example.com" 
                        className="border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="border-blue-300 text-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium leading-none">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline" tabIndex={0}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline" tabIndex={0}>
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-blue-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button"
              onClick={() => toast({
                title: "Social signup",
                description: "Social signups aren't available in the prototype.",
              })}
              variant="outline" 
              className="w-full border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5 mr-2">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              Google
            </Button>
            <Button 
              type="button"
              onClick={() => toast({
                title: "Social signup",
                description: "Social signups aren't available in the prototype.",
              })}
              variant="outline" 
              className="w-full border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5 mr-2 text-[#0A66C2]" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium" tabIndex={0}>
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 