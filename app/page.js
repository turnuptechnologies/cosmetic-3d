import HomePage from '../components/HomePage';
import { getRouteMetadata } from '../lib/seo';
import { HOME_ENDPOINT, fetchCmsPage } from '../lib/cmsPage';

export function generateMetadata() {
  return getRouteMetadata('/');
}

export default async function Page() {
  return <HomePage initialData={await fetchCmsPage(HOME_ENDPOINT)} />;
}
