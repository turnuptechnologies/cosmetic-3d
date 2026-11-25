import { NextResponse } from 'next/server';
import { findRedirect } from './lib/redirects';
import { SITE_URL } from './lib/seo';

// Applies the CMS "Redirects" collection to incoming page requests (301, permanent).
// next.config.mjs redirects run first; anything not matched there is looked up in the CMS.
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const target = await findRedirect(pathname, search);
  if (!target) return NextResponse.next();

  // The proxy runtime needs an absolute URL. Resolve against the canonical site URL rather than
  // the incoming request, which behind a reverse proxy can be an internal host like localhost:3000.
  return new NextResponse(null, { status: 301, headers: { Location: new URL(target, SITE_URL).href } });
}

export const config = {
  // Page routes only: skip Next internals, API routes and any path with a file extension
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
