import { buildMetadata } from '../../lib/seo';

// Legacy product demo pages: not linked from the site, so keep them out of search results
export const metadata = buildMetadata({ title: 'Products', path: '/products', noIndex: true });

export default function Layout({ children }) {
  return children;
}
