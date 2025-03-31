import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const PrivacyPolicyPage = () => {
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
        <span>Privacy Policy</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="lead">
          At Nixerly, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect several types of information, including:</p>
        <ul>
          <li>
            <strong>Account Information:</strong> When you register, we collect your name, email address, password, and user type (professional or business).
          </li>
          <li>
            <strong>Profile Information:</strong> For professionals, this includes skills, certifications, portfolio items, and availability. For businesses, this includes company details, industry, and job postings.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, features used, and time spent.
          </li>
          <li>
            <strong>Device Information:</strong> Data about the device you use to access Nixerly, including IP address, browser type, and operating system.
          </li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Match professionals with relevant job opportunities</li>
          <li>Help businesses find qualified professionals</li>
          <li>Verify credentials and certifications</li>
          <li>Communicate with you about your account and our services</li>
          <li>Detect and prevent fraud or other harmful activities</li>
          <li>Analyze usage patterns to enhance user experience</li>
        </ul>
        
        <h2>3. Information Sharing</h2>
        <p>
          We may share your information with:
        </p>
        <ul>
          <li>
            <strong>Other Users:</strong> When professionals and businesses connect through our platform, they can see each other's profile information.
          </li>
          <li>
            <strong>Service Providers:</strong> We work with third-party companies that help us operate, provide, and market our services.
          </li>
          <li>
            <strong>Legal Requests:</strong> We may disclose information if required by law or if we believe it's necessary to protect our rights, safety, or the rights of others.
          </li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>
        
        <h2>4. Your Privacy Choices</h2>
        <p>You have several options to control your information:</p>
        <ul>
          <li>
            <strong>Account Settings:</strong> You can update, modify, or delete information in your profile at any time.
          </li>
          <li>
            <strong>Communication Preferences:</strong> You can opt out of marketing communications while still receiving essential account notifications.
          </li>
          <li>
            <strong>Visibility Controls:</strong> Professionals can set their availability status and control which details are visible to businesses.
          </li>
          <li>
            <strong>Account Deletion:</strong> You can request deletion of your account and associated data.
          </li>
        </ul>
        
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data.
        </p>
        
        <h2>6. Data Retention</h2>
        <p>
          We retain your information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information, unless we need to retain certain information for legitimate business or legal purposes.
        </p>
        
        <h2>7. International Data Transfers</h2>
        <p>
          Nixerly operates globally, which means your information may be transferred to, stored, and processed in countries outside your residence. We take steps to ensure your data is treated securely and in accordance with this Privacy Policy regardless of where it is processed.
        </p>
        
        <h2>8. Children's Privacy</h2>
        <p>
          Nixerly is not intended for children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
        </p>
        
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website or by email. Your continued use of Nixerly after such modifications will constitute your acknowledgment and acceptance of the updated policy.
        </p>
        
        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your information, please contact us at privacy@nixerly.com.
        </p>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Last updated: April 1, 2024</p>
        </div>
      </div>
      
      <div className="mt-12 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          Have questions about your privacy? <Link href="/contact" className="font-medium underline" tabIndex={0}>Contact Us</Link>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 