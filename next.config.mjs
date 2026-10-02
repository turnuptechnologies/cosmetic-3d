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
      // Blog posts re-slugged in the CMS; the old URLs are indexed by Google.
      // `statusCode: 301` is deliberate: `permanent: true` would send a 308.
      {
        source: '/blog/the-best-kind-of-cosmetic-chemists-have-their-own-pilot-lab-and-manufacturing-capabilities',
        destination: '/blog/cosmetic-chemists-pilot-lab-manufacturing',
        statusCode: 301,
      },
      {
        source: '/blog/why-the-right-cosmetic-chemist-is-the-cornerstone-of-a-successful-beauty-brand',
        destination: '/blog/cosmetic-chemist-for-beauty-brand-success',
        statusCode: 301,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
