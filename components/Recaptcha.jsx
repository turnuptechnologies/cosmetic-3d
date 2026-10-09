"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// One script load shared by every widget on the page
let scriptPromise;
function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window.__onRecaptchaLoad = () => resolve(window.grecaptcha);
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        scriptPromise = undefined; // allow a retry on remount
        script.remove();
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * reCAPTCHA v2 checkbox. Rendered inside a <form>, Google adds a `g-recaptcha-response`
 * field that the server action verifies. `onChange(token)` fires with the token when solved
 * and with null when it expires or is reset. Call `ref.current.reset()` after each submission.
 */
export const Recaptcha = forwardRef(function Recaptcha({ onChange }, ref) {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const onChangeRef = useRef(onChange);
  const [status, setStatus] = useState(SITE_KEY ? "loading" : "unconfigured");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current?.(null);
    },
  }), []);

  useEffect(() => {
    if (!SITE_KEY) return;
    const container = containerRef.current;
    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !container) return;
        widgetId.current = grecaptcha.render(container, {
          sitekey: SITE_KEY,
          theme: "dark",
          callback: (token) => onChangeRef.current?.(token),
          "expired-callback": () => onChangeRef.current?.(null),
          "error-callback": () => onChangeRef.current?.(null),
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      widgetId.current = null;
      container?.replaceChildren(); // lets React strict mode / remounts render a fresh widget
    };
  }, []);

  return (
    <div className="mt-4">
      <div ref={containerRef} className="flex justify-center md:justify-start" />
      {status === "loading" && <p className="text-xs text-gray-400">Loading verification…</p>}
      {status === "unconfigured" && (
        <p role="alert" className="text-sm text-red-400">
          Verification is not configured, so this form cannot be submitted right now.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          Verification could not load. Check your connection or any content blockers, then reload the page.
        </p>
      )}
    </div>
  );
});
