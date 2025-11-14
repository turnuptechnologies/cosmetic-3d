import { FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'

export default function Footer() {
  const socialLinks = [
    { icon: <FiTwitter />, href: '#' },
    { icon: <FiInstagram />, href: '#' },
    { icon: <FiFacebook />, href: '#' },
  ]

  const footerLinks = [
    { href: '#', label: 'Customer Service' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
  ]

  return (
    <footer id="contact" className="bg-brand-light">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-3xl font-serif font-bold text-brand-dark">
              Aura
            </a>
            <p className="mt-2 text-brand-dark/70">Discover the essence of beauty.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-brand-dark mb-4">Quick Links</h3>
              <ul>
                {footerLinks.map((link) => (
                  <li key={link.label} className="mb-2">
                    <a href={link.href} className="text-brand-dark/70 hover:text-brand-pink transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-brand-dark mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-brand-dark/70 hover:text-brand-pink transition-colors text-2xl"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-bold text-brand-dark mb-4">Newsletter</h3>
              <p className="text-brand-dark/70 mb-4">Get the latest news and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-md border border-brand-dark/20 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                />
                <button
                  type="submit"
                  className="bg-brand-pink text-white px-4 py-2 rounded-r-md hover:bg-brand-pink-dark transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-dark/10 pt-8 text-center text-brand-dark/50">
          <p>&copy; {new Date().getFullYear()} Aura Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}