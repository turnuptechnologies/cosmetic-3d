/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      "incredible-creativity-c994eaf570.media.strapiapp.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cos.backend.turnuptechnologies.net',
        port: '3000',
        pathname: '/api/media/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
