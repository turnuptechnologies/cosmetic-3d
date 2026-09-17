import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Join Our Cosmetic Chemist Network',
  description:
    'Are you a cosmetic chemist or formulator? Join the CosmeticChemist.com network and work with innovative beauty and personal care brands.',
  path: '/join',
});

export default function Layout({ children }) {
  return children;
}
