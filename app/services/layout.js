import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.services);
  return buildMetadata({
    meta: page?.meta,
    title: 'Cosmetic Formulation & Manufacturing Services',
    path: '/services',
  });
}

export default function Layout({ children }) {
  return children;
}
