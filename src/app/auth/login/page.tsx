"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { dummyProfessionals, dummyBusinesses } from '@/lib/dummy-data';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  
  // Get the setters from the store
  const { 
    setIsAuthenticated, 
    setProfessional, 
    setBusiness, 
    setUserType 
  } = useAppStore();
  
  // Validate form on input change
  useEffect(() => {
    // Clear field-specific errors when input changes
    if (email) setEmailError('');
    if (password) setPasswordError('');
    
    // Validate form
    setFormValid(email.trim() !== '' && EMAIL_REGEX.test(email) && password.trim() !== '');
  }, [email, password]);
  
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    return true;
  };
  
  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    return true;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    
    // Validate individual fields
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    // If any validation fails, return early
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate by checking against our dummy data
      const matchedProfessional = dummyProfessionals.find(p => p.email.toLowerCase() === email.toLowerCase());
      const matchedBusiness = dummyBusinesses.find(b => b.email.toLowerCase() === email.toLowerCase());
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (matchedProfessional && password === 'password') {
        // Professional login success
        setProfessional(matchedProfessional);
        setUserType('professional');
        setIsAuthenticated(true);
        
        toast({
          title: 'Welcome back!',
          description: `You've successfully logged in as ${matchedProfessional.name}`,
        });
        
        router.push('/dashboard');
      } else if (matchedBusiness && password === 'password') {
        // Business login success
        setBusiness(matchedBusiness);
        setUserType('business');
        setIsAuthenticated(true);
        
        toast({
          title: 'Welcome back!',
          description: `You've successfully logged in as ${matchedBusiness.name}`,
        });
        
        router.push('/dashboard');
      } else {
        // Login failed
        setError('Invalid email or password. For the demo, use the email of any professional or business with password "password".');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="container mx-auto px-4 flex justify-center items-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md border-blue-100 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Login to Nixerly</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="name@example.com" 
                className={`border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400 ${
                  emailError ? 'border-red-300 focus:border-red-400 focus-visible:ring-red-400' : ''
                }`}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-sm text-red-600 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {emailError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500"
                  tabIndex={0}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  placeholder="••••••••" 
                  className={`border-blue-200 focus:border-blue-400 focus-visible:ring-blue-400 pr-10 ${
                    passwordError ? 'border-red-300 focus:border-red-400 focus-visible:ring-red-400' : ''
                  }`}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="text-sm text-red-600 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {passwordError}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={loading || !formValid}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-blue-500">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              type="button"
              onClick={() => toast({
                title: "Social login",
                description: "Social logins aren't available in the prototype.",
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
                title: "Social login",
                description: "Social logins aren't available in the prototype.",
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
        <CardFooter className="flex justify-center flex-wrap">
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium" tabIndex={0}>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 