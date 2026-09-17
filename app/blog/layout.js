import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/blog');
}

export default function Layout({ children }) {
  return children;
}
