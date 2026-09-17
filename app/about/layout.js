import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.about);
  return buildMetadata({
    meta: page?.meta,
    title: 'About Our Cosmetic Chemistry Lab',
    path: '/about',
  });
}

export default function Layout({ children }) {
  return children;
}
