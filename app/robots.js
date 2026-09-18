import { SITE_URL } from '../lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/coming-soon', '/products/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // host: SITE_URL,
  };
}
