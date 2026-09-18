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
    { href: "/about-us", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blogs" },
    { href: "/faq", label: "FAQ's" },
    // { href: "/contact", label: "Contact" }
  ];

  // ✅ Default CTA (since your API expects last navItem as CTA)
  const DEFAULT_CTA = { href: "/contact", label: "Contact", newTab: false };

  const router = useRouter();

  const { data } = useGetService(
    "/globals/header?depth=2&draft=false&locale=undefined&trash=false"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Pages scroll inside their own containers, so listen in the capture phase to catch every scroll
    const handleScroll = (e) => {
      const target = e.target === document ? document.scrollingElement : e.target;
      setIsScrolled((target?.scrollTop ?? window.scrollY) > 10);
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  // Let the browser handle ctrl/cmd/shift/middle clicks and new-tab links
  const isPlainClick = (e) =>
    !(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

  const handleLinkClick = (e, link) => {
    if (link.newTab || !isPlainClick(e)) return;
    e.preventDefault();
    handleNavigation(link.href);
  };

  const handleNavigation = (href) => {
    if (href == "/") {
      if (typeof window !== 'undefined' && window.location.pathname === "/") {
        window.location.reload();
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
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

  return (
    <header 
     style={{zIndex:'1000'}}
     className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 py-3' : 'bg-black/40 py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition z-50"
          aria-label="Cosmetic Chemist home"
          onClick={(e) => handleLinkClick(e, { href: "/" })}
        >
          <Image
            width={isScrolled ? 100 : 130}
            height={isScrolled ? 100 : 130}
            src="/new-full-logo.png"
            alt="Cosmetic Chemist Logo"
            className="transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex gap-6 lg:gap-8 text-white/80 text-sm ">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.newTab ? "_blank" : undefined}
              rel={link.newTab ? "noopener noreferrer" : undefined}
              className="hover:text-white transition-colors duration-200"
              onClick={(e) => handleLinkClick(e, link)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ">
          < div className="hidden md:flex">
            {ctaLink &&
              <Link
                href={ctaLink.href}
                target={ctaLink.newTab ? "_blank" : undefined}
                rel={ctaLink.newTab ? "noopener noreferrer" : undefined}
                className="group cursor-pointer flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3  bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <span>{ctaLink?.label}</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
              </Link>}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-white/80 hover:text-white focus:outline-none ${isMenuOpen ? 'z-50' : ''}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden pt-24`}
      >
        <nav aria-label="Mobile" className="flex flex-col space-y-4 text-xl text-center mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.newTab ? "_blank" : undefined}
              rel={link.newTab ? "noopener noreferrer" : undefined}
              className="text-white/80 hover:text-white transition-colors duration-200"
              onClick={(e) => {
                handleLinkClick(e, link);
                closeMenu();
              }}
            >
              {link.label}
            </Link>
          ))}
          {/* <div className="pt-4">
            <BlogSearchPopup />
          </div> */}
          <div className="mx-4">
            <Link
              href={ctaLink.href}
              onClick={closeMenu}
              className="group cursor-pointer flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3  bg-gradient-to-r from-[#FF4F7A] to-pink-600 text-white rounded-full font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span>{ctaLink.label}</span>
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            </Link>
          </div>
        </nav>
      </div>
    </header >
  );
};

export default Header;
