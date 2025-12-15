import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    // <footer className="w-full bg-gradient-to-t from-white/0 via-transparent to-black opacity-90 text-white py-12 relative">
    //   <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-black opacity-20 -z-10"></div>

    //   <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-8">

    //     <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/4">
    //       <Image 
    //         src="/full-logo.png" 
    //         alt="Cosmetic Chemist Logo" 
    //         width={128} 
    //         height={40}
    //         className="w-32 mb-4"
    //         priority
    //       />
    //       <p className="text-md text-center md:text-left max-w-md mb-4 font-light">
    //         Your premier platform connecting cosmetic chemists with innovative brands.
    //       </p>
    //       <div className="flex justify-center md:justify-start gap-6">
    //         <a href="#" className="text-white hover:text-pink-500">
    //           <i className="fab fa-facebook"></i>
    //         </a>
    //         <a href="#" className="text-white hover:text-pink-500">
    //           <i className="fab fa-twitter"></i>
    //         </a>
    //         <a href="#" className="text-white hover:text-pink-500">
    //           <i className="fab fa-linkedin"></i>
    //         </a>
    //         <a href="#" className="text-white hover:text-pink-500">
    //           <i className="fab fa-instagram"></i>
    //         </a>
    //       </div>
    //     </div>

    //      <div className="w-full md:w-1/4 mb-6 md:mb-0">
    //       <h4 className="text-lg font-semibold mb-4 font-light">Quick Links</h4>
    //       <ul className="space-y-2 font-light">
    //         <li><a href="/" className="text-white hover:text-pink-500">Home</a></li>
    //         <li><a href="/about" className="text-white hover:text-pink-500">About Us</a></li>
    //         <li><a href="/service" className="text-white hover:text-pink-500">Services</a></li>
    //       </ul>
    //     </div>

    //     <div className="w-full md:w-1/4">
    //       <h4 className="text-lg font-semibold mb-4 font-light">Info Links</h4>
    //       <ul className="space-y-2 font-light">
    //         <li><a href="/blog" className="text-white hover:text-pink-500">Blog</a></li>
    //         <li><a href="/contact" className="text-white hover:text-pink-500">Contact</a></li>
    //         <li><a href="/faq" className="text-white hover:text-pink-500">FAQ</a></li>
    //       </ul>
    //     </div>

    //     <div className="w-full md:w-1/4">
    //       <h4 className="text-lg font-semibold mb-4 font-light">Contact</h4>
    //       <p className="mb-2 font-light">
    //         <a href="mailto:info@cosmeticchemist.com" className="text-white hover:text-pink-500">info@cosmeticchemist.com</a>
    //       </p>
    //       <p className="mb-2 font-light">
    //         <a href="tel:+18005551234" className="text-white hover:text-pink-500">+1 (800) 555-1234</a>
    //       </p>
    //       <p className="mb-2">123 Innovation Way, New York, NY 10001</p>
    //     </div>
    //   </div>


    //   <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-8 border-t border-white/10 text-white/40 pt-6 mt-8">
    //     <p className="text-sm font-light">&copy; {new Date().getFullYear()} Cosmetic Chemist. All Rights Reserved.</p>
    //     <div className="flex gap-6">
    //       <a href="#" className="hover:text-white transition text-sm font-light">Privacy Policy</a>
    //       <a href="#" className="hover:text-white transition text-sm font-light">Terms of Service</a>
    //       <a href="#" className="hover:text-white transition text-sm font-light">Cookie Policy</a>
    //     </div>
    //   </div>
    // </footer>
    <footer className="w-full bg-gradient-to-t from-white/0 via-transparent to-black opacity-90 text-white py-12 relative">
      {/* Central gradient circle effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-black opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/4">
          <Image
            src="/full-logo.png"
            alt="Cosmetic Chemist Logo"
            width={128}
            height={40}
            className="w-32 mb-4"
            priority
          />
          <p className="text-md text-center md:text-left max-w-md mb-4 font-light">
            Advancing cosmetic innovation by connecting formulation experts with modern brands.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
            <a
              href="https://www.linkedin.com/company/cosmetic-chemist-labs/"
              target="_blank"
              className="text-white hover:text-pink-500"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/COSMETICLABSx"
              target="_blank"
              className="text-white hover:text-pink-500"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              className="text-white hover:text-pink-500"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.youtube.com/@cosmeticchemistlabs"
              target="_blank"
              className="text-white hover:text-pink-500"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Middle Section (Quick Links) */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4 font-light">Quick Links</h4>
          <ul className="space-y-2 font-light">
            <li><a href="/" className="text-white hover:text-pink-500">Home</a></li>
            <li><a href="/about" className="text-white hover:text-pink-500">About Us</a></li>
            <li><a href="/service" className="text-white hover:text-pink-500">Services</a></li>
          </ul>
        </div>

        {/* Right Section (Info Links) */}
        <div className="w-full md:w-1/4">
          <h4 className="text-lg font-semibold mb-4 font-light">Info Links</h4>
          <ul className="space-y-2 font-light">
            <li><a href="/blog" className="text-white hover:text-pink-500">Blog</a></li>
            <li><a href="/contact" className="text-white hover:text-pink-500">Contact</a></li>
            <li><a href="/faq" className="text-white hover:text-pink-500">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h4 className="text-lg font-semibold mb-4 font-light">Contact</h4>
          <p className="mb-2 font-light">
            <a
              href="mailto:sales@cosmeticchemist.com"
              className="text-white hover:text-pink-500"
            >
              sales@cosmeticchemist.com
            </a>
          </p>
          <p className="mb-2 font-light">
            <a
              href="tel:+18016973001"
              className="text-white hover:text-pink-500"
            >
              +1 (801) 697-3001
            </a>
          </p>
          <p className="mb-2 font-light">
            Salt Lake City, UT 84106
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-8 border-t border-white/10 text-white/40 pt-6 mt-8">
        <p className="text-sm font-light">
          &copy; {new Date().getFullYear()} Cosmetic Chemist Labs. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition text-sm font-light">Privacy Policy</a>
          <a href="#" className="hover:text-white transition text-sm font-light">Terms of Service</a>
          <a href="#" className="hover:text-white transition text-sm font-light">Cookie Policy</a>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
