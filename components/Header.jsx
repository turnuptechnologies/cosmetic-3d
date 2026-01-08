"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogSearchPopup from './BlogSearchPopup';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGetService } from '../lib/getService';

const Header = () => {
  // ✅ Default nav items (same as your commented object)
  const DEFAULT_NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ's" },
    // { href: "/contact", label: "Contact" }
  ];

  // ✅ Default CTA (since your API expects last navItem as CTA)
  const DEFAULT_CTA = { href: "/faq", label: "FAQ's", newTab: false };

  const router = useRouter();

  const { data, loading } = useGetService(
    "/globals/header?depth=2&draft=false&locale=undefined&trash=false"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  // ✅ keep your logic, just add fallback to defaults if missing/empty
  const apiNavLinks = (data?.navItems ?? [])
    .slice(0, -1)
    .map((item) => ({
      id: item?.id,
      href: item?.link?.url ?? "#",
      label: item?.link?.label ?? "",
      newTab: item?.link?.newTab ?? false,
    }))
    .filter((l) => l?.label); // optional safety (avoid empty labels)

  const navLinks = apiNavLinks.length
    ? apiNavLinks
    : DEFAULT_NAV_LINKS.map((l, idx) => ({ id: `default-${idx + 1}`, ...l, newTab: false }));

  // ✅ CTA link: from API last item, else from defaults (same behavior)
  const ctaLink = data?.navItems?.length
    ? {
      href: data?.navItems.at(-1)?.link?.url ?? DEFAULT_CTA.href,
      label: data?.navItems.at(-1)?.link?.label ?? DEFAULT_CTA.label,
      newTab: data?.navItems.at(-1)?.link?.newTab ?? DEFAULT_CTA.newTab,
    }
    : DEFAULT_CTA;

  if (loading) return null; // ya skeleton

  // ...rest of your component render

  return (
    <header 
     style={{zIndex:'1000'}}
     className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-3' : 'bg-black/40 py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition z-50">
          <Image
            width={isScrolled ? 100 : 130}
            height={isScrolled ? 100 : 130}
            src="/new-full-logo.png"
            alt="Cosmetic Chemist Logo"
            className="transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-white/80 text-sm ">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ">
          < div className="hidden md:flex">
            {ctaLink &&
              <button
                onClick={() => {
                  router.push(ctaLink?.href);
                }}
                className="group cursor-pointer flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3  bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span>{ctaLink?.label}</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </button>}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-white/80 hover:text-white focus:outline-none ${isMenuOpen ? 'z-50' : ''}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden pt-24`}
      >
        <nav className="flex flex-col space-y-4 text-xl text-center mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors duration-200"
              onClick={() => {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              {link.label}
            </Link>
          ))}
          {/* <div className="pt-4">
            <BlogSearchPopup />
          </div> */}
          <div className="mx-4">
            <button
              onClick={() => {
                router.push('/contact');
              }}
              className="group cursor-pointer flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3  bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span>Contact</span>
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </button>
          </div>
        </nav>
      </div>
    </header >
  );
};

export default Header;
