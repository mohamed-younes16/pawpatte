/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    domains: ["swiperjs.com", "utfs.io", "s3.amazonaws.com"],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ["@prisma/client"]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  }
};

module.exports = nextConfig;
