// lib/actions.js or actions/search.js
'use client';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const API_BASE = process.env.NEXT_PUBLIC_API_URI || "";


export async function searchArticles(searchTerm) {
  if (!searchTerm || searchTerm.length < 2) {
    return { data: [] };
  }

  // console.log(`Searching for: "${searchTerm}"`);

  const filterQuery = `filters[$or][0][title][$containsi]=${encodeURIComponent(
    searchTerm
  )}&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm)}`;

  const url = `${STRAPI_URL}/api/articles?${filterQuery}&populate=*`;
  // console.log('Request URL:', url);

  try {
    const headers = {
      'ngrok-skip-browser-warning': 'true',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    } else {
      console.warn('STRAPI_TOKEN is not set. Requests may fail if authentication is required.');
    }

    // console.log('Request Headers:', headers);

    const res = await fetch(url, {
      headers,
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Strapi API Error:', res.status, res.statusText, errorText);
      return { data: [], error: `${res.status}: ${res.statusText}` };
    }

    const json = await res.json();
    // console.log('Strapi API Response:', JSON.stringify(json, null, 2));

    return json;
  } catch (error) {
    console.error('Search fetch error:', error);
    return { data: [], error: error.message };
  }
}

const withBase = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_BASE.replace('api', '')}${url}`;
};
const extractPlainTextFromLexical = (lexicalRoot) => {
  // Pull first paragraph text (simple + safe)
  const children = lexicalRoot?.children || [];
  for (const node of children) {
    if (node.type === "paragraph") {
      const text = (node.children || [])
        .map((c) => c.text || "")
        .join("")
        .trim();
      if (text) return text;
    }
  }
  return "";
};
export const normalizePostsForBlogList = (apiPosts = []) => {
  return apiPosts.map((p) => {
    const hero = p.heroImage || p?.meta?.image;

    const mediumUrl =
      hero?.sizes?.medium?.url ||
      hero?.sizes?.small?.url ||
      hero?.thumbnailURL ||
      hero?.url;

    const description =
      p?.meta?.description ||
      extractPlainTextFromLexical(p?.content?.root) ||
      "";

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      publishedAt: p.publishedAt,
      createdAt: p.createdAt,

      // Make it look like what your BlogList already reads:
      cover: {
        url: withBase(hero?.url),
        formats: {
          medium: {
            url: withBase(mediumUrl),
          },
        },
      },

      description,
    };
  });
};