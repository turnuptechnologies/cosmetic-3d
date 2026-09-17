import Link from 'next/link';
import Footer from '../components/Footer';

// Next.js adds noindex to 404 responses automatically
export const metadata = {
  title: 'Page Not Found',
  alternates: { canonical: null },
};

const LINKS = [
  { href: '/services', label: 'Our Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: "FAQ's" },
];

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-40 pb-20">
        <p className="text-sm tracking-[0.3em] uppercase text-pink-400 mb-4">Error 404</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6">
          This formula didn&apos;t work out
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to
          something that does.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            Contact Us
          </Link>
        </div>
        <nav aria-label="Popular pages">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-300">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-pink-400 underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <Footer />
    </div>
  );
}
