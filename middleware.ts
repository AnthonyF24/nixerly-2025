import { clerkMiddleware } from "@clerk/nextjs/server";

// This middleware protects all routes
export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect app routes but exclude public routes
    '/((?!api|_next|.*\\..*|auth).)*',
    '/app/:path*',
    '/dashboard/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};