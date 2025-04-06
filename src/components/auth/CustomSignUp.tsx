import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AccountTypeSelector from "./AccountTypeSelector";
import BusinessDetailsForm from "./BusinessDetailsForm";
import ProfessionalDetailsForm from "./ProfessionalDetailsForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

type AccountType = "professional" | "business";
type SignUpStep = "select-type" | "details" | "signup";

interface UserDetails {
  firstName?: string;
  lastName?: string;
  businessName?: string;
}

interface CustomSignUpProps {
  signInUrl?: string;
}

const CustomSignUp = ({ signInUrl = "/auth/login" }: CustomSignUpProps) => {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({});
  const [step, setStep] = useState<SignUpStep>("select-type");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleAccountTypeSelection = (type: AccountType) => {
    setAccountType(type);
  };

  const handleContinueToDetails = () => {
    if (accountType) {
      setStep("details");
    }
  };

  const handleBackToTypeSelection = () => {
    setStep("select-type");
  };

  const handleProfessionalDetails = (data: { firstName: string; lastName: string }) => {
    setUserDetails({
      firstName: data.firstName,
      lastName: data.lastName
    });
    setStep("signup");
  };

  const handleBusinessDetails = (data: { businessName: string }) => {
    setUserDetails({
      businessName: data.businessName
    });
    setStep("signup");
  };

  // This function will be called after successful signup
  const handleSignUpComplete = async () => {
    if (!accountType || !isLoaded || !signUp.createdSessionId) return;

    try {
      setIsProcessing(true);
      
      // Set the user as active
      await setActive({ session: signUp.createdSessionId });
      
      // Update the user metadata with account type and additional details
      const payload = {
        accountType,
        ...userDetails
      };
      
      const user = await fetch("/api/user/update-account-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(res => res.json());
      
      // Update the user's first and last name if they're a professional
      if (accountType === "professional" && userDetails.firstName && userDetails.lastName) {
        await fetch("/api/user/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName
          }),
        });
      }
      
      // Redirect to the appropriate dashboard
      router.push(`/dashboard?type=${accountType}`);
    } catch (error) {
      console.error("Error setting account type:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Setting up your account...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {step === "select-type" && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-gray-500 mt-2">Choose the account type that best fits your needs</p>
          </div>
          
          <AccountTypeSelector 
            selectedType={accountType} 
            onSelect={handleAccountTypeSelection} 
          />
          
          <Button 
            className="w-full" 
            size="lg"
            disabled={!accountType}
            onClick={handleContinueToDetails}
          >
            Continue
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account?</span>{" "}
            <a href={signInUrl} className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </a>
          </div>
        </div>
      )}
      
      {step === "details" && accountType === "professional" && (
        <ProfessionalDetailsForm 
          onSubmit={handleProfessionalDetails}
          onBack={handleBackToTypeSelection}
        />
      )}
      
      {step === "details" && accountType === "business" && (
        <BusinessDetailsForm 
          onSubmit={handleBusinessDetails}
          onBack={handleBackToTypeSelection}
        />
      )}
      
      {step === "signup" && (
        <div>
          <SignUp 
            path="/auth/signup" 
            signInUrl={signInUrl} 
            routing="path"
            afterSignUpUrl="/dashboard"
          />
          <div className="hidden">
            {/* This is to hook into Clerk's completed event */}
            {signUp.status === "complete" && handleSignUpComplete()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSignUp; 