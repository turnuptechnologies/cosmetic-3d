'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import Pagination from '../../components/Pagination';
import { FinalSection } from "../../components/FinalSection";
import Footer from "../../components/Footer";
import Loader from '../../components/Loader';
import { useGetService } from '../../lib/getService';
import { normalizePostsForBlogList } from '../../lib/actions';

function BlogList({ currentPage, posts, hasNextPage, totalPages }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
        <p className="text-gray-600">
          Could not connect to the blog API. Please ensure the API is running correctly.
        </p>
      </div>
    );
  }
  console.log("POSTS--------", posts)
  return (
    <div className="bg-black min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const coverImage = post.cover?.formats?.medium?.url
              ? post.cover.formats.medium.url
              : post.cover?.url
                ? post.cover.url
                : '/fav.png';

            const postDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            });

            const description =
              post.description ||
              (post.blocks && post.blocks[0]?.body
                ? post.blocks[0].body.substring(0, 150) + '...'
                : '');

            return (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <div className="bg-black border h-full border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className='text-[12px] font-normal text-[#FFFFFF]'>{postDate}</span>
                      <p className='text-[12px] font-normal text-[#FFFFFF]'>10 Min Read</p>
                    </div>

                    <h2 className="text-[#FFFFFF] text-[24px] font-[600] mb-1 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-[#FFFFFF] text-[14px] font-[400] mb-1 line-clamp-3 h-full">
                      {description}
                    </p>

                    <div className="text-white text-sm font-medium underline group-hover:text-gray-300 transition-colors">
                      Read More
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="flex justify-center mt-12">
            <Link href={`/blog?page=${currentPage + 1}`}>
              <button className="px-8 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition-colors duration-300">
                Load More
              </button>
            </Link>
          </div>
        )}

        {/* Optional Pagination */}
        {!!totalPages && totalPages > 1 && (
          <div className="mt-10">
            <Pagination pageCount={totalPages} currentPage={currentPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage({ searchParams }) {
  // ✅ get page from URL
  const currentPage = Number(searchParams || 1);
  const limit = 9; // cards per page

  // ✅ send pagination params to API
  const { data: pageData, loading } = useGetService(`/posts?page=${currentPage}&limit=${limit}`);

  // ✅ normalize + memoize (avoid recalculating each render)
  const { posts, hasNextPage, totalPages } = useMemo(() => {
    const apiPosts = pageData?.docs || pageData?.data || pageData || [];
    const normalized = normalizePostsForBlogList(apiPosts);

    // pagination values (support multiple common API shapes)
    const tp =
      pageData?.totalPages ||
      pageData?.meta?.pagination?.pageCount ||
      pageData?.pagination?.totalPages ||
      null;

    const next =
      pageData?.hasNextPage ??
      (tp ? currentPage < tp : false);

    return { posts: normalized, hasNextPage: next, totalPages: tp };
  }, [pageData, currentPage]);

  // ✅ Real loading UI (Suspense doesn't help with client fetching)
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">
          <Loader text={'Loading Blogs...'} />
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen'>
      <BlogList
        posts={posts}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
      />
      <FinalSection />
      <Footer />
    </div>
  );
}
