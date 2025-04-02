"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ContactSettingsRedirect = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to settings page with contact tab active
    router.push("/dashboard/settings?tab=contact");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to settings...</p>
      </div>
    </div>
  );
};

export default ContactSettingsRedirect; 