import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/teacher(.*)',
  '/manage(.*)',
]);
const isAdminRoute = createRouteMatcher([
  '/teacher/courses(.*)',
  '/manage(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  if (isAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ role: 'org:admin' }) ||
        has({ permission: 'org:sys_domains_manage' })
      )
    });
  }
},);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};