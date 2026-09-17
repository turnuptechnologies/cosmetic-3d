'use client';

import { OPEN_COOKIE_SETTINGS } from './CookieConsent';

export default function CookieSettingsButton({ className }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
    >
      Cookie Settings
    </button>
  );
}
