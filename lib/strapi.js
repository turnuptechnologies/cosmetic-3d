export const STRAPI_URL = process.env.STRAPI_URL;
export const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ;
export const PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

async function fetchAPI(path) {
  const requestUrl = `${STRAPI_URL}${path}`;
  try {
    const response = await fetch(requestUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });
    if (!response.ok) {
      console.error(`Strapi API fetch failed for ${requestUrl}: ${response.status} ${response.statusText}`);
      return { data: null, meta: { pagination: { pageCount: 0 } } };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Network error when fetching Strapi API for ${requestUrl}:`, error);
    return { data: null, meta: { pagination: { pageCount: 0 } } };
  }
}

export async function getAllBlogPostSlugs() {
    const data = await fetchAPI('/api/articles?fields[0]=slug');
    return data.data;
}

export async function getPaginatedBlogPosts(page = 1, pageSize = 6) {
    const path = `/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc&populate=*`;
    return fetchAPI(path);
}

export async function getProducts() {
  const data = await fetchAPI('/api/products');
  return data.data;
}

export async function getProduct(slug) {
  const data = await fetchAPI(`/api/products?filters[slug][$eq]=${slug}`);
  return data.data[0];
}

export async function getBlogPosts() {
  const data = await fetchAPI('/api/articles');
  return data.data;
}

export async function getBlogPost(slug) {
  const data = await fetchAPI(`/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  console.log(data)
  return data.data[0];
}

export async function getThemeSettings() {
  const data = await fetchAPI('/api/theme-settings');
  return data.data;
}