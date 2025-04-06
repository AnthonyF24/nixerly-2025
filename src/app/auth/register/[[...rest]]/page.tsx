"use client";

import { SignUp } from '@clerk/nextjs';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <SignUp path="/auth/register" signInUrl="/auth/login" routing="path" />
    </div>
  );
} 