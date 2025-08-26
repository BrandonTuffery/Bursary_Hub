import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/api/bursaries', '/sign-in(.*)', '/sign-up(.*)']
});

export const config = {
  matcher: ['/((?!_next|.*\..*).*)']
};
