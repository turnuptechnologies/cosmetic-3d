import HomePage from '../components/HomePage';
import { buildMetadata, getPage, PAGE_IDS } from '../lib/seo';

export async function generateMetadata() {
  const page = await getPage(PAGE_IDS.home);
  return buildMetadata({ meta: page?.meta, path: '/' });
}

export default function Page() {
  return <HomePage />;
}
