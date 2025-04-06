/**
 * Routes that are public and accessible without authentication
 */
export const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/verification',
  '/auth/reset-password',
];

/**
 * Routes that require authentication
 */
export const protectedRoutes = [
  '/dashboard',
  '/dashboard/:path*',
  '/app/:path*',
];

/**
 * Routes for authentication pages
 * Routes that start with these prefixes are used for authentication purposes
 */
export const authRoutes = [
  '/auth/login',
  '/auth/signup',
  '/auth/verification',
  '/auth/reset-password',
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'; 