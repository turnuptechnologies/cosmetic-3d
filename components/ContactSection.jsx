export function ContactSection() {
  return (
    <section className="w-full bg-black text-white snap-start flex flex-col justify-center py-12 md:py-20 px-4 sm:px-6 mb-6">
      
      {/* Top Heading Section */}
      <div className="max-w-6xl mx-auto text-center mb-6 md:mb-4 mt-6 md:mt-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Let&apos;s Create Something Amazing Together
        </h2>
        <p className="text-gray-300 mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
          Ready to transform your beauty vision into reality? Get in touch with
          our expert team for a free consultation.
        </p>
      </div>

      {/* Glass Form Section */}
      <div className="max-w-6xl w-full mx-auto bg-[#111]/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(255,20,147,0.15)]">
        <h3 className="text-lg sm:text-xl font-semibold mb-1">
          Start Your Project - We Will Contact You Very Soon
        </h3>
        <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10">
          We work fast and efficient ensuring your brand&apos;s success.
        </p>

        {/* Form Grid */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          
          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Full Name *</label>
            <input
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Email Address *</label>
            <input
              type="email"
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Company Name</label>
            <input
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your company (optional)"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Phone Number</label>
            <input
              type="tel"
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="+1 (___) ___-____"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Type *</label>
            <select
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Select project type</option>
              <option value="website">Website Development</option>
              <option value="mobile">Mobile App</option>
              <option value="branding">Branding</option>
              <option value="marketing">Digital Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Budget Range *</label>
            <select
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition appearance-none"
              defaultValue=""
            >
              <option value="" disabled>Select budget range</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-15k">$5,000 - $15,000</option>
              <option value="15k-50k">$15,000 - $50,000</option>
              <option value="50k+">$50,000+</option>
            </select>
          </div>

          {/* Textarea */}
          <div className="md:col-span-2">
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Details *</label>
            <textarea
              rows={4}
              className="w-full text-sm sm:text-base bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-pink-500 transition resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

        </form>

        {/* Submit Button */}
        <button 
          type="submit"
          className="mt-8 sm:mt-10 w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium"
        >
          Send Message
        </button>
      </div>
    </section>
  );
}
