import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/coming-soon');
}

export default function Layout({ children }) {
  return children;
}
