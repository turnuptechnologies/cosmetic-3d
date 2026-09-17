import { notFound } from 'next/navigation';
import { buildMetadata, getPost, mediaUrl, JsonLd, SITE_URL, ORG_NAME } from '../../../lib/seo';

const postPath = (post) => `/blog/${post.slug || post.id}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Page Not Found', alternates: { canonical: null } };

  const meta = { ...post.meta, image: post.meta?.image || post.heroImage };
  const metadata = buildMetadata({
    meta,
    title: post.title,
    path: postPath(post),
    type: 'article',
  });
  metadata.openGraph.publishedTime = post.publishedAt;
  metadata.openGraph.modifiedTime = post.updatedAt;
  return metadata;
}

export default async function Layout({ children, params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const image = mediaUrl(post.meta?.image) || mediaUrl(post.heroImage);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta?.description || undefined,
    image: image || undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${SITE_URL}${postPath(post)}`,
    author: post.populatedAuthors?.length
      ? post.populatedAuthors.map((a) => ({ '@type': 'Person', name: a.name }))
      : { '@type': 'Organization', name: ORG_NAME },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/new-full-logo.png` },
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {children}
    </>
  );
}
