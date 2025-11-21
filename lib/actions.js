// lib/actions.js or actions/search.js
'use server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://1c5ddc963c93.ngrok-free.app';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

export async function searchArticles(searchTerm) {
  if (!searchTerm || searchTerm.length < 2) {
    return { data: [] };
  }

  const filterQuery = `filters[$or][0][title][$containsi]=${encodeURIComponent(searchTerm)}&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm)}`;
  const url = `${STRAPI_URL}/api/articles?${filterQuery}&populate=*`;

  try {
    const headers = {
      'ngrok-skip-browser-warning': 'true'
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const res = await fetch(url, { 
      headers,
      cache: 'no-store' // Ensure fresh data
    });

    if (!res.ok) {
      console.error('Strapi API Error:', res.status, res.statusText);
      return { data: [], error: `${res.status}: ${res.statusText}` };
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Search error:', error);
    return { data: [], error: error.message };
  }
}