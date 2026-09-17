import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/privacy-policy');
}

export default function Layout({ children }) {
  return children;
}
