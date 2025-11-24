import Link from 'next/link';
import Image from 'next/image';
import BlogSearchPopup from './BlogSearchPopup';
const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4 md:py-6">
      <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition">
        <Image width={100} height={100} src="/full-logo.png" alt="Cosmetic Chemist Logo" />
      </Link>
      <nav className="hidden md:flex gap-8 text-white/80 text-sm">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/service" className="hover:text-white transition">Service</Link>
        <Link href="/faq" className="hover:text-white transition">FAQ's</Link>
        <Link href="/contact" className="hover:text-white transition">Contact</Link>
      </nav>
      <div className="flex items-center justify-center gap-4 my-auto">
  <Link
    href="/blog"
    className="text-white/60 hover:text-white transition"
  >
    Blogs
  </Link>

  <BlogSearchPopup />
</div>

    
      {/* <button className="text-white/60 hover:text-white transition">
        <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </button> */}
    </div>
  </header>
);

export default Header;
