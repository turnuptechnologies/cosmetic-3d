import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/faq');
}

export default function Layout({ children }) {
  return children;
}
