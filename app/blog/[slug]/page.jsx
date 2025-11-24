import { getBlogPost, getAllBlogPostSlugs } from '../../../lib/strapi';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPostSlugs();
    console.log('Generated slugs:', posts); // Debug log
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }) {
  // Await params in Next.js 15+
  const { slug } = await Promise.resolve(params);
  
  console.log('Fetching post with slug:', slug); // Debug log
  
  const post = await getBlogPost(slug);

  if (!post) {
    console.error('Post not found for slug:', slug);
    notFound();
  }

  const { title, blocks, cover, createdAt, publishedAt, author, category } = post;

  // Get cover image
  const imageUrl = cover?.formats?.large?.url
    ? `${cover.formats.large.url}`
    : cover?.url
    ? `${cover.url}`
    : '/images/product1.png';

  // Format date
  const postDate = new Date(publishedAt || createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Get main content from blocks
  const content = blocks && blocks.length > 0 ? blocks[0].body : '';

  // Author info
  const authorName = author?.name || 'Unknown Author';
  const authorDescription = author?.Description || author?.description || '';

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Image Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article>
          {/* Meta Information */}
          <div className="flex items-center text-gray-400 text-sm mb-4 space-x-2">
            <span>{postDate}</span>
            <span>&bull;</span>
            <span>10 Min Read</span>
          </div>

          {/* Title */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle/Description */}
          {post.description && (
            <p className="text-gray-400 text-lg mb-8 italic">
              {post.description}
            </p>
          )}

          {/* Main Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed space-y-4">
              {content ? (
                <MDXRemote source={content} />
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-8">
            <Link href="/blog" className="text-white underline hover:text-gray-300 transition-colors">
              Back to Blog
            </Link>
          </div>
        </article>

        {/* Author Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex items-start space-x-4">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {authorName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h3 className="text-white text-2xl font-bold mb-2">{authorName}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {authorDescription || `A professional writer sharing insights and expertise on various topics.`}
              </p>
            </div>
          </div>
        </div>

        {/* More Blog Posts Section */}
        <div className="mt-16">
          <h2 className="text-white text-3xl font-bold mb-8">More Blog Posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog">
              <div className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 p-4">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Browse All Posts
                </h3>
                <p className="text-gray-400 text-sm">
                  Explore more articles and insights
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}