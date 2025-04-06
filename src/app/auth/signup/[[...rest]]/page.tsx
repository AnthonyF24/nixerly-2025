"use client";

import CustomSignUp from '@/components/auth/CustomSignUp';

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <CustomSignUp signInUrl="/auth/login" />
    </div>
  );
}