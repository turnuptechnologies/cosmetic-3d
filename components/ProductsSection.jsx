'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useContext } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../lib/products.js'
import { ScrollerContext } from '../lib/ScrollerContext'
import { API_URI, useGetService } from '../lib/getService.js'
import { extractPlainText, joinParagraphChildren } from '../lib/sanitizeText.js'

export function ProductsSection() {
  const gridRef = useRef(null);
  const scrollerRef = useContext(ScrollerContext);

  const { data: pageData, loading } = useGetService(
    "/pages/9?depth=2&draft=false&locale=undefined&trash=false"
  );

  // ✅ Defaults (only used when API data is missing)
  const DEFAULTS = {
    heroTitle: "Default Title",
    heroDescription: "Default Description",
    products: [
      {
        id: "default-1",
        name: "Product Name",
        description: "No Description",
        imagePath: "/images/product5.png",
      },
    ],
  };

  useEffect(() => {
    if (typeof window === "undefined" || !scrollerRef?.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const content = card.querySelector(".product-content");
      if (!content) return;

      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            scroller: scrollerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, [scrollerRef]);

  const heroData = pageData?.hero?.richText?.root?.children || [];

  const heroTitle =
    extractPlainText(pageData?.hero?.richText, ["heading"]) ||
    heroData?.find((child) => child.tag === "h2")?.children?.[0]?.text ||
    DEFAULTS.heroTitle;

  const heroDescription =
    extractPlainText(pageData?.hero?.richText, ["paragraph"]) ||
    heroData?.find((child) => child.type === "paragraph")?.children?.[0]?.text ||
    DEFAULTS.heroDescription;

  // Extracting products/media (keep your logic, just make it safe + add fallbacks)
  const products =
    pageData?.layout
      ?.map((item, index) => {
        const caption = item?.media?.caption;

        const name =
          item?.media?.caption?.root?.children?.[0]?.children?.[0]?.text ||
          item?.media?.alt ||
          `Product ${index + 1}` ||
          DEFAULTS.products[0].name;

        const rawDesc = extractPlainText(caption, ["paragraph"]) || "";
        const description =
          rawDesc
            ? rawDesc.split(" ").slice(1).join(" ").trim() || rawDesc.trim()
            : DEFAULTS.products[0].description;

        const imagePath = `${API_URI}${item?.media?.url.replace('/api', '')}` || DEFAULTS.products[0].imagePath;

        return {
          id: item?.id || `default-${index + 1}`,
          name,
          description,
          imagePath,
        };
      })
      ?.filter((p) => p?.name || p?.description || p?.imagePath) || [];

  // ✅ if layout is empty / no products, return default product array
  const finalProducts = products.length ? products : DEFAULTS.products;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-20 snap-start bg-black text-white">
      <div className="text-center  mx-auto mb-16">
        <h2 className="text-5xl md:text-6xl font-black mb-6">
          {heroTitle}
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {heroDescription}
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl w-full overflow-visible"
      >
        {finalProducts.map((product) => (
          <div
            key={product.id}
            className="product-card relative rounded-3xl p-8 text-center shadow-2xl cursor-pointer group overflow-visible bg-transparent"
          >
            <div className="absolute inset-0 z-[1] pointer-events-none flex items-start justify-center">
              <div className="w-[90%] h-[70%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full blur-[0px]" />
            </div>
            {/* <Link href={`/products/${product.slug}`}> */}
            <div className="product-content relative z-[5]">
              <div className="w-full h-56 flex items-center justify-center mb-10">
                <Image
                  // src={`${API_URI}${product.imagePath.replace('/api', '')}`}
                  src={product.imagePath}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </section>
  )
}
