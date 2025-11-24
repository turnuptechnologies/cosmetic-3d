import Link from 'next/link';
import { getPaginatedBlogPosts, STRAPI_URL } from '../../lib/strapi';
import { Suspense } from 'react';
import Pagination from '../../components/Pagination';

async function BlogList({ currentPage }) {
  const { data: posts, meta } = await getPaginatedBlogPosts(currentPage);
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
        <p className="text-gray-600">
          Could not connect to the blog API. Please ensure the Strapi server and ngrok tunnel are running correctly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Blogs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            // Get cover image URL
            const coverImage = post.cover?.formats?.medium?.url 
              ? `${post.cover.formats.medium.url}`
              : post.cover?.url 
              ? `${post.cover.url}`
              : '/fav.png';

            // Format date
            const postDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            });

            // Extract first 150 characters from description or body
            const description = post.description || 
              (post.blocks && post.blocks[0]?.body 
                ? post.blocks[0].body.substring(0, 150) + '...' 
                : '');

            return (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <div className="bg-black border h-full  border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 group">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date and Read Time */}
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
                      <span>{postDate}</span>
                      {/* <span>10 Min Read</span> */}
                    </div>

                    {/* Title */}
                    <h2 className="text-white text-xl font-semibold mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 h-full">
                      {description}
                    </p>

                    {/* Read More Link */}
                    <div className="text-white text-sm font-medium underline group-hover:text-gray-300 transition-colors ">
                      Read More
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {/* {meta && meta.pagination && meta.pagination.pageCount > currentPage && (
          <div className="flex justify-center mt-12">
            <Link href={`/blog?page=${currentPage + 1}`}>
              <button className="px-8 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition-colors duration-300">
                Load More
              </button>
            </Link>
          </div>
        )} */}

        {/* Pagination Component */}
        {meta && meta.pagination && (
          <Pagination pageCount={meta.pagination.pageCount} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}

export default async function BlogPage({ searchParams }) {
  const { page } = await Promise.resolve(searchParams);
  const currentPage = parseInt(page) || 1;
  
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading posts...</div>
      </div>
    }>
      <BlogList currentPage={currentPage} />
    </Suspense>
  );
}