import { getBlogPost, getAllBlogPostSlugs } from '../../../lib/strapi';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegBookmark } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FinalSection } from "../../../components/FinalSection"
import Footer from "../../../components/Footer"
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

// Format date with day
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export default async function BlogPostPage({ params }) {
  const { slug } = await Promise.resolve(params);

  console.log('Fetching post with slug:', slug);

  const post = await getBlogPost(slug);

  if (!post) {
    console.error('Post not found for slug:', slug);
    notFound();
  }

  const { title, blocks, cover, createdAt, publishedAt, author, description } = post;

  // Get cover image
  const imageUrl = cover?.formats?.large?.url
    ? `${cover.formats.large.url}`
    : cover?.url
      ? `${cover.url}`
      : '/images/product1.png';

  // Format dates
  const formattedDate = formatDate(publishedAt || createdAt);
  const postDate = new Date(publishedAt || createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Get main content from blocks
  const content = blocks && blocks.length > 0 ? blocks[0].body : '';

  // Author info
  const authorName = author?.name || 'Unknown Author';
  const authorRole = author?.role || 'Content Writer';
  const authorAvatar = author?.avatar?.url || '';

  return (
    <div className="min-h-screen h-screen bg-black text-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
          <div className="w-full px-4 pb-4 md:pb-6 lg:pb-8 xl:pb-6">
            <div className=" mx-auto text-left">
              <div className="flex items-center space-x-4 text-sm md:text-base">
                <span className="text-white/80">{formattedDate}</span>
                {/* <span className="w-1 h-1 rounded-full bg-white/50"></span> */}
                {/* <span className="text-white/80">10 min read</span> */}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-left text-[#FFFFFF]">
                {title}
              </h1>
              {description && (
                <p className="text-base md:text-lg text-[#FFFFFF] max-w-3xl text-left">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-8xl">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {content ? (
            <MDXRemote source={content} />
          ) : (
            <p>No content available.</p>
          )}
        </div>

        {/* Tags and Share */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-xs font-medium bg-white/10 rounded-full">
                Beauty
              </span>
              <span className="px-3 py-1.5 text-xs font-medium bg-white/10 rounded-full">
                Skincare
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/60">Share:</span>
              <div className="flex space-x-3">
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaFacebookF size={18} />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaTwitter size={18} />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaLinkedinIn size={18} />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaRegBookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                  {authorName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{authorName}</h3>
              <p className="text-white/60 mt-1">{authorRole}</p>
              <p className="mt-3 text-white/80">
                {author?.bio || 'Content writer and beauty enthusiast sharing the latest trends and tips.'}
              </p>
              <div className="mt-4 flex space-x-3">
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaFacebookF size={16} />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaTwitter size={16} />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <FaLinkedinIn size={16} />
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* More Blog Posts Section */}
        {/* <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">More Blog Posts</h2>
            <button className="flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors">
              View All <BsThreeDots className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "How To Turn Your Skincare Idea Into A Shelf-Ready Product",
              "Why Custom Formulation Beats Private Label Every Time",
              "The Science Behind High-Performance Hair Care Formulation"
            ].map((title, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gray-800">
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-lg font-medium leading-tight">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
        <FinalSection />
      <Footer />
    
    </div>
  );
}