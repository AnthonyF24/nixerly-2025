import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./enable-scroll.js";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/components/ui/notification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nixerly - Find Construction Professionals",
  description: "Connect with skilled construction professionals or find job opportunities in the construction industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-auto h-auto min-h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-auto h-auto min-h-screen`}
      >
        <NotificationProvider>
          {children}
        </NotificationProvider>
        <Toaster />
      </body>
    </html>
  );
}
