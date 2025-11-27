export function ContactSection() {
  return (
    <section className="w-full bg-black text-white snap-start flex flex-col justify-center py-20 px-6">
      
      {/* Top Heading Section */}
      <div className="max-w-6xl mx-auto text-center mb-4 mt-10">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Let&apos;s Create Something Amazing Together
        </h2>
        <p className="text-gray-300 mt-4 leading-relaxed max-w-2xl mx-auto">
          Ready to transform your beauty vision into reality? Get in touch with
          our expert team for a free consultation.
        </p>
      </div>

      {/* Glass Form Section */}
      <div className="max-w-6xl w-full mx-auto bg-[#111]/60 backdrop-blur-2xl border border-white/10 p-10 md:p-6 rounded-2xl shadow-[0_0_40px_rgba(255,20,147,0.15)]">
        
        <h3 className="text-xl font-semibold mb-0">
          Start Your Project - We Will Contact You Very Soon
        </h3>
        <p className="text-gray-400 mb-10">
          We work fast and efficient ensuring your brand&apos;s success.
        </p>

        {/* Form Grid */}
        <form className="grid md:grid-cols-2 gap-3">
          
          <div>
            <label className="text-xs mb-2 block">Full Name *</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          <div>
            <label className="text-xs mb-2 block">Email Address *</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          <div>
            <label className="text-xs mb-2 block">Company Name</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          <div>
            <label className="text-xs mb-2 block">Phone Number</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          <div>
            <label className="text-xs mb-2 block">Project Type *</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          <div>
            <label className="text-xs mb-2 block">Budget Range *</label>
            <input
              className="w-full bg-black/30 border border-white/10 rounded-full px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

          {/* Textarea */}
          <div className="md:col-span-2">
            <label className="text-xs mb-2 block">Project Details *</label>
            <textarea
              rows={3}
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-3 py-2 outline-none focus:border-pink-500 transition"
            />
          </div>

        </form>

        {/* Submit Button */}
        <button className="mt-10 w-full bg-pink-500 hover:bg-pink-600 transition text-white py-4 rounded-full text-lg">
          Send Message
        </button>
      </div>
    </section>
  );
}
