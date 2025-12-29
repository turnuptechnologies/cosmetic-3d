"use client";

import { useActionState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { sendEmail } from "../app/api/action";
const initialState = {
  success: false,
  message: "",
};

export function ContactSection() {
  // 1. Initialize the hook
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
    
  const dropdownValue = [
    { value: "skin-care", label: "Skin Care" },
    { value: "hair-care", label: "Hair Care" },
    { value: "oral-care", label: "Oral Care" },
    { value: "personal-care", label: "Personal Care" },
    { value: "product-reformulation", label: "Product Reformulation" },
    { value: "reverse-engineer", label: "Reverse Engineer" },
    { value: "consultation-only", label: "Consultation Only" },
    { value: "lets-discuss", label: "Let's Discuss" },
  ];

  const dropdownValue2 = [
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "25000-plus", label: "$25,000+" },
    { value: "lets-discuss", label: "Let's Discuss" },
  ];

  return (
    <section className="w-full bg-black text-white snap-start flex flex-col justify-center py-12 md:py-20 px-4 sm:px-6 mb-6">
      <div className="max-w-6xl mx-auto text-center mb-6 md:mb-4 mt-6 md:mt-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Let&apos;s Create Something Amazing Together
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-3">Ready to transform your beauty vision into reality? Get in touch with our expert team for a free consultation.</p>
      </div>

      <div className="max-w-6xl w-full mx-auto bg-[#111]/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(255,20,147,0.15)]">
        <h3 className="text-lg sm:text-xl font-semibold mb-1">Start Your Project - We Will Contact You Very Soon</h3>
        <p className="text-gray-300 text-[13px] mb-1">Start Your Project - We Will Contact You Very Soon</p>

        {/* 2. Add formAction here */}
        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Full Name *</label>
            <input
              name="fullName" // Added name
              required
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Email Address *</label>
            <input
              name="email" // Added name
              type="email"
              required
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Company Name</label>
            <input
              name="companyName" // Added name
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="Your company (optional)"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Phone Number</label>
            <input
              name="phoneNumber" // Added name
              type="tel"
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-full px-4 py-2 sm:py-2.5 outline-none focus:border-pink-500 transition"
              placeholder="+1 (___) ___-____"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Type *</label>
            {/* Added name prop - Ensure your CustomDropdown uses this for a hidden input */}
            <CustomDropdown name="projectType" dropdownValue={dropdownValue} />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Budget Range *</label>
            <CustomDropdown name="budgetRange" dropdownValue={dropdownValue2} />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs sm:text-sm mb-1 sm:mb-2 block">Project Details *</label>
            <textarea
              name="projectDetails" // Added name
              required
              rows={4}
              className="w-full text-sm sm:text-base bg-[#FFFFFF0D] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-pink-500 transition resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* 3. Handling Submit State */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className={`mt-4 w-full transition text-white py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium 
                ${isPending ? "bg-gray-600 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>

            {/* 4. Display Feedback */}
            {state.message && (
              <p className={`mt-4 text-center text-sm ${state.success ? "text-green-400" : "text-red-400"}`}>
                {state.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}