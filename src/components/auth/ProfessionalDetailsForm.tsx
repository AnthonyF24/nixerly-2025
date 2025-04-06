import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface ProfessionalDetailsFormProps {
  onSubmit: (data: { firstName: string; lastName: string }) => void;
  onBack: () => void;
}

const ProfessionalDetailsForm = ({ onSubmit, onBack }: ProfessionalDetailsFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      firstName: !firstName.trim() ? "First name is required" : "",
      lastName: !lastName.trim() ? "Last name is required" : ""
    };
    
    if (newErrors.firstName || newErrors.lastName) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({ firstName, lastName });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <User className="h-6 w-6 text-purple-700" />
        </div>
        <h1 className="text-2xl font-bold">Professional Details</h1>
        <p className="text-gray-500 mt-2">Tell us about yourself</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors({ ...errors, firstName: "" });
            }}
            className={errors.firstName ? "border-red-500" : ""}
            required
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors({ ...errors, lastName: "" });
            }}
            className={errors.lastName ? "border-red-500" : ""}
            required
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
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
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalDetailsForm; 