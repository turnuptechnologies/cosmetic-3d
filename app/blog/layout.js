import { buildMetadata } from '../../lib/seo';

export const metadata = buildMetadata({
  title: 'Cosmetic Chemistry Blog',
  description:
    'Insights from our cosmetic chemists and formulators on skincare, haircare, oral care and personal care product development and contract manufacturing.',
  path: '/blog',
});

export default function Layout({ children }) {
  return children;
}
