import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/cookie-policy');
}

export default function Layout({ children }) {
  return children;
}
