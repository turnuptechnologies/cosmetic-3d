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
        hostname: 'backend.cosmeticchemist.com',
        port: '',
        pathname: '/api/media/**',
      },
    ],
  },
  async redirects() {
    return [
      // The About page moved to /about-us; keep old links and search rankings working
      { source: '/about', destination: '/about-us', permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
