import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";

type AccountType = "professional" | "business";

interface AccountTypeSelectorProps {
  selectedType: AccountType | null;
  onSelect: (type: AccountType) => void;
}

const AccountTypeSelector = ({ selectedType, onSelect }: AccountTypeSelectorProps) => {
  return (
    <div className="space-y-4 my-4">
      <h2 className="text-lg font-medium text-center">Select Account Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`border-2 cursor-pointer transition-all p-4 ${
            selectedType === "professional" 
              ? "border-purple-600 bg-purple-50" 
              : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"
          }`}
          tabIndex={0}
          role="radio"
          aria-checked={selectedType === "professional"}
          aria-label="Professional account"
          onClick={() => onSelect("professional")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect("professional");
            }
          }}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className={`p-3 rounded-full ${
              selectedType === "professional" 
                ? "bg-purple-100 text-purple-700" 
                : "bg-gray-100 text-gray-700"
            }`}>
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Professional</h3>
              <p className="text-sm text-gray-500 mt-1">
                Create a profile, apply to jobs, and showcase your NixOS skills
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className={`border-2 cursor-pointer transition-all p-4 ${
            selectedType === "business" 
              ? "border-blue-600 bg-blue-50" 
              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
          }`}
          tabIndex={0}
          role="radio"
          aria-checked={selectedType === "business"}
          aria-label="Business account"
          onClick={() => onSelect("business")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect("business");
            }
          }}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className={`p-3 rounded-full ${
              selectedType === "business" 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-100 text-gray-700"
            }`}>
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Business</h3>
              <p className="text-sm text-gray-500 mt-1">
                Post jobs, find professionals, and manage your organization's NixOS needs
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountTypeSelector; 