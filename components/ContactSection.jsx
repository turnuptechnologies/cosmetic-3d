import { CustomDropdown } from "./CustomDropdown";

export function ContactSection() {
  const dropdownValue = [
    { value: "option 1", label: "Option 1" },
    { value: "option 2", label: "Option 2"},
    { value: "option 3", label: "Option 3" },
    { value: "option 4", label: "Option 4" },
    { value: "option 5", label: "Option 5" },
    { value: "option 6", label: "Option 6" },
  ]

    const dropdownValue2 = [
    { value: "option 1", label: "$2000 - $3000" },
    { value: "option 2", label: "$3000 - $5000"},
    { value: "option 3", label: "$5000 - $10000" },
    { value: "option 4", label: "$10000 - $20000" },
    { value: "option 5", label: "$20000 - $50000" },
    { value: "option 6", label: "$50000 - $100000" },
  ]
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
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Email Address *</label>
            <input
              type="email"
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Company Name</label>
            <input
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your company (optional)"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Phone Number</label>
            <input
              type="tel"
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="+1 (___) ___-____"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Type *</label>
            <CustomDropdown dropdownValue={dropdownValue}/>
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Budget Range *</label>
            <CustomDropdown dropdownValue={dropdownValue2}/>
          </div>

          {/* Textarea */}
          <div className="md:col-span-2">
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Details *</label>
            <textarea
              rows={4}
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-pink-500 transition resize-none"
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
