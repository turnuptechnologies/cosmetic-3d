import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.privacyPolicy);
  return buildMetadata({
    meta: page?.meta,
    title: 'Privacy Policy',
    description: 'How CosmeticChemist.com collects, uses and protects your personal information.',
    path: '/privacy-policy',
  });
}

export default function Layout({ children }) {
  return children;
}
