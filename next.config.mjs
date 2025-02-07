// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Remove or comment out serverActions here:
    // serverActions: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all external image URLs
        port: '',
        pathname: '**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  poweredByHeader: false,
  compress: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf|doc|docx|xls|xlsx)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
