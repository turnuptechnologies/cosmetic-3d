const Footer = () => (
  <footer className="w-full bg-black border-t border-white/10 text-white/40">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-8 py-6">
      <p className="text-sm">&copy; {new Date().getFullYear()} Cosmetic Chemist. All Rights Reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition text-sm">Privacy Policy</a>
        <a href="#" className="hover:text-white transition text-sm">Terms of Service</a>
      </div>
    </div>
  </footer>
)

export default Footer;
