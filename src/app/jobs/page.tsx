"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function JobsPage() {
  const { isAuthenticated, userType } = useAppStore();
  const router = useRouter();
  
  useEffect(() => {
    // If user is authenticated and is a professional, redirect to dashboard jobs
    if (isAuthenticated && userType === 'professional') {
      router.push('/dashboard/jobs');
    }
  }, [isAuthenticated, userType, router]);
  
  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Professional Access Required</h1>
        <p className="text-gray-600 mt-2">
          The job board is available exclusively for authenticated professionals.
        </p>
        <div className="pt-6 flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/auth/login">Login as Professional</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/signup">Sign Up as Professional</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 