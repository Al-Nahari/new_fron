import type { NextConfig } from "next";

// The Django backend URL. On Vercel, set this in
// Project Settings -> Environment Variables (both NEXT_PUBLIC_API_URL
// and BACKEND_URL should point at your deployed backend, e.g. Render).
// Falls back to localhost only for local development.
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || "https://news-ddd.onrender.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "news-ddd.onrender.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "news-ddd.onrender.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/graphql",
        destination: `${BACKEND_URL}/graphql`,
      },
      {
        source: "/media/:path*",
        destination: `${BACKEND_URL}/media/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://news-ddd.onrender.com",
  },

  // Enable React Strict Mode for better error handling
  reactStrictMode: true,
};

export default nextConfig;