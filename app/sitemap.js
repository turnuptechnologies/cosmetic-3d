import { SITE_URL, getAllPosts } from '../lib/seo';

export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/join', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/term-service', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const posts = await getAllPosts();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      priority,
      changeFrequency,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug || post.id}`,
      lastModified: post.updatedAt || post.publishedAt,
      priority: 0.7,
      changeFrequency: 'monthly',
    })),
  ];
}
