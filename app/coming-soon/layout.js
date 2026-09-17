import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({ title: 'Coming Soon', path: '/coming-soon', noIndex: true });

export default function Layout({ children }) {
  return children;
}
