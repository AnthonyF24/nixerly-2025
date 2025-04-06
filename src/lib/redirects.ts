import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export function handleAccountTypeRedirect(
  req: NextRequest,
  redirectUrl: string = "/dashboard"
) {
  const { userId } = auth();
  
  // If no user is logged in, don't redirect
  if (!userId) {
    return null;
  }

  const requestHeaders = new Headers(req.headers);
  // Add a rewrite header to avoid infinite redirects
  requestHeaders.set("x-middleware-rewrite", "true");

  // Get the URL being requested
  const url = req.nextUrl.clone();
  
  // If the user is already on the dashboard or requested path, don't redirect
  if (url.pathname === redirectUrl) {
    return null;
  }

  // Set the redirect URL
  url.pathname = redirectUrl;
  
  return NextResponse.redirect(url);
} 