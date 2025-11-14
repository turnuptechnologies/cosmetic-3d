const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(path) {
  const requestUrl = `${STRAPI_URL}${path}`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
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
  const data = await fetchAPI('/api/blog-posts');
  return data.data;
}

export async function getBlogPost(slug) {
  const data = await fetchAPI(`/api/blog-posts?filters[slug][$eq]=${slug}`);
  return data.data[0];
}

export async function getThemeSettings() {
  const data = await fetchAPI('/api/theme-settings');
  return data.data;
}
