'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FinalSection } from "../../../components/FinalSection";
import Footer from "../../../components/Footer";
import Loader from '../../../components/Loader';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URI || "";

// --- Helper Functions ---
const getLexicalNodeText = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (Array.isArray(node.children)) return node.children.map(getLexicalNodeText).join("");
  return "";
};

const extractSectionsFromLexical = (root) => {
  const children = root?.children || [];
  const sections = [];
  let current = null;

  for (const node of children) {
    if (node.type === "heading") {
      if (current) sections.push(current);
      current = {
        tag: node.tag || "h2",
        heading: getLexicalNodeText(node).trim(),
        paragraphs: [],
      };
      continue;
    }
    if (node.type === "paragraph") {
      const text = getLexicalNodeText(node).trim();
      if (!text) continue;
      if (!current) {
        current = { tag: "intro", heading: "", paragraphs: [] };
      }
      current.paragraphs.push(text);
      continue;
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.heading || s.paragraphs.length);
};

const withBase = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
};

const normalizePost = (post) => {
  if (!post) return null;
  const hero = post.heroImage || post.meta?.image;
  const imageUrl =
    hero?.sizes?.xlarge?.url ||
    hero?.sizes?.large?.url ||
    hero?.url;

  return {
    title: post.title,
    imageUrl: imageUrl ? withBase(imageUrl).replace('/api', '') : '/images/product1.png',
    publishedAt: post.publishedAt || post.createdAt,
    sections: extractSectionsFromLexical(post.content?.root),
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

export default function BlogPostPage() {
  const params = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const slug = params?.slug;

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/posts/${slug}?depth=2`);
        setPageData(res.data);
      } catch (err) {
        console.error("Fetch blog error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const post = useMemo(() => normalizePost(pageData), [pageData]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Loader text={'Loading Story...'} />
      </div>
    );
  }

  if (!post) return null;

  const { title, sections, imageUrl, publishedAt } = post;

  return (
    <div className="bg-black text-white min-h-screen  font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative  container mx-auto px-6 pb-12 md:pb-20 max-w-5xl">
          <div className="flex  items-center space-x-3 mb-4 text-amber-100 font-medium tracking-widest uppercase text-xs">
            <span>Article</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{formatDate(publishedAt)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl  font-bold leading-[1.1] tracking-tight mb-4">
            {title}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Sidebar: Share (Desktop) */}
          <aside className="hidden lg:block w-16">
            <div className="sticky top-24 flex flex-col space-y-6 items-center border-r border-white/10 pr-6">
              <button className="text-gray-400 hover:text-white transition-colors"><FaFacebookF size={20} /></button>
              <button className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></button>
              <button className="text-gray-400 hover:text-white transition-colors"><FaLinkedinIn size={20} /></button>
              <button className="text-gray-400 hover:text-white transition-colors"><FaRegBookmark size={20} /></button>
            </div>
          </aside>

          {/* Article Body */}
          <article className="flex-1">
            <div className={`relative transition-all duration-700 ease-in-out overflow-hidden ${!isExpanded ? 'max-h-[600px]' : 'max-h-[5000px]'}`}>

              {sections.map((sec, i) => (
                <section key={i} className="mb-10 group">
                  {sec.heading && (
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90 group-first:mt-0 mt-12">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="text-lg md:text-xl leading-relaxed text-gray-300 mb-6 font-light">
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              {/* Gradient overlay when collapsed */}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
              )}
            </div>

            {/* Read More Toggle */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all active:scale-95"
              >
                <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
                {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
            </div>

            {/* Tags & Mobile Share */}
            <div className="mt-20 pt-10 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {['Beauty', 'Skincare', 'Wellness'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-6 lg:hidden border-t border-white/10 pt-6 md:border-none md:pt-0">
                  <span className="text-sm text-gray-500 uppercase tracking-widest">Share</span>
                  <div className="flex space-x-4">
                    <FaFacebookF className="text-gray-400 hover:text-white" />
                    <FaTwitter className="text-gray-400 hover:text-white" />
                    <FaLinkedinIn className="text-gray-400 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <div className="mt-20">
        <FinalSection />
        <Footer />
      </div>
    </div>
  );
}