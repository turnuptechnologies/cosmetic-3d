// Server-side fetch of a Payload page, so its content is in the initial HTML instead of
// being fetched by the browser after hydration. Revalidated every 5 minutes.

const API_URI = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/$/, '');

export const HOME_ENDPOINT = '/pages/4?depth=2&draft=false&locale=undefined&trash=false';

export async function fetchCmsPage(endpoint) {
  if (!API_URI) return null;
  try {
    const res = await fetch(`${API_URI}${endpoint}`, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error(`[cms] ${endpoint.split('?')[0]} failed (${res.status})`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`[cms] ${endpoint.split('?')[0]} error:`, error?.message ?? error);
    return null; // the client component falls back to fetching in the browser
  }
}
