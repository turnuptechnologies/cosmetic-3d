import Link from 'next/link';

export default function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div>
        <h2>{post.title}</h2>
      </div>
    </Link>
  );
}
