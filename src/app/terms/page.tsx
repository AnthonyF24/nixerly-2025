import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="container max-w-4xl py-12">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link 
          href="/" 
          className="hover:underline"
          tabIndex={0}
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>Terms of Service</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to Nixerly. These terms of service govern your use of our platform, including our website, mobile applications, and all related services.
        </p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Nixerly, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
        </p>
        
        <h2>2. User Accounts</h2>
        <p>
          To use certain features of Nixerly, you must register for an account. When you register, you agree to provide accurate and complete information. You are responsible for maintaining the security of your account and password. Nixerly cannot and will not be liable for any loss or damage resulting from your failure to comply with this security obligation.
        </p>
        
        <h2>3. Professional Profiles and Business Listings</h2>
        <p>
          Professionals may create profiles to showcase their skills, certifications, and portfolio items. Businesses may create listings to find suitable professionals. All information provided must be accurate and truthful.
        </p>
        <p>
          You retain ownership of the content you post on Nixerly. However, by posting content, you grant Nixerly a non-exclusive, worldwide license to use, display, and distribute your content in connection with providing our services.
        </p>
        
        <h2>4. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use Nixerly for any illegal purpose</li>
          <li>Post false or misleading information</li>
          <li>Impersonate others or misrepresent your affiliation with any person or entity</li>
          <li>Harass, abuse, or harm other users</li>
          <li>Interfere with or disrupt the Nixerly services</li>
          <li>Attempt to gain unauthorized access to any part of the platform</li>
        </ul>
        
        <h2>5. Verification and Certification</h2>
        <p>
          Nixerly offers verification services for professionals and businesses. While we make efforts to verify credentials, we cannot guarantee the accuracy of all information. Users are encouraged to perform their own due diligence before engaging with others on the platform.
        </p>
        
        <h2>6. Fees and Payment</h2>
        <p>
          Nixerly may charge fees for certain services. All fees are non-refundable unless otherwise specified. You agree to pay all applicable fees for services you use.
        </p>
        
        <h2>7. Termination</h2>
        <p>
          Nixerly reserves the right to terminate or suspend your account at any time for any reason, including violation of these Terms of Service. Upon termination, your right to use Nixerly will immediately cease.
        </p>
        
        <h2>8. Disclaimers</h2>
        <p>
          Nixerly is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted or error-free, that defects will be corrected, or that the service or servers are free of viruses or other harmful components.
        </p>
        
        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Nixerly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
        </p>
        
        <h2>10. Changes to Terms</h2>
        <p>
          Nixerly reserves the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting an update on our website or sending you an email. Your continued use of Nixerly after changes constitute your acceptance of the updated terms.
        </p>
        
        <h2>11. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
        </p>
        
        <h2>12. Contact Information</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at support@nixerly.com.
        </p>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: April 1, 2024</p>
        </div>
      </div>
      
      <div className="mt-12 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          Need help understanding our terms? <Link href="/contact" className="font-medium underline" tabIndex={0}>Contact Us</Link>
        </p>
      </div>
    </div>
  );
};

export default TermsPage; 