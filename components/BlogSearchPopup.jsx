'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { searchArticles } from '../lib/actions';

export default function BlogSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  /* Debounce user input */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  /* Auto-focus search input */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  /* Close on ESC */
  useEffect(() => {
    const close = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  /* Fetch search */
  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      return;
    }

   const fetchSearch = async () => {
  setLoading(true);
  try {
    const json = await searchArticles(debounced);

    let articles = [];

    // Handle both plain array and { data: [...] } structure
    if (Array.isArray(json)) {
      articles = json;
    } else if (Array.isArray(json?.data)) {
      articles = json.data;
    }

    if (!articles.length) {
      setResults([]);
    } else {
      const mapped = articles.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
        publishedAt: item.publishedAt,
        cover: item.cover || null,
        content: item.blocks?.[0]?.body || '',
      }));

      setResults(mapped);
    }
  } catch (err) {
    console.error(err);
    setResults([]);
  } finally {
    setLoading(false);
  }
};


    fetchSearch();
  }, [debounced]);

  /* Close popup */
  const closePopup = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  /* Fix image handling */
  const getImageUrl = (cover) => {
    if (!cover) return '/fav.png';
    if (cover.formats?.small?.url) return cover.formats.small.url;
    if (cover.url) return cover.url;
    return '/fav.png';
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Search articles"
      >
        <Search className="w-5 h-5 text-white" />
      </button>

      {/* Search Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 h-screen bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col"
          onClick={closePopup}
        >
          <div
            className="max-w-4xl w-full mx-auto px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-3xl font-semibold">Search Articles</h2>

              <button
                onClick={closePopup}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for articles..."
                className="w-full bg-gray-900 text-white text-lg rounded-lg py-4 pl-14 pr-12 border border-gray-700 focus:border-gray-400 outline-none"
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Results Container */}
            <div className="max-h-[65vh] overflow-y-auto">
              {/* Loader */}
              {loading && (
                <div className="flex justify-center py-12">
                  <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* No results */}
              {!loading && debounced.length > 1 && results.length === 0 && (
                <p className="text-gray-400 text-center py-12">
                  No results found for "{debounced}"
                </p>
              )}

              {/* Start typing */}
              {!loading && debounced.length < 2 && (
                <p className="text-gray-500 text-center py-12">Start typing to search...</p>
              )}

              {/* SEARCH RESULTS */}
              {!loading &&
                results.map((post) => {
                  const image = getImageUrl(post.cover);
                  const date = new Date(
                    post.publishedAt || post.createdAt
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      onClick={closePopup}
                    >
                      <div className="flex gap-4 bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4 hover:border-gray-600 transition-all cursor-pointer">
                        <img
                          src={image}
                          alt={post.title}
                          className="w-24 h-24 object-cover rounded flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-lg font-semibold line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {post.description || post.content}
                          </p>

                          <span className="text-gray-500 text-xs mt-2 block">{date}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
