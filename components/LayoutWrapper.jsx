'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const hideFooter = pathname === '/' || pathname.startsWith('/products')|| pathname.startsWith('/about-us') || pathname.startsWith('/services')

  return (
    <>
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">{children}</main>
      {/* {!hideFooter && <Footer />} */}
    </>
  )
}
