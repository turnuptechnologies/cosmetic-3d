// CMS-driven redirects: the Payload "Redirects" collection ({ from, to: { type, url | reference } }).
// Server-side only; used by proxy.js on every page request, so lookups come from an in-memory cache.

import { SITE_URL } from './seo';
import { resolveLexicalLink } from './sanitizeText';

const API_URI = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/$/, '');
const CACHE_TTL_MS = 60 * 1000; // a CMS edit is live within a minute
const FETCH_TIMEOUT_MS = 2000; // never hold up a page waiting on the CMS
const MAX_HOPS = 5;

const SITE_HOST = new URL(SITE_URL).hostname.replace(/^www\./, '');

let cache = { map: new Map(), fetchedAt: 0 };
let inflight = null;

// "https://site.com/blog/9/?x=1" | "/blog/9" -> "/blog/9" (no host, no trailing slash; query kept)
function normalizeFrom(from) {
  try {
    const url = new URL(from, SITE_URL);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    return path + url.search;
  } catch {
    return null;
  }
}

// Destination as a same-site path (so the redirect works on any host/proxy) or an absolute external URL
function resolveTo(to) {
  if (!to) return null;
  let href = null;

  if (to.type === 'reference' && to.reference) {
    href = resolveLexicalLink({ linkType: 'internal', doc: to.reference }).href;
  } else if (typeof to.url === 'string' && to.url.trim()) {
    href = to.url.trim();
  }
  if (!href) return null;

  try {
    const url = new URL(href, SITE_URL);
    if (url.hostname.replace(/^www\./, '') === SITE_HOST) return url.pathname + url.search + url.hash;
    return url.href;
  } catch {
    return null;
  }
}

async function loadRedirects() {
  if (!API_URI) return null;
  try {
    const res = await fetch(`${API_URI}/redirects?limit=1000&depth=1`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[redirects] CMS request failed (${res.status})`);
      return null;
    }
    const { docs = [] } = await res.json();
    const map = new Map();
    for (const doc of docs) {
      const from = normalizeFrom(doc.from);
      const to = resolveTo(doc.to);
      if (from && to) map.set(from, to);
    }
    return map;
  } catch (error) {
    console.error('[redirects] CMS request error:', error?.message ?? error);
    return null;
  }
}

async function getRedirectMap() {
  if (Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.map;

  inflight ??= loadRedirects()
    .then((map) => {
      // On failure keep serving the last good list, and retry after the TTL
      cache = { map: map ?? cache.map, fetchedAt: Date.now() };
    })
    .finally(() => {
      inflight = null;
    });
  await inflight;
  return cache.map;
}

/**
 * @param {string} pathname e.g. "/blog/9"
 * @param {string} [search] e.g. "?utm=x"
 * @returns {Promise<string | null>} where to send the visitor, or null for no redirect
 */
export async function findRedirect(pathname, search = '') {
  const map = await getRedirectMap();
  if (!map.size) return null;

  const stripSlash = (p) => p.replace(/\/+$/, '') || '/';
  const path = stripSlash(pathname);

  let target = map.get(path + search) ?? map.get(path);
  if (!target) return null;

  // Follow chains (A -> B -> C) so the visitor gets one redirect. Coming back to a page
  // already visited (including A -> A) is a loop: refuse to redirect rather than bounce.
  const seen = new Set([path]);
  for (let hop = 0; hop < MAX_HOPS && !target.startsWith('http'); hop++) {
    const next = stripSlash(target.split(/[?#]/)[0]);
    if (seen.has(next)) return null;
    seen.add(next);
    const further = map.get(next);
    if (!further) break;
    target = further;
  }

  // Keep the visitor's query string (UTMs etc.) unless the destination has its own
  if (search && !target.startsWith('http') && !target.includes('?')) {
    const hash = target.indexOf('#');
    return hash === -1 ? target + search : target.slice(0, hash) + search + target.slice(hash);
  }
  return target;
}
