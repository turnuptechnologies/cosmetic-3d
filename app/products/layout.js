import { getRouteMetadata } from '../../lib/seo';

// Legacy product demo pages: not linked from the site, so ROUTE_DEFAULTS keeps them out of search results
export function generateMetadata() {
  return getRouteMetadata('/products');
}

export default function Layout({ children }) {
  return children;
}
