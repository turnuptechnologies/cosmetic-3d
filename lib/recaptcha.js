// Server-side reCAPTCHA v2 verification. Only import this from server code: it reads the secret key.

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

export const RECAPTCHA_MESSAGES = {
  missing: 'Please complete the reCAPTCHA verification before sending.',
  failed: 'reCAPTCHA verification failed or expired. Please try again.',
  unavailable: 'We could not verify reCAPTCHA right now. Please try again in a moment.',
  unconfigured: 'Form verification is not configured. Please email sales@cosmeticchemist.com instead.',
};

/**
 * @param {string | null | undefined} token the `g-recaptcha-response` posted by the form
 * @param {string} [remoteIp]
 * @returns {Promise<{ ok: true } | { ok: false, reason: keyof typeof RECAPTCHA_MESSAGES }>}
 */
export async function verifyRecaptcha(token, remoteIp) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY is not set; rejecting submission');
    return { ok: false, reason: 'unconfigured' };
  }
  if (typeof token !== 'string' || !token.trim()) return { ok: false, reason: 'missing' };

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set('remoteip', remoteIp);

    const res = await fetch(VERIFY_URL, { method: 'POST', body, cache: 'no-store' });
    if (!res.ok) {
      console.error(`[recaptcha] siteverify HTTP ${res.status}`);
      return { ok: false, reason: 'unavailable' };
    }
    const result = await res.json();
    if (result.success) return { ok: true };

    const codes = result['error-codes'] ?? [];
    // Wrong/missing secret is our misconfiguration, not the visitor's fault
    if (codes.includes('invalid-input-secret') || codes.includes('missing-input-secret')) {
      console.error('[recaptcha] siteverify rejected the secret key:', codes.join(', '));
      return { ok: false, reason: 'unconfigured' };
    }
    return { ok: false, reason: 'failed' };
  } catch (error) {
    console.error('[recaptcha] siteverify request failed:', error?.message ?? error);
    return { ok: false, reason: 'unavailable' };
  }
}
