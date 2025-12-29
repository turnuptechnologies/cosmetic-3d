import Image from "next/image";

export function BrandsChemistsSection() {
  return (
    
    <section className="w-full min-h-screen snap-start bg-black text-white relative overflow-hidden py-28 px-6 flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16 items-center w-full">
        
        {/* LEFT SIDE — Brands */}
        <div className="lg:col-span-1 text-left space-y-6">
          <h2 className="text-4xl font-semibold">Brands</h2>

          <p className="text-gray-300 leading-relaxed">
            Using our comprehensive Cosmetic Chemist network we will connect you
            with an expert cosmetic chemist or two. We want you to have the best
            innovative partner you can get. Why should you contact us today?
          </p>

          <ul className="space-y-3 text-gray-200">
            {[
              "Access to elite cosmetic chemists",
              "Free cosmetic chemistry support",
              "Cosmetic chemists with 20+ years",
              "Innovation & strategy sessions with chemists",
              "Quick answers and communication",
              "Competitive R&D cost structures",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-lg leading-[1]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-full flex items-center gap-2">
            Explore Directory <span>➜</span>
          </button>
        </div>

        {/* CENTER BOTTLE — Always centered */}
        <div className="flex justify-center col-span-1">
          <Image
            src="/images/product5.png"
            width={430}
            height={680}
            alt="Product Bottle"
            className="drop-shadow-[0_20px_60px_rgba(255,0,100,0.4)] select-none pointer-events-none"
          />
        </div>

        {/* RIGHT SIDE — Cosmetic Chemists */}
        <div className="lg:col-span-1 text-left lg:text-right space-y-6">
          <h2 className="text-4xl font-semibold">Cosmetic Chemists</h2>

          <p className="text-gray-300 leading-relaxed lg:ml-auto lg:max-w-xs">
            Gain access to new business development opportunities with expert
            lead generation for your lab.
          </p>

          <ul className="space-y-3 text-gray-200 lg:text-right">
            {[
              "Connect with leading brands & opportunities",
              "Access exclusive resources",
              "Grow your revenue with more leads",
              "Creative & branding services available",
              "Join the #1 cosmetic chemist lead gen",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 lg:justify-end"
              >
                <span className="hidden lg:block">{item}</span>
                <span className="text-lg leading-[1]">•</span>
                <span className="lg:hidden">{item}</span>
              </li>
            ))}
          </ul>

          <button className="mt-6 bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-full flex items-center gap-2 lg:ml-auto">
            Join Our Network <span>➜</span>
          </button>
        </div>
      </div>
    </section>
  );
}
