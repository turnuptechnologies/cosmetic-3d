import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/contact');
}

export default function Layout({ children }) {
  return children;
}
