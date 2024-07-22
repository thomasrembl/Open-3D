import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/teacher(.*)',
  '/manage(.*)',
  '/api/course(.*)',
]);
const isAdminRoute = createRouteMatcher([
  '/teacher/courses(.*)',
  '/manage(.*)',
]);

export default clerkMiddleware((auth, req) => {
  console.log("Role : ", auth())
  if (isProtectedRoute(req)) auth().protect();
  if (isAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ role: 'org:admin' }) 
      )
    });
  }
},);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
