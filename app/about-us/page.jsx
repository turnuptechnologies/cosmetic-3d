import AboutPage from "./AboutPageClient";
import { ABOUT_ENDPOINT } from "./endpoint";

const API_URI = (process.env.NEXT_PUBLIC_API_URI || "").replace(/\/$/, "");

// Fetch on the server so the page content (including the "By the Numbers" stats) is in the
// initial HTML for crawlers and AI tools that don't run JavaScript. Refreshed every 5 minutes.
async function getAboutPage() {
  if (!API_URI) return null;
  try {
    const res = await fetch(`${API_URI}${ABOUT_ENDPOINT}`, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error(`[about-us] CMS request failed (${res.status})`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("[about-us] CMS request error:", error?.message ?? error);
    return null; // the client component falls back to fetching in the browser
  }
}

export default async function Page() {
  return <AboutPage initialData={await getAboutPage()} />;
}
