import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Remove this as it's enabled by default now
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'your-image-domain.com'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000000, // 128MB chunk size limit
    // serverComponentsExternalPackages: [], // Remove this line
  },
  // Add this if you need external packages for server components
  serverExternalPackages: [],
  
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    
    if (dev) {
      config.cache = true;
    }
    
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        minimize: true,
      };
    }
    
    return config
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  }
}

export default nextConfig