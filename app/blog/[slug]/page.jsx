'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegBookmark } from 'react-icons/fa';
import { FinalSection } from "../../../components/FinalSection";
import Footer from "../../../components/Footer";
import Loader from '../../../components/Loader';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URI || "";


const withBase = (url) => {
  console.log("POPOPOPOPOP------url", url)
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

const extractPlainTextFromLexical = (root) => {
  if (!root?.children) return "";

  for (const node of root.children) {
    if (node.type === "paragraph") {
      return node.children?.map(c => c.text || "").join("").trim();
    }
  }
  return "";
};

const normalizePost = (post) => {
  if (!post) return null;

  const hero = post.heroImage || post.meta?.image;

  const imageUrl =
    hero?.sizes?.xlarge?.url ||
    hero?.sizes?.large?.url ||
    hero?.sizes?.og?.url ||
    hero?.sizes?.medium?.url ||
    hero?.url;
  console.log("POPOPOPOPOP------url", withBase(imageUrl).replace('api', ''))


  return {
    title: post.title,
    imageUrl: withBase(imageUrl).replace('/api', '') || '/images/product1.png',
    publishedAt: post.publishedAt || post.createdAt,
    description:
      post.meta?.description ||
      extractPlainTextFromLexical(post.content?.root),
    content: post.content || null,
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const buildPostBySlugEndpoint = (slug) => {
  const qs = new URLSearchParams({
    depth: "2",
    draft: "false",
    locale: "undefined",
    trash: "false",
  });

  // Payload CMS style query:
  return `/posts/${slug}?depth=2&draft=false&locale=undefined&trash=false`;
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();

  const slugParam = params?.slug;
  const slug = slugParam;

  const endpoint = useMemo(() => {
    if (!slug) return null;
    return buildPostBySlugEndpoint(slug);
  }, [slug]);

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_BASE}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal, // axios supports AbortController
          // withCredentials: true, // if your API needs cookies
        });

        setPageData(res.data);
      } catch (err) {
        // Ignore abort/cancel
        if (
          err?.name !== 'CanceledError' &&
          err?.name !== 'AbortError' &&
          !axios.isCancel(err)
        ) {
          console.error("Fetch blog error:", err);
          setPageData(null);
          // router.replace('/404');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => controller.abort();
  }, [endpoint, router]);


  // const rawPost = pageData?.content?.root.children || pageData?.data?.[0] || null;
  const post = normalizePost(pageData);
  console.log("post------------", post)

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">
          <Loader text={'Loading Blog...'} />
        </div>
      </div>
    );
  }

  if (!post) return null;

  const { title, cover, createdAt, publishedAt, description, imageUrl } = post;

  // const imageUrl = imageUrl
  // cover?.formats?.large?.url ||
  //   cover?.url ||
  //   '/images/product1.png';

  const formattedDate = formatDate(publishedAt || createdAt);

  return (
    <div className="h-screen bg-black text-white">
      {/* Hero Image Section */}
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <div className="relative w-full flex justify-center items-center h-[480px] md:h-[700px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            height={900}
            width={700}
            className="object-cover"
            priority
          />
        </div>


        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
          <div className="w-full px-4 pb-4 md:pb-6 lg:pb-8 xl:pb-6">
            <div className="mx-auto text-left">
              <div className="flex items-center space-x-4 text-sm md:text-base">
                <span className="text-white/80">{formattedDate}</span>
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
          <p>Content renderer pending (Lexical JSON).</p>
        </div>

        {/* Tags and Share */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-xs font-medium bg-white/10 rounded-full">Beauty</span>
              <span className="px-3 py-1.5 text-xs font-medium bg-white/10 rounded-full">Skincare</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/60">Share:</span>
              <div className="flex space-x-3">
                <button className="text-white/60 hover:text-white transition-colors"><FaFacebookF size={18} /></button>
                <button className="text-white/60 hover:text-white transition-colors"><FaTwitter size={18} /></button>
                <button className="text-white/60 hover:text-white transition-colors"><FaLinkedinIn size={18} /></button>
                <button className="text-white/60 hover:text-white transition-colors"><FaRegBookmark size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FinalSection />
      <Footer />
    </div>
  );
}
