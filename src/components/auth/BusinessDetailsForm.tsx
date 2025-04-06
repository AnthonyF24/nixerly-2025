import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";

interface BusinessDetailsFormProps {
  onSubmit: (data: { businessName: string }) => void;
  onBack: () => void;
}

const BusinessDetailsForm = ({ onSubmit, onBack }: BusinessDetailsFormProps) => {
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError("Business name is required");
      return;
    }
    onSubmit({ businessName });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-blue-700" />
        </div>
        <h1 className="text-2xl font-bold">Business Details</h1>
        <p className="text-gray-500 mt-2">Tell us about your business</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            type="text"
            placeholder="Enter your business name"
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              setError("");
            }}
            className={error ? "border-red-500" : ""}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetailsForm; 