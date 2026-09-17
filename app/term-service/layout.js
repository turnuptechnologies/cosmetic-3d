import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/term-service');
}

export default function Layout({ children }) {
  return children;
}
