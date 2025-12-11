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
  },
};

export default withBundleAnalyzer(nextConfig);
