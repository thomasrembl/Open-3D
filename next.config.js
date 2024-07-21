/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  env: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: 'https://account.liftdigital.fr/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: 'https://account.liftdigital.fr/sign-up',
    NEXT_PUBLIC_CLERK_ISSUER: 'https://account.liftdigital.fr',
  },
};

module.exports = nextConfig;
