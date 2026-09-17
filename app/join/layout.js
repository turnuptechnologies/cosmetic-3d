import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/join');
}

export default function Layout({ children }) {
  return children;
}
