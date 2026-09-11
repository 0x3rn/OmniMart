/** @type {import('next').NextConfig} */
const nextConfig = {
  // OpenNext uses Next's standalone output for the Cloudflare Worker build.
  // Vercel continues to support this setting and the existing Next scripts remain unchanged.
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

module.exports = nextConfig;
