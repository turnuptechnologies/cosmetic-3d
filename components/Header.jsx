import Link from 'next/link'

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
    <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6">
      <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition">
        <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm md:text-lg">C</span>
        </div>
        <div className="text-white">
          <p className="font-bold text-xs md:text-base">COSMETIC</p>
          <p className="text-[10px] md:text-xs text-white/60">CHEMIST</p>
        </div>
      </Link>
      <nav className="hidden md:flex gap-8 text-white/80 text-sm">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Service</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </nav>
      <button className="text-white/60 hover:text-white transition">
        <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </button>
    </div>
  </header>
)

export default Header;
