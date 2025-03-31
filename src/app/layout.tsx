import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Nixerly</h3>
                <p className="text-gray-300">Connecting construction professionals and businesses.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3">For Professionals</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-white">Create Profile</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Browse Jobs</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Certifications</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">For Businesses</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-white">Find Professionals</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Post Jobs</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                  </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-lg font-semibold mb-3">Contact</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center md:text-left">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Nixerly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
