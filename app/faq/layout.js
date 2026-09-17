import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.faq);
  return buildMetadata({
    meta: page?.meta,
    title: 'Frequently Asked Questions',
    path: '/faq',
  });
}

export default function Layout({ children }) {
  return children;
}
