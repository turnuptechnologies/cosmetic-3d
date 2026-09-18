import { getRouteMetadata } from '../../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/about-us');
}

export default function Layout({ children }) {
  return children;
}
