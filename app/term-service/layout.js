import { buildMetadata, getPage, PAGE_IDS } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.termService);
  return buildMetadata({
    meta: page?.meta,
    title: 'Terms of Service',
    description: 'The terms and conditions for using CosmeticChemist.com.',
    path: '/term-service',
  });
}

export default function Layout({ children }) {
  return children;
}
