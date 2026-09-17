import HomePage from '../components/HomePage';
import { getRouteMetadata } from '../lib/seo';

export function generateMetadata() {
  return getRouteMetadata('/');
}

export default function Page() {
  return <HomePage />;
}
