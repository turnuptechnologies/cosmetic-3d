import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/services');
}

export default function Layout({ children }) {
  return children;
}
