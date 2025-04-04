import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Suspense, ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SuspenseWrapper({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) {
  const defaultFallback = (
    <DashboardLayout>
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />
        <div className="h-40 w-full bg-gray-200 animate-pulse rounded-md" />
        <div className="h-40 w-full bg-gray-200 animate-pulse rounded-md" />
      </div>
    </DashboardLayout>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
} 