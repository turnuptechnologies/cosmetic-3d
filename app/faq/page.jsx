'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const faqs = [
    {
      question: "What Types Of Products Can You Formulate?",
      answer: "We Formulate Across The Full Spectrum: Skincare, Personal Care, Hair Care, Color Cosmetics, Oral Care, OTC, CBD, And More."
    },
    {
      question: "Do You Offer Custom Formulations From Scratch?",
      answer: "Yes, we specialize in creating custom formulations tailored to your specific needs. Our team of expert chemists works closely with you to develop unique products that align with your brand vision and market requirements."
    },
    {
      question: "Can You Work With Clean, Vegan, Or Cruelty-Free Standards?",
      answer: "Absolutely! We are committed to formulating products that meet clean, vegan, and cruelty-free standards. We can help you navigate certifications and ensure your products align with ethical and sustainable practices."
    },
    {
      question: "What Is The Typical Development Timeline?",
      answer: "The typical development timeline varies based on complexity, but generally ranges from 8-16 weeks. This includes initial consultation, formulation development, testing, refinement, and final approval. Rush timelines may be available for certain projects."
    },
    {
      question: "Do You Help With Packaging And Supply Chain?",
      answer: "Yes, we offer comprehensive support including packaging design recommendations, supplier sourcing, and supply chain management. Our network of trusted partners ensures you have access to quality packaging solutions and reliable manufacturing."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full scale-95">
        <h1 className="text-4xl font-bold text-center mb-6 mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          Frequently Asked Questions
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/40"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-6 text-left transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <span className={`text-3xl sm:text-4xl font-bold flex-shrink-0 ${openIndex === index ? 'text-[#e80076]' : 'text-white'}`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3 className={`text-base sm:text-lg lg:text-xl font-medium leading-tight ${openIndex === index ? 'text-[#e80076]' : 'text-white'}`}>
                      {faq.question}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === index
                          ? 'max-h-80 opacity-100 mt-3'
                          : 'max-h-0 opacity-0'
                        }`}
                    >
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'border-[#e80076]' : 'border-white'}`}>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-[#e80076]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
