// lib/actions.js or actions/search.js
'use server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN ;

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
