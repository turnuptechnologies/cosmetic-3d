import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.cookiePolicy);
  return buildMetadata({
    meta: page?.meta,
    title: 'Cookie Policy',
    description: 'How CosmeticChemist.com uses cookies and similar technologies.',
    path: '/cookie-policy',
  });
}

export default function Layout({ children }) {
  return children;
}
