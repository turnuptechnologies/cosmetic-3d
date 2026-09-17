import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Our Cosmetic Chemists',
  description:
    'Start your product development project with CosmeticChemist.com. Contact our cosmetic chemists and formulators for a free consultation.',
  path: '/contact',
});

export default function Layout({ children }) {
  return children;
}
