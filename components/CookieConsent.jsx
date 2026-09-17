'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = 'cc-cookie-consent';
export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings';

const readConsent = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveConsent = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
};

// Remove Google Analytics cookies when consent is withdrawn
const clearAnalyticsCookies = () => {
  const domain = window.location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name.startsWith('_ga')) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  });
};

export default function CookieConsent() {
  // undefined = not read yet, null = no choice made
  const [consent, setConsent] = useState(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setOpen(!stored);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const choose = (value) => {
    saveConsent(value);
    setConsent(value);
    setOpen(false);

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: value });
    }
    if (value === 'denied') clearAnalyticsCookies();
  };

  return (
    <>
      {GA_ID && consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {open && (
        <section
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[2000] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-xl p-5 sm:p-6 text-white shadow-[0_0_40px_rgba(255,20,147,0.15)] flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-sm text-gray-300 leading-relaxed flex-1">
              We use cookies to understand how visitors use our site and to improve your experience.
              Analytics cookies are only set if you accept. See our{' '}
              <Link href="/cookie-policy" className="underline text-white hover:text-pink-400">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="px-5 py-2.5 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 transition"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-sm font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
