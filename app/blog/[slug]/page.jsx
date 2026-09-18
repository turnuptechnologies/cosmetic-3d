'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { FinalSection } from "../../../components/FinalSection";
import Footer from "../../../components/Footer";
import Loader from '../../../components/Loader';
import axios from 'axios';
import RichText from '../../../components/RichText';
import { getLexicalNodeText } from '../../../lib/sanitizeText';

const API_BASE = process.env.NEXT_PUBLIC_API_URI || "";

// Classes the article body used before rich text; lists/quotes get matching styling
const ARTICLE_BODY_CLASSES = {
  p: "text-lg md:text-xl leading-relaxed text-gray-300 mb-6 font-light",
  ul: "list-disc pl-6 mb-6 space-y-2 text-lg md:text-xl leading-relaxed text-gray-300 font-light",
  ol: "list-decimal pl-6 mb-6 space-y-2 text-lg md:text-xl leading-relaxed text-gray-300 font-light",
  blockquote: "border-l-2 border-pink-500 pl-6 mb-6 text-lg md:text-xl leading-relaxed text-gray-300 italic font-light",
  hr: "border-white/10 my-10",
};

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/cosmeticchemistlabs", label: "Cosmetic Chemist on Facebook", Icon: FaFacebookF },
  { href: "https://x.com/COSMETICLABSx", label: "Cosmetic Chemist on X", Icon: FaXTwitter },
  { href: "https://www.linkedin.com/company/cosmetic-chemist-labs/", label: "Cosmetic Chemist on LinkedIn", Icon: FaLinkedinIn },
];

// --- Helper Functions ---
// Splits the article into heading-led sections. Body nodes are kept as raw
// Lexical nodes so <RichText> can render links, marks and lists.
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
        headingNode: node,
        blocks: [],
      };
      continue;
    }
    // Empty paragraphs are editor spacing; the <p> margin already handles that
    if (node.type === "paragraph" && !getLexicalNodeText(node).trim()) continue;
    if (!current) {
      current = { tag: "intro", heading: "", headingNode: null, blocks: [] };
    }
    current.blocks.push(node);
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.heading || s.blocks.length);
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
        // Posts are linked by slug; numeric IDs are still supported for old links
        if (/^d+$/.test(slug)) {
          const res = await axios.get(`${API_BASE}/posts/${slug}?depth=2`);
          setPageData(res.data);
        } else {
          const res = await axios.get(`${API_BASE}/posts`, {
            params: { 'where[slug][equals]': slug, depth: 2, limit: 1 },
          });
          setPageData(res.data?.docs?.[0] ?? null);
        }
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
    <div className="w-full bg-black overflow-x-hidden h-screen overflow-scroll no-scrollbar text-white font-sans">
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
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Sidebar: Share (Desktop) */}
          <aside className="hidden lg:block w-16">
            <div className="sticky top-24 flex flex-col space-y-6 items-center border-r border-white/10 pr-6">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>

          {/* Article Body */}
          <article className="flex-1">
            <div className={`relative transition-all duration-700 ease-in-out overflow-hidden ${!isExpanded ? 'max-h-[600px]' : 'max-h-none'}`}>

              {sections.map((sec, i) => (
                <section key={i} className="mb-10 group">
                  {sec.heading && (
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90 group-first:mt-0 mt-12">
                      <RichText nodes={[sec.headingNode]} inline fallback={sec.heading} />
                    </h2>
                  )}
                  <RichText nodes={sec.blocks} classNames={ARTICLE_BODY_CLASSES} />
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
                aria-expanded={isExpanded}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all active:scale-95"
              >
                <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
                {isExpanded ? <FaChevronUp size={14} aria-hidden="true" /> : <FaChevronDown size={14} aria-hidden="true" />}
              </button>
            </div>

            {/* Tags & Mobile Share */}
            <div className="mt-20 pt-10 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {['Beauty', 'Skincare', 'Wellness'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-6 lg:hidden border-t border-white/10 pt-6 md:border-none md:pt-0">
                  <span className="text-sm text-gray-400 uppercase tracking-widest">Follow Us</span>
                  <div className="flex space-x-4">
                    {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-gray-400 hover:text-white"
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* <div className="mt-20"> */}
        <FinalSection />
        <Footer />
      {/* </div> */}
    </div>
  );
}