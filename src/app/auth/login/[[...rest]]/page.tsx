"use client";

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center py-8">
      <SignIn path="/auth/login" signUpUrl="/auth/signup" routing="path" />
    </div>
  );
} 