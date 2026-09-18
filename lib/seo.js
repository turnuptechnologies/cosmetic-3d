// Server-side SEO helpers: site constants, Payload fetches and metadata builders.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmeticchemist.com').replace(/\/$/, '');
export const SITE_NAME = 'Cosmetic Chemist';
export const ORG_NAME = 'Cosmetic Chemist Labs';

const API_URI = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/$/, '');
const API_ORIGIN = API_URI.replace(/\/api$/, '');

export const DEFAULT_TITLE = 'Cosmetic Chemist R&D Lab & Contract Manufacturer';

export const DEFAULT_DESCRIPTION =
  'CosmeticChemist.com is an elite cosmetic chemist R&D lab and top-rated contract manufacturer. Our expert team of cosmetic formulators develops and produces cosmetics, skincare, haircare, oral care, personal care, and dietary supplements as your cosmetic contract manufacturer.';

export const DEFAULT_KEYWORDS = [
  'cosmetic chemist',
  'cosmetic formulator',
  'cosmetic manufacturer',
  'skincare manufacturer',
  'oral care formulator',
  'oral care manufacturing',
  'cosmetic contract manufacturer',
  'personal care manufacturer',
];

export const CONTACT = {
  email: 'sales@cosmeticchemist.com',
  phone: '+1-801-697-3001',
  locality: 'Salt Lake City',
  region: 'UT',
  postalCode: '84106',
  country: 'US',
};

export const SOCIAL_LINKS = [
  'https://www.facebook.com/cosmeticchemistlabs',
  'https://x.com/COSMETICLABSx',
  'https://www.linkedin.com/company/cosmetic-chemist-labs/',
];

// Default metadata per route, used when Payload has no matching page or its SEO fields are empty
export const ROUTE_DEFAULTS = {
  '/': {},
  '/about-us': { title: 'About Our Cosmetic Chemistry Lab' },
  '/services': { title: 'Cosmetic Formulation & Manufacturing Services' },
  '/faq': { title: 'Frequently Asked Questions' },
  '/contact': {
    title: 'Contact Our Cosmetic Chemists',
    description:
      'Start your product development project with CosmeticChemist.com. Contact our cosmetic chemists and formulators for a free consultation.',
  },
  '/join': {
    title: 'Join Our Cosmetic Chemist Network',
    description:
      'Are you a cosmetic chemist or formulator? Join the CosmeticChemist.com network and work with innovative beauty and personal care brands.',
  },
  '/blog': {
    title: 'Cosmetic Chemistry Blog',
    description:
      'Insights from our cosmetic chemists and formulators on skincare, haircare, oral care and personal care product development and contract manufacturing.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How CosmeticChemist.com collects, uses and protects your personal information.',
  },
  '/term-service': {
    title: 'Terms of Service',
    description: 'The terms and conditions for using CosmeticChemist.com.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy',
    description: 'How CosmeticChemist.com uses cookies and similar technologies.',
  },
  '/coming-soon': { title: 'Coming Soon', noIndex: true },
  '/products': { title: 'Products', noIndex: true },
};

async function fetchPayload(path) {
  if (!API_URI) return null;
  try {
    const res = await fetch(`${API_URI}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Payload slugs are stored both with and without a leading slash ("/about", "privacy-policy"),
// and the home page may be "/" or "home", so try every form of the route path
const slugCandidates = (path) => {
  const bare = path.replace(/^\/+|\/+$/g, '');
  return bare ? [`/${bare}`, bare] : ['/', 'home'];
};

export async function getPageByPath(path) {
  const candidates = slugCandidates(path);
  const query = new URLSearchParams({
    'where[slug][in]': candidates.join(','),
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(candidates.length),
    draft: 'false',
  });
  const data = await fetchPayload(`/pages?${query}`);
  const docs = data?.docs ?? [];
  // Prefer the slug form listed first when both exist
  return candidates.map((slug) => docs.find((doc) => doc.slug === slug)).find(Boolean) ?? null;
}

// Metadata for a route: the matching Payload page's SEO fields, falling back to ROUTE_DEFAULTS
export async function getRouteMetadata(path) {
  const defaults = ROUTE_DEFAULTS[path] ?? {};
  const page = await getPageByPath(path);
  return buildMetadata({
    meta: page?.meta,
    title: defaults.title,
    description: defaults.description,
    noIndex: defaults.noIndex,
    path,
  });
}

// Blog posts are addressed by slug, but older links used the numeric ID
export async function getPost(slugOrId) {
  if (!slugOrId) return null;
  if (/^\d+$/.test(slugOrId)) {
    return fetchPayload(`/posts/${slugOrId}?depth=1&draft=false`);
  }
  const data = await fetchPayload(
    `/posts?where[slug][equals]=${encodeURIComponent(slugOrId)}&depth=1&limit=1&draft=false`
  );
  return data?.docs?.[0] ?? null;
}

export async function getAllPosts() {
  const data = await fetchPayload('/posts?limit=1000&depth=0&sort=-publishedAt&draft=false');
  return (data?.docs ?? []).filter((p) => !p._status || p._status === 'published');
}

export function mediaUrl(media) {
  const url = media?.sizes?.og?.url || media?.sizes?.large?.url || media?.url;
  if (!url) return null;
  return url.startsWith('http') ? url : `${API_ORIGIN}${url}`;
}

// Build Next metadata, preferring Payload's SEO fields and falling back to the given defaults
export function buildMetadata({ meta, title, description, path = '/', type = 'website', noIndex = false, extra = {} }) {
  const finalTitle = meta?.title?.trim() || title || DEFAULT_TITLE;
  const finalDescription = meta?.description?.trim() || description || DEFAULT_DESCRIPTION;
  const image = typeof meta?.image === 'object' ? mediaUrl(meta.image) : null;
  const images = image ? [{ url: image, alt: meta.image.alt || finalTitle }] : undefined;

  return {
    title: { absolute: finalTitle.includes(SITE_NAME) ? finalTitle : `${finalTitle} | ${SITE_NAME}` },
    description: finalDescription,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title: finalTitle,
      description: finalDescription,
      images,
      ...extra.openGraph,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: finalTitle,
      description: finalDescription,
      images: images?.map((i) => i.url),
    },
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
